export const getArrayFromEnum = <T extends Record<string, string | number>>(
  obj: T,
  filterDoubleKey: boolean = true
) => {
  const entries = Object.entries(obj)

  if (filterDoubleKey)
    return entries.filter(([, value]) => typeof value != "string").map(([key, value]) => ({
    value: value,
    label: key,
  }))

  return entries.map(([, value]) => ({
    value: value,
    label: value,
  }))
};

export const muestraFecha = (date: Date) => {
  return date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
};

const parseValueByType = (oldValue: any, newValue: any) => {
  if (oldValue === null || oldValue === undefined) return newValue

  if (typeof oldValue === "number") return Number(newValue)
  if (typeof oldValue === "boolean") return newValue === "true" || newValue === true
  if (oldValue instanceof Date) return new Date(newValue)
  
  return newValue
};

export const setDeepValue = (object: any, propertyPath: string, value: any) => {
    const keys = propertyPath.split(".")
    const updated = { ...object }

    let current: any = updated
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        const oldValue = current[key]
        current[key] = parseValueByType(oldValue, value)
      } else {
        current[key] = { ...current[key] }
        current = current[key]
      }
    });

    return updated
}