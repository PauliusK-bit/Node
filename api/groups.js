const express = require("express");

const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../services/groups");

const router = express.Router();

router.get("/", (req, res, next) => {
  const groups = getGroups();
  res.send(groups);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const group = getGroupById(id);

  res.send(group);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdGroup = createGroup(body);

  res.send(createdGroup);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedGroup = updateGroup({ ...body, id });

  res.send(updatedGroup);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteGroup(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
