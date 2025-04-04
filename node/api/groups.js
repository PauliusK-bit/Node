const express = require("express");
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  // getGroupsBy,
  getStudentsByGroup,
  getLecturersByGroup,
} = require("../services/groups");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getGroups();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getGroupById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const response = await createGroup(body);
    res.send({ ...response, body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateGroup({ ...body, id });
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteGroup(id);
    res.send({ message: "Data  was succsfully removed", id, response });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// router.get("/:key/:value", async (req, res) => {
//   const { key, value } = req.params;

//   try {
//     const data = await getGroupsBy(key, value);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

router.get("/:group/students", async (req, res) => {
  const { group } = req.params;

  try {
    const data = await getStudentsByGroup(group);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:group/lecturers", async (req, res) => {
  const { group } = req.params;

  try {
    const data = await getLecturersByGroup(group);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
