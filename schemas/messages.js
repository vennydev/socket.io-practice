const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
  // _id: String,
  msg: [
    {
      room: {
        type: String,
      },
      author: {
        type: String,
      },
      message: {
        type: String,
      },
      time: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model(`msg`, msgSchema);
