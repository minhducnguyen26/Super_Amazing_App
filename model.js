const mongoose = require("mongoose");

const textSchema = mongoose.Schema({
    author: String,
    text: String,
},
{
    timestamps: true
});

module.exports = {
    textSchema,
};