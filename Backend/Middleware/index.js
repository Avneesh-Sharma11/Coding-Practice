const express = require('express')
const app = express();
const MyError = require("./ExpressError")
// app.use((req,res,next)=>{
//     // res.send('middleware finished')
//     console.log('helooooo')
//     next();
// })
// app.use((req,res,next)=>{
//     // res.send('middleware finished')
//     console.log('helooooo2')
//     next();
// })
// app.use((req,res,next)=>{
//     req.time = new Date(Date.now())
//     console.log(req.hostname,req.method,req.time);
//     next();
// })
// app.get('/',(req,res)=>{
//     res.send('Hi I am root');
// })
// app.get('/random',(req,res)=>{
//     res.send('this is random page');
// })
function checkToken(req, res, next) {
    const token = req.query.token;
    if (token == "Kashish") {
        next();
    }
    throw new MyError(401, "Access Denied !")
}
app.get('/api', checkToken, (req, res) => {
    res.send("data");
})
app.get('/err', (req, res) => {
    abcd = bcda;
})
app.get('/admin',(req,res)=>{
    throw new MyError(403,'Access to admin is Forbidden')
})
app.use((err, req, res, next) => {
    let {status = 400,message = "Some Error Occured"} = err;
    console.log("I am error");
    res.status(status).send(message)
})
app.listen('8080', () => {
    console.log('Server is Running in PORT 8080');
})