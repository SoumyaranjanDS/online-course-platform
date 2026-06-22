import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Skillwell';

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}