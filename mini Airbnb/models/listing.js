const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    tital: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        set: (v) => v === "" ? v = "https://i.pinimg.com/736x/37/a1/c7/37a1c752b36fe1bb122a3e555595ec30.jpg" : v
    },
    price: Number,
    location: String,
    country: String,
})

const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing;