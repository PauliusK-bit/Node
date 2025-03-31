const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getStudents() {
  const db = getDB();
  // return await db.collection("students").find().toArray();

  return await db
    .collection("students")
    .aggregate([
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $unwind: "$group",
      },
    ])
    .toArray();
}

async function getStudentById(id) {
  const db = getDB();
  // const student = await db
  //   .collection("students")
  //   .findOne({ _id: ObjectId.createFromHexString(id) });

  // return student;

  const student = await db
    .collection("students")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(id),
        },
      },
      {
        $lookup: {
          from: "groups",
          localField: "groupId",
          foreignField: "_id",
          as: "group",
        },
      },
      {
        $undwind: "$group",
      },
    ])
    .next();

  return student;
}

async function createStudent(body) {
  const db = getDB();
  const response = await db.collection("students").insertOne(body);

  return response;
}

async function updateStudent(data, id) {
  const db = getDB();
  const response = await db
    .collection("students")
    .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: data });

  return response;
}

async function deleteStudent(id) {
  const db = getDB();
  const response = await db
    .collection("students")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

async function getStudentsBy(key, value) {
  const db = getDB();
  const response = await db
    .collection("students")
    .find({ [key]: value })
    .toArray();

  return response;
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsBy,
};
