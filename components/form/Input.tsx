import React, { Dispatch, RefObject, SetStateAction, memo } from 'react';

type Props = {
  required: boolean;
  placeholder: string;
  className: string;
  id: string;
  type: string;
  value: string;
  setState: Dispatch<SetStateAction<string>>;
  refState?: RefObject<HTMLInputElement>;
};

const Input = ({
  required,
  placeholder,
  className,
  id,
  type,
  refState,
  value,
  setState,
}: Props) => {
  return (
    <input
      type={type}
      name={id}
      id={id}
      className={className}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={({ target }) => setState(target.value)}
      ref={refState ? refState : undefined}
    />
  );
};

export default memo(Input);
