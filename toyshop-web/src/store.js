import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(persist(
    (set, get) => ({
        items: [],
        add: (product, qty = 1) => set((s) => {
            const existing = s.items.find((i) => i.productId === product.id)
            if (existing) {
                return {
                    items: s.items.map((i) =>
                        i.productId === product.id ? { ...i, quantity: i.quantity + qty } : i
                    )
                }
            }
            return {
                items: [...s.items, {
                    productId: product.id,
                    name: product.name,
                    priceCents: product.priceCents,
                    imageUrl: product.imageUrl,
                    quantity: qty
                }]
            }
        }),
        remove: (productId) => set((s) => ({
            items: s.items.filter((i) => i.productId !== productId)
        })),
        setQty: (productId, qty) => set((s) => ({
            items: s.items.map((i) =>
                i.productId === productId ? { ...i, quantity: Math.max(1, qty) } : i
            )
        })),
        clear: () => set({ items: [] }),
        total: () => get().items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
        count: () => get().items.reduce((sum, i) => sum + i.quantity, 0)
    }),
    { name: 'toyshop-cart' }
))

export const useAuth = create(persist(
    (set) => ({
        user: null,
        token: null,
        login: (user, token) => set({ user, token }),
        logout: () => set({ user: null, token: null })
    }),
    { name: 'toyshop-auth' }
))