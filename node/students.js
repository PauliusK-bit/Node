const express = require("express");
const path = require("path");
const process = require("process");
require("dotenv").config();
require("./db");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const studentRoutes = require("./routes/students");
const lecturersRoutes = require("./routes/lecturers");
const subjectsRoutes = require("./routes/subjects");
const programmingLanguagesRoutes = require("./routes/programmingLanguages");
const groupRoutes = require("./routes/groups");
const assignmentsRoutes = require("./routes/assignments");
const gradesRoutes = require("./routes/grades");

const studentAPIRoutes = require("./api/students");
const groupAPIRoutes = require("./api/groups");
const assignmentAPIRoutes = require("./api/assignments");
const gradeAPIRoutes = require("./api/grades");
const lecturerAPIRoutes = require("./api/lecturers");
const subjectAPIRoutes = require("./api/subjects");
const programmingLanguageAPIRoutes = require("./api/programmingLanguages");
const userAPIRoutes = require("./api/users");

app.use(studentRoutes);
app.use(lecturersRoutes);
app.use(subjectsRoutes);
app.use(programmingLanguagesRoutes);
app.use(groupRoutes);
app.use(assignmentsRoutes);
app.use(gradesRoutes);

app.use("/api/students", studentAPIRoutes);
app.use("/api/groups", groupAPIRoutes);
app.use("/api/assignments", assignmentAPIRoutes);
app.use("/api/grades", gradeAPIRoutes);
app.use("/api/lecturers", lecturerAPIRoutes);
app.use("/api/subjects", subjectAPIRoutes);
app.use("/api/programmingLanguages", programmingLanguageAPIRoutes);
app.use("/api/users", userAPIRoutes);

app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.use(express.static("public"));

app.locals.siteTitle = "My Website";
app.locals.currentDate = new Date().getFullYear();

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
