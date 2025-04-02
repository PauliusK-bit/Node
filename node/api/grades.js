const express = require("express");

const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  // getGradesBy,
  getGradesByYear,
  getGradesByYearAndMonth,
  getGradesBySubject,
  getGradesByGroup,
} = require("../services/grades");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getGrades();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getGradeById(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const response = await createGrade(body);
    res.send({ ...response, body });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const response = await updateGrade({ ...body, id });
    res.send({ response, body: { ...body, id } });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  deleteGrade(id);
  res.send({ message: "Data was successfully removed", id });
});

// router.get("/:key/:value", async (req, res) => {
//   const { key, value } = req.params;
//   try {
//     const data = await getGradesBy(key, value);
//     res.send(data);
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

router.get("/date/:year", async (req, res) => {
  const { year } = req.params;

  try {
    const data = await getGradesByYear(parseInt(year));
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/date/:year/:month", async (req, res) => {
  const { year, month } = req.params;
  try {
    const data = await getGradesByYearAndMonth(parseInt(year), month);
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.get("/subject/:subject", async (req, res) => {
  const { subject } = req.params;

  try {
    const data = await getGradesBySubject(subject);
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.get("/group/:group", async (req, res) => {
  const { group } = req.params;
  try {
    const grades = await getGradesByGroup(group);
    res.send(grades);
  } catch (error) {
    res.status(500).send({ error: "Unable to fetch grades for the group" });
  }
});

module.exports = router;
