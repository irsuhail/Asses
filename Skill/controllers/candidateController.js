const Job = require("../models/Job");
const User = require("../models/User");
const redis = require("../utils/redisClient");
const { sendApplicationEmail } = require("../utils/mailer");

exports.getMatchingJobs = async (req, res) => {
  const userId = req.user.id;

  const cacheKey =`matching_jobs_${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return res.json(JSON.parse(cached));

  const user = await User.findById(userId);
  const jobs = await Job.find({
    requiredSkills: { $in: user.skills },
  });

  await redis.set(cacheKey, JSON.stringify(jobs), "EX", 300); // 5 mins cache
  res.json(jobs);
};

exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({ error: "Already applied" });
    }

    job.applicants.push(req.user.id);
    await job.save();

   
    await redis.del(`matching_jobs_${req.user.id}`);

    const candidate = await User.findById(req.user.id);
    const admin = await User.findById(job.createdBy);
    await sendApplicationEmail(candidate.email, job, admin.name);

    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.withdrawApplication = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    job.applicants = job.applicants.filter(
      (id) => id.toString() !== req.user.id
    );
    await job.save();

    await redis.del(`matching_jobs_${req.user.id}`);

    res.json({ message: "Withdrawn successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};