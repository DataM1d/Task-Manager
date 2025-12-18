import './MainContent.css';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoTabs from './TodoTabs';
import TodoItem from '../TodoItem/TodoItem';

export default function MainContent({ 
  filter, 
  activeCount, 
  onAdd, 
  setFilter, 
  filteredTodos, 
  updateTodo, 
  deleteTodo 
}) {
  return (
    <main className="main-content">
      <TodoHeader filter={filter} activeCount={activeCount} />
      <TodoInput onAdd={onAdd} />
      <TodoTabs activeFilter={filter} setFilter={setFilter} />

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem 
            key={todo._id} 
            todo={todo}
            onToggle={() => updateTodo(todo._id, { isCompleted: !todo.isCompleted })}
            onDelete={() => deleteTodo(todo._id)}
          />
        ))}
      </ul>
    </main>
  );
}