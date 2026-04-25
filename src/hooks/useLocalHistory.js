import { useMemo } from 'react';
import { useKeshCareStore } from '../store/useKeshCareStore';

export function useLocalHistory() {
  const history = useKeshCareStore((s) => s.history);

  const latestEntries = useMemo(() => history.slice(0, 3), [history]);

  return {
    history,
    latestEntries,
    hasHistory: history.length > 0,
  };
}
