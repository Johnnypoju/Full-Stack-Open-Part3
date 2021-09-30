const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

console.log(password)

const url =
  `mongodb+srv://fullstack:${password}@cluster0.haiue.mongodb.net/myFirstDatabase?
    retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

const print_all_number = () => {
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(person.name, " ", person.number)
        })
        mongoose.connection.close()
    })
}

const saveNumber = (object) => {
    console.log(person)
    object.save().then(response => {
        console.log('note saved!')
        mongoose.connection.close()
    })
}

if (name && number) {
    console.log(`added ${name} number ${number} to phonebook`)
    saveNumber(person)
}
else if (!name || !number) {
    console.log("phonebook:")
    print_all_number()
}