import React, { memo, useEffect, useState } from 'react';
import commands from '@/src/commands.json';
import Command from './Command';

type Props = {
  handleClick: (value: string) => void;
};

const Commands = ({ handleClick }: Props) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`mt-8 ${isDesktop ? 'grid grid-cols-2 gap-4' : ''}`}>
      {commands.map((field, index) => (
        <Command handleClick={handleClick} key={index} field={field} />
      ))}
    </div>
  );
};

export default memo(Commands);
