const express = require("express");
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../services/assignments");

const router = express.Router();

router.get("/assignments", async (req, res) => {
  const assignments = await getAssignments();

  const data = {
    newAssignmentButton: {
      url: "/create-assignment",
      title: "New Assignment",
    },
    assignments,
  };

  res.render("assignments", data);
});

router.get("/assignments/:id", (req, res) => {
  const { id } = req.params;

  const assignment = getAssignmentById(id);

  res.render("assignment", { assignment, id });
});

router.get("/create-assignment", (req, res) => {
  res.render("create-assignment");
});

router.post("/assignment-created", (req, res) => {
  const { body } = req;
  const createdAssignment = createAssignment(body);

  res.redirect(`/assignments/${createdAssignment.id}`);
});

router.get("/edit-assignment/:id", (req, res) => {
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

router.post("/assignment-edited", (req, res) => {
  const { body } = req;
  const updatedAssignment = updateAssignment(body);

  res.redirect(`/assignments/${updatedAssignment.id}`);
});

router.post("/delete-assignment", (req, res) => {
  const { assignmentId } = req.body;

  deleteAssignment(assignmentId);

  res.redirect("/assignments");
});

module.exports = router;
