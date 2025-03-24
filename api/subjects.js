const express = require("express");

const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../services/subjects");

const router = express.Router();

router.get("/", (req, res, next) => {
  const subjects = getSubjects();
  res.send(subjects);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const subject = getSubjectById(id);

  res.send(subject);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdSubject = createSubject(body);

  res.send(createdSubject);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedSubject = updateSubject({ ...body, id });

  res.send(updatedSubject);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteSubject(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
