import { useEffect, useRef } from 'react';

// usePrevious: Custom hook for keeping track of the previous value of a state or prop.
// T is a generic type parameter, allowing usePrevious to be used with any type of value.
export default function usePrevious<T>(value: T): T | undefined {
  // useRef is used to create a ref object.
  const ref = useRef<T>();

  // useEffect hook to update the ref with the current value whenever the value changes.
  useEffect(() => {
    ref.current = value;
  }, [value]); // Dependency array: the effect runs only when 'value' changes.

  // The function returns the current (previous) value of the ref.
  return ref.current;
}
