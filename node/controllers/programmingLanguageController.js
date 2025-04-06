const ProgrammingLanguage = require("../models/programmingLanguageModel");

async function createProgrammingLanguage(req, res) {
  try {
    const programmingLanguage = new ProgrammingLanguage(req.body);
    await programmingLanguage.save();
    res.send(programmingLanguage);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getProgrammingLanguages(req, res) {
  try {
    const programmingLanguages = await ProgrammingLanguage.find();
    res.send(programmingLanguages);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getProgrammingLanguageById(req, res) {
  try {
    const { id } = req.params;
    const programmingLanguage = await ProgrammingLanguage.findById(id);

    if (!programmingLanguage) {
      return res.status(404).send({ error: "ProgrammingLanguage Not found" });
    }

    res.send(programmingLanguage);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateProgrammingLanguage(req, res) {
  try {
    const { id } = req.params;

    const updatedProgrammingLanguage =
      await ProgrammingLanguage.findByIdAndUpdate(id, req.body, {
        new: true,
      });

    if (!updatedProgrammingLanguage) {
      return res.status(404).send({ error: "ProgrammingLanguage Not found" });
    }

    res.send(updatedProgrammingLanguage);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteProgrammingLanguage(req, res) {
  try {
    const { id } = req.params;

    const deletedProgrammingLanguage =
      await ProgrammingLanguage.findByIdAndDelete(id);

    if (!deletedProgrammingLanguage) {
      return res.status(404).send({ error: "ProgrammingLanguage Not found" });
    }

    res.send({
      message: "ProgrammingLanguage was removed",
      data: deletedProgrammingLanguage,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getProgrammingLanguages,
  getProgrammingLanguageById,
  createProgrammingLanguage,
  updateProgrammingLanguage,
  deleteProgrammingLanguage,
};
