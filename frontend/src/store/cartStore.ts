import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  name: string
  price: number
  size: string
  color: string
  quantity: number
  imageSrc: string
  imageAlt: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getTotal: () => number
  getShippingFee: () => number
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
          )

          if (existingItem) {
            const newQuantity = Math.min(10, existingItem.quantity + newItem.quantity)
            return {
              items: state.items.map((item) =>
                item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            }
          }

          return { items: [...state.items, { ...newItem, quantity: Math.min(10, newItem.quantity) }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, Math.min(10, quantity)) } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getItemCount: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },
      getSubtotal: () => {
        const state = get()
        return Math.round(state.items.reduce((total, item) => total + item.price * item.quantity, 0))
      },
      getShippingFee: () => {
        const state = get()
        // Miễn phí vận chuyển cho đơn hàng trên 1,000,000₫
        const subtotal = state.getSubtotal()
        return subtotal >= 1000000 ? 0 : 30000
      },
      getTotal: () => {
        const state = get()
        return state.getSubtotal() + state.getShippingFee()
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore