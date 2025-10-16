import { ChevronsUpDown } from "lucide-react";
import type { JSX } from "react";

type TableColumn<T> = {
  key: string
  label: string
  format?: string
  className?: string
  displayItem?: (params: TableData<T>) => JSX.Element
};

type TableData<T> = T & (Record<string, any> | null);

type Props<T> = {
  columns: TableColumn<T>[];
  data: TableData<T>[];
  onClick?: (item: TableData<T>) => void;
};

const Table = <T,>({ columns, data, onClick }: Props<T>) => {
  const displayValue = (
    { key, displayItem }: TableColumn<T>,
    item: TableData<T>
  ) => {
    if (!item) return "";
    if (item[key] == null && !displayItem) return "";
    if (displayItem) return displayItem(item);

    return item[key] ?? "";
  };

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg w-full">
      <table
        id="selection-table"
        className="w-full text-sm text-left text-accent"
      >
        <thead className="text-sm uppercase bg-accent-light text-bold">
          <tr>
            {columns.map(({ key, label, format = "", className = ""}) => (
              <th key={`th-${key}`} className={`p-4 ${className}`}>
                <span
                  className="flex items-center cursor-pointer"
                  data-format={format}
                >
                  {label}
                  <ChevronsUpDown size={15} className="ml-2" />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={`tr-${index}`}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={onClick ? () => onClick(item) : undefined}
            >
              {columns.map((col) => (
                <td
                  key={`td-${index}-${col.key}`}
                  className="p-3 whitespace-nowrap"
                >
                  {displayValue(col, item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
