import { Link } from 'react-router-dom'
import { useCart } from '../store'

export default function ProductCard({ product }) {
    const add = useCart((s) => s.add)

    return (
        <div className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
            </Link>
            <div className="p-4">
                <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-indigo-600">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${(product.priceCents / 100).toFixed(2)}</span>
                    <button
                        onClick={() => add(product)}
                        disabled={product.stock === 0}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}