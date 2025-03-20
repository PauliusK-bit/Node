const express = require("express");

const { getLecturers } = require("./lecturers");
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../services/subjects");

const router = express.Router();

router.get("/subjects", (req, res, next) => {
  const subjects = getSubjects();

  const data = {
    newSubjectButton: {
      url: "/create-subject",
      title: "New Subject",
    },
    subjects,
  };

  res.render("subjects", data);
});

router.get("/subjects/:id", (req, res, next) => {
  const { id } = req.params;

  const subject = getSubjectById(id);

  const lecturer = subject.lecturer || "Nėra priskirto dėstytojo";

  res.render("subject", { subject, id, lecturer });
});

router.get("/create-subject", (req, res, next) => {
  res.render("create-subject");
});

router.post("/subject-created", (req, res, next) => {
  const { body } = req;
  const createdSubject = createSubject(body);

  res.redirect(`/subjects/${createdSubject.id}`);
});

router.get("/edit-subject/:id", (req, res, next) => {
  const { id } = req.params;

  const foundSubject = getSubjectById(id);

  const { name } = foundLecturer;

  res.send(`
          <h1>Edit Subject </h1>
  
          <form action="/lecturer-edited" method="POST">
              <div >
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" value="${name}" />
              </div>
               
          </form>
      `);
});

router.post("/subject-edited", (req, res, next) => {
  const { body } = req;
  const updatedSubject = updateSubject(body);

  res.redirect(`/subjects/${updatedSubject.id}`);
});

router.post("/delete-subject", (req, res, next) => {
  const { subjectId } = req.body;

  deleteSubject(subjectId);

  res.redirect("/subjects");
});

module.exports = router;
