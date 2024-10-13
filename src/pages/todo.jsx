import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { useSidebar } from '../context/SidebarContext';
import '../styles/Todo.css';

function Todo() {
  const { isCollapsed} = useSidebar();
  const { tasks, setTasks, task, setTask, category, setCategory, addTask, removeTask, clearTasks, handleInputChange, handleCategoryChange, toggleCompleteTask } = useTodo();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(null);

  const editTask = (index, updatedTask) => {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
      const task = tasks[index].text;
      setEditingIndex(index);
      setTask(task);
      setCategory(tasks[index].category); // Set the category for editing
  };

  const handleSave = () => {
      if (editingIndex >= 0) {
          const updatedTask = {
              ...tasks[editingIndex],
              text: task,
              category: category, // Update the category as well
          };
          editTask(editingIndex, updatedTask);
          setEditingIndex(-1);
          setTask('');
          setCategory(''); // Clear the category selection
          setActiveIndex(null);
      }
  };

  const handleCancelEdit = () => {
      if (editingIndex >= 0) {
          setEditingIndex(-1);
          setTask('');
          setCategory(''); // Clear the category selection
          setActiveIndex(null);
      }
  };

  return (
    <div className={`todo-page-container ${isCollapsed ? 'sidebar-closed': 'sidebar-open'}`}>
      <div className="todo-container">
        <h1 className='todo-header'>Todo List</h1>
          <form onSubmit={addTask} className='todo-form'>
              <input
                  type="text"
                  value={task}
                  onChange={handleInputChange}
                  placeholder="Add a new task"
                  className='add-todo-input'
                  maxLength={30}
              />
            <div className="category-container">
                <select value={category} onChange={handleCategoryChange} className='category-select'>
                    <option value="">Select a category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Study">Study</option>
                    <option value="Other">Other</option>
                </select>
            </div>
              <button className="todo-add-button" type="submit">Add</button>
          </form>
          <ul className='todo-list'>
              {tasks.map((task, index) => (
                  <li key={index} className='todo-list-item' onClick={() => setActiveIndex(index === activeIndex ? null : index)}>
                      <span className={`todo-text ${task.completed ? 'completed' : ''}`}>
                          {task.text}<span className="category">{task.category}</span> 
                      </span>
                      {activeIndex === index && (
                          <div className='todo-list-item-buttons'>
                              {editingIndex === index ? (
                                  <>
                                      <button className="todo-save-button" onClick={() => handleSave()}>Save</button>
                                      <button className='todo-cancel-button' onClick={() => handleCancelEdit()}>Cancel</button>
                                  </>
                              ) : (
                                  <>
                                      <button className="todo-remove-button" onClick={(e) => { e.stopPropagation(); removeTask(index); setActiveIndex(null) }}>Remove</button>
                                      <button className='todo-edit-button' onClick={(e) => { e.stopPropagation(); handleEdit(index) }}>Edit</button>
                                      <button className='todo-complete-button' onClick={(e) => { e.stopPropagation(); toggleCompleteTask(index) }}>
                                          {task.completed ? 'Undo Complete' : 'Complete'}
                                      </button>
                                  </>
                              )}
                          </div>
                      )}
                  </li>
              ))}
          </ul>
          <button className='todo-clear-button' onClick={() => clearTasks()}>Clear List</button>
      </div>
    </div>
  );
}

export default Todo;