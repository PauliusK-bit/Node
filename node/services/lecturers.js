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

// async function getLecturersBy(key, value) {
//   const db = getDB();
//   const response = await db
//     .collection("lecturers")
//     .find({ [key]: value })
//     .toArray();

//   return response;
// }

async function getLecturerGroups(lecturerId) {
  const db = getDB();
  const lecturerWithGroups = await db
    .collection("lecturers")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(lecturerId),
        },
      },
      {
        $lookup: {
          from: "groups",
          localField: "groups",
          foreignField: "_id",
          as: "groupsData",
        },
      },
    ])
    .next();

  return lecturerWithGroups ? lecturerWithGroups.groupsData : [];
}

async function getLecturerStudents(lecturerId) {
  const db = getDB();

  const lecturer = await db
    .collection("lecturers")
    .findOne({ _id: ObjectId.createFromHexString(lecturerId) });

  const students = await db
    .collection("students")
    .find({ _id: { $in: lecturer.students } })
    .toArray();

  return students;
}

async function getLecturerSubjects(lecturerId) {
  const db = getDB();

  const lecturer = await db
    .collection("lecturers")
    .findOne({ _id: ObjectId.createFromHexString(lecturerId) });

  const subjects = await db
    .collection("subjects")
    .find({ _id: { $in: lecturer.subjects } })
    .toArray();

  return subjects;
}

module.exports = {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
  // getLecturersBy,
  getLecturerGroups,
  getLecturerStudents,
  getLecturerSubjects,
};
