import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask } from './todoSlice';

function App() {
  const [input, setInput] = useState('');
  const tasks = useSelector(state => state.todos.tasks);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTask(input));
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>ToDo List</h1>
      <div>
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '10px 0' }}>
            <input 
              type="checkbox" 
              checked={task.status === 'done'}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <span style={{ textDecoration: task.status === 'done' ? 'line-through' : 'none', margin: '0 10px' }}>
              {task.title}
            </span>
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
