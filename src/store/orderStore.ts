import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { IOrder, IOrderDetails } from '../constants/interfaces'
import { EOrderType, EStatus } from '../constants/enums'
import { orderService } from '../services/orderService'
import { withLoading } from './middlewares/withLoading'

export interface ISelectedOrder {
  idx: number
  status: EStatus
}
export type TOrderState = {
  orders: IOrder[]
  orderSelected: ISelectedOrder
  fetchOrders: (type: EOrderType) => Promise<boolean>
  selectOrder: (orderId: string, status: EStatus) => void
  clearSelection: () => void
  updateStatusOrder: (orderId: string, status: EStatus) => void
  createNewOrder: (order: IOrderDetails) => Promise<IOrder | null>
  updateOrder: (order: IOrderDetails) => Promise<boolean>
  resetOrders: () => void
}


const initialOrderSelected: ISelectedOrder = {
  idx: - 1,
  status: EStatus.Pendiente
}

export const useOrderStore = create<TOrderState>()(
  immer(
    withLoading(
      (set, get) => (
        {
          orders: [],
          orderSelected: initialOrderSelected,

          fetchOrders: async (type: EOrderType) => {
            try {
              const response = await orderService.getByType(type)
              set({ orders: response.data, orderSelected: initialOrderSelected })

              return true
            } catch {
              return false
            }
          },

          selectOrder: (orderId: string, status: EStatus) => {
            set(state => {
              const idxSelected = state.orders.findIndex(o => o.id == orderId)
              return {
                orderSelected: {
                  idx: idxSelected,
                  status
                }
              }
            })
          },

          clearSelection: () => {
            set({ orderSelected: initialOrderSelected })
          },

          updateStatusOrder: async (orderId: string, status: EStatus) => {
            await orderService.updateStatus(orderId, status)

            const { orders } = get()
            
            const newOrders = structuredClone(orders)
            const idx = newOrders.findIndex(o => o.id === orderId)
            if (idx === -1) return
            newOrders[idx].status = status

            set({ orders: newOrders })
          },

          createNewOrder: async (order: IOrderDetails) => {
            try {
              const newOrder = (await orderService.create(order)).data
              set(state => ({ orders: [...state.orders, newOrder], orderSelected: initialOrderSelected }))
              return newOrder
            } catch {
              return null
            }
          },

          updateOrder: async (order: IOrderDetails) => {
            try {
              await orderService.update(order)
              
              const { orders } = get()
              const newOrders = structuredClone(orders)
              const idxOrder = newOrders.findIndex(o => o.id === order.id)
              if (idxOrder === -1) return false
            
              const orderAnt = newOrders[idxOrder]
              newOrders[idxOrder] = {
                ...orderAnt,
                ...order
              }

              set({ orders: newOrders, orderSelected: initialOrderSelected })
              return true
            } catch (error) {
              console.log(error)
              return false
            }
          },

          resetOrders: () => set({
            orders: [],
            orderSelected: initialOrderSelected
          })
        }
      )
    )
  ),
)