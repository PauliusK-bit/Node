const express = require("express");
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../services/groups");

const router = express.Router();

router.get("/groups", (req, res, next) => {
  const groups = getGroups();

  const data = {
    newGroupButton: {
      url: "/create-group",
      title: "New Group",
    },
    groups,
  };

  res.render("groups", data);
});

router.get("/groups/:id", (req, res, next) => {
  const { id } = req.params;

  const group = getGroupById(id);

  res.render("group", { group, id });
});

router.get("/create-group", (req, res, next) => {
  res.render("create-group");
});

router.post("/group-created", (req, res, next) => {
  const { body } = req;
  const createdGroup = createGroup(body);

  res.redirect(`/groups/${createdGroup.id}`);
});

router.get("/edit-group/:id", (req, res, next) => {
  const { id } = req.params;

  const foundGroup = getGroupById(id);

  const { name } = foundGroup;

  res.send(`
          <h1>Edit Group </h1>
  
          <form action="/group-edited" method="POST">
              <div >
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name" value="${name}" />
              </div>   
          </form>
      `);
});

router.post("/group-edited", (req, res, next) => {
  const { body } = req;
  const updatedGroup = updateGroup(body);

  res.redirect(`/groups/${updatedGroup.id}`);
});

router.post("/delete-group", (req, res, next) => {
  const { groupId } = req.body;

  deleteGroup(groupId);

  res.redirect("/groups");
});

module.exports = router;
