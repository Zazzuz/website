import React, { useState } from 'react';
import '../styles/todo.css';

function Todo() {
  const [tasks, setTasks] = useState([]); // State to hold the tasks
  const [task, setTask] = useState(''); // State for the current input

  const handleInputChange = (e) => {
    setTask(e.target.value); // Update task as user types
  };

  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission
    if (task) {
      setTasks([...tasks, task]); // Add new task to the list
      setTask(''); // Clear the input
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index); // Remove task by index
    setTasks(newTasks); // Update the tasks state
  };

  return (
    <div id="todo-container">
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button id="todo-add" type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button id="todo-remove" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;