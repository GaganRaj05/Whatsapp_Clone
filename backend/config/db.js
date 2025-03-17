const mongoose = require('mongoose');

async function connectToDb(url)  {
    try {
        await mongoose.connect(url)
        console.log("Mongodb connection successfull")
    }
    catch(err) {
        console.log(err.message);
        console.log("Some error occured connecting to the db");
    }
}
module.exports = connectToDb;