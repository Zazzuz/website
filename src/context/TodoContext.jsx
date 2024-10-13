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
    const [category, setCategory] = useState(''); // State for the selected category

    const handleInputChange = (e) => {
        setTask(e.target.value); // Update task as user types
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value); // Update category as user selects
    };

    // Add a new task with 'completed' property set to false and the selected category
    const addTask = (e) => {
        e.preventDefault(); // Prevent form submission
        if (tasks.length >= 20) {
            return; // Limit tasks to 20
        }
        if (task && category) {
            setTasks([...tasks, { text: task, completed: false, category }]); // Add new task as an object
            setTask(''); // Clear the input
            setCategory(''); // Clear the category selection
        }
    };

    // Remove a task by index
    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index); // Remove task by index
        setTasks(newTasks); // Update the tasks state
    };

    // Clear all tasks
    const clearTasks = () => {
        setTasks([]); // Clear the tasks
    };

    // Toggle the completion status of a task by index
    const toggleCompleteTask = (index) => {
        const newTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks); // Update tasks with the toggled completed status
    };

    return (
        <TodoContext.Provider
            value={{
                tasks,
                setTasks,
                task,
                setTask,
                category,
                setCategory,
                handleInputChange,
                handleCategoryChange,
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
