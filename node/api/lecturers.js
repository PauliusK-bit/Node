const express = require("express");
const {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getLecturerGroups,
  getLecturerStudents,
  getLecturerSubjects,
  // getLecturersBy,
} = require("../services/lecturers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getLecturers();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getLecturerById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const response = await createLecturer(body);
    res.send({ ...response, body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateLecturer({ ...body, id });
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await deleteLecturer(id);
    res.send({ message: "Data  was succsfully removed", id, response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// router.get("/:key/:value", async (req, res) => {
//   const { key, value } = req.params;

//   try {
//     const data = await getLecturersBy(key, value);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

router.get("/:lecturer/groups", async (req, res) => {
  const { lecturer } = req.params;

  try {
    const data = await getLecturerGroups(lecturer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:lecturer/students", async (req, res) => {
  const { lecturer } = req.params;

  try {
    const data = await getLecturerStudents(lecturer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:lecturer/subjects", async (req, res) => {
  const { lecturer } = req.params;

  try {
    const data = await getLecturerSubjects(lecturer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
