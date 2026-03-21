const mongoose = require('mongoose');

// -------------------- DB CONNECTION --------------------
main()
    .then(() => console.log('Connection Successful')) 
    .catch(err => console.log(err)); 

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

// -------------------- ORDER SCHEMA --------------------
// Order = ek alag collection (table jaisa)
const orderSchema = new mongoose.Schema({
    item: String,
    price: Number
})

// -------------------- CUSTOMER SCHEMA --------------------
// Customer ke andar orders ka reference store ho raha hai (relation)
const customerSchema = new mongoose.Schema({
    name: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId, // foreign key (Order ka _id)
            ref: 'Order' // populate ke liye batata hai kis collection se data aayega
        }
    ]
})

// -------------------- MIDDLEWARE --------------------
// Jab customer delete hoga, uske related orders bhi delete ho jayenge
customerSchema.post('findOneAndDelete', async (cust) => {
    console.log('Post Middleware Triggered');

    if (cust.orders.length) {
        let res = await Order.deleteMany({ _id: { $in: cust.orders } });
        console.log(res);
    }
})

// -------------------- MODELS --------------------
// Models = collections (MongoDB me tables jaisa)
const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

// -------------------- ADD CUSTOMER --------------------
const addCustomer = async () => {
    let cust1 = new Customer({ name: 'Avneesh' });

    let order1 = await Order.findOne({ item: 'Samosa' });
    let order2 = await Order.findOne({ item: 'Chips' });

    cust1.orders.push(order1); // ObjectId store hoga
    cust1.orders.push(order2);

    let res = await cust1.save();
    console.log(res);
}
// addCustomer();

// -------------------- FIND + POPULATE --------------------
// populate = ObjectId ko actual document me convert karta hai
const find = async () => {
    let res = await Customer.find({}).populate('orders');
    console.log(res[0]);
}
// find();

// -------------------- ADD ONE CUSTOMER --------------------
const addOne = async () => {
    let newcust = new Customer({ name: 'Arpit' });
    let order1 = await Order.findOne({ item: 'pizza' });

    newcust.orders.push(order1);
    await newcust.save();
}
// addOne();

// -------------------- DELETE CUSTOMER --------------------
// delete ke baad middleware chalega (cascade delete jaisa behavior)
const remove = async () => {
    let del = await Customer.findByIdAndDelete('69be2a7ee2350df533fb7ce3');
    console.log(del);
}

// remove();