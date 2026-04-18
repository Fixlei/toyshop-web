import {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {ArrowLeft, Minus, Plus} from 'lucide-react'
import api from '../api'
import {useCart} from '../store'

export default function ProductDetail() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [qty, setQty] = useState(1)
    const add = useCart((s) => s.add)

    useEffect(() => {
        api.get(`/api/products/${id}`).then((r) => setProduct(r.data))
    }, [id])

    if (!product) return <p className="text-gray-500">Loading...</p>

    const attrs = product.attributes ? JSON.parse(product.attributes) : {}

    const handleAdd = () => {
        add(product, qty)
        navigate('/cart')
    }

    return (
        <div>
            <Link to="/" className="inline-flex items-center gap-1 text-gray-600 hover:text-indigo-600 mb-6">
                <ArrowLeft size={18}/> Back to all toys
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg border p-6">
                <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg object-cover"/>
                <div>
                    <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-3xl font-bold mb-4">${(product.priceCents / 100).toFixed(2)}</p>

                    {Object.keys(attrs).length > 0 && (
                        <dl className="grid grid-cols-2 gap-2 mb-6 text-sm">
                            {Object.entries(attrs).map(([k, v]) => (
                                <div key={k} className="bg-gray-50 p-2 rounded">
                                    <dt className="text-gray-500 capitalize">{k.replace(/_/g, ' ')}</dt>
                                    <dd className="font-medium">{String(v)}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </p>

                    {product.stock > 0 && (
                        <>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm text-gray-600">Quantity:</span>
                                <div className="flex items-center border rounded">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="p-2 hover:bg-gray-100"
                                    >
                                        <Minus size={16}/>
                                    </button>
                                    <span className="px-4">{qty}</span>
                                    <button
                                        onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                        className="p-2 hover:bg-gray-100"
                                    >
                                        <Plus size={16}/>
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
                            >
                                Add to cart
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}