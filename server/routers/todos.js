const { Router } = require('express');
const { TodoRecord } = require('../records/todo.record');

const TodoRouter = Router();

TodoRouter
  .get('/', async (req, res) => {
    try {
      const todosList = await TodoRecord.listAll();
      res.json(todosList);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .post('/create', async (req, res) => {
    try {
      const newTodo = new TodoRecord(req.body);
      await newTodo.insert();
      res.status(201).json({ message: "Todo created successfully!" });
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await TodoRecord.getOne(id);

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      await todo.delete();
      res.json({ message: "Todo deleted successfully!" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { todo } = req.body;

      const existingTodo = await TodoRecord.getOne(id);
      if (!existingTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      await existingTodo.update(id, todo);
      res.json({ message: "Todo updated successfully!" });
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = {
  TodoRouter,
};
