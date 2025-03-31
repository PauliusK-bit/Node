const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

async function getGrades() {
  const db = getDB();
  return await db.collection("grades").find().toArray();
}

async function getGradeById(id) {
  const db = getDB();
  const grade = await db
    .collection("grades")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  return grade;
}

async function createGrade(body) {
  const db = getDB();
  const response = await db.collection("grades").insertOne(body);

  return response;
}

async function updateGrade(data) {
  const db = getDB();
  const response = await db
    .collection("grades")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteGrade(id) {
  const db = getDB();
  const response = await db
    .collection("grades")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

async function getGradesBy(key, value) {
  const db = getDB();
  const response = await db
    .collection("grades")
    .find({ [key]: value })
    .toArray();

  return response;
}

module.exports = {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  getGradesBy,
};
