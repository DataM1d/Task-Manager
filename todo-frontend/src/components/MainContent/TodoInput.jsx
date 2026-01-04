import { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input 
        name="task" 
        placeholder="What needs to be done?" 
        required 
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoComplete='off'
        spellCheck='false'
        className="todo-input-field"
      />
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
}