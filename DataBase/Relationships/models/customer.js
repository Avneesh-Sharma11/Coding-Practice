const mongoose = require('mongoose');

main()
    .then(() => console.log('Connection Successful')) // agar connect ho gaya
    .catch(err => console.log(err)); // agar error aaya

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// -------------------- ORDER SCHEMA --------------------

// (structure of Order document)
const orderSchema = new mongoose.Schema({
    item: String,  
    price: Number  
})

// -------------------- CUSTOMER SCHEMA --------------------

// Customer ka schema define kar rahe hain
const customerSchema = new mongoose.Schema({
    name : String, 

    // orders ek array hai jisme multiple orders store honge
    orders :[
        {
            type : mongoose.Schema.Types.ObjectId, // yeh ID store karega
            ref : 'Order' // yeh batata hai ki yeh ID Order collection se linked hai
        }
    ]
})

// -------------------- MODELS --------------------

// schema ko model me convert kar rahe hain (collection create hota hai)
const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer',customerSchema);

// -------------------- ADD CUSTOMER FUNCTION --------------------

// naya customer add karne ka function
const addCustomer = async ()=>{

    // new customer object create kiya
    let cust1 = new Customer({
        name : 'Avneesh',
    })

    // DB se ek order fetch kar rahe hain (Samosa)
    let order1 = await Order.findOne({item : 'Samosa'});

    // DB se ek aur order fetch kar rahe hain (Chips)
    let order2 = await Order.findOne({item : 'Chips'});

    // orders array me order1 ki ObjectId push kar rahe hain
    cust1.orders.push(order1);

    // orders array me order2 ki ObjectId push kar rahe hain
    cust1.orders.push(order2);
    
    // customer ko DB me save kar rahe hain
    let res = await cust1.save();

    // result print kar rahe hain
    console.log(res);
}
 // isko run karoge to customer insert hoga
// addCustomer() 

// -------------------- FIND + POPULATE --------------------

// data fetch karne ka function
const find = async ()=>{

    // sabhi customers ko fetch kar rahe hain
    // populate('orders') ka matlab:
    // orders me jo ObjectId hai uski jagah full Order document laao
    let res = await Customer.find({}).populate('orders');

    // first customer print kar rahe hain
    console.log(res[0]);

}

// function call
find();

// -------------------- ADD ORDERS FUNCTION --------------------

// multiple orders ek saath insert karne ka function
// const addOrder = async () => {
//     let res = await Order.insertMany([
//         { item: 'Samosa', price: 50 },
//         { item: 'Chips', price: 20 },
//         { item: 'momo', price: 30 },
//     ])
//     console.log(res)
// }
// addOrder()