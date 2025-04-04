const express = require("express");
const {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
} = require("../controllers/programmingLanguageController");

const router = express.Router();

router.get("/", getProgrammingLanguages);
router.get("/:id", getProgrammingLanguageById);
router.post("/", createProgrammingLanguage);
router.put("/:id", updateProgrammingLanguage);
router.delete("/:id", deleteProgrammingLanguage);

module.exports = router;
