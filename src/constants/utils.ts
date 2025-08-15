export const getArrayFromEnum = <T extends Record<string, string | number>>(
  obj: T
) => {
  return Object.entries(obj).map(([key, value]) => ({
    value: value,
    label: key,
  }));
};

export const muestraFecha = (date: Date) => {
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
