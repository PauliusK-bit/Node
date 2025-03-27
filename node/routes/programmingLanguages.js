const express = require("express");
const {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
} = require("../services/programmingLanguages");
const { getStudents } = require("../services/studentsServices");

const router = express.Router();

router.get("/programmingLanguages", (req, res, next) => {
  const programmingLanguages = getProgrammingLanguages();

  const data = {
    newProgrammingLanguageButton: {
      url: "/create-ProgrammingLanguage",
      title: "New Programming Language",
    },
    programmingLanguages,
  };

  res.render("programmingLanguages", data);
});

router.get("/programmingLanguages/:id", (req, res, next) => {
  const { id } = req.params;
  const students = getStudents();

  const programmingLanguage = getProgrammingLanguageById(id);

  const studentsWhoChose = students.filter(
    (student) =>
      student.programmingLanguages &&
      student.programmingLanguages.includes(programmingLanguage.name)
  );

  res.render("programmingLanguage", {
    programmingLanguage,
    id,
    students: studentsWhoChose,
  });
});

router.get("/create-programmingLanguage", (req, res, next) => {
  res.render("create-programmingLanguage");
});

router.post("/programmingLanguage-created", (req, res, next) => {
  const { body } = req;
  const createdProgrammingLanguage = createProgrammingLanguage(body);

  res.redirect(`/programmingLanguages/${createdProgrammingLanguage.id}`);
});

router.get("/edit-programmingLanguage/:id", (req, res, next) => {
  const { id } = req.params;

  const foundProgrammingLanguage = getProgrammingLanguageById(id);

  const { name } = foundProgrammingLanguage;

  res.send(`
          <h1>Edit Programming Language</h1>
  
          <form action="/programmingLanguage-edited" method="POST">
              <div >
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" value="${name}" />
              </div>
              
  
              <button type="submit">Edit</button>
  
              <input type="hidden" name="id" value="${id}" />
          </form>
      `);
});

router.post("/programmingLanguage-edited", (req, res, next) => {
  const { body } = req;
  const updatedProgrammingLanguage = updateProgrammingLanguage(body);

  res.redirect(`/programmingLanguages/${updatedProgrammingLanguage.id}`);
});

router.post("/delete-programmingLanguage", (req, res, next) => {
  const { programmingLanguageId } = req.body;

  deleteProgrammingLanguage(programmingLanguageId);

  res.redirect("/programmingLanguages");
});

module.exports = router;
