import React from 'react';
import CatSprite from './CatSprite';
export default function PreviewArea({ position }) {
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
        <CatSprite />
      </div>
    </div>
  );
}
