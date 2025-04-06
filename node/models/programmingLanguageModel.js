const mongoose = require("mongoose");

const programmingLanguageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const programmingLanguage = mongoose.model(
  "programmingLanguage",
  programmingLanguageSchema
);

module.exports = programmingLanguage;
