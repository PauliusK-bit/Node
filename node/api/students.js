const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../services/students");

const router = express.Router();

router.get("/", (req, res, next) => {
  const students = getStudents();
  res.send(students);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const student = getStudentById(id);

  res.send(student);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdStudent = createStudent(body);

  res.send(createdStudent);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedStudent = updateStudent({ ...body, id });

  res.send(updatedStudent);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteStudent(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
