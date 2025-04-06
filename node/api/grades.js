const express = require("express");
const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  getGradesByYear,
  getGradesByYearAndMonth,
  getGradesByGroup,
} = require("../controllers/gradeController");

const router = express.Router();

router.get("/", getGrades);
router.get("/:id", getGradeById);
router.post("/", createGrade);
router.put("/:id", updateGrade);
router.delete("/:id", deleteGrade);
router.get("/date/:year", getGradesByYear);
router.get("/date/:year/:month", getGradesByYearAndMonth);
router.get("/group/:group", getGradesByGroup);

module.exports = router;
