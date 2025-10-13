const useCalendar = () => {
  const muestraFecha = (date: Date) => {
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatToValue = (date: Date) => date.toISOString()
  const muestraMes = (date: Date) => date.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  })

  const stringToDate = (dateStr: string) => new Date(Date.parse(dateStr.split("/").reverse().join("-")))

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return { muestraFecha, muestraMes, formatToValue, stringToDate, dayNames };
};

export default useCalendar;
