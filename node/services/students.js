const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");
const { embedData } = require("../lib");

function getStudents(query) {
  const filePath = path.join("db", "students.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  let formedData = data;

  if (query) {
    const limit = query._limit;
    const start = query._start ? query._start : 0;

    if (limit) {
      formedData = data.slice(start, limit);
    }

    console.log(query);

    const embed = query._embed;

    if (embed) {
      if (Array.isArray(embed)) {
        embed.forEach((item) => {
          formedData = embedData(formedData, item);
        });
      } else {
        formedData = embedData(formedData, embed);
      }
    }
  }

  return formedData;
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

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
