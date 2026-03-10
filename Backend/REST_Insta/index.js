const express = require('express');
const app = express();
const path = require('path')
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2')
const methodOverride = require('method-override')
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'insta',
    password: 'Avneesh@k'
})

app.get('/posts', (req, res) => {
    let q = `SELECT * FROM users;`
    try {
        connection.query(q, (err, posts) => {
            if (err) throw err;
            res.render('index.ejs', { posts })
        })
    } catch (err) {
        console.log(err);
        res.send('Pagal ho gyi')
    }
})
//ADD new Post......
app.get('/posts/new', (req, res) => {
    res.render('new.ejs')
})
app.post('/posts', (req, res) => {
    let id = uuidv4();
    let { username, content, password } = req.body;
    let { img } = req.body
    let user = [username, img, id, content, password];
    console.log(user)
    let q = `INSERT INTO users(username,img,id,content,password) VALUES (?,?,?,?,?)`
    try {
        connection.query(q, user, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/posts')
        })
    } catch (err) {
        console.log(err);
        res.send('Pagal ho gyi')
    }
})
//Edit the user Profile

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM users WHERE id = "${id}";`
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render('edit.ejs', { user })
        })
    } catch (err) {
        console.log(err);
        res.send('pagal ho gyi')
    }
})
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { img: newImg, content: newContent, password: userpass } = req.body;
    let q = `SELECT * FROM users WHERE id = "${id}";`
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (user.password != userpass) {
                res.send("<h1>Wrong Password</h2>")
            } else {
                let q2 = `UPDATE users SET img = '${newImg}', content = '${newContent}' WHERE id = '${id}'`
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect('/posts');
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.send('pagal ho gyi')
    }
})
//Delete the profile
app.get('/posts/:id/delete', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM users WHERE id = '${id}'`
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render('delete.ejs', { user })
        })
    } catch (err) {
        console.log(err);
        res.send('ERROR')
    }
})
app.delete('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let {password : newpass} = req.body;
    let q = `SELECT * FROM users WHERE id = '${id}'`
    try {
        connection.query(q, (err, user) => {
            if (err) throw err;
            if(user.password != newpass){
                res.send("<h1>Wrong Password</h2>")
            }else{
                let q2 = `DELETE FROM users WHERE id = '${id}'`
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect('/posts');
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.send('ERROR')
    }
})
//Profile Viewer

app.get('/posts/:id/profile',(req,res)=>{
    let { id } = req.params;
    let q = `SELECT * FROM users WHERE id = "${id}";`
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render('profile.ejs', { user })
        })
    } catch (err) {
        console.log(err);
        res.send('pagal ho gyi')
    }
})
app.listen(port, () => {
    console.log(`App is working on PORT ${port}....`)
})