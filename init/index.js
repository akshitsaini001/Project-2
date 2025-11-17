const initdata = require("./data.js");
const mongoose = require("mongoose");
const contentListing = require("../models/post.js");


main()
    .then(()=>{
        console.log("Connected to Database.")
    }).catch(err => console.log(err));
        async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/majeKeBaat');
    }

const initDB = async() => {
    await contentListing.deleteMany({});
    await contentListing.insertMany(initdata.data);
    console.log("Data Saved successfully")
}    

initDB();