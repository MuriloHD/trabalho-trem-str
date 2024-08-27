import React from 'react';

const Train = ({ position, color }) => {
  const trainStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '20px',
    height: '20px',
    backgroundColor: color,
    borderRadius: '50%',
  };

  return <div style={trainStyle}></div>;
};

export default Train;