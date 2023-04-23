import { useState, useRef, useCallback } from 'react';
import Commands from '@/components/Commands';
import Form from '@/components/form/Form';

const App = () => {
  const [commandInputValue, setCommandInputValue] = useState<string>('');
  const commandInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback((value: string) => {
    if (commandInputRef.current) {
      commandInputRef.current.focus();
      setCommandInputValue(value);
    }
  }, []);

  return (
    <div id='container' className='w-full max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-2xl mb-8 text-center font-medium'>MUIP Web Page</h1>
      <Form
        commandInputValue={commandInputValue}
        setCommandInputValue={setCommandInputValue}
        commandInputRef={commandInputRef}
      />
      <Commands handleClick={handleClick} />
    </div>
  );
};
export default App;
