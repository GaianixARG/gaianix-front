const useCalendar = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  return { formatDate, dayNames };
};

export default useCalendar;
