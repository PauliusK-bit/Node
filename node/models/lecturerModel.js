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
  },
  { timestamps: true }
);

const Lecturer = mongoose.model("Lecturer", lecturerSchema);

module.exports = Lecturer;
