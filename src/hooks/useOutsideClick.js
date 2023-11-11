import { useEffect } from 'react';

export const useOutsideClick = (ref, callback, listenCapturing = true) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('click', handleClick, listenCapturing);
    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [ref, callback, listenCapturing]);
};
