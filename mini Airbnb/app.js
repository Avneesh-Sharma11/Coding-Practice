const express = require('express')
const mongoose = require('mongoose')
const Listing = require('./models/listing.js')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))

main()
    .then(res => console.log('Connection Successfull...')).catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
}

// app.get('/testListing', (req, res) => {
//     let sample = new Listing({
//     tital:"Mai hu Chutiya..",
//     description: "Dhoom machale chutiya",
//     price: 3,
//     location: "CCCC",
//     country: "cnjdfbadjf",
//     })
//     sample.save();
//     res.send('success') 
// })

app.get('/', (req, res) => {
    res.render('listings/home.ejs')
})

app.get('/listings', async (req, res) => {
    let AllListings = await Listing.find({});
    res.render('listings/index.ejs', { AllListings })
})
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
})
app.post('/listings', (req, res) => {
    const NewList = new Listing(req.body.list)
    NewList.save();
    res.redirect("/listings")
})
app.get('/listings/:id', async (req, res) => {

    let { id } = req.params;
    let user = await Listing.findById(id)
    // console.log(user);
    res.render('listings/show.ejs', { user })
})
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
})

app.get('/listings/:id/edit', async (req, res, next) => {
    try {
        let { id } = req.params;
        let user = await Listing.findById(id);
        res.render('listings/edit.ejs', { user });
    } catch (err) {
        next(err)
    }

})
app.put('/listings/:id', async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body);
    res.redirect('/listings');
})

app.use((err, res, req, next) => {
    res.("Some Error Occured..")
})
app.listen(8080, () => {
    console.log('Server is running at port 8080...')
})
