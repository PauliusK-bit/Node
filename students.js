const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const studentRoutes = require("./routes/students");
const lecturersRoutes = require("./routes/lecturers");
const subjectsRoutes = require("./routes/subjects");
const programmingLanguagesRoutes = require("./routes/programmingLanguages");
const groupRoutes = require("./routes/groups");
const assignmentsRoutes = require("./routes/assignments");

app.use(studentRoutes);
app.use(lecturersRoutes);
app.use(subjectsRoutes);
app.use(programmingLanguagesRoutes);
app.use(groupRoutes);
app.use(assignmentsRoutes);

app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("index");
});

const PORT = 3007;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
