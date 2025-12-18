import { useState } from 'react';
import useTodos from './hooks/useTodos'; 
import { useFilteredTodos } from './hooks/useFilteredTodos';
import Sidebar from './components/Sidebar/Sidebar'; 
import MainContent from './components/MainContent/MainContent';
import './App.css';

export default function App() {
  const { todos, loading, addTodo, updateTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // All logic lives here now
  const { enhancedTodos, filteredTodos, activeCount, CATEGORIES } = useFilteredTodos(todos, filter);

  if (loading) return <div className="loading-screen">Loading tasks...</div>;

  return (
    <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='dashboard-container'>
        <Sidebar 
          todos={enhancedTodos} 
          categories={CATEGORIES}
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          onClear={clearCompleted}
          onSelectCategory={setFilter}
          activeFilter={filter}
        />
        
        <MainContent 
          filter={filter}
          activeCount={activeCount}
          onAdd={addTodo}
          setFilter={setFilter}
          filteredTodos={filteredTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}