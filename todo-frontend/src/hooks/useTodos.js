import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await todoService.getAll();
      setTodos(data);
    } catch {
      console.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title, category) => {
    try {
      const { data } = await todoService.create(title, category);
      setTodos(prev => [data, ...prev]);
    } catch {
      console.error("Failed to add todo");
    }
  };

  const updateTodo = async (id, payload) => {
    const previousTodos = [...todos];
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t));
    try {
      await todoService.update(id, payload);
    } catch {
      setTodos(previousTodos);
    }
  };

  const deleteTodo = async (id) => {
    const previousTodos = [...todos];
    const targetTodo = todos.find(t => t.id === id);
    const isAlreadyDeleted = targetTodo?.status === 'deleted';

    if (isAlreadyDeleted) {
      setTodos(prev => prev.filter(t => t.id !== id));
      try {
        await todoService.permanentlyDelete(id);
      } catch {
        setTodos(previousTodos);
      }
    } else {
      setTodos(prev => prev.map(t => t.id === id ? { ...t, status: 'deleted' } : t));
      try {
        await todoService.delete(id);
      } catch {
        setTodos(previousTodos);
      }
    }
  };

  const restoreTodo = async (id) => {
    const previousTodos = [...todos];
    setTodos(prev => prev.map(t => t.id === id ? { ...t, status: 'active', is_recovered: true } : t));
    try {
      await todoService.restore(id);
    } catch {
      setTodos(previousTodos);
    }
  };

  const clearCompleted = async () => {
    const previousTodos = [...todos];
    const completedIds = todos
      .filter(t => t.is_completed && t.status === 'active')
      .map(t => t.id);
    
    if (completedIds.length === 0) return;

    setTodos(prev => prev.map(t => completedIds.includes(t.id) ? { ...t, status: 'deleted' } : t));
    try {
      await Promise.all(completedIds.map(id => todoService.delete(id)));
    } catch {
      setTodos(previousTodos);
    }
  };

  const deleteAll = async () => {
    const previousTodos = [...todos];
    setTodos(prev => prev.filter(t => t.status !== 'deleted'));
    try {
      await todoService.deleteAll();
    } catch {
      setTodos(previousTodos);
    }
  };

  return { 
    todos, 
    loading, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    restoreTodo,
    clearCompleted, 
    deleteAll, 
    refreshTodos: fetchTodos 
  };
};

export default useTodos;