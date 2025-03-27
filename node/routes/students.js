const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../services/studentsServices");
const { getProgrammingLanguages } = require("../services/programmingLanguages");
const { getGroupById } = require("../services/groups");

const router = express.Router();

router.get("/students", (req, res) => {
  const students = getStudents(req.query);

  const data = {
    newStudentButton: {
      url: "/create-student",
      title: "New Student",
    },
    students,
    limit: req.query._limit ?? "5",
  };

  res.render("students", data);
});

router.get("/students/:id", (req, res) => {
  const { id } = req.params;

  const student = getStudentById(id);

  if (student.groupId) {
    const group = getGroupById(student.groupId);
    student.group = group;
  }

  res.render("student", { student, id });
});

router.get("/create-student", (req, res) => {
  const programmingLanguages = getProgrammingLanguages();

  res.render("create-student", { programmingLanguages, student: {} });
});

router.post("/student-created", (req, res) => {
  const { body } = req;
  const createdStudent = createStudent(body);

  res.redirect(`/students/${createdStudent.id}`);
});

router.get("/edit-student/:id", (req, res) => {
  const { id } = req.params;

  const foundStudent = getStudentById(id);
  const programmingLanguages = getProgrammingLanguages();

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
                <legend>Programming Languages:</legend>

                <div class="form-control">
                <input type="checkbox"  value=${
                  programmingLanguages.name
                } name="interests" ${
    interests.includes("JavaScript") ? "checked" : ""
  } />
                    <label for="interest-1">JavaScript</label>
                </div

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

router.post("/student-edited", (req, res) => {
  const { body } = req;
  const updatedStudent = updateStudent(body);

  res.redirect(`/students/${updatedStudent.id}`);
});

router.post("/delete-student", (req, res) => {
  const { studentId } = req.body;

  deleteStudent(studentId);

  res.redirect("/students");
});

module.exports = router;
