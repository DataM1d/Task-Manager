export default function TodoInput({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.task.value;
    if (title.trim()) {
      onAdd(title);
      e.target.reset();
    }
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input name="task" placeholder="What needs to be done?" required />
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
}