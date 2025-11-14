import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useMemo, useState, type JSX } from "react";

type TableColumn<T> = {
  key: string
  label: string
  format?: string
  className?: string
  sortable?: boolean
  displayItem?: (params: TableData<T>) => JSX.Element
};

type TableData<T> = T & (Record<string, any> | null);

type Props<T> = {
  columns: TableColumn<T>[];
  data: TableData<T>[];
  onClick?: (item: TableData<T>) => void;
};

const displayValue = <T,>(
    { key, displayItem }: TableColumn<T>,
    item: TableData<T>
  ) => {
  if (!item) return "";
  if (item[key] == null && !displayItem) return "";
  if (displayItem) return displayItem(item);

  return item[key] ?? "";
};

//#region Sort Utils
type TSortColum = "" | "asc" | "des"
type DicSortColumn = { [k: string]: TSortColum }
  
const fnSort = (a: any, b: any, sort: TSortColum) => {
  if (a == b) return 0
  if (sort === "asc") return a > b ? 1 : -1 
  if (sort === "des") return a > b ? -1 : 1 
  return 0
}

const sortData = <T,>(columnOrder: DicSortColumn, data: TableData<T>[]) => {
  const newData = [...data]
  Object.entries(columnOrder).forEach(([col, sort]) => {
    newData.sort((a, b) => {
      if (a && b) return fnSort(a[col], b[col], sort)
      return 0
    })
  })

  return newData
}

const SortIcon = (props: { sort: TSortColum, size: number, className: string }) => {
  const {sort, size, className } = props

  let IconSort = ChevronsUpDown
  switch (sort) {
    case "asc": IconSort = ChevronUp; break;
    case "des": IconSort = ChevronDown; break;
  }
  return <IconSort size={size} className={className} />
}

const NextOrder: Record<TSortColum, TSortColum> = {
  "": "asc",
  asc: "des",
  des: ""
}

//#endregion

const Table = <T,>({ columns, data, onClick }: Props<T>) => {
  const [columnOrder, setColumnOrder] = useState(columns
    .filter(x => x.sortable ?? false)
    .reduce((prev, curr) => {
      prev[curr.key] = "";
      return prev
    }, {} as {[k: string]: TSortColum })
  )
  const memoData = useMemo(() => sortData(columnOrder, data), [data, columnOrder])

  const onSetOrderColumn = (col: string) => () => {
    setColumnOrder(prev => ({...prev, [col]: NextOrder[prev[col]] }))
  }

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg w-full">
      <table
        id="selection-table"
        className="w-full text-sm text-left text-accent"
      >
        <thead className="text-sm uppercase bg-accent-light text-bold">
          <tr>
            {columns.map(({ key, label, sortable = false, format = "", className = ""}) => (
              <th key={`th-${key}`} className={`p-4 ${className}`} onClick={onSetOrderColumn(key, )}>
                <span
                  className={`flex items-center ${sortable && "cursor-pointer"}`}
                  data-format={format}
                >
                  {label}
                  {/* {sortable && <ChevronsUpDown size={15} className="ml-2" />} */}
                  {sortable && <SortIcon sort={columnOrder[key]} size={15} className="ml-2"/> }
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {memoData.map((item, index) => (
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
                  {displayValue<T>(col, item)}
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
