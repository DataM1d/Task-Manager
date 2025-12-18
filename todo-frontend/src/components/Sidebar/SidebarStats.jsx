export default function SidebarStats({ completed, active }) {
  return (
    <div className="sidebar-stats">
      <div className="stat-item">
        <div className="stat-number">{completed}</div>
        <div className="stat-label">COMPLETED</div>
      </div>
      <div className="stat-item border-left">
        <div className="stat-number">{active}</div>
        <div className="stat-label">TO DO</div>
      </div>
    </div>
  );
}