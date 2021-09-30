const { response, request } = require('express')
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))

//deprecated by addition of a DB
//const generateId = () => {
//    const maxId = persons.length > 0
//    ? Math.max(...persons.map(n => n.id))
//    : 0
//    return maxId+1
//}

//adding person to MongoDB
app.post('/api/persons', (req, res) => {
    console.log(req)
    const body = req.body
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } 
    else if(persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name already exists in phonebook'
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number,
      })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

//Get webpage
app.get('/', (req,res) => {
    res.send('<h1>Welcome to phonebook</h1>')
})

//Get list of people from DB
app.get('/api/persons', (req,res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})

//Get person by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Note.findById(request.params.id).then(note => {
        if (note) {
        res.json(note.number)
        }
        else {
        res.status(404).end()
    }})
    

    
})

//get info for amount of entries
app.get('/info', (req,res) => {
    const date = new Date();
    res.send(`<div>Phonebook has info for ${persons.length} people.</div><br></br>
    <div>${date}</div>`)
})


//delete person (not yet implementd to DB)
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
    res.status(204).end()
})

const PORT= process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log("testi")
})
