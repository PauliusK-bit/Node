const express = require("express");
const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
} = require("../controllers/gradeController");

const router = express.Router();

router.get("/", getGrades);
router.get("/:id", getGradeById);
router.post("/", createGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);

module.exports = router;
