const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getStudents() {
  const db = getDB();
  return await db.collection("students").find().toArray();
}

async function getStudentById(id) {
  const db = getDB();
  const student = await db
    .collection("students")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  return student;
}

async function createStudent(body) {
  const db = getDB();
  const response = await db.collection("students").insertOne(body);

  return response;
}

async function updateStudent(data) {
  const db = getDB();
  const response = await db
    .collection("students")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteStudent(id) {
  const db = getDB();
  const response = await db
    .collenction("students")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
