const { v4: uuid } = require("uuid");

const path = require("path");
const fs = require("fs");

function getProgrammingLanguages() {
  const filePath = path.join("db", "programmingLanguages.json");
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const data = JSON.parse(fileContent);

  return data;
}

function getProgrammingLanguageById(id) {
  const filePath = path.join("db", "programmingLanguages.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  const fileContent = fs.readFileSync(filePath);

  const programmingLanguages = JSON.parse(fileContent);

  const foundProgrammingLanguage = programmingLanguages.find(
    (language) => language.id === id
  );

  return foundProgrammingLanguage;
}

function createProgrammingLanguage(body) {
  const id = uuid();

  const newProgrammingLanguage = {
    ...body,
    id,
  };

  const programmingLanguages = getProgrammingLanguages();

  programmingLanguages.push(newProgrammingLanguage);

  const stringifiedData = JSON.stringify(programmingLanguages, null, 2);

  const filePath = path.join("db", "programmingLanguages.json");
  fs.writeFileSync(filePath, stringifiedData);

  return newProgrammingLanguage;
}

function updateProgrammingLanguage(data) {
  const { id } = data;

  const programmingLanguages = getProgrammingLanguages();

  const updatedProgrammingLanguages = programmingLanguages.map((language) => {
    if (language.id === id) {
      const updatedProgrammingLanguage = {
        ...data,
      };

      return updatedProgrammingLanguage;
    } else {
      return programmingLanguages;
    }
  });

  const stringifiedData = JSON.stringify(updatedProgrammingLanguages, null, 2);

  const filePath = path.join("db", "programmingLanguages.json");
  fs.writeFileSync(filePath, stringifiedData);

  return data;
}

function deleteProgrammingLanguage(id) {
  const programmingLanguages = getProgrammingLanguages();
  const updatedProgrammingLanguages = programmingLanguages.filter(
    (language) => language.id !== id
  );

  const stringifiedData = JSON.stringify(updatedProgrammingLanguages, null, 2);
  const filePath = path.join("db", "programmingLanguages.json");
  fs.writeFileSync(filePath, stringifiedData);
}

module.exports = {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
};
