import { useState, useEffect } from 'react';

export default function useDebounce<S>(value: S, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<S>(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [delay, value],
  );

  return debouncedValue;
}
