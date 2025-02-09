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
        src="http://bi.dpe-go.intra/public/dashboard/4fdd609e-740b-447a-92cc-e7b3202c66f8"
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