import { useState, useEffect } from 'react';

// Define an interface for the options object
interface UseLocalStorageStateOptions<T> {
  key: string;
  defaultValue: T;
}

function useLocalStorageState<T>({
  key,
  defaultValue,
}: UseLocalStorageStateOptions<T>): [T, (newState: T) => void] {
  // Initial state to defaultValue or the value from localStorage
  const [state, setState] = useState<T>(() => {
    const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
