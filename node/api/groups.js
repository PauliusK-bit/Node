const express = require("express");
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  getStudentsByGroup,
  getLecturersByGroup,
} = require("../controllers/groupController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getGroups);
router.get("/:id", authMiddleware, getGroupById);
router.post("/", createGroup);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);
router.get("/:group/students", getStudentsByGroup);
router.get("/:group/lecturers", getLecturersByGroup);

module.exports = router;
