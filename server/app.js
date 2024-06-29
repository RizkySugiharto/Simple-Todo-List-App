const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const TodoListRoutes = require('./routes/api/todoList')

dotenv.config()

// Init server app
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/todoList', TodoListRoutes)

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Connect MongoDB server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB database connected..'))
    .catch((err) => console.log(err))

// Listen the app to the specified port
app.listen(process.env.PORT, () => {
    console.log(`App is listening at http://localhost:${process.env.PORT}`)
})
