function isoFormatToDate(s: string) {  
  const b = s.split(/\D+/);
  let month = +b[1]
  return new Date(Date.UTC(+b[0], --month, +b[2], +b[3], +b[4], +b[5], +b[6]));
}

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

  const stringToDate = (dateStr: string) => isoFormatToDate(dateStr)

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getToday = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return today
  }

  return { muestraFecha, muestraMes, formatToValue, stringToDate, dayNames, getToday };
};

export default useCalendar;
