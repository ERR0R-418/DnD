"use strict"
const detectType = require ("./src/ResultRepository");
const expressHandlebars = require('express-handlebars')
const express = require('express')
require('body-parser');
const fs = require('fs')

const app = express()
const port = 3000

app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const getDataStorage = (fileName) => {
    // read file
    const readDataStorage = () => {
        let file = fs.readFileSync(`${__dirname}/${fileName}`).toString()
        return JSON.parse(file)
    }
    let questions = readDataStorage()
    // json -> array
    let accum = []
    for (let question in questions)
        if (questions.hasOwnProperty(question)) accum.push(questions[question])
    return accum
}

const dataStorage = { question: getDataStorage('dataStorage.json') }
// routes
app.use(express.static('public'))

app.use('/get_answers', (req, res) => {

    res.set('Content-Type','application/json').send(dataStorage)
})

app.post('/send',(req,res)=>{

    const result = Array.from(req.body)
            .reduce((acc,e)=>{
                acc.push(
                    Array.from(
                        detectType(e[0],e[1])
                    )
                ); return acc;
            },[]).flat();
    console.log(result);

    res.render('home', {result: result});

});

app.use('/', function (req, res) {
    res.render('home', { questions: dataStorage.question })
})
// listen
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)
