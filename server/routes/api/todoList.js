const { Router } = require('express')
const Todo = require('../../models/Todo')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const todoList = await Todo.find()
        if (!todoList) throw new Error('No Todo List found')
        res.status(200).json(todoList)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)

    try {
        const todo = await newTodo.save()
        if (!todo) throw new Error('Something went wrong saving the Todo')
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const removedTodo = await Todo.findByIdAndDelete(id)
        if (!removedTodo) throw new Error('Something went wrong deleting the Todo')
        res.status(200).json(removedTodo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router