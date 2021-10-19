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
//app.use(morgan(':method :url :body'))

//deprecated by addition of a DB
//const generateId = () => {
//    const maxId = persons.length > 0
//    ? Math.max(...persons.map(n => n.id))
//    : 0
//    return maxId+1
//}

//adding person to MongoDB
app.post('/api/persons', (req, res, next) => {
    const body = req.body


    Person.findOne({ name: body.name }).then(() => {

        const person = new Person({
            name: body.name,
            number: body.number,
        })
        person.save().then(savedPerson => {
            res.json(savedPerson)
        })
            .catch(error => {
                next(error)})
    }
    )



})

//Get webpage
app.get('/', (_req,res) => {
    res.send('<h1>Welcome to phonebook</h1>')
})

//Get list of people from DB
app.get('/api/persons', (_req,res) => {
    Person.find({}).then(people => {
        console.log(people)
        res.json(people)
    })
})

//Get person by id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        }
        else {
            res.status(404).end()
        }}).catch(error => next(error))
})

//get info for amount of entries.
app.get('/info', (_req,res) => {

    Person.countDocuments({}, function (_err, count) {
        const date = new Date()
        console.log(count)
        res.send(`<div>Phonebook has info for ${count} people.</div><br></br>
        <div>${date}</div>`)
    })


})

//update person number
app.put('/api/persons/:id', (req, res ,next) => {
    const body = req.body
    Person.findByIdAndUpdate(req.params.id, { number : body.number })
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

//delete person (not yet implementd to DB)
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))

})

const errorHandler = (error, _request, response, next) => {


    if (error.name === 'CastError') {
        console.log(error.message)
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        console.log(error.message)
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT= process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
