const express = require("express");

const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

const router = express.Router();

function getStudents() {
  const filePath = path.join("db", "students.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getStudentById(id) {
  const filePath = path.join("db", "students.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const students = JSON.parse(fileContent);

  const foundStudent = students.find((student) => student.id === id);

  return foundStudent;
}

function createStudent(body) {
  const id = uuid();
  const interests = [];

  if (body.interests) {
    if (typeof body.interests === "string") {
      interests.push(body.interests);
    } else {
      interests.push(...body.interests);
    }
  }

  const newStudent = {
    ...body,
    interests,
    id,
  };

  const students = getStudents();

  students.push(newStudent);

  const stringifiedData = JSON.stringify(students, null, 2);

  const filePath = path.join("db", "students.json");
  fs.writeFileSync(filePath, stringifiedData);

  return newStudent;
}

function updateStudent(data) {
  const { id } = data;

  const students = getStudents();

  const updatedStudents = students.map((student) => {
    if (student.id === id) {
      const interests = [];

      if (data.interests) {
        if (typeof data.interests === "string") {
          interests.push(data.interests);
        } else {
          interests.push(...data.interests);
        }
      }

      const updatedStudent = {
        ...data,
        interests,
      };

      return updatedStudent;
    } else {
      return student;
    }
  });

  const stringifiedData = JSON.stringify(updatedStudents, null, 2);

  const filePath = path.join("db", "students.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteStudent(id) {
  const students = getStudents();
  const updatedStudents = students.filter((student) => student.id !== id);

  const stringifiedData = JSON.stringify(updatedStudents, null, 2);
  const filePath = path.join("db", "students.json");
  fs.writeFileSync(filePath, stringifiedData);
}

router.get("/students", (req, res, next) => {
  const students = getStudents();

  const data = {
    newStudentButton: {
      url: "/create-student",
      title: "New Student",
    },
    students,
  };

  res.render("students", data);
});

router.get("/students/:id", (req, res, next) => {
  const { id } = req.params;

  const student = getStudentById(id);

  res.render("student", { student, id });
});

router.get("/create-student", (req, res, next) => {
  res.render("create-student");
});

router.post("/student-created", (req, res, next) => {
  const { body } = req;
  const createdStudent = createStudent(body);

  res.redirect(`/students/${createdStudent.id}`);
});

router.get("/edit-student/:id", (req, res, next) => {
  const { id } = req.params;

  const foundStudent = getStudentById(id);

  const { name, surname, age, interests, phone, email, group } = foundStudent;

  res.send(`
        <h1>Edit Student</h1>

        <form action="/student-edited" method="POST">
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
                <legend>Interests:</legend>

                <div>
                    <input type="checkbox" id="interest-1" value="JavaScript" name="interests" ${
                      interests.includes("JavaScript") ? "checked" : ""
                    } />
                    <label for="interest-1">JavaScript</label>
                </div>
                <div>
                    <input type="checkbox" id="interest-2" value="Node.js" name="interests" ${
                      interests.includes("Node.js") ? "checked" : ""
                    } />
                    <label for="interest-2">Node.js</label>
                </div>
                <div>
                    <input type="checkbox" id="interest-3" value="Python" name="interests" ${
                      interests.includes("Python") ? "checked" : ""
                    } />
                    <label for="interest-3">Python</label>
                </div>
                <div>
                    <input type="checkbox" id="interest-3" value="PHP" name="interests" ${
                      interests.includes("PHP") ? "checked" : ""
                    } />
                    <label for="interest-3">PHP</label>
                </div>
            </fieldset>

            <button type="submit">Edit</button>

            <input type="hidden" name="id" value="${id}" />
        </form>
    `);
});

router.post("/student-edited", (req, res, next) => {
  const { body } = req;
  const updatedStudent = updateStudent(body);

  res.redirect(`/students/${updatedStudent.id}`);
});

router.post("/delete-student", (req, res, next) => {
  const { studentId } = req.body;

  deleteStudent(studentId);

  res.redirect("/students");
});

module.exports = router;
