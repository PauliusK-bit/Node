const Subject = require("../models/subjectModel");

async function createSubject(req, res) {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.send(subject);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getSubjects(req, res) {
  try {
    const subjects = await Subject.find();
    res.send(subjects);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getSubjectById(req, res) {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).send({ error: "Subject Not found" });
    }

    res.send(subject);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateSubject(req, res) {
  try {
    const { id } = req.params;

    const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedSubject) {
      return res.status(404).send({ error: "Subject Not found" });
    }

    res.send(updatedSubject);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteSubject(req, res) {
  try {
    const { id } = req.params;

    const deleteSubject = await Subject.findByIdAndDelete(id);

    if (!deleteSubject) {
      return res.status(404).send({ error: "Subject Not found" });
    }

    res.send({ message: "Subject was removed", data: deleteSubject });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
