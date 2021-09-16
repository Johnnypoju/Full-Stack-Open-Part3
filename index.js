const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :body'))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-2345345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-64323122"
    }
  ]

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    return maxId+1
}

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
    
    const note = {

        id: generateId(),
        name: body.name,
        number: body.number,
        
    }

    persons = persons.concat(note)

    res.json(note)
})

app.get('/', (req,res) => {
    res.send('<h1>Welcome to phonebook</h1>')
})

app.get('/api/persons', (req,res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = persons.find(note => note.id === id)
    

    if (note) {
        res.json(note.number)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req,res) => {
    const date = new Date();
    res.send(`<div>Phonebook has info for ${persons.length} people.</div><br></br>
    <div>${date}</div>`)
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
    res.status(204).end()
})

const PORT=3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
