import React, { createContext, useContext, useState } from 'react';

// Create the context
const TodoContext = createContext();

// Custom hook to use the Todo context
export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]); // State to hold the tasks
    const [task, setTask] = useState(''); // State for the current input

    const handleInputChange = (e) => {
        setTask(e.target.value); // Update task as user types
    };

    // Add a new task with 'completed' property set to false
    const addTask = (e) => {
        e.preventDefault(); // Prevent form submission
        if (tasks.length >= 20) {
            return;
        }
        if (task) {
            setTasks([...tasks, { text: task, completed: false }]); // Add new task as an object
            setTask(''); // Clear the input
        }
    };

    // Remove a task by index
    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index); // Remove task by index
        setTasks(newTasks); // Update the tasks state
    };

    // Clear all tasks
    const clearTasks = () => {
        if (tasks.length >= 1) {
            setTasks([]);
        }
    };

    // Toggle the completion status of a task by index
    const toggleCompleteTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    return (
        <TodoContext.Provider
            value={{
                tasks,
                setTasks,
                task,
                setTask,
                handleInputChange,
                addTask,
                removeTask,
                clearTasks,
                toggleCompleteTask,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
