

export const storageService = {
  setItem: <T>(key: string, value: T): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item "${key}" to localStorage`, error);
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const item = sessionStorage.getItem(key);
      return item != null ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error getting item "${key}" from localStorage`, error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item "${key}" from localStorage`, error);
    }
  },

  clearStorage: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  },
}
