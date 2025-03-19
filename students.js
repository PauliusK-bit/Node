const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const studentRoutes = require("./routes/students");
const lecturersRoutes = require("./routes/lecturers");

app.use(studentRoutes);
app.use(lecturersRoutes);

app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("index");
});

const PORT = 3007;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
