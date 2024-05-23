const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");
const Mongo_URL = "mongodb://127.0.0.1:27017/WanderLust"

main().then(() =>{
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err);
});

async function main(){
    await mongoose.connect( Mongo_URL );
}

const initDB = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("Data was intialize");
};

initDB();
