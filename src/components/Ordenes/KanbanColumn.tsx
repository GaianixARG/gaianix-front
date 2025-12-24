import { FilterIcon, PlusIcon, SortAscIcon } from "lucide-react"
import OrderCard from "./OrderCard"
import Button from "../ui/Button"
import Badge from "../ui/Badge"
import {
  BG_PER_STATUS_COLOR,
  COLOR_PER_STATUS,
  STATUS_NAME,
  TEXT_PER_STATUS_COLOR,
} from "../../constants/conversiones"
import { EStatus } from "../../constants/enums"
import { useAlertStore } from "../../store/alertStore"
import { useOrderStore } from "../../store/orderStore"
import type { TColors } from "../../constants/types"
import { useDragAndDrop } from "../../hooks/useDragAndDrop"

type Props = {
  status: EStatus
  onDropOrder: (orderId: string, newStatus: EStatus) => void
  onSelectOrder: (orderId: string, status: EStatus) => void
}

const getClaseTextoTituloColumna = (colorStatus: TColors) => `uppercase ${TEXT_PER_STATUS_COLOR[colorStatus]} font-bold me-1`
const getBgContainer = (isActive: boolean, colorStatus: TColors) => `p-4 rounded-xl shadow-md transition-colors w-full min-w-0 
  ${isActive ? BG_PER_STATUS_COLOR[colorStatus] : "bg-gray-200/50"}`

const KanbanColumn = ({
  status,
  onDropOrder,
  onSelectOrder
}: Props) => {
  const orders = useOrderStore(state => state.orders).filter(x => x.status === status)

  const { isActive, handleDragStart, handleDropEnd, handleOnDragOver, handleOnDragLeave } = useDragAndDrop({
    status,
    onDropOrder
  })

  const showAlert = useAlertStore(state => state.showAlert)

  const colorStatus = COLOR_PER_STATUS[status]
  const claseTextoTituloColumna = getClaseTextoTituloColumna(colorStatus)
  const bgContainer = getBgContainer(isActive, colorStatus)
  
  const handleSelectOrder = (orderId: string, status: EStatus) => () => {
    onSelectOrder(orderId, status)
  }

  return (
    <div
      className={bgContainer}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleDropEnd}
    >
      <div className="flex items-center justify-between bg-white text-sm font-semibold p-2 rounded-full">
        <div className="flex items-center gap-2">
          <Badge
            color="accent"
            label={orders.length.toFixed(0)}
            className="py-1"
          />
          <span className={claseTextoTituloColumna}>{STATUS_NAME[status]}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            tipo="white"
            className="p-1"
            onClick={handleSelectOrder("", status)}
            title="Crear nueva orden"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                message: "Ordenar - Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Ordenar"
          >
            <SortAscIcon className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                message: "Filtrar - Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Filtrar"
          >
            <FilterIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="
      overflow-x-auto xl:overflow-x-visible   /* scroll horizontal en mobile */
      xl:overflow-y-auto                      /* scroll vertical en XL */
      max-h-[70vh]                            /* limite de altura de la columna, ajustable */
      p-3
      snap-x xl:snap-y">
        <div className="
        flex flex-row xl:flex-col gap-3
        min-w-full xl:min-w-0
        snap-mandatory">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
              onDragStart={handleDragStart}
              onClick={handleSelectOrder(order.id, status)}
            />
          ))
        ) : (
          <p className="text-xs text-muted-foreground italic">Sin órdenes</p>
          )}
          </div>
      </div>
    </div>
  )
}

export default KanbanColumn
