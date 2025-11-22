import { useState, useRef, useEffect } from "react";
import { CalendarDaysIcon } from "lucide-react";
import Calendar from "./Calendar";
import useCalendar from "../../../hooks/useCalendar";

type Props = {
  label: string;
  id: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  classNameLabel?: string;
  required?: boolean;
  onChange?: (date: string) => void;
};

const DatePicker = ({
  label,
  id,
  className,
  placeholder,
  defaultValue,
  classNameLabel,
  required = false,
  onChange,
}: Props) => {
  const { muestraFecha, formatToValue, stringToDate, getToday } = useCalendar();
  
  const today = getToday();

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [viewDate, setViewDate] = useState<Date>(today);


  useEffect(() => {
    if (defaultValue != null) {
      const defaultDate = stringToDate(defaultValue)
      if (defaultValue !== formatToValue(selectedDate)) setSelectedDate(defaultDate)
      if (defaultValue !== formatToValue(viewDate)) setViewDate(defaultDate)
    }
  }, [defaultValue, formatToValue, stringToDate, selectedDate, viewDate])

  const [showPicker, setShowPicker] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [dropdownDirection, setDropdownDirection] = useState<"down" | "up">(
    "down"
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showPicker && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownHeight = 260; // aprox
      if (rect.bottom + dropdownHeight > windowHeight) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  }, [showPicker]);

  const classLabel = `block text-sm font-medium text-accent-light ${
    classNameLabel ?? ""
  }`;

  return (
    <div ref={ref} className={"relative " + (className ?? "")}>
      <label htmlFor={id} className={classLabel}>
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <CalendarDaysIcon className="w-4 h-4 text-accent-light" />
        </div>
        <input
          id={id}
          name={id}
          type="text"
          required={required}
          readOnly
          value={muestraFecha(selectedDate)}
          onClick={() => setShowPicker(!showPicker)}
          placeholder={placeholder ?? "Seleccionar fecha"}
          className="block w-full ps-10 p-2.5 text-sm rounded-lg bg-gray-700 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none cursor-pointer"
        />
      </div>
      {showPicker && (
        <div
          className={`absolute z-50 w-xs rounded-lg border bg-white shadow-lg ${
            dropdownDirection === "down" ? "mt-2 top-full" : "bottom-full mb-2"
          }`}
        >
          <Calendar
            viewDate={viewDate}
            setViewDate={setViewDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setShowPicker={setShowPicker}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
