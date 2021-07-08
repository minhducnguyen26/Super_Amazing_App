const express = require("express");
const app = express();

app.use(express.json({}));

const {Text} = require("./model");

const cors = require("cors");
app.use(cors());

//! Middleware
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

//! GET - get all text messages
app.get("/text", function(req, res){
    res.setHeader("Content-Type", "application/json");
    Text.find({},(err, texts)=>{
        if (err){
            res.status(500).json({
                message: "unable to get all text messages",
                error: err
            })
            return
        }
        res.status(200).json(texts);
    })
})

//! POST - create one new text message
app.post("/text", function(req, res){
    res.setHeader("Content-Type", "application/json");
    console.log(`Creating text message with body`, req.body)

    let newText = {
        author: req.body.author || "",
        text  : req.body.text || "",
    }
    Text.create(newText, (err, text) => {
        if(err){
            res.status(500).json({
                error: err,
                message: "Could not create a new text message",
            })
            return;
        }
        res.status(201).json(text);
    })
})

//! DELETE - delete one text message by id (for database clean up purpose)
app.delete("/text/:id", function(req, res) {
    res.setHeader("Content-Type", "application/json")

    console.log(`Deleting one text message with id: ${req.params.id}.`);
    
    Text.findByIdAndDelete(req.params.id, function(error, thread) {
       // check if there was an error
       if(error) {
        console.log(`There was an error deleting a text message with id ${req.params.id}`);
        console.log(error);

        // sending back the error
        res.status(500).json({
            message: `Unable to find a text message with id: ${req.params.id}`,
            error  : error
        });
        return
        } 
        // check if the text message actually exists
        else if(thread === null) {
            console.log(`There was an error finding a text message with id ${req.params.id}`);
            console.log(error);

            // sending back the error
            res.status(404).json({
                message: `Unable to find text message with id: ${req.params.id}`,
                error  : error
            });
            return
        }
        // success! return text message that was deleted
        res.status(200).json(thread)
    }) 
})

module.exports = app;