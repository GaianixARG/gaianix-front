let subscribers: ((loading: boolean) => void)[] = [];

export const subscribeGlobalLoading = (callback: (loading: boolean) => void) => {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);
  };
};

export const setGlobalLoading = (value: boolean) => {
  subscribers.forEach((cb) => cb(value));
};
