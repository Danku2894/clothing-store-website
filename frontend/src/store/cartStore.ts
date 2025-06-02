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
            return {
              items: state.items.map((item) =>
                item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                  ? { ...item, quantity: Math.min(10, item.quantity + newItem.quantity) }
                  : item
              ),
            }
          }

          return { items: [...state.items, newItem] }
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
      getSubtotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getShippingFee: () => 30000, // Fixed shipping fee of 30,000₫
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