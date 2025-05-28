const express=require("express");

const router=express.Router();

const auth=require('./middlewares/authMiddleware');
const checkRole=('./middlewares/roleMiddleware');
const candidateController=require('./controllers/candidateController');

router.use(auth,checkRole("candidate"));

router.post("/jobs",candidateController.getMatchingJobs);
router.get("/jobs/:jobId/apply",candidateController.applyJob);
router.put("jobs/:id",adminController.updateJob);
router.delete("jobs/:JobId/withdraw",candidateController.withdrawApplication);

module.exports=router;