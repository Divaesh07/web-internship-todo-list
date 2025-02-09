import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleCharactersError = (value) => {
    if (value.length < 3 || value.length > 50) {
      alert("Todo must have at least 3 characters and less than 50 characters.");
      throw new Error("Invalid todo length");
    }
  };

  // ✅ Fetch all todos from backend
  const getAllTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setTodoList(response.data);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    }
  };

  // ✅ Add a new todo
  const addTodo = async () => {
    handleCharactersError(todo);

    try {
      await axios.post("http://localhost:8080/create", { todo });
      await getAllTodos();  // ✅ Refresh list after adding
      setTodo(""); // ✅ Clear input field
    } catch (err) {
      console.error("Error adding todo:", err.message);
    }
  };

  // ✅ Update a todo and refresh
  const updateTodo = async (id) => {
    handleCharactersError(newTodo);

    try {
      await axios.put(`http://localhost:8080/update/${id}`, { id, todo: newTodo });
      await getAllTodos();  // ✅ Fetch updated list
      setNewTodo(""); // ✅ Clear input
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  // ✅ Delete a todo and refresh
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      await getAllTodos();  // ✅ Fetch updated list
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();
  };

  // ✅ Run only once when component mounts
  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="App">
      <Layout>
        <TodoForm handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} />
        <TodoList 
          todoList={todoList} 
          setNewTodo={setNewTodo} 
          updateTodo={updateTodo} 
          deleteTodo={deleteTodo} 
        />
      </Layout>
    </div>
  );
}

export default App;
