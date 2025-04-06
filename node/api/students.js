const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentLecturers,
  getStudentSubjects,
  getStudentGrades,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
router.get("/:student/lecturers", getStudentLecturers);
router.get("/:student/subjects", getStudentSubjects);
router.get("/:student/grades", getStudentGrades);

module.exports = router;
