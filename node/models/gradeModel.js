const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      unique: true,
    },
    groups: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Group",
    },
  },
  { timestamps: true }
);

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
