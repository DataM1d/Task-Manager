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
    } catch (err) {
      console.error("Critical failure: Could not load tasks", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title) => {
    try {
      const { data } = await todoService.create(title);
      setTodos(prev => [...prev, data]);
    } catch (err) {
      console.error("Add failed", err);
    }
  };

  const updateTodo = async (id, payload) => {
    // Save original state for rollback
    const previousTodos = [...todos];
    
    // Optimistic Update: Change UI immediately
    setTodos(prev => prev.map(t => t._id === id ? { ...t, ...payload } : t));

    try {
      await todoService.update(id, payload);
    } catch (err) {
      setTodos(previousTodos); // Rollback on failure
      console.error("Update failed, rolling back", err);
    }
  };

  const deleteTodo = async (id) => {
    const previousTodos = [...todos];
    setTodos(prev => prev.filter(t => t._id !== id));

    try {
      await todoService.delete(id);
    } catch (err) {
      setTodos(previousTodos);
      console.error("Delete failed, rolling back", err);
    }
  };

  /**
   * THE FIX: This function handles clearing completed tasks from the database
   */
  const clearCompleted = async () => {
    const previousTodos = [...todos];
    const completedIds = todos.filter(t => t.isCompleted).map(t => t._id);
    
    if (completedIds.length === 0) return;

    // UI Update
    setTodos(prev => prev.filter(t => !t.isCompleted));

    try {
      await todoService.deleteMultiple(completedIds);
    } catch (err) {
      setTodos(previousTodos);
      console.error("Bulk delete failed", err);
    }
  };

  return { 
    todos, 
    loading, 
    addTodo, 
    updateTodo, 
    deleteTodo, 
    clearCompleted, // Expose this instead of raw setTodos
    refreshTodos: fetchTodos 
  };
};

export default useTodos;