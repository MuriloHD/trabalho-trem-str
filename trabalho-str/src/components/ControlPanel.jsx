import React from 'react';

const ControlPanel = ({ speeds, setSpeed }) => {
  return (
    <div className="control-panel">
      {speeds.map((speed, index) => (
        <div key={index} className="slider-container">
          <label style={{ marginRight: '10px' }}>Trem {index + 1 }</label>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) =>{
                console.log(e,index)
                setSpeed(index +1, e.target.value)
            } }
          />
        </div>
      ))}
    </div>
  );
};

export default ControlPanel;