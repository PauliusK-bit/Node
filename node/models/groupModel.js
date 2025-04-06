const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    students: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Student",
    },
    lecturers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Lecturer",
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
