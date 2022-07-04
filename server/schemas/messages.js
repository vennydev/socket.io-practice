const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema({
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
  
});

module.exports = mongoose.model(`msg`, msgSchema);
