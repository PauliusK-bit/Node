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
} = require("../controllers/lecturerController");

const router = express.Router();

router.get("/", getLecturers);
router.get("/:id", getLecturerById);
router.post("/", createLecturer);
router.put("/:id", updateLecturer);
router.delete("/:id", deleteLecturer);
router.get("/:lecturer/groups", getLecturerGroups);
router.get("/:lecturer/students", getLecturerStudents);
router.get("/:lecturer/subjects", getLecturerSubjects);

module.exports = router;
