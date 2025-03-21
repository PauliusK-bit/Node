const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");
const { getLecturers } = require("./lecturers");

function getSubjects() {
  const filePath = path.join("db", "subjects.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getSubjectById(id) {
  const filePath = path.join("db", "subjects.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const subjects = JSON.parse(fileContent);

  const foundSubject = subjects.find((subject) => subject.id === id);

  return foundSubject;
}

function createSubject(body) {
  const id = uuid();

  const newSubject = {
    ...body,

    id,
  };

  const subjects = getSubjects();

  const lecturers = getLecturers();

  const assignedLecturer =
    lecturers[Math.floor(Math.random() * lecturers.length)];

  if (assignedLecturer) {
    newSubject.lecturer = assignedLecturer.name;
    if (!assignedLecturer.subjects) {
      assignedLecturer.subjects = [];
    }
    assignedLecturer.subjects.push(newSubject);
  }

  subjects.push(newSubject);

  const stringifiedData = JSON.stringify(subjects, null, 2);

  const filePath = path.join("db", "subjects.json");
  fs.writeFileSync(filePath, stringifiedData);

  const lecturerStringifiedData = JSON.stringify(lecturers, null, 2);
  const lecturerFilePath = path.join("db", "lecturers.json");
  fs.writeFileSync(lecturerFilePath, lecturerStringifiedData);

  return newSubject;
}

function updateSubject(data) {
  const { id } = data;

  const subjects = getSubjects();

  const updatedSubjects = subjects.map((subject) => {
    if (subject.id === id) {
      const updatedSubject = {
        ...data,
      };

      return updatedSubject;
    } else {
      return subject;
    }
  });

  const stringifiedData = JSON.stringify(updatedSubject, null, 2);

  const filePath = path.join("db", "subjects.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteSubject(id) {
  const subjects = getSubjects();
  const updatedSubjects = subjects.filter((subject) => subject.id !== id);

  const stringifiedData = JSON.stringify(updatedSubjects, null, 2);
  const filePath = path.join("db", "subjects.json");
  fs.writeFileSync(filePath, stringifiedData);
}

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
