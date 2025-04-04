const Grade = require("../models/groupModel");

async function createGrade(req, res) {
  try {
    const grade = new Grade(req.body);
    await grade.save();
    res.send(grade);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getGrades(req, res) {
  try {
    const grades = await Grade.find();
    res.send(grades);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getGradeById(req, res) {
  try {
    const { id } = req.params;
    const grade = await Grade.findById(id);

    if (!grade) {
      return res.status(404).send({ error: "Grade Not found" });
    }

    res.send(grade);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateGrade(req, res) {
  try {
    const { id } = req.params;

    const updatedGrade = await Grade.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedGrade) {
      return res.status(404).send({ error: "Grade Not found" });
    }

    res.send(updatedGrade);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteGrade(req, res) {
  try {
    const { id } = req.params;

    const deletedGrade = await Grade.findByIdAndDelete(id);

    if (!deletedGrade) {
      return res.status(404).send({ error: "Grade Not found" });
    }

    res.send({ message: "Grade was removed", data: deletedGrade });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};
