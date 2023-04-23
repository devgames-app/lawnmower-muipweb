import React, { memo } from 'react';

type Props = {
  field: {
    text: string;
    desc: string;
  };
  handleClick: (value: string) => void;
};

const Command = ({ field, handleClick }: Props) => {
  return (
    <div>
      <button
        className='block w-full border px-6 py-4 rounded-md shadow-md focus:outline-none bg-gray-200'
        onClick={() => handleClick(field.text)}
      >
        {field.text}
      </button>
      <span className='block mt-2'>{field.desc}</span>
    </div>
  );
};

export default memo(Command);
