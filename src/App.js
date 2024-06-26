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

      if (actionId === 'moverandom') {
        updateX = Math.floor(Math.random() * 200);
        updatedY = Math.floor(Math.random() * 200);
      } else if (actionId === 'move50X') {
        updateX = prevPosition.x + 50;
        updatedY = prevPosition.y;
      } else if (actionId === 'move50Y') {
        updateX = prevPosition.x;
        updatedY = prevPosition.y + 50;
      } else if (actionId === 'clock15') {
        updatedRotation = prevPosition.rotation + 15;
        updateX = prevPosition.x;
        updatedY = prevPosition.y;
      } else if (actionId === 'rotate360') {
        updatedRotation = prevPosition.rotation + 360;
        updateX = prevPosition.x;
        updatedY = prevPosition.y;
      } else if (actionId === 'anticlock15') {
        updatedRotation = prevPosition.rotation - 15;
        updateX = prevPosition.x;
        updatedY = prevPosition.y;
      } else if (actionId === 'show') {
        updatedVisibility = true;
      } else if (actionId === 'hide') {
        updatedVisibility = false;
      }
      return {
        ...prevPosition,
        x: updateX,
        y: updatedY,
        rotation: updatedRotation,
        show: updatedVisibility,
      };
    });
  };

  return (
    <div className='bg-blue-100 pt-6 font-sans'>
      <div className='h-screen overflow-hidden flex flex-row  '>
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
          />
        </div>
        <div className='w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2'>
          <PreviewArea position={position} />
        </div>
      </div>
    </div>
  );
}
