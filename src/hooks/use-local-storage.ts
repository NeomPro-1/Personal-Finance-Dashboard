'use client';

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, boolean] {
  const [isReady, setIsReady] = useState(false);
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(error);
        setStoredValue(initialValue);
      } finally {
          setIsReady(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [key, initialValue]);


  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, isReady];
}

export default useLocalStorage;
