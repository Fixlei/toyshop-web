import {Link, useSearchParams} from 'react-router-dom'
import {CheckCircle} from 'lucide-react'

export default function OrderSuccess() {
    const [params] = useSearchParams()
    const orderId = params.get('orderId')

    return (
        <div className="text-center py-16">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4"/>
            <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
            <p className="text-gray-600 mb-6">
                Order #{orderId} has been received. You'll get an email confirmation shortly.
            </p>
            <div className="flex gap-4 justify-center">
                <Link to="/orders" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                    View my orders
                </Link>
                <Link to="/" className="border px-6 py-3 rounded-lg hover:bg-gray-100">
                    Continue shopping
                </Link>
            </div>
        </div>
    )
}