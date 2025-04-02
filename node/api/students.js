const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentLecturers,
  getStudentSubjects,

  // getStudentsBy,
} = require("../services/students");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getStudents();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getStudentById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const response = await createStudent(body);
    res.send({ ...response, body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateStudent(body, id);
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteStudent(id);
    res.send({ message: "Data  was succsfully removed", id, response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// router.get("/:key/:value", async (req, res) => {
//   const { key, value } = req.params;

//   try {
//     const data = await getStudentsBy(key, value);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

router.get("/:student/lecturers", async (req, res) => {
  const { student } = req.params;

  try {
    const data = await getStudentLecturers(student);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:student/subjects", async (req, res) => {
  const { student } = req.params;

  try {
    const data = await getStudentSubjects(student);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
