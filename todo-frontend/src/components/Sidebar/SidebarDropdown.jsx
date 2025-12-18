import { useState, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

export default function SidebarDropdown({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const dropRef = useRef(null);

  useClickOutside(dropRef, () => setIsOpen(false));

  return (
    <section ref={dropRef} className="dropdown-section">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      <div className={`dropdown-container ${isOpen ? 'show' : ''}`}>
        {children}
      </div>
    </section>
  );
}