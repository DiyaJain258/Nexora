import { useState, useEffect, useCallback } from 'react';

export interface ConnectedDevice {
  id: string;
  name: string;
  location: string;
  code?: string;
  type: 'tv' | 'mobile' | 'tablet' | 'desktop';
  status: string;
  ip: string;
  activatedAt?: string;
  isPrimary?: boolean;
}

const STORAGE_KEY = 'nexora_subscriber_devices';
const EVENT_KEY = 'nexora-devices-changed';

export const DEFAULT_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev-1',
    name: 'Samsung Neo QLED 8K',
    location: 'Living Room TV',
    type: 'tv',
    status: 'Streaming 4K HDR',
    ip: '192.168.1.104',
    isPrimary: true,
    code: 'NEX-8821',
  },
  {
    id: 'dev-2',
    name: 'Apple TV 4K (Gen 3)',
    location: 'Master Bedroom',
    type: 'tv',
    status: 'Standby • Ready',
    ip: '192.168.1.118',
    isPrimary: false,
    code: 'NEX-4492',
  },
  {
    id: 'dev-3',
    name: 'iPhone 15 Pro Max',
    location: 'Mobile App',
    type: 'mobile',
    status: 'Active Now',
    ip: '5G Cellular',
    isPrimary: false,
  },
];

export const useSubscriberDevices = () => {
  const [devices, setDevices] = useState<ConnectedDevice[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DEVICES));
      return DEFAULT_DEVICES;
    } catch {
      return DEFAULT_DEVICES;
    }
  });

  const syncState = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setDevices(parsed);
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

  const saveDevices = useCallback((newList: ConnectedDevice[]) => {
    setDevices(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch (err) {
      console.error('Failed to save devices to localStorage:', err);
    }
  }, []);

  const addDevice = useCallback(
    (deviceData: Omit<ConnectedDevice, 'id'>): ConnectedDevice => {
      const newDev: ConnectedDevice = {
        ...deviceData,
        id: `dev-${Date.now()}`,
        activatedAt: deviceData.activatedAt || new Date().toISOString(),
      };
      const updated = [newDev, ...devices];
      saveDevices(updated);
      return newDev;
    },
    [devices, saveDevices]
  );

  const removeDevice = useCallback(
    (id: string) => {
      const updated = devices.filter((d) => d.id !== id);
      saveDevices(updated);
    },
    [devices, saveDevices]
  );

  const updateDeviceLocation = useCallback(
    (id: string, newLocation: string) => {
      const updated = devices.map((d) => (d.id === id ? { ...d, location: newLocation } : d));
      saveDevices(updated);
    },
    [devices, saveDevices]
  );

  return {
    devices,
    addDevice,
    removeDevice,
    updateDeviceLocation,
    count: devices.length,
  };
};
