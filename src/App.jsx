import React, { useState, useEffect } from 'react';

    const App = () => {
      const [todos, setTodos] = useState([]);
      const [inputValue, setInputValue] = useState('');

      useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
      }, []);

      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = () => {
        if (inputValue.trim()) {
          setTodos([...todos, { text: inputValue, completed: false }]);
          setInputValue('');
        }
      };

      const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
      };

      const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      };

      return (
        <div className="todo-container">
          <h1>Todo List</h1>
          <input
            type="text"
            className="todo-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo"
          />
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => toggleTodo(index)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => removeTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default App;
