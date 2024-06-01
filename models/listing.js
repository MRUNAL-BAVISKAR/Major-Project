const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {type: String,
    required: true,},
    description: String,
    image:{type:String, 
        default:
            "https://unsplash.com/photos/a-silhouette-of-a-person-standing-on-top-of-a-mountain-vMNncHewgII",
        set: (v) => v === ""
         ? "https://unsplash.com/photos/a-silhouette-of-a-person-standing-on-top-of-a-mountain-vMNncHewgII" : v,
    }, 
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
    }]
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
