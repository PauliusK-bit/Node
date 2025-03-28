const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

async function getAssignments() {
  const db = getDB();
  return await db.collection("assignments").find().toArray();
}

async function getAssignmentById(id) {
  const db = getDB();
  const assignment = await db
    .collection("assignments")
    .findOne({ _id: ObjectId.createFromHexString(id) });
  return assignment;
}

async function createAssignment(body) {
  const db = getDB();
  const response = await db.collection("assignments").insertOne(body);

  return response;
}

async function updateAssignment(data) {
  const db = getDB();
  const response = await db
    .collection("assignments")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteAssignment(id) {
  const db = getDB();
  const response = await db
    .collection("assignments")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
