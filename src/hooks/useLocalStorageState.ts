'use client'

import { useState, useEffect } from 'react';

interface UseLocalStorageStateOptions<T> {
  key: string;
  defaultValue: T;
  getInitialValueInEffect?: boolean;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T; 
}

function useLocalStorageState<T>({
  key,
  defaultValue,
  getInitialValueInEffect = true,
  serialize = JSON.stringify, 
  deserialize = JSON.parse,
}: UseLocalStorageStateOptions<T>): [T, (newState: T | ((prevState: T) => T)) => void] {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined' || !getInitialValueInEffect) return;
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setState(deserialize(storedValue));
      }
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”: ', error);
    }
  }, [key, getInitialValueInEffect, deserialize]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const serializedState = serialize(state);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Error writing to localStorage key “' + key + '”: ', error);
    }
  }, [key, state, serialize]);

  return [state, setState];
}

export default useLocalStorageState;
