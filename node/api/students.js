const express = require("express");
const { getStudents } = require("../services/students");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getStudents();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const student = getStudentById(id);

  res.send(student);
});

router.post("/", (req, res) => {
  const { body } = req;
  const createdStudent = createStudent(body);

  res.send(createdStudent);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedStudent = updateStudent({ ...body, id });

  res.send(updatedStudent);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteStudent(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
