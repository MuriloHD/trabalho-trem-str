import React from 'react';

const Track = ({ segments }) => {
  let arr = []

  Object.values(segments).forEach(values =>{
    arr = [...arr, ...values]
  })
  
  
    return (
    <svg width="500" height="500" style={{ border: '1px solid #000',position:"absolute",left: `6px`, top: `5px` }}>
      
      {arr.map((segment, index) => (
        <line
          key={index}
          x1={segment.start.x}
          y1={segment.start.y}
          x2={segment.end.x}
          y2={segment.end.y}
          stroke={segment.color}
          strokeWidth="4"
        />
      ))}
    </svg>
  );
};

export default Track;