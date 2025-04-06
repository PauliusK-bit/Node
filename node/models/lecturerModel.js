const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    groups: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Group",
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Student",
    },
    subjects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Subject",
    },
  },
  { timestamps: true }
);

const Lecturer = mongoose.model("Lecturer", lecturerSchema);

module.exports = Lecturer;
