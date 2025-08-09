export const getArrayFromEnum = <T extends Record<string, string | number>>(
  obj: T
) => {
  return Object.entries(obj).map(([key, value]) => ({
    value: value,
    label: key,
  }));
};
