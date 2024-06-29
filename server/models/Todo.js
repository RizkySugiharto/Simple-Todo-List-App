const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB database connected..'))
    .catch((err) => console.log(err))

const Todo = mongoose.model('todo', TodoSchema)

module.exports = Todo