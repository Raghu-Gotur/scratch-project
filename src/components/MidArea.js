import React from 'react';
import Icon from './Icon';

export default function MidArea({
  actions,
  handleDrop,
  handleDragOver,
  updateActions,
  handleClick,
  handleReset,
}) {
  const getActions = (element, index) => {
    let messageParts = element?.message?.split(' ');
    const firstPart = messageParts[element?.iconIndex - 1] + ' ';
    const lastPart = messageParts.slice(element?.iconIndex).join(' ');
    return (
      <div
        className={
          element.parentClassname + ' justify-between rounded-sm p-2 m-4'
        }
      >
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

  const sequentialExecute = async (actions) => {
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
      <div className='flex justify-around'>
        <div
          className='inline-flex items-center justify-center p-2 m-2 w-16 h-16 rounded-full cursor-pointer hover:bg-green-200'
          onClick={() => {
            sequentialExecute(actions);
          }}
        >
          <Icon name='flag' className='text-green-600' size={30} />
        </div>

        <div
          className='inline-flex items-center justify-center p-2 m-2 w-16 h-16 rounded-full cursor-pointer hover:bg-red-100'
          onClick={() => {
            handleReset();
          }}
        >
          <Icon name='undo' className='text-red-600' size={30} />
        </div>
      </div>
      {actions?.map((action, index) => {
        return <div key={index}>{getActions(action, index)}</div>;
      })}
    </div>
  );
}
