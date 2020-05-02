const DataFromDatabase = require ("./src/DataFromDatabase");
const expressHandlebars = require('express-handlebars')
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const urlParser = bodyParser.urlencoded({ extended: false })

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

const dataFromDatabase = DataFromDatabase();

app.use(express.static('public'))

app.use('/send',(req,res)=>{
    //console.log(req.body);
    console.l
    res.status(200).end();
})

app.use('/get_answers', (req, res) => {
    res.send(dataStorage)
})

app.use('/', function (req, res) {
    res.render('home', { questions: dataStorage.question })
})

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)
