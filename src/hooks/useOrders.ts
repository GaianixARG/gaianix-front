import type { IOrderDetails } from "../constants/interfaces"
import { EStatus } from "../constants/enums"
import { useOrderStore } from "../store/orderStore"
import { useAlertStore } from "../store/alertStore"

const useOrders = () => {
  const orders = useOrderStore(state => state.orders)
  const updateStatusOrder = useOrderStore(state => state.updateStatusOrder)
  const createNewOrder = useOrderStore(state => state.createNewOrder)
  const updateOrder = useOrderStore(state => state.updateOrder)

  const showAlert = useAlertStore(state => state.showAlert)

  const getOrdersByStatus = (status: EStatus) => {
    return orders.filter((order) => order.status === status)
  }

  const handleDropOrder = (orderId: string, newStatus: EStatus) => {
    updateStatusOrder(orderId, newStatus)
  }

  const addNewOrder = async (order: IOrderDetails) => {
    const newOrder = await createNewOrder(order)
    const exito = newOrder != null
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? `Orden ${newOrder.codigo} creada exitosamente` : "Error al crear la orden"
    })
  }

  const updateOrderDetails = async (order: IOrderDetails) => {
    const exito = await updateOrder(order)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? `Orden ${order.codigo} actualizada exitosamente` : "Error al actualizar la orden"
    })
  }

  return {
    orders,
    getOrdersByStatus,
    handleDropOrder,
    addNewOrder,
    updateOrder: updateOrderDetails
  }
}

export default useOrders
