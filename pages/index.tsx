import { useState, useRef, FormEvent, useCallback } from 'react';
import Commands from '@/components/Commands';
import Form from '@/components/form/Form';

export default function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const commandInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback((value: string) => {
    if (commandInputRef.current) {
      commandInputRef.current.focus();
      setInputValue(value);
    }
  }, []);

  return (
    <div id='container' className='w-full max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-2xl mb-8 text-center font-medium'>MUIP Web Page</h1>
      <Form
        inputValue={inputValue}
        setInputValue={setInputValue}
        commandInputRef={commandInputRef}
      />
      <Commands handleClick={handleClick} />
    </div>
  );
}
