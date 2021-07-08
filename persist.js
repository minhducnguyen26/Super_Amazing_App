const mongoose = require("mongoose");

function connect(callback){
    let connectionString = `mongodb+srv://froggy:myCoolPassword@cluster0.cgzhh.mongodb.net/text-app?retryWrites=true&w=majority`

    console.log("Connecting to the database ...");

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch((err) => {
        console.log("There was an error in connecting to mongodb: ", err);
    })
    mongoose.connection.once('open', callback);
}

module.exports = connect;