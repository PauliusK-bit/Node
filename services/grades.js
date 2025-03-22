const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

function getGrades() {
  const filePath = path.join("db", "grades.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getGradeById(id) {
  const filePath = path.join("db", "grades.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const grades = JSON.parse(fileContent);

  const foundGrade = grades.find((grade) => grade.id === id);

  return foundGrade;
}

function createGrade(body) {
  const id = uuid();

  const newGrade = {
    ...body,

    id,
  };

  const grades = getGrades();

  grades.push(newGrade);

  const stringifiedData = JSON.stringify(grades, null, 2);

  const filePath = path.join("db", "grades.json");
  fs.writeFileSync(filePath, stringifiedData);

  return newGrade;
}

function updateGrade(data) {
  const { id } = data;

  const grades = getGrades();

  const updatedGrade = grades.map((grade) => {
    if (grade.id === id) {
      const updatedGrade = {
        ...data,
      };

      return updatedGrade;
    } else {
      return grade;
    }
  });

  const stringifiedData = JSON.stringify(updatedGrade, null, 2);

  const filePath = path.join("db", "grades.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteGrade(id) {
  const grades = getGrades();
  const updatedGrades = grades.filter((grade) => grade.id !== id);

  const stringifiedData = JSON.stringify(updatedGrades, null, 2);
  const filePath = path.join("db", "grades.json");
  fs.writeFileSync(filePath, stringifiedData);
}

module.exports = {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};
