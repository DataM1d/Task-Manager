export default function TodoTabs({ activeFilter, setFilter }) {
  const tabs = ['All', 'Active', 'Done', 'Trash'];
  
  return (
    <nav className="filter-tabs">
      {tabs.map(tab => (
        <button 
          key={tab} 
          onClick={() => setFilter(tab)} 
          className={activeFilter === tab ? 'active' : ''}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}