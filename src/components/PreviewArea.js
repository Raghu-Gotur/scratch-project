import React from 'react';
import CatSprite from './CatSprite';
export default function PreviewArea({ position, handleClick, actions }) {
  const sequentialExecute = async (actions) => {
    for (const action of actions) {
      handleClick(action?.id);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };
  return (
    <div
      draggable
      className='flex-none h-full w-full overflow-y-auto p-2 cursor-pointer relative'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `rotate(${position.rotation}deg)`,
          display: position?.show ? 'block' : 'none',
          transition: 'transform 1s ease',
        }}
      >
        {position?.greeting && (
          <p className='relative mx-14 text-white bg-blue-300 rounded-lg px-1 m-1'>
            Hello
          </p>
        )}
        <div
          onClick={() => {
            sequentialExecute(actions);
          }}
        >
          <CatSprite height={position.height} width={position.width} />
        </div>
      </div>
    </div>
  );
}
