//mysql -u root -p
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid')
const app = express();
const path = require('path')
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb',
  password: 'Avneesh@k'
});

app.get('/', (req, res) => {
  let q = 'SELECT COUNT(*) FROM user;'
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["COUNT(*)"];
      res.render('home.ejs', { count })
    })
  } catch (err) {
    console.log(err);
    res.send('Pagal ho gyi')
  }
})

app.get('/user', (req, res) => {
  let q = 'SELECT * FROM user;'
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      res.render('users.ejs', { users })
    })
  } catch (err) {
    console.log(err);
    res.send('Pagal ho gyi')
  }
})

app.get('/user/new', (req, res) => {
  res.render('add.ejs');
})
app.post('/user', (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;
  let user = [username, email, id, password];
  let q = `INSERT INTO user(username,email,id,password) VALUES (?,?,?,?)`
  try {
    connection.query(q, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send('SUCCESS')
    })
  } catch (err) {
    console.log(err);
    res.send('Pagal ho gyi')
  }
})

//Edit Rout

app.get('/user/:id/edit', (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0].username)
      let user = result[0];
      res.render('edit.ejs', { user })
    })
  } catch (err) {
    console.log(err);
    res.send('Pagal ho gyi')
  }
})
//delete route
app.get('/user/:id/delete', (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render('delete.ejs', { user })
    })
  } catch {
    console.log(err)
    res.send('Pagal ho gyi')
  }
})

//DELETE ROUTE
app.delete('/user/:id', (req, res) => {
  let { id } = req.params;
  let { password: newPass } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (user.password != newPass) {
        res.send("<h1>Wrong Password, You cant delete user</h2>")
      } else {
        let q2 = `DELETE FROM user WHERE id = '${id}'`
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.send('SUCCESS')
        })
      }
    })
  } catch (err) {
    console.log(err);
    res.send('Pagal ho gyi')
  }
})

// update Rout
app.patch('/user/:id', (req, res) => {
  let { id } = req.params;
  let { username: newUserName, password: userPass } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (user.password != userPass) {
        res.send("<h1>Wrong Password</h2>")
      } else {
        let q2 = `UPDATE user SET username='${newUserName}' WHERE id = '${id}'`
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.send(result)
        })
      }
    })
  } catch (err) {
    console.log(err);
    res.send('Pagal ho gyi')
  }
})

app.listen('8080', () => {
  console.log('App is listening at PORT 8080')
})

function getRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}