const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("List", listSchema);
