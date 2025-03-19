const express = require("express");

const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

const router = express.Router();

function getLecturers() {
  const filePath = path.join("db", "lecturers.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getLecturerById(id) {
  const filePath = path.join("db", "lecturers.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const lecturers = JSON.parse(fileContent);

  const foundLecturer = lecturers.find((lecturer) => lecturer.id === id);

  return foundLecturer;
}

function createLecturer(body) {
  const id = uuid();
  const subjects = [];

  if (body.subjects) {
    if (typeof body.subjects === "string") {
      subjects.push(body.subjects);
    } else {
      subjects.push(...body.subjects);
    }
  }

  const newLecturer = {
    ...body,
    subjects,
    id,
  };

  const lecturers = getLecturers();

  lecturers.push(newLecturer);

  const stringifiedData = JSON.stringify(lecturers, null, 2);

  const filePath = path.join("db", "lecturers.json");
  fs.writeFileSync(filePath, stringifiedData);

  return newLecturer;
}

function updateLecturer(data) {
  const { id } = data;

  const lecturers = getLecturers();

  const updatedLecturers = lecturers.map((lecturer) => {
    if (lecturer.id === id) {
      const subjects = [];

      if (data.subjects) {
        if (typeof data.subjects === "string") {
          subjects.push(data.subjects);
        } else {
          subjects.push(...data.subjects);
        }
      }

      const updatedLecturer = {
        ...data,
        subjects,
      };

      return updatedLecturer;
    } else {
      return lecturer;
    }
  });

  const stringifiedData = JSON.stringify(updatedLecturer, null, 2);

  const filePath = path.join("db", "lecturers.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteLecturer(id) {
  const lecturers = getLecturers();
  const updatedLecturers = lecturers.filter((lecturer) => lecturer.id !== id);

  const stringifiedData = JSON.stringify(updatedLecturers, null, 2);
  const filePath = path.join("db", "lecturers.json");
  fs.writeFileSync(filePath, stringifiedData);
}

router.get("/lecturers", (req, res, next) => {
  const lecturers = getLecturers();

  const data = {
    newLecturerButton: {
      url: "/create-lecturer",
      title: "New Lecturer",
    },
    lecturers,
  };

  res.render("lecturers", data);
});

router.get("/lecturers/:id", (req, res, next) => {
  const { id } = req.params;

  const lecturer = getLecturerById(id);

  res.render("lecturer", { lecturer, id });
});

router.get("/create-lecturer", (req, res, next) => {
  res.render("create-lecturer");
});

router.post("/lecturer-created", (req, res, next) => {
  const { body } = req;
  const createdLecturer = createLecturer(body);

  res.redirect(`/lecturers/${createdLecturer.id}`);
});

router.get("/edit-lecturer/:id", (req, res, next) => {
  const { id } = req.params;

  const foundLecturer = getLecturerById(id);

  const { name, surname, age, subjects, phone, email, group } = foundLecturer;

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

             <fieldset>
        <legend>Group:</legend>

        <div className="form-control">
         <input type="radio" name="group" id="group-1" value="TYPE 20"
         ${group === "TYPE 20" ? "checked" : ""} />
          <label for="group-1">TYPE 20gr.</label>
        </div>

        <div className="form-control">
         <input type="radio" name="group" id="group-1" value="TYPE 22"
        ${group === "TYPE 22" ? "checked" : ""} />
        <label for="group-1">TYPE 22gr.</label>
        </div>

        <div className="form-control">
        <input type="radio" name="group" id="group-1" value="TYPE 23"
          ${group === "TYPE 23" ? "checked" : ""} />
           <label for="group-1">TYPE 23gr.</label>
        </div>

        <div className="form-control">
         <input type="radio" name="group" id="group-1" value="TYPE 24"
        ${group === "TYPE 24" ? "checked" : ""} />
         <label for="group-1">TYPE 24gr.</label>
        </div>
      </fieldset>

            <fieldset>
                <legend>Subjects:</legend>

                <div>
                    <input type="checkbox" id="subject-1" value="JavaScript" name="subjects" ${
                      subjects.includes("JavaScript") ? "checked" : ""
                    } />
                    <label for="subject-1">JavaScript</label>
                </div>
                <div>
                    <input type="checkbox" id="subject-2" value="React" name="subjects" ${
                      subjects.includes("React") ? "checked" : ""
                    } />
                    <label for="subject-2">React</label>
                </div>
                <div>
                    <input type="checkbox" id="subject-3" value="Python" name="subjects" ${
                      subjects.includes("Python") ? "checked" : ""
                    } />
                    <label for="subject-3">Python</label>
                </div>
                <div>
                    <input type="checkbox" id="subject-3" value="PHP" name="subjects" ${
                      subjects.includes("PHP") ? "checked" : ""
                    } />
                    <label for="subject-3">PHP</label>
                </div>
            </fieldset>

            <button type="submit">Edit</button>

            <input type="hidden" name="id" value="${id}" />
        </form>
    `);
});

router.post("/lecturer-edited", (req, res, next) => {
  const { body } = req;
  const updatedLecturer = updateLecturer(body);

  res.redirect(`/lecturers/${updatedLecturer.id}`);
});

router.post("/delete-lecturer", (req, res, next) => {
  const { lecturerId } = req.body;

  deleteLecturer(lecturerId);

  res.redirect("/lecturers");
});

module.exports = router;
