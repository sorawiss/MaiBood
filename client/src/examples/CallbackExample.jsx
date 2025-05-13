import React, { useState, useCallback, useEffect } from 'react';

// Child component that receives the callback
const AuthButton = React.memo(({ onCheck }) => {
  console.log("AuthButton rendered");
  return (
    <button onClick={onCheck}>
      Check Authentication
    </button>
  );
});

// Parent component to demonstrate useCallback
export function CallbackExample() {
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Bad Example: Without useCallback
  // This creates a new function every render
  const checkAuthWithoutCallback = async () => {
    const result = await someAuthCheck();
    setIsAuthenticated(result);
  };

  // Good Example: With useCallback
  // This keeps the same function instance between renders
  const checkAuthWithCallback = useCallback(async () => {
    const result = await someAuthCheck();
    setIsAuthenticated(result);
  }, []); // Empty deps array because it doesn't depend on any values

  // Effect to demonstrate the difference
  useEffect(() => {
    // This would run on every render without useCallback
    checkAuthWithCallback();
  }, [checkAuthWithCallback]);

  return (
    <div>
      <h2>Callback Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment Count
      </button>

      {/* This button will re-render unnecessarily without useCallback */}
      <AuthButton onCheck={checkAuthWithCallback} />
      
      <p>Authentication Status: {isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
    </div>
  );
} 