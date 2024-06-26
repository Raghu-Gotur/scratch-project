import React from 'react';
import Icon from './Icon';

export default function MidArea({
  actions,
  handleDrop,
  handleDragOver,
  updateActions,
  handleClick,
}) {
  const getActions = (element, index) => {
    let messageParts = element?.message?.split(' ');
    const firstPart = messageParts[element?.iconIndex - 1] + ' ';
    const lastPart = messageParts.slice(element?.iconIndex).join(' ');
    return (
      <div className={element.parentClassname + ' justify-between'}>
        <div
          onClick={() => handleClick(element.id)}
          style={{
            width: '90%',
          }}
        >
          {element?.icon ? (
            <div className='flex'>
              {firstPart}
              <Icon
                name={element.icon}
                size={15}
                className={element.classname}
              />
              {lastPart}
            </div>
          ) : (
            <div>{element?.message}</div>
          )}
        </div>
        <div onClick={() => updateActions(index)}>
          <Icon name={'trash'} size={15} className='text-red-500 ' />
        </div>
      </div>
    );
  };

  const executeSequentially = async (actions) => {
    for (const action of actions) {
      handleClick(action?.id);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  return (
    <div
      className='flex-1 h-full overflow-auto'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div>
        <button
          className='text-white bg-green-500 rounded-lg w-44 p-2 m-2 center'
          onClick={() => {
            executeSequentially(actions);
          }}
        >
          Play
        </button>
      </div>
      {actions?.map((action, index) => {
        return <div key={index}>{getActions(action, index)}</div>;
      })}
    </div>
  );
}
