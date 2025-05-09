import React from 'react';

export default function CustomButton({ isLoading, onClick, children }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`custom-button relative flex items-center justify-center px-4 py-2 rounded-lg text-primary font-medium 
                 transition duration-300 bg-aceent w-full h-[3rem]
                 ${isLoading && 'cursor-not-allowed'}
                 disabled:opacity-75`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        children
      )}
    </button>
  );
}


// Spinner component
function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-primary "
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
