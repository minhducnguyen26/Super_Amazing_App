const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    author: String,
    text: String,
},
{
    timestamps: true
});

module.exports = {
    Thread,
};