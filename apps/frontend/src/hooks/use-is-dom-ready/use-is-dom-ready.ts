import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseIsDomReady {
  count: number;
  increment: () => void;
}

export function useIsDomReady(): boolean {
  const [isDomReady, setIsDomReady] = useState(false);
  useEffect(() => {
    setIsDomReady(true);
  }, []);
  return isDomReady;
}

export default useIsDomReady;
