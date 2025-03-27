const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

function getGroups() {
  const filePath = path.join("db", "groups.json");

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

  const newGroup = {
    ...body,

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

function assignGroupToStudent(student, groupId) {
  const group = getGroupById(groupId);

  if (group) {
    student.group = group;
    student.groupId = group.id;
  } else {
    console.log("Group not found");
  }

  return student;
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  assignGroupToStudent,
};
