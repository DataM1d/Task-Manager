import { useMemo } from 'react';

export const useFilteredTodos = (todos, filter) => {
  const CATEGORIES = ['PERSONAL', 'WORK', 'SHOPPING', 'HEALTH', 'FINANCE', 'URGENT'];

  const filteredTodos = useMemo(() => {
    const normalizedFilter = (filter || 'ALL').toUpperCase();

    const isTrashView = normalizedFilter === 'TRASH' || normalizedFilter === 'RECYCLE BIN';
    const isRecoveredView = normalizedFilter === 'RECOVERED';

    return todos.filter(todo => {
      if (isTrashView) {
        return todo.status === 'deleted'; 
      }
      if (todo.status === 'deleted') return false;
      if (isRecoveredView) {
        return todo.is_recovered === true;
      }

      if (normalizedFilter === 'ALL') return true;
      if (normalizedFilter === 'ACTIVE') return !todo.is_completed;
      if (normalizedFilter === 'DONE') return todo.is_completed;

      const categoryName = todo.categories?.name || 'PERSONAL';
      return categoryName.toUpperCase() === normalizedFilter; 
    });
  }, [todos, filter]);

  return { filteredTodos, enhancedTodos: todos, CATEGORIES };
};