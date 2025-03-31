const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getSubjects() {
  const db = getDB();

  return await db
    .collection("subjects")
    .aggregate([
      {
        $lookup: {
          from: "lecturers",
          localField: "lecturers",
          foreignField: "_id",
          as: "lecturersData",
        },
      },
    ])
    .toArray();
}

async function getSubjectById(id) {
  const db = getDB();
  const subject = await db
    .collection("subjects")

    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(id),
        },
      },
      {
        $lookup: {
          from: "lecturers",
          localField: "lecturers",
          foreignField: "_id",
          as: "lecturerData",
        },
      },
    ])
    .next();
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

async function getSubjectsBy(key, value) {
  const db = getDB();
  const response = await db
    .collection("subjects")
    .find({ [key]: value })
    .toArray();

  return response;
}

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsBy,
};
