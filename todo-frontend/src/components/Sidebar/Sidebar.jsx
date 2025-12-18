import { useMemo } from 'react';
import SidebarStats from './SidebarStats';
import SidebarDropdown from './SidebarDropdown';
import Toggle from '../ui/Toggle';
import './Sidebar.css';

export default function Sidebar({ todos, categories, isDarkMode, setIsDarkMode, onClear, onSelectCategory, activeFilter }) {
  
  const stats = useMemo(() => {
    const completed = todos.filter(t => t.isCompleted).length;
    return { completed, active: todos.length - completed };
  }, [todos]);

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img src="/TodoManager.png" alt="Logo" className="profile-logo" />
        <h2 className="profile-name">TASK MANAGER</h2>
      </div>

      <SidebarStats completed={stats.completed} active={stats.active} />

      <div className="sidebar-nav-scroll">
        <SidebarDropdown title="CATEGORIES">
          <ul className="dropdown-list">
            <li 
              onClick={() => onSelectCategory('All')}
              className={`category-item ${activeFilter === 'All' ? 'active' : ''}`}
            >
              <span>All</span>
              <span className="count-badge">{todos.length}</span>
            </li>
            {categories.map(cat => (
              <li 
                key={cat.name} 
                onClick={() => onSelectCategory(cat.name)}
                className={`category-item ${activeFilter === cat.name ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
                <span className="count-badge">
                   {todos.filter(t => t.category === cat.name).length}
                </span>
              </li>
            ))}
          </ul>
        </SidebarDropdown>

        <SidebarDropdown title="SETTINGS">
          <div className="settings-item">
            <span>Dark Mode</span>
            <Toggle isOn={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </SidebarDropdown>
      </div>

      <div className="sidebar-footer">
        {stats.completed > 0 && (
          <button className="clear-btn" onClick={onClear}>
            Clear {stats.completed} Completed
          </button>
        )}
      </div>
    </aside>
  );
}