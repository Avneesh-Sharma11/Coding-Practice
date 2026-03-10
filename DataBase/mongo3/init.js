const mongoose = require('mongoose')
const Chat = require('./models/chat.js')

main()
    .then(res => console.log('Connection Successfull')).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: 'Rahul',
        to: 'Sumit',
        msg: 'Send me exam notes....',
        created_at: new Date()
    },
    {
        from: 'Avi',
        to: 'shiv',
        msg: 'Send me exam datesheet....',
        created_at: new Date()
    },
    {
        from: 'Ram',
        to: 'Shyam',
        msg: 'kal kaun sa paper hai.',
        created_at: new Date()
    },
]

Chat.insertMany(allChats)
    .then(res => console.log(res)).catch(err => console.log(err))