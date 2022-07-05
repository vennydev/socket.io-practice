const mongoose = require("mongoose");
const connect = () => {
    mongoose.connect("mongodb+srv://test:sparta@cluster0.7o347.mongodb.net/?retryWrites=true&w=majority/chat_save", { ignoreUndefined: true })
    .catch((err) => {
        console.error(err);
    });
};

module.exports = connect;