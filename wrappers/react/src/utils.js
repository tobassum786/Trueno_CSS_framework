import { useMemo } from 'react';

export const FOCUSABLE_SELECTOR =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    }
  };
}

export function useTruenoId(prefix) {
  return useMemo(() => `${prefix || 'tr'}-${Math.random().toString(36).slice(2, 8)}`, [prefix]);
}
