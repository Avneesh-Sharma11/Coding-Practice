const express = require('express')
const app = express()
const port = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/register',(req,res)=>{
    let {username} = req.query
    res.send(`Standard GET request for ${username}`)
})
app.post('/register',(req,res)=>{
    let {username,password} = req.body
    res.send(`Standard POST request for ${username}`)
})
app.listen(port,()=>{
    console.log(`App is Listening At port ${port}`)
})