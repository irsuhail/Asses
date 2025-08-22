import { Request, Response } from "express";
import Student from "../models/Student";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      message: "Student created successfully",
      student,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error: any) {
    res.status(400).json({ error: "Invalid student ID" });
  }
};
