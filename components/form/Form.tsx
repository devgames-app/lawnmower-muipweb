import { config } from '@/src/config';
import React, {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useState,
} from 'react';

type Props = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  commandInputRef: RefObject<HTMLInputElement>;
};

const Form = ({ inputValue, setInputValue, commandInputRef }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      const { host, port, region } = config;
      try {
        setLoading(true);
        const uid = e.target.uid.value;
        const command = e.target.command.value;
        await fetch(
          `http://${host}:${port}/api?region=${region}&ticket=GM&cmd=1116&uid=${uid}&msg=${command}`
        );
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
  };

  return (
    <form
      id='manualcmd'
      onSubmit={handleSubmit}
      className='w-full space-y-6 text-lg mb-12'
    >
      <div className='mb-4'>
        <input
          type='number'
          name='uid'
          id='uid'
          className='block w-full border px-6 py-4 rounded-full focus:outline-none'
          placeholder='UID you want send commands to'
          required
        />
        <input
          type='text'
          name='command'
          id='command'
          className='block w-full border px-6 py-4 rounded-full focus:outline-none mt-4'
          placeholder='command (eg: stamina infinite on)'
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          ref={commandInputRef}
        />
      </div>
      <div>
        <button
          id='submit-command'
          className={`block w-full px-6 py-4 bg-blue-700 text-white rounded-full relative ${
            loading ? 'bg-gray-500 cursor-not-allowed' : ''
          }`}
          type='submit'
          disabled={loading}
          style={{
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          {loading && (
            <div id='spinner'>
              <div className='loading'></div>
            </div>
          )}
          <span
            className={`${
              loading || completed ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-500`}
            style={{
              visibility: loading || completed ? 'hidden' : 'visible',
            }}
          >
            Submit
          </span>
          {completed && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M8.25 14.28L4.22 10.25l1.47-1.46 2.56 2.56L14.28 5l1.47 1.47-7 7.05z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
