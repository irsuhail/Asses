import { Router } from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
} from "../controllers/studentController";

const router = Router();

router.post("/students", createStudent);
router.get("/students", getStudents);
router.get("/students/:id", getStudentById);

export default router;
