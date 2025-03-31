const express = require("express");
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsBy,
} = require("../services/subjects");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getSubjects();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getSubjectById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const response = await createSubject(body);
    res.send({ ...response, body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateSubject({ ...body, id });
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteSubject(id);
    res.send({ message: "Data  was succsfully removed", id, response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:key/:value", async (req, res) => {
  const { key, value } = req.params;

  try {
    const data = await getSubjectsBy(key, value);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
