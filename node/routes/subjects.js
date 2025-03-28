const express = require("express");
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../services/subjects");

const router = express.Router();

router.get("/subjects", async (req, res) => {
  const subjects = await getSubjects();

  const data = {
    newSubjectButton: {
      url: "/create-subject",
      title: "New Subject",
    },
    subjects,
  };

  res.render("subjects", data);
});

router.get("/subjects/:id", (req, res) => {
  const { id } = req.params;

  const subject = getSubjectById(id);

  res.render("subject", { subject, id });
});

router.get("/create-subject", (req, res) => {
  res.render("create-subject");
});

router.post("/subject-created", (req, res) => {
  const { body } = req;
  const createdSubject = createSubject(body);

  res.redirect(`/subjects/${createdSubject.id}`);
});

router.get("/edit-subject/:id", (req, res) => {
  const { id } = req.params;

  const foundSubject = getSubjectById(id);

  const { name } = foundSubject;

  res.send(`
          <h1>Edit Subject </h1>
  
          <form action="/lecturer-edited" method="POST">
              <div >
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" value="${name}" />
              </div>

              <button type="submit">Edit</button>
  
              <input type="hidden" name="id" value="${id}" />
               
          </form>
      `);
});

router.post("/subject-edited", (req, res) => {
  const { body } = req;
  const updatedSubject = updateSubject(body);

  res.redirect(`/subjects/${updatedSubject.id}`);
});

router.post("/delete-subject", (req, res) => {
  const { subjectId } = req.body;

  deleteSubject(subjectId);

  res.redirect("/subjects");
});

module.exports = router;
