import { memo } from 'react';

type Props = {
  loading: boolean;
  completed: boolean;
};

const SubmitButton = ({ loading, completed }: Props) => {
  return (
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
  );
};

export default memo(SubmitButton);
