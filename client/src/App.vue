<template>
  <div class="main">
    <h3>Simple Todo List App</h3>

    <form class="form">
      <input type="text" v-model="title" name="title" placeholder="Enter Title">
      <br>
      <input type="text" v-model="description" name="description" placeholder="Enter Description">
      <br>
      <button type="submit" class="button-submit" @click="addTodo">Submit</button>
    </form>

    <div class="todo-container">
      <ul>
        <li v-for="(todo, i) in todos" :key="todo._id">
          <div class="todo">
            <span class="todo-name">{{ todo.title }}</span>
            <span class="todo-description">{{ todo.description }}</span>
          </div>
          <button class="button-delete" @click="removeTodo(todo, i)">Delete</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { BACKEND_URI } from './config'

export default {
  data() {
    return {
      todos: [],
      title: "",
      description: ""
    }
  },
  async mounted() {
    const response = await axios.get(`/api/todoList`, { baseURL: BACKEND_URI })
    this.todos = response.data
  },
  methods: {
    async addTodo(e) {
      e.preventDefault()

      const response = await axios.post(`/api/todoList`, {
        title: this.title,
        description: this.description
      }, { baseURL: BACKEND_URI })

      this.todos.push(response.data)
      this.title = ""
      this.description = ""
    },
    async removeTodo(item, i) {
      await axios.delete(`/api/todoList/${item._id}`, { baseURL: BACKEND_URI })
      this.todos.splice(i, 1)
    }
  }
}
</script>

<style>
.main {
  margin: auto;
  margin-top: 3rem;
  max-width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
}

.button-submit {
  width: 400px;
  padding: 10px;
  background-color: #19762d;
  color: white;
  cursor: pointer;
}

.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-container ul {
  width: 100%;
  list-style: none;
  padding: 0;
}

.todo-container ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.todo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  max-width: 250px;
}

.todo-name {
  font-size: 18px;
  font-weight: bold;
}

.font-description {
  font-size: 14px;
  max-width: 70%;
}

.button-delete {
  background-color: #f44336;
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;
}
</style>