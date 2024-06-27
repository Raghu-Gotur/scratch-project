import React, { useState } from 'react';
import MidArea from './components/MidArea';
import PreviewArea from './components/PreviewArea';
import Sidebar from './components/Sidebar';

export default function App() {
  const [actions, setActions] = useState([]);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    show: true,
    greeting: '',
    height: 100,
    width: 100,
  });
  const handleDrag = (e, action) => {
    e.dataTransfer.setData('actionType', JSON.stringify(action));
  };

  const handleDrop = (e) => {
    const actionType = e.dataTransfer.getData('actionType');
    setActions([...actions, JSON.parse(actionType)]);
  };

  const updateActions = (actionId) => {
    const updatedActions = actions?.filter(
      (action, index) => index !== actionId
    );
    setActions(updatedActions);
  };
  const changePosition = (actionId) => {
    setPosition((prevPosition) => {
      let updateX = prevPosition.x;
      let updatedY = prevPosition.y;
      let updatedRotation = prevPosition.rotation;
      let updatedVisibility = prevPosition.show;
      let updatedGreeting = prevPosition.greeting;
      let updatedHeight = prevPosition.height;
      let updatedWidth = prevPosition.width;

      const previewAreaWidth = (1 / 3) * window.innerWidth;
      const previewAreaHeight = window.innerHeight;

      if (actionId === 'moverandom') {
        updateX = Math.floor(Math.random() * 200);
        updatedY = Math.floor(Math.random() * 200);
      } else if (actionId === 'move50X') {
        updateX += 50;
      } else if (actionId === 'move50Y') {
        updatedY += 50;
      } else if (actionId === 'clock15') {
        updatedRotation += 15;
      } else if (actionId === 'rotate360') {
        updatedRotation += 360;
      } else if (actionId === 'anticlock15') {
        updatedRotation -= 15;
      } else if (actionId === 'show') {
        updatedVisibility = true;
      } else if (actionId === 'hide') {
        updatedVisibility = false;
      } else if (actionId === 'sayhello') {
        updatedGreeting = 'Hello';
      } else if (actionId === 'increase10') {
        updatedHeight += 10;
        updatedWidth += 10;
      } else if (actionId === 'decrease10') {
        updatedHeight -= 10;
        updatedWidth -= 10;
      }
      return {
        ...prevPosition,
        x: Math.max(0, Math.min(updateX, previewAreaWidth - 100)),
        y: Math.max(0, Math.min(updatedY, previewAreaHeight - 100)),
        rotation: updatedRotation,
        show: updatedVisibility,
        greeting: updatedGreeting,
        height: updatedHeight,
        width: updatedWidth,
      };
    });
  };

  const handleReset = () => {
    setActions([]);
    setPosition({
      x: 0,
      y: 0,
      rotation: 0,
      show: true,
      greeting: '',
      height: 100,
      width: 100,
    });
  };

  return (
    <div className='bg-blue-100 pt-6 font-sans'>
      <div className='h-screen overflow-hidden flex flex-row '>
        <div className='flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2'>
          <Sidebar
            handleDrag={(e, action) => handleDrag(e, action)}
            handleClick={changePosition}
          />
          <MidArea
            actions={actions}
            updateActions={updateActions}
            handleDrop={handleDrop}
            handleDragOver={(e) => e.preventDefault()}
            handleClick={changePosition}
            handleReset={handleReset}
          />
        </div>
        <div className='w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-t-xl mx-2'>
          <PreviewArea
            position={position}
            handleClick={changePosition}
            actions={actions}
          />
        </div>
      </div>
    </div>
  );
}
