export default function TodoHeader({ filter, activeCount }) {
  return (
    <header className="main-header">
      <h1>My To Do List</h1>
      <p className="filter-status">
        Viewing <strong className="accent-text">{filter}</strong> • {activeCount} tasks left
      </p>
    </header>
  );
}