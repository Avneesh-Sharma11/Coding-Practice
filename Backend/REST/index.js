const express = require('express')
const app = express()
const port = 8080
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override')

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.set(express.static(path.join(__dirname, 'public')))

let posts = [
    {
        id: uuidv4(),
        username: 'avneesh',
        content: 'Learning MERN stack'
    },
    {
        id: uuidv4(),
        username: 'kashish',
        content: 'Learning javaScript stack'
    },
    {
        id: uuidv4(),
        username: 'puja',
        content: 'SSC Student'
    },
]

app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts })
})
app.get('/posts/new', (req, res) => {
    res.render('new.ejs')
})
app.post('/posts', (req, res) => {
    const id = uuidv4();
    let { username, content } = req.body;
    posts.push({ id, username, content });
    // console.log(req.body)
    // res.send(`<h2>New Post Added for @${username}</h2>`)
    res.redirect('/posts')
})
app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    // console.log(id)
    let post = posts.find((p) => id === p.id)
    // console.log(post)
    res.render('show.ejs', { post })
})

app.patch('/posts/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id)
    post.content = newContent;
    console.log(post)
    res.redirect('/posts')
})
app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id)
    res.render('edit.ejs',{post})
})
app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id !== id)
    res.redirect('/posts')
})


app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
})