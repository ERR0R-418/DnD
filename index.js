const hbsm = require('express-handlebars');
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.engine('handlebars', hbsm());
app.set('view engine', 'handlebars');

const getDataStorage = (fileName) => {
  // read file
  const readDataStorage = () => {
    let file = fs.readFileSync(`${__dirname}/${fileName}`).toString()
    return JSON.parse(file);
  };
  let questions = readDataStorage();
  // json -> array
  let accum =[];
  for (let question in questions)
    if (questions.hasOwnProperty(question))
      accum.push(questions[question])
  return accum;
};

const dataStorage = {question: getDataStorage("dataStorage.json")}

app.use(express.static('public'))

app.use('/get_answers',(req,res)=>{
  res.send(dataStorage)
})

app.use('/', function(req, res) {
  res.render('home',{questions: dataStorage.question});
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
