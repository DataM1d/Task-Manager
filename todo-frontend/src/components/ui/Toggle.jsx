import '../../components/Sidebar/Sidebar.css';

export default function Toggle({ isOn, onToggle }) {
  return (
    <div 
      className={`toggle-switch ${isOn ? 'on' : ''}`} 
      onClick={onToggle}
    >
      <div className="toggle-knob"></div>
    </div>
  );
}