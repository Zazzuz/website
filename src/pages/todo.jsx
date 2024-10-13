import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/TodoContext';
import '../styles/Todo.css';

function Todo() {
  const { tasks, setTasks, task, setTask, addTask, removeTask, clearTasks, handleInputChange, toggleCompleteTask } = useTodo();
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
  };

  const handleSave = () => {
      if (editingIndex >= 0) {
          const updatedTask = {
              ...tasks[editingIndex],
              text: task,
          };
          editTask(editingIndex, updatedTask);
          setEditingIndex(-1);
          setTask('');
          setActiveIndex(null);
      }
  };

  const handleCancelEdit = () => {
      if (editingIndex >= 0) {
          setEditingIndex(-1);
          setTask('');
          setActiveIndex(null);
      }
  };

  return (
      <div>
          <h1 className='todo-header'>Todo List</h1>
          <div className="todo-container">
              <form onSubmit={addTask} className='todo-form'>
                  <input
                      type="text"
                      value={task}
                      onChange={handleInputChange}
                      placeholder="Add a new task"
                      className='add-todo-input'
                  />
                  <button className="todo-add-button" type="submit">Add</button>
              </form>
              <ul className='todo-list'>
                  {tasks.map((task, index) => (
                      <li key={index} className='todo-list-item' onClick={() => setActiveIndex(index === activeIndex ? null : index)}>
                          <span className={`todo-text ${task.completed ? 'completed' : ''}`}>
                              ● {task.text}
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
                                          <button className="todo-remove-button" onClick={(e) => {e.stopPropagation(); removeTask(index); setActiveIndex(null)}}>Remove</button>
                                          <button className='todo-edit-button' onClick={(e) => {e.stopPropagation(); handleEdit(index)}}>Edit</button>
                                          <button className='todo-complete-button' onClick={(e) => {e.stopPropagation(); toggleCompleteTask(index)}}>
                                              {task.completed ? 'Undo Complete' : 'Complete'}</button>
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