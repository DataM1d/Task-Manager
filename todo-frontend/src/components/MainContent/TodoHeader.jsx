export default function TodoHeader({ filter, taskCount }) {
  return (
    <header className="main-header">
      <h1>My To Do List</h1>
      <p className="filter-status">
         Viewing {taskCount} {taskCount === 1 ? 'task' : 'tasks'} from <strong className="accent-text">{filter}</strong>  
      </p>
    </header>
  );
}