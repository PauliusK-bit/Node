const express = require("express");
const {
  getAssignments,
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require("../services/assignments");

const router = express.Router();

router.get("/assignments", (req, res, next) => {
  const assignments = getAssignments();

  const data = {
    newAssignmentButton: {
      url: "/create-assignment",
      title: "New Assignment",
    },
    assignments,
  };

  res.render("assignments", data);
});

router.get("/assignments/:id", (req, res, next) => {
  const { id } = req.params;

  const assignment = getAssignmentById(id);

  res.render("assignment", { assignment, id });
});

router.get("/create-assignment", (req, res, next) => {
  res.render("create-assignment");
});

router.post("/assignment-created", (req, res, next) => {
  const { body } = req;
  const createdAssignment = createAssignment(body);

  res.redirect(`/assignments/${createdAssignment.id}`);
});

router.get("/edit-assignment/:id", (req, res, next) => {
  const { id } = req.params;

  const foundAssignment = getAssignmentById(id);

  const { name, date, description } = foundAssignment;

  res.send(`
            <h1>Edit Assignment</h1>
    
            <form action="/assignment-edited" method="POST">
                <div >
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" value="${name}" />
                </div>
                <div >
                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" value="${date}" />
                </div>
                <div >
                    <label for="description">Description:</label>
                    <input type="description" id="description" name="description" value="${description}" />
                </div>
                
    
                <button type="submit">Edit</button>
    
                <input type="hidden" name="id" value="${id}" />
            </form>
        `);
});

router.post("/assignment-edited", (req, res, next) => {
  const { body } = req;
  const updatedAssignment = updateAssignment(body);

  res.redirect(`/assignments/${updatedAssignment.id}`);
});

router.post("/delete-assignment", (req, res, next) => {
  const { assignmentId } = req.body;

  deleteAssignment(assignmentId);

  res.redirect("/assignments");
});

module.exports = router;
