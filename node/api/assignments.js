const express = require("express");
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../services/assignments");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAssignments();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getAssignmentById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const response = await createAssignment(body);
    res.send(...response, body);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateAssignment({ ...body, id });
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteAssignment(id);
    res.send({ message: "Data  was succsfully removed", id, response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
