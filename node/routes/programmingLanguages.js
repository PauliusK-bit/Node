const express = require("express");
const {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
} = require("../services/programmingLanguages");

const router = express.Router();

router.get("/programmingLanguages", async (req, res) => {
  const programmingLanguages = await getProgrammingLanguages();

  const data = {
    newProgrammingLanguageButton: {
      url: "/create-ProgrammingLanguage",
      title: "New Programming Language",
    },
    programmingLanguages,
  };

  res.render("programmingLanguages", data);
});

router.get("/programmingLanguages/:id", (req, res) => {
  const { id } = req.params;

  const programmingLanguage = getProgrammingLanguageById(id);

  res.render("programmingLanguage", {
    programmingLanguage,
    id,
  });
});

router.get("/create-programmingLanguage", (req, res) => {
  res.render("create-programmingLanguage");
});

router.post("/programmingLanguage-created", (req, res) => {
  const { body } = req;
  const createdProgrammingLanguage = createProgrammingLanguage(body);

  res.redirect(`/programmingLanguages/${createdProgrammingLanguage.id}`);
});

router.get("/edit-programmingLanguage/:id", (req, res) => {
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

router.post("/programmingLanguage-edited", (req, res) => {
  const { body } = req;
  const updatedProgrammingLanguage = updateProgrammingLanguage(body);

  res.redirect(`/programmingLanguages/${updatedProgrammingLanguage.id}`);
});

router.post("/delete-programmingLanguage", (req, res) => {
  const { programmingLanguageId } = req.body;

  deleteProgrammingLanguage(programmingLanguageId);

  res.redirect("/programmingLanguages");
});

module.exports = router;
