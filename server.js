const express = require("express");
const app = express();

app.use(express.json({}));

const {Text} = require("./model")

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
    console.log("");
    console.log("===============================================================================================")

    // Date and Time format
    let date    = new Date().toLocaleDateString("en-US") + " at ";
    let hours   = new Date().getHours().toString() + ":";
    let minutes = new Date().getMinutes().toString() + ":";
    let seconds = new Date().getSeconds().toString();
    let time    = date + hours + minutes + seconds;
    console.log("Time  :", time);

    console.log("Method:", req.method);
    console.log("Path  :", req.originalUrl);
    console.log("Body  :", req.body);
    console.log("");
    next();
})

app.get("/", function(req, res){
    console.log("get request hits");
})
















app.post("/text", function(req, res){
    res.setHeader("Content-Type", "application/json");
    console.log(`creating text with body`, req.body)

    let newText = {
        author: req.body.author || "",
        text: req.body.text || "",
    }
    Text.create(newText, (err, text) => {
        if(err){
            res.status(500).json({
                error: err,
                message: "could not make thread",
            })
            return;
        }
        res.status(201).json(text);
    })
})


module.exports = app;