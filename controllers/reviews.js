const Listing = require("../models/listing");
const Review = require("../models/review"); 

module.exports.createReview = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        console.log("New Review Saved");
        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${listing._id}`);
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
   
};

module.exports.deleteReview = async(req,res)=>{
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndUpdate(reviewId);
    req.flash("success", "New Listing Deleted!");
    res.redirect(`/listings/${id}`);
};