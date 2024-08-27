export const calculateNextPosition = (train, segments,trains) => {
    let positonSegment
    
    const currentSegment = segments[train.color].find((segment,index) => {
       if(segment.id === train.segmentId){
        positonSegment = index
        return true
       }
    });
  
    let nextPosition;
    let segmentId = train.segmentId
    let newSegment = train.segmentName;
    let newDirection = train.direction;
  
    if (train.direction === 'right') {
      nextPosition = { x: train.position.x + train.speed, y: train.position.y };
      if (nextPosition.x > currentSegment.end.x) {
        if(!checkNextSegment(segments[train.color][positonSegment + 1 ].name,train.id,trains)){
            newDirection = 'down';
            positonSegment++
            newSegment = segments[train.color][positonSegment].name;
            segmentId = segments[train.color][positonSegment].id
        }
       
        nextPosition = { x: currentSegment.end.x, y: currentSegment.end.y };
      }
    } else if (train.direction === 'down') {
      nextPosition = { x: train.position.x, y: train.position.y + train.speed };
      if (nextPosition.y > currentSegment.end.y) {
        if(!checkNextSegment(segments[train.color][positonSegment + 1 ].name,train.id,trains)){
            newDirection = 'left';
            positonSegment++
            newSegment = segments[train.color][positonSegment].name
            segmentId = segments[train.color][positonSegment].id
        }
        
        nextPosition = { x: currentSegment.end.x, y: currentSegment.end.y };
      }
    } else if (train.direction === 'left') {
      nextPosition = { x: train.position.x - train.speed, y: train.position.y };
      if (nextPosition.x < currentSegment.end.x) {
        if(!checkNextSegment(segments[train.color][positonSegment + 1 ].name,train.id,trains)){
            newDirection = 'up';
            positonSegment++
            newSegment = segments[train.color][positonSegment].name
            segmentId = segments[train.color][positonSegment].id
        }
        
        nextPosition = { x: currentSegment.end.x, y: currentSegment.end.y };
      }
    } else if (train.direction === 'up') {
      nextPosition = { x: train.position.x, y: train.position.y - train.speed };
      if (nextPosition.y < currentSegment.end.y) {
        if(!checkNextSegment(segments[train.color][positonSegment -3].name,train.id,trains)){
            newDirection = 'right';
            positonSegment = positonSegment - 3
            newSegment = segments[train.color][positonSegment].name
            segmentId = segments[train.color][positonSegment].id
        }
          
        nextPosition = { x: currentSegment.end.x, y: currentSegment.end.y };
      }
    }
  
    return { position: nextPosition, direction: newDirection, segmentName: newSegment , segmentId:segmentId };
  };
  
  export const checkCollisions = (trains) => {
    const positions = trains.map(train => `${train.position.x}-${train.position.y}`);
  
    const hasCollision = positions.some((pos, index) => positions.indexOf(pos) !== index);
  
    if (hasCollision) {
      alert('Colisão detectada! Ajuste as velocidades.');
    }
  };

  export const checkNextSegment = (trainNextSegment,id,trains) =>{
    let exist = false

    trains.forEach(train => {
        if(train.segmentName == trainNextSegment && id != train.id){
            exist = true;
        }
    });

    return exist

  }