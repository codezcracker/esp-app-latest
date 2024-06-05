// pages/index.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Home = () => {
  const [buttonState, setButtonState] = useState(false);
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const socket = io();
    setSocket(socket);
    
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    socket.on('buttonState', (state) => {
      setButtonState(state);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);
  
  const toggleButtonState = () => {
    const newState = !buttonState;
    setButtonState(newState);
    socket.emit('buttonState', newState);
  };
  
  return (
    <div>
      <h1>Button State: {buttonState ? 'ON' : 'OFF'}</h1>
      <button onClick={toggleButtonState}>
        {buttonState ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};

export default Home;
