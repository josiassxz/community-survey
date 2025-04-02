import React from 'react';

const BiDashboard = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: 'calc(100vh - 100px)',
      backgroundColor: '#F0F0F0'
    }}>
      <iframe
        title="BI Dashboard"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiOWUwODUyNTgtOGUwOC00MjU0LWJjZjQtNmZkMTU3NDNmMmUzIiwidCI6ImU2YzUxYzNhLWMwZDYtNDhjZC05OGM5LTNkZmM3N2FiZDk5MyJ9"
        frameBorder="0"
        allowFullScreen
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
};

export default BiDashboard;