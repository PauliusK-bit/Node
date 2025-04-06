const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    interests: [String],
    groups: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Group",
    },
    lecturers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lecturer",
    },
    subjects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subject",
    },
    grades: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Grade",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
