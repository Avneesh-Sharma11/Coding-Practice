const data = require('./data.js')
const listing = require('../models/listing.js')
const mongoose = require('mongoose')

main()
    .then(res => console.log('Connection Successfull...')).catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
}

const init = async()=>{
    await listing.deleteMany({})
    await listing.insertMany(data);
}
init();