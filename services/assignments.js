const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

function getAssignments() {
  const filePath = path.join("db", "assignments.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getAssignmentById(id) {
  const filePath = path.join("db", "assignments.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const assignments = JSON.parse(fileContent);

  const foundAssignment = assignments.find(
    (assignment) => assignment.id === id
  );

  return foundAssignment;
}

function createAssignment(body) {
  const id = uuid();

  const newAssignment = {
    ...body,
    id,
  };

  const assignments = getAssignments();

  assignments.push(newAssignment);

  const stringifiedData = JSON.stringify(assignments, null, 2);

  const filePath = path.join("db", "assignments.json");
  fs.writeFileSync(filePath, stringifiedData);

  return newAssignment;
}

function updateAssignment(data) {
  const { id } = data;

  const assignments = getAssignments();

  const updatedAssignments = assignments.map((assignment) => {
    if (assignment.id === id) {
      const updatedAssignment = {
        ...data,
      };

      return updatedAssignment;
    } else {
      return assignments;
    }
  });

  const stringifiedData = JSON.stringify(updatedAssignments, null, 2);

  const filePath = path.join("db", "assignments.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteAssignment(id) {
  const assignments = getAssignments();
  const updatedAssignments = assignments.filter(
    (assignment) => assignment.id !== id
  );

  const stringifiedData = JSON.stringify(updatedAssignments, null, 2);
  const filePath = path.join("db", "assignments.json");
  fs.writeFileSync(filePath, stringifiedData);
}

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
