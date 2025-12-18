import './TodoItem.css';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.isCompleted ? 'done' : ''}`}>
      <div className="task-wrapper" onClick={onToggle}>
        <div className="checkbox">{todo.isCompleted && '✓'}</div>
        <span className="todo-text">{todo.title}</span>
        <span 
          className="category-tag" 
          style={{ backgroundColor: todo.categoryColor }}
        >
          {todo.category}
        </span>
      </div>
      <button className="delete-icon" onClick={onDelete}>&times;</button>
    </li>
  );
}