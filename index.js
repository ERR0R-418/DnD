const hbsm = require('express-handlebars');
const express = require('express')
const fs = require('fs')
const app = express()
let router = express.Router();
const port = 3000

app.engine('handlebars', hbsm());
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next) {
  console.log(req)
  res.render('home');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))