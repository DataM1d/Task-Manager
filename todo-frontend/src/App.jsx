import { useState, useCallback } from 'react';
import useTodos from './hooks/useTodos';
import { useFilteredTodos } from './hooks/useFilteredTodos';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import './App.css';

export default function App() {
  const { todos, loading, addTodo, updateTodo, deleteTodo, restoreTodo, clearCompleted, deleteAll } = useTodos();
  const [filter, setFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { enhancedTodos, filteredTodos, CATEGORIES } = useFilteredTodos(todos, filter);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(prev => prev === newFilter ? 'All' : newFilter);
  }, []);

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='dashboard-container'>
        <Sidebar 
          todos={enhancedTodos} 
          categories={CATEGORIES}
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          onClear={clearCompleted}
          onSelectCategory={handleFilterChange}
          activeFilter={filter}
        />
        <MainContent 
          filter={filter}
          onAdd={(title) => addTodo(title, filter)} 
          setFilter={handleFilterChange}
          filteredTodos={filteredTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          restoreTodo={restoreTodo}
          deleteAll={deleteAll} 
          loading={loading}
        />
      </div>
    </div>
  );
}