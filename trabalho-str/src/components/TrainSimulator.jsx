import React, { useState, useEffect } from 'react';
import Train from './Train';
import Track from './Track';
import ControlPanel from './ControlPanel';
import { calculateNextPosition, checkCollisions } from '../js/utils';

const TrainSimulator = () => {
    const [trains, setTrains] = useState([
      { id: 1, position: { x: 50, y: 50 }, speed: 1, direction: 'right', color: 'yellow', segmentName: "L1" , segmentId:1 },
      { id: 2, position: { x: 350, y: 50 }, speed: 1, direction: 'down', color: 'blue', segmentName: "L6",segmentId:6 },
      { id: 3, position: { x: 150, y: 350 }, speed: 1, direction: 'left', color: 'red', segmentName: "L9" ,segmentId:11 },
      { id: 4, position: { x: 250, y: 350 }, speed: 1, direction: 'up', color: 'green', segmentName: "L13" , segmentId:16}
    ]);
  
    const segments = {
        yellow:[
            { start: { x: 50, y: 50 }, end: { x: 150, y: 50 }, color: 'yellow', id: 1 , name:"L1" }, 
            { start: { x: 150, y: 50 }, end: { x: 150, y: 150 }, color: 'yellow', id: 2, name:"L2"}, 
            { start: { x: 150, y: 150 }, end: { x: 50, y: 150 }, color: 'yellow', id: 3,name: "L3" }, 
            { start: { x: 50, y: 150 }, end: { x: 50, y: 50 }, color: 'yellow', id: 4, name:"L4" },
        ],
        blue:[
            { start: { x: 250, y: 50 }, end: { x: 350, y: 50 }, color: 'blue', id: 5 , name:"L5"}, 
            { start: { x: 350, y: 50 }, end: { x: 350, y: 150 }, color: 'blue', id: 6, name:"L6" }, 
            { start: { x: 350, y: 150 }, end: { x: 250, y: 150 }, color: 'blue', id: 7, name:"L7" }, 
            { start: { x: 250, y: 150 }, end: { x: 250, y: 50 }, color: 'blue', id: 8, name: "L2" },
        ],
        red:[
            { start: { x: 50, y: 250 }, end: { x: 150, y: 250 }, color: 'red', id: 9 , name:"L3" }, 
            { start: { x: 150, y: 250 }, end: { x: 150, y: 350 }, color: 'red', id: 10 , name:"L9" }, 
            { start: { x: 150, y: 350 }, end: { x: 50, y: 350 }, color: 'red', id: 11, name:"L10" }, 
            { start: { x: 50, y: 350 }, end: { x: 50, y: 250 }, color: 'red', id: 12 , name :"L11" },
        ],
        green:[
            { start: { x: 250, y: 250 }, end: { x: 350, y: 250 }, color: 'green', id: 13, name:"L7" }, 
            { start: { x: 350, y: 250 }, end: { x: 350, y: 350 }, color: 'green', id: 14,name:"L12" },
            { start: { x: 350, y: 350 }, end: { x: 250, y: 350 }, color: 'green', id: 15, name:"L13" },
            { start: { x: 250, y: 350 }, end: { x: 250, y: 250 }, color: 'green', id: 16, name:"L9" }  
        ]
  
     
      
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTrains((prevTrains) => {
          const updatedTrains = prevTrains.map((train) => {
            const nextPosition = calculateNextPosition(train, segments,trains);
            return { ...train, ...nextPosition };
          });
          return updatedTrains;
        });
  
        checkCollisions(trains);
      }, 100);
  
      return () => clearInterval(interval);
    }, [trains]);
  
    const setSpeed = (id, speed) => {
      setTrains((prevTrains) =>
        prevTrains.map((train) =>
          train.id === id ? { ...train, speed: Number(speed) } : train
        )
      );
    };
  
    return (
      <div>
        
       
        <Track segments={segments} />
        {trains.map((train) => (
          <Train key={train.id} position={train.position} color={train.color} />
        ))}
        <ControlPanel speeds={trains.map(train => train.speed)} setSpeed={setSpeed} />
      </div>
    );
  };
  
  export default TrainSimulator;