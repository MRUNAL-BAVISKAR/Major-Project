const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Mongo_URL = "mongodb://127.0.0.1:27017/WanderLust";

main().then(() =>{
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err);
});


async function main(){
    await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req,res)=>{
    res.send("Hi, I am Root");
});
// Index Route
app.get("/listings", async(req, res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
    });


//Show Route 
   app.get("/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show", { listing });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

//Create Route 
app.post("/listings", async(req,res)=>{
    const newListing =  new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
   });


//Edit Route
app.get("/listings/:id/edit",async (req, res) =>{
    let {id} = req.params;
const listing = await Listing.findById(id);
res.render("listings/edit.ejs", {listing});
});

//Update Route
app.put("/listings/:id", async(req,res) =>{
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});


//Delete Route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
})

app.listen(8080, () => {
console.log("Server is here");
});