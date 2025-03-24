const express = require("express");

const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
} = require("../services/grades");

const router = express.Router();

router.get("/", (req, res, next) => {
  const grades = getGrades();
  res.send(grades);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const grade = getGradeById(id);

  res.send(grade);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdGrade = createGrade(body);

  res.send(createdGrade);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedGrade = updateGrade({ ...body, id });

  res.send(updatedGrade);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteGrade(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
