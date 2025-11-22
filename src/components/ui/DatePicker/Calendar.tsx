import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import useCalendar from "../../../hooks/useCalendar";
import { muestraFecha } from "../../../constants/utils";

type Props = {
  viewDate: Date;
  selectedDate: Date;
  setViewDate: React.Dispatch<React.SetStateAction<Date>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (date: string) => void;
  disablePreviousDate?: boolean
};

const Calendar = ({
  viewDate,
  selectedDate,
  setViewDate,
  setSelectedDate,
  setShowPicker,
  onChange,
  disablePreviousDate = true
}: Props) => {

  const { formatToValue, muestraMes, dayNames, getToday } = useCalendar()

  const today = getToday()
  
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i, 1));
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (onChange) onChange(formatToValue(date));
    setShowPicker(false);
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setViewDate(newDate);
  };

  return (
    <div className="p-2 bg-gray-20 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2 px-2">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="hover:text-primary"
          title="Mes anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold uppercase">
          {muestraMes(viewDate)}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="hover:text-primary"
          title="Mes siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs px-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center font-semibold text-accent-light">
            {d}
          </div>
        ))}
        {days.map((day, i) => (
          <button
            type="button"
            key={`day_index_${i}`}
            className={`rounded px-0 py-2 transition-colors text-xs ${
              day ? "hover:bg-primary-light/70" : ""
              } ${
              day && muestraFecha(day) === muestraFecha(selectedDate)
                ? "bg-primary text-white"
                : "text-gray-800"
            }`}
            onClick={() => day && handleDateClick(day)}
            disabled={!day || (disablePreviousDate && (day < today))}
          >
            {day ? day.getDate() : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
