import {Link, useNavigate} from 'react-router-dom'
import {Minus, Plus, ShoppingBag, Trash2} from 'lucide-react'
import {useAuth, useCart} from '../store'

export default function Cart() {
    const {items, setQty, remove, total} = useCart()
    const user = useAuth((s) => s.user)
    const navigate = useNavigate()

    const handleCheckout = () => {
        if (!user) {
            navigate('/login?redirect=/checkout')
        } else {
            navigate('/checkout')
        }
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4"/>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Browse our toys and find something fun!</p>
                <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                    Shop toys
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.productId} className="bg-white rounded-lg border p-4 flex gap-4">
                            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded object-cover"/>
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-500 text-sm">${(item.priceCents / 100).toFixed(2)} each</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center border rounded">
                                        <button
                                            onClick={() => setQty(item.productId, item.quantity - 1)}
                                            className="p-1.5 hover:bg-gray-100"
                                        >
                                            <Minus size={14}/>
                                        </button>
                                        <span className="px-3 text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => setQty(item.productId, item.quantity + 1)}
                                            className="p-1.5 hover:bg-gray-100"
                                        >
                                            <Plus size={14}/>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => remove(item.productId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">${(item.priceCents * item.quantity / 100).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-lg border p-6 h-fit">
                    <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${(total() / 100).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold pt-2 border-t">
                            <span>Total</span>
                            <span>${(total() / 100).toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
                    >
                        Proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    )
}