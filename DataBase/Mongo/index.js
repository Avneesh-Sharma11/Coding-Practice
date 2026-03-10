const mongoose = require('mongoose')
main().then(() => console.log('Connection Successfull'))
    .catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
const User = mongoose.model("User", userSchema);
// const user1 = new User({
//     name: "Avneesh",
//     email: "Hello@gmail.com",
//     age: 20
// })

// user1.save().then(res => console.log(res)).catch(err => console.log(err));

// User.insertMany([
//     {name:'Hello',email:'hlo@gmail.com',age:40},
//     {name:'Hello1',email:'hlo1@gmail.com',age:45},
//     {name:'Hello2',email:'hlo2@gmail.com',age:43},
// ]).then(res=> console.log(res)).catch(err=> console.log(err))

// User.findById('698467360d26b9fa38724c07')
// .then(res=> console.log(res)).catch(err=> console.log(err))

// User.updateOne({ age: { $gt: 40 } }, { age: 40 })
//     .then(res => console.log(res)).catch(err => console.log(err))

// User.findOneAndUpdate({name : 'Hello2'},{age:19},{new:true})
// .then(res=> console.log(res)).catch(err=> console.log(err))

// User.findByIdAndUpdate("69841f8d02f3ab8fb97d71b8",{age:18},{new:true})
// .then(res=> console.log(res)).catch(err=> console.log(err))

// User.deleteOne({name : 'Hello'})
// .then(res=> console.log(res)).catch(err=> console.log(err))

// User.findOneAndDelete({name : 'Hello2'},{new:true})
// .then(res=> console.log(res)).catch(err=> console.log(err))