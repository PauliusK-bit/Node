const Assignment = require("../models/groupModel");

async function createAssignment(req, res) {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.send(assignment);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getAssignments(req, res) {
  try {
    const assignments = await Assignment.find();
    res.send(assignments);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getAssignmentById(req, res) {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).send({ error: "Assignment Not found" });
    }

    res.send(assignment);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateAssignment(req, res) {
  try {
    const { id } = req.params;

    const updatedAssignment = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAssignment) {
      return res.status(404).send({ error: "Assignment Not found" });
    }

    res.send(updatedAssignment);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteAssignment(req, res) {
  try {
    const { id } = req.params;

    const deletedAssignment = await Assignment.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).send({ error: "Assignment Not found" });
    }

    res.send({ message: "Assignment was removed", data: deletedAssignment });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
