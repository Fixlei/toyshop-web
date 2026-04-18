import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js'
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js'
import api from '../api'
import {useCart} from '../store'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function CheckoutForm({orderId}) {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const clearCart = useCart((s) => s.clear)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) return
        setLoading(true)
        setError(null)

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-success?orderId=${orderId}`
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            clearCart()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement/>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
            >
                {loading ? 'Processing...' : 'Pay now'}
            </button>
        </form>
    )
}

export default function Checkout() {
    const {items, total} = useCart()
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [address, setAddress] = useState({
        street: '', city: '', state: '', zip: '', country: 'US'
    })
    const [addressSubmitted, setAddressSubmitted] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (items.length === 0 && !addressSubmitted) navigate('/cart')
    }, [items, addressSubmitted, navigate])

    const handleAddressSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const addrRes = await api.post('/api/addresses', address)
            const orderRes = await api.post('/api/orders', {
                addressId: addrRes.data.id,
                items: items.map((i) => ({productId: i.productId, quantity: i.quantity}))
            })
            setOrderId(orderRes.data.id)

            const intentRes = await api.post(`/api/payments/create-intent/${orderRes.data.id}`)
            setClientSecret(intentRes.data.clientSecret)
            setAddressSubmitted(true)
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong')
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="bg-white rounded-lg border p-6 mb-6">
                <h2 className="font-bold mb-2">Order total</h2>
                <p className="text-2xl font-bold">${(total() / 100).toFixed(2)}</p>
            </div>

            {!clientSecret ? (
                <form onSubmit={handleAddressSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                    <h2 className="font-bold text-lg">Shipping Address</h2>
                    <input
                        required
                        placeholder="Street address"
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            required
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => setAddress({...address, city: e.target.value})}
                            className="border rounded px-3 py-2"
                        />
                        <input
                            required
                            placeholder="State"
                            value={address.state}
                            onChange={(e) => setAddress({...address, state: e.target.value})}
                            className="border rounded px-3 py-2"
                        />
                    </div>
                    <input
                        required
                        placeholder="ZIP code"
                        value={address.zip}
                        onChange={(e) => setAddress({...address, zip: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                    />
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
                        Continue to payment
                    </button>
                </form>
            ) : (
                <div className="bg-white rounded-lg border p-6">
                    <h2 className="font-bold text-lg mb-4">Payment</h2>
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <CheckoutForm orderId={orderId}/>
                    </Elements>
                </div>
            )}
        </div>
    )
}