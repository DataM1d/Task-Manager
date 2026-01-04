import { memo } from 'react';
import './TodoItem.css';

const TodoItem = memo(({ todo, onToggle, onDelete, onRestore, isTrashView }) => {
  return (
    <li className={`todo-item ${todo.is_completed ? 'done' : ''} ${isTrashView ? 'in-trash' : ''}`}>
      <div 
        className='task-wrapper'
        onClick={!isTrashView ? onToggle : undefined}
        role={!isTrashView ? 'button' : 'text'}
        tabIndex={!isTrashView ? 0 : -1}
      >
        {!isTrashView && (
          <div className='checkbox'>
            {todo.is_completed && <span className='checkmark-icon'>✓</span>}
          </div>
        )}
        <span className='todo-text'>{todo.title}</span>
        <span className='category-tag'>{todo.categories?.name || 'PERSONAL'}</span>
      </div>

      <div className='item-actions'>
        {isTrashView && (
          <button 
            className='restore-btn'
            onClick={(e) => {
              e.stopPropagation();
              onRestore();
            }}
            aria-label='Restore Task'
          >
            ↺
          </button>
        )}
        <button 
          className='delete-icon'
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={isTrashView ? 'Delete Permanently' : 'Move to Trash'}
        >
          {isTrashView ? '×' : '×'}
        </button>
      </div>
    </li>
  );
});

export default TodoItem;