const Student = require("../models/studentModel");

const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).send({ error: "User Not found" });
    }

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).send({ error: "User Not found" });
    }

    res.send(updatedStudent);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).send({ error: "User Not found" });
    }

    res.send({ message: "Student was removed", data: deletedStudent });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
