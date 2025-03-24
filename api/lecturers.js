const express = require("express");

const {
  getLecturers,
  getLecturerById,
  createLecturer,
  updateLecturer,
  deleteLecturer,
} = require("../services/lecturers");

const router = express.Router();

router.get("/", (req, res, next) => {
  const lecturers = getLecturers();
  res.send(lecturers);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const lecturer = getLecturerById(id);

  res.send(lecturer);
});

router.post("/", (req, res, next) => {
  const { body } = req;
  const createdLecturer = createLecturer(body);

  res.send(createdLecturer);
});

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const updatedLecturer = updateLecturer({ ...body, id });

  res.send(updatedLecturer);
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  deleteLecturer(id);
  res.send({ message: "Data was successfully removed", id });
});

module.exports = router;
