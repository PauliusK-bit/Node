const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");
const { getStudents } = require("./students");

function getGroups() {
  const filePath = path.join("db", "groups.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getGroupById(id) {
  const filePath = path.join("db", "groups.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const groups = JSON.parse(fileContent);

  const foundGroup = groups.find((group) => group.id === id);

  return foundGroup;
}

function createGroup(body) {
  const id = uuid();
  const students = getStudents();

  const assignedStudents = students.sort(() => 0.5 - Math.random()).slice(0, 3);

  const newGroup = {
    ...body,
    students: assignedStudents,
    id,
  };

  const groups = getGroups();

  groups.push(newGroup);

  const stringifiedData = JSON.stringify(groups, null, 2);

  const filePath = path.join("db", "groups.json");
  fs.writeFileSync(filePath, stringifiedData);

  return newGroup;
}

function updateGroup(data) {
  const { id } = data;

  const groups = getGroups();

  const updatedGroup = groups.map((group) => {
    if (group.id === id) {
      const updatedGroup = {
        ...data,
      };

      return updatedGroup;
    } else {
      return group;
    }
  });

  const stringifiedData = JSON.stringify(updatedGroup, null, 2);

  const filePath = path.join("db", "groups.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteGroup(id) {
  const groups = getGroups();
  const updatedGroups = groups.filter((group) => group.id !== id);

  const stringifiedData = JSON.stringify(updatedGroups, null, 2);
  const filePath = path.join("db", "groups.json");
  fs.writeFileSync(filePath, stringifiedData);
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
