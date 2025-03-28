const express = require("express");
const {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
} = require("../services/lecturers");

const router = express.Router();

router.get("/lecturers", async (req, res) => {
  const lecturers = await getLecturers();

  const data = {
    newLecturerButton: {
      url: "/create-lecturer",
      title: "New Lecturer",
    },
    lecturers,
  };

  res.render("lecturers", data);
});

router.get("/lecturers/:id", (req, res) => {
  const { id } = req.params;

  const lecturer = getLecturerById(id);

  res.render("lecturer", { lecturer, id });
});

router.get("/create-lecturer", (req, res) => {
  res.render("create-lecturer");
});

router.post("/lecturer-created", (req, res) => {
  const { body } = req;
  const createdLecturer = createLecturer(body);

  res.redirect(`/lecturers/${createdLecturer.id}`);
});

router.get("/edit-lecturer/:id", (req, res) => {
  const { id } = req.params;

  const foundLecturer = getLecturerById(id);

  const { name, surname, age, phone, email } = foundLecturer;

  res.send(`
        <h1>Edit Lecturer </h1>

        <form action="/lecturer-edited" method="POST">
            <div >
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="${name}" />
            </div>
            <div>
                <label for="surname">Surname:</label>
                <input type="text" id="surname" name="surname" value="${surname}" />
            </div>
            <div>
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" value="${age}" />
            </div>
            <div>
                <label for="phone">Phone:</label>
                <input type="number" id="phone" name="phone" value="${phone}" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${email}" />
            </div>

            <button type="submit">Edit</button>

             <input type="hidden" name="id" value="${id}" />
        </form>
    `);
});

router.post("/lecturer-edited", (req, res) => {
  const { body } = req;
  const updatedLecturer = updateLecturer(body);

  res.redirect(`/lecturers/${updatedLecturer.id}`);
});

router.post("/delete-lecturer", (req, res) => {
  const { lecturerId } = req.body;

  deleteLecturer(lecturerId);

  res.redirect("/lecturers");
});

module.exports = router;
