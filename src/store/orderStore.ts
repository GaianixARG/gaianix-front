import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { IOrder, IOrderDetails } from '../constants/interfaces'
import { EOrderType, EStatus } from '../constants/enums'
import { orderService } from '../services/orderService'
import { withLoading } from './middlewares/withLoading'

export type TOrderState = {
  orders: IOrder[]
  orderSelected: number
  fetchOrders: (type: EOrderType) => Promise<boolean>
  selectOrder: (orderId: string) => void
  updateStatusOrder: (orderId: string, status: EStatus) => void
  createNewOrder: (order: IOrderDetails) => Promise<IOrder | null>
  updateOrder: (order: IOrderDetails) => Promise<boolean>
  resetOrders: () => void
}

export const useOrderStore = create<TOrderState>()(
  immer(
    withLoading(
      (set, get) => (
        {
          orders: [],
          orderSelected: -1,

          fetchOrders: async (type: EOrderType) => {
            try {
              const response = await orderService.getByType(type)
              set({ orders: response.data, orderSelected: -1 })

              return true
            } catch {
              return false
            }
          },

          selectOrder: (orderId: string) => {
            set(state => ({ orderSelected: state.orders.findIndex(o => o.id == orderId) }))
          },

          updateStatusOrder: (orderId: string, status: EStatus) => {
            const { orders, updateOrder } = get()
            
            const order = orders.find(o => o.id === orderId)
            if (!order) return
            
            order.status = status
            updateOrder(order)
          },

          createNewOrder: async (order: IOrderDetails) => {
            try {
              const newOrder = (await orderService.create(order)).data
              set(state => ({ orders: [...state.orders, newOrder], orderSelected: -1 }))
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

              set({ orders: newOrders, orderSelected: -1 })
              return true
            } catch {
              return false
            }
          },

          resetOrders: () => set({
            orders: [],
            orderSelected: -1
          })
        }
      )
    )
  ),
)