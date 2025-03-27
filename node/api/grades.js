const express = require("express");

const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
} = require("../services/grades");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getGrades();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getGradeById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const response = await createGrade(body);
    res.send(...response, body);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateGrade({ ...body, id });
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteGrade(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
