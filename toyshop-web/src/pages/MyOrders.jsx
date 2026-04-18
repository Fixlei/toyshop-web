import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

const STATUS_LABELS = {
    PENDING_PAYMENT: { text: 'Pending payment', cls: 'bg-yellow-100 text-yellow-800' },
    PAID: { text: 'Paid', cls: 'bg-green-100 text-green-800' },
    SHIPPED: { text: 'Shipped', cls: 'bg-blue-100 text-blue-800' },
    DELIVERED: { text: 'Delivered', cls: 'bg-gray-100 text-gray-800' },
    CANCELLED: { text: 'Cancelled', cls: 'bg-red-100 text-red-800' },
    REFUNDED: { text: 'Refunded', cls: 'bg-gray-100 text-gray-800' }
}

export default function MyOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/orders/mine')
            .then((r) => setOrders(r.data))
            .catch(() => setOrders([]))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-gray-500">Loading...</p>

    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 mt-4">
                    Start shopping
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => {
                    const label = STATUS_LABELS[order.status] || { text: order.status, cls: 'bg-gray-100 text-gray-800' }
                    return (
                        <div key={order.id} className="bg-white rounded-lg border p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-bold">Order #{order.id}</h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${label.cls}`}>
                    {label.text}
                  </span>
                                    <p className="text-xl font-bold mt-1">${(order.totalCents / 100).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                {order.items?.length || 0} item(s)
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}