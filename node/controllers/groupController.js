const Group = require("../models/groupModel");

async function createGroup(req, res) {
  try {
    const group = new Group(req.body);
    await group.save();
    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getGroups(req, res) {
  try {
    const groups = await Group.find();
    res.send(groups);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getGroupById(req, res) {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).send({ error: "Group Not found" });
    }

    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function updateGroup(req, res) {
  try {
    const { id } = req.params;

    const updatedGroup = await Group.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedGroup) {
      return res.status(404).send({ error: "Group Not found" });
    }

    res.send(updatedGroup);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function deleteGroup(req, res) {
  try {
    const { id } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).send({ error: "Group Not found" });
    }

    res.send({ message: "Group was removed", data: deletedGroup });
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getStudentsByGroup(req, res) {
  const { group } = req.params;

  try {
    const groups = await Group.findById(group).populate("students");
    res.send(groups.students);
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getLecturersByGroup(req, res) {
  const { group } = req.params;

  try {
    const groups = await Group.findById(group).populate("lecturers");
    res.send(groups.lecturers);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  getStudentsByGroup,
  getLecturersByGroup,
};
