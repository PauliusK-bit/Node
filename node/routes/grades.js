const express = require("express");
const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
} = require("../services/grades");

const router = express.Router();

router.get("/grades", async (req, res) => {
  const grades = await getGrades();

  const data = {
    newGradeButton: {
      url: "/create-grade",
      title: "New Grade",
    },
    grades,
  };

  res.render("grades", data);
});

router.get("/grades/:id", (req, res) => {
  const { id } = req.params;

  const grade = getGradeById(id);
  if (!grade) {
    res.render("grade", { grade, id });
  }

  res.render("grade", { grade, id });
});

router.get("/create-grade", (req, res) => {
  res.render("create-grade");
});

router.post("/grade-created", (req, res) => {
  const { body } = req;
  const createdGrade = createGrade(body);

  res.redirect(`/grades/${createdGrade.id}`);
});

router.get("/edit-grade/:id", (req, res) => {
  const { id } = req.params;

  const foundGrade = getGradeById(id);

  const { grade } = foundGrade;

  res.send(`
            <h1>Edit Grade </h1>
    
            <form action="/grade-edited" method="POST">
                <div >
                    <label for="grade">Grade:</label>
                    <input type="number" id="grade" name="grade" value="${grade}" />
                </div>   
                 <button type="submit">Edit</button>
                  <input type="hidden" name="id" value="${id}" />
            </form>
        `);
});

router.post("/grade-edited", (req, res) => {
  const { body } = req;
  const updatedGrade = updateGrade(body);

  res.redirect(`/grades/${updatedGrade.id}`);
});

router.post("/delete-grade", (req, res) => {
  const { gradeId } = req.body;

  deleteGrade(gradeId);

  res.redirect("/grades");
});

module.exports = router;
