const express = require("express");

const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../services/assignments");

const router = express.Router();

router.get("/", (req, res, next) => {
  const assignments = getAssignments();
  res.send(assignments);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const assignment = getAssignmentById(id);

  res.send(assignment);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdAssignment = createAssignment(body);

  res.send(createdAssignment);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedAssignment = updateAssignment({ ...body, id });

  res.send(updatedAssignment);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteAssignment(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
