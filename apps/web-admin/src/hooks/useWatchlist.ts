import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nexora_watchlist';
const EVENT_KEY = 'nexora-watchlist-changed';
const DEFAULT_WATCHLIST = ['vod-01', 'vod-02'];

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WATCHLIST));
      return DEFAULT_WATCHLIST;
    } catch {
      return DEFAULT_WATCHLIST;
    }
  });

  const syncState = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWatchlist(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) syncState();
    };
    const handleCustom = () => syncState();

    window.addEventListener('storage', handleStorage);
    window.addEventListener(EVENT_KEY, handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EVENT_KEY, handleCustom);
    };
  }, [syncState]);

  const saveWatchlist = useCallback((newList: string[]) => {
    setWatchlist(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch (err) {
      console.error('Failed to save watchlist to localStorage:', err);
    }
  }, []);

  const toggleWatchlist = useCallback(
    (id: string) => {
      setWatchlist((prev) => {
        const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          window.dispatchEvent(new Event(EVENT_KEY));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const isInWatchlist = useCallback(
    (id: string) => watchlist.includes(id),
    [watchlist]
  );

  const addToWatchlist = useCallback(
    (id: string) => {
      if (!watchlist.includes(id)) {
        saveWatchlist([...watchlist, id]);
      }
    },
    [watchlist, saveWatchlist]
  );

  const removeFromWatchlist = useCallback(
    (id: string) => {
      if (watchlist.includes(id)) {
        saveWatchlist(watchlist.filter((item) => item !== id));
      }
    },
    [watchlist, saveWatchlist]
  );

  return {
    watchlist,
    toggleWatchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    count: watchlist.length,
  };
};

export default useWatchlist;
