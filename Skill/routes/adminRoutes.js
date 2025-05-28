const express=require("express");

const router=exppress.Router();

const auth=require('./middlewares/authMiddleware');
const checkRole=('./middlewares/roleMiddleware');
const adminController=require('./controllers/adminController');

router.use(auth,checkRole("admin"));

router.post('/jobs',adminController.createJob);
router.get('/jobs',adminController.getMyJobs);
router.put('jobs/:id',adminController.updateJob);
router.delete('jobs/:id',adminController.deleteJob);

module.exports=router;