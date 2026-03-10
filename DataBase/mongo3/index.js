const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Chat = require('./models/chat.js')
const Myerror = require('./MyError.js')
const methodOverride = require('method-override')
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
main()
    .then(res => console.log('Connection Successfull')).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats })
})
app.get('/chats/new', (req, res) => {
    res.render('new.ejs')
})
app.post('/chats', (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save()
        .then(res => console.log('Saved')).catch(err => console.log(err))
    res.redirect('/chats')
})

app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat })
})
app.get('/chats/:id', async (req, res,next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new Myerror(404, 'Chat not faound'))
    }
    res.render('edit.ejs', { chat })
})
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { new: true })
    // console.log(updateChat)
    res.redirect('/chats')
})

app.get('/chats/:id/delete', async (req, res) => {
    let { id } = req.params;
    let del = await Chat.findByIdAndDelete(id);
    console.log(del)
    res.redirect('/chats')
})
app.get('/', (req, res) => {
    res.send('Working')
})
app.use((err, req, res, next) => {
    let { status = 500, message } = err;
    res.status(status).send(message)
})
app.listen(8080, () => {
    console.log('Server is running at PORT 8080..')
})