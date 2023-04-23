import React, {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import Input from './Input';
import SubmitButton from './SubmitButton';

type Props = {
  commandInputValue: string;
  setCommandInputValue: Dispatch<SetStateAction<string>>;
  commandInputRef: RefObject<HTMLInputElement>;
};

const Form = ({
  commandInputValue,
  setCommandInputValue,
  commandInputRef,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      if (e.target instanceof HTMLFormElement) {
        e.preventDefault();
        try {
          setLoading(true);
          await fetch(window.location.origin + '/api/select-by-id', {
            method: 'POST',
            body: JSON.stringify({
              username: usernameInput,
              msg: commandInputValue,
            }),
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setCompleted(true);
          setTimeout(() => {
            setCompleted(false);
          }, 1500);
        }
      }
    },
    [commandInputValue, usernameInput]
  );

  return (
    <form
      id='manualcmd'
      onSubmit={handleSubmit}
      className='w-full space-y-6 text-lg mb-12'
    >
      <div className='mb-4'>
        <Input
          type='text'
          id='uid'
          className='block w-full border px-6 py-4 rounded-full focus:outline-none'
          placeholder='username you want send commands to'
          required
          value={usernameInput}
          setState={setUsernameInput}
        />
        <Input
          type='text'
          id='command'
          className='block w-full border px-6 py-4 rounded-full focus:outline-none mt-4'
          placeholder='command (eg: stamina infinite on)'
          required
          refState={commandInputRef}
          value={commandInputValue}
          setState={setCommandInputValue}
        />
      </div>
      <SubmitButton loading={loading} completed={completed} />
    </form>
  );
};

export default Form;
