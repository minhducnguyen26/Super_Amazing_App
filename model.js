const mongoose = require("mongoose");

const textSchema = mongoose.Schema({
    author: String,
    text: String,
},
{
    timestamps: true
});

const Text = mongoose.model("Text", textSchema)

module.exports = {
    Text,
};