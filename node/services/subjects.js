const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getSubjects() {
  const db = getDB();
  return await db.collection("subjects").find().toArray();
}

async function getSubjectById(id) {
  const db = getDB();
  const subject = await db
    .collection("subjects")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  return subject;
}

async function createSubject(body) {
  const db = getDB();
  const response = await db.collection("subjects").insertOne(body);

  return response;
}

async function updateSubject(data) {
  const db = getDB();
  const response = await db
    .collection("subjects")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteSubject(id) {
  const db = getDB();
  const response = await db
    .collection("subjects")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
