const express = require("express");

const {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
} = require("../services/programmingLanguages");

const router = express.Router();

router.get("/", (req, res, next) => {
  const programmingLanguages = getProgrammingLanguages();
  res.send(programmingLanguages);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const programmingLanguage = getProgrammingLanguageById(id);

  res.send(programmingLanguage);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdProgrammingLanguage = createProgrammingLanguage(body);

  res.send(createdProgrammingLanguage);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedProgrammingLanguage = updateProgrammingLanguage({ ...body, id });

  res.send(updatedProgrammingLanguage);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteProgrammingLanguage(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
