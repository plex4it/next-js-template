'use client';

import * as React from 'react';

export function useIsMobile(breakpoint: number = 1024) {
  const query = `(max-width: ${breakpoint - 1}px)`;
  const { subscribe, getSnapshot } = React.useMemo(() => {
    return {
      subscribe: (onStoreChange: () => void) => {
        const mql = window.matchMedia(query);
        mql.addEventListener('change', onStoreChange);
        return () => mql.removeEventListener('change', onStoreChange);
      },
      getSnapshot: () => window.matchMedia(query).matches,
    };
  }, [query]);

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
