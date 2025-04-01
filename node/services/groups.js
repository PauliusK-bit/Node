const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getGroups() {
  const db = getDB();

  return await db
    .collection("groups")
    .aggregate([
      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "studentsData",
        },
      },
    ])
    .toArray();
}

async function getGroupById(id) {
  const db = getDB();
  const group = await db
    .collection("groups")
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(id),
        },
      },

      {
        $lookup: {
          from: "students",
          localField: "students",
          foreignField: "_id",
          as: "studentData",
        },
      },
    ])
    .next();

  return group;
}

async function createGroup(body) {
  const db = getDB();
  const response = await db.collection("groups").insertOne(body);

  return response;
}

async function updateGroup(data) {
  const db = getDB();
  const response = await db
    .collection("groups")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteGroup(id) {
  const db = getDB();
  const response = await db
    .collection("groups")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

async function getGroupsBy(key, value) {
  const db = getDB();
  const response = await db
    .collection("groups")
    .find({ [key]: value })
    .toArray();

  return response;
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  getGroupsBy,
};
