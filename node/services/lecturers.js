const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getLecturers() {
  const db = getDB();

  return await db
    .collection("lecturers")
    .aggregate([
      {
        $lookup: {
          from: "subjects",
          localField: "subjects",
          foreignField: "_id",
          as: "subjectsData",
        },
      },
    ])
    .toArray();
}

async function getLecturerById(id) {
  const db = getDB();

  const lecturer = await db
    .collection("lecturers")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(id),
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjects",
          foreignField: "_id",
          as: "subjectData",
        },
      },
    ])
    .next();

  return lecturer;
}

async function createLecturer(body) {
  const db = getDB();
  const response = await db.collection("lecturers").insertOne(body);

  return response;
}

async function updateLecturer(data) {
  const db = getDB();
  const response = await db
    .collection("lecturers")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteLecturer(id) {
  const db = getDB();
  const response = await db
    .collection("lecturers")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

async function getLecturersBy(key, value) {
  const db = getDB();
  const response = await db
    .collection("lecturers")
    .find({ [key]: value })
    .toArray();

  return response;
}

module.exports = {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getLecturersBy,
};
