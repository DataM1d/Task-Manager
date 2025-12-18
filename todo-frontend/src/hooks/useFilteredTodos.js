import { useMemo } from 'react';

const CATEGORIES = [
  { name: 'Personal', color: '#5c62ff' },
  { name: 'Work', color: '#4caf50' },
  { name: 'Urgent', color: '#f44336' }
];

export const useFilteredTodos = (todos, filter) => {
  // Enhance todos with categories
  const enhancedTodos = useMemo(() => {
    return todos.map(t => ({
      ...t,
      category: CATEGORIES[t.title.length % CATEGORIES.length].name,
      categoryColor: CATEGORIES[t.title.length % CATEGORIES.length].color
    }));
  }, [todos]);

  // Derived state: stats
  const activeCount = useMemo(() => 
    enhancedTodos.filter(t => !t.isCompleted).length
  , [enhancedTodos]);

  // Derived state: filtered list
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'Active': return enhancedTodos.filter(t => !t.isCompleted);
      case 'Done': return enhancedTodos.filter(t => t.isCompleted);
      case 'All': return enhancedTodos;
      default:
        return enhancedTodos.filter(t => t.category === filter);
    }
  }, [enhancedTodos, filter]);

  return { enhancedTodos, filteredTodos, activeCount, CATEGORIES };
};