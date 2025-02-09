import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardList, BarChart2 } from 'lucide-react';
import './NavigationButtons.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="nav-buttons">
      <button 
        onClick={() => handleNavigation('/teste-vocacional')} 
        className={`nav-button ${location.pathname === '/teste-vocacional' ? 'active' : ''}`}
      >
        <ClipboardList />
        Teste Vocacional
      </button>
      <button 
        onClick={() => handleNavigation('/bi')} 
        className={`nav-button ${location.pathname === '/bi' ? 'active' : ''}`}
      >
        <BarChart2 />
        BI
      </button>
    </div>
  );
};

export default Navigation;