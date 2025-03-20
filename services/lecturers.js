const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

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

  const newLecturer = {
    ...body,

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
      const updatedLecturer = {
        ...data,
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

module.exports = {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
};
