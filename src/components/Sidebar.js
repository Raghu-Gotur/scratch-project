import React from 'react';
import Icon from './Icon';

export default function Sidebar({ handleDrag, handleClick }) {
  let Events = [
    {
      message: 'When clicked',
      icon: 'flag',
      iconIndex: 1,
      id: 'greenflag',
      classname: 'text-green-600 mx-2',
      parentClassname:
        'flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'When this sprite clicked',
      id: 'sprite',
      parentClassname:
        'flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
  ];

  let motions = [
    {
      message: 'Move 50 steps horizontally',
      id: 'move50X',
      parentClassname:
        'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'Move 50 steps vertically',
      id: 'move50Y',
      parentClassname:
        'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'move to random position',
      id: 'moverandom',
      parentClassname:
        'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'Turn 15 degrees',
      icon: 'undo',
      iconIndex: 1,
      id: 'anticlock15',
      classname: 'text-white mx-2',
      parentClassname:
        'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'Turn 15 degrees',
      icon: 'redo',
      iconIndex: 1,
      id: 'clock15',
      classname: 'text-white mx-2',
      parentClassname:
        'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'Rotate 360',
      id: 'rotate360',
      parentClassname:
        'flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
  ];

  let looks = [
    {
      message: 'say Hello',
      id: 'sayhello',
      parentClassname:
        'flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer bg',
    },
    {
      message: 'increase size by 10',
      id: 'increase10',
      parentClassname:
        'flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'decrease size by 10',
      id: 'decrease10',
      parentClassname:
        'flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'show',
      id: 'show',
      parentClassname:
        'flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
    {
      message: 'hide',
      id: 'hide',
      parentClassname:
        'flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer',
    },
  ];

  const getActions = (elements) => {
    return elements?.map((element) => {
      let messageParts = element?.message?.split(' ');
      const firstPart = messageParts[element?.iconIndex - 1] + ' ';
      const lastPart = messageParts.slice(element?.iconIndex).join(' ');
      return (
        <div
          draggable
          onDragStart={(e) => handleDrag(e, element)}
          className={element.parentClassname}
          onClick={() => handleClick(element.id)}
        >
          {element?.icon ? (
            <>
              {firstPart}
              <Icon
                name={element.icon}
                size={15}
                className={element.classname}
              />
              {lastPart}
            </>
          ) : (
            element?.message
          )}
        </div>
      );
    });
  };
  return (
    <div className='w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200'>
      <div className='font-bold'> {'Events'} </div>
      {getActions(Events)}

      <div draggable className='font-bold'>
        {'Motion'}
      </div>
      {getActions(motions)}
      {/* <div
        draggable
        onDragStart={(e) => handleDrag(e, '10')}
        className='flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
      >
        {'Move 10 steps'}
      </div>
      <div
        draggable
        className='flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
      >
        {'Turn '}
        <Icon name='undo' size={15} className='text-white mx-2' />
        {'15 degrees'}
      </div>
      <div
        draggable
        className='flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer'
      >
        {'Turn '}
        <Icon name='redo' size={15} className='text-white mx-2' />
        {'15 degrees'}
      </div> */}
      <div draggable className='font-bold'>
        {'Looks'}
      </div>
      {getActions(looks)}
    </div>
  );
}
