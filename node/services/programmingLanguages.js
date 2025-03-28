const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

async function getProgrammingLanguages() {
  const db = getDB();
  return await db.collection("programmingLanguages").find().toArray();
}

async function getProgrammingLanguageById(id) {
  const db = getDB();
  const programmingLanguage = await db
    .collection("students")
    .findOne({ _id: ObjectId.createFromHexString(id) });

  return programmingLanguage;
}

async function createProgrammingLanguage(body) {
  const db = getDB();
  const response = await db.collection("programmingLanguages").insertOne(body);

  return response;
}

async function updateProgrammingLanguage(data) {
  const db = getDB();
  const response = await db
    .collection("programmingLanguages")
    .updateOne({ _id: ObjectId.createFromHexString(data.id) }, { $set: data });

  return response;
}

async function deleteProgrammingLanguage(id) {
  const db = getDB();
  const response = await db
    .collection("programmingLanguages")
    .deleteOne({ _id: ObjectId.createFromHexString(id) });
  return response;
}

module.exports = {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
};
