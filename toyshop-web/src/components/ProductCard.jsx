import { Link } from 'react-router-dom'
import { useCart } from '../store'

export default function ProductCard({ product }) {
    const add = useCart((s) => s.add)

    return (
        <div className="bg-brand-card border-2 border-brand-deep rounded p-2 text-center shadow-md hover:shadow-xl transition-shadow">
            <Link to={`/products/${product.id}`}>
                <div className="overflow-hidden">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>
            </Link>
            <Link to={`/products/${product.id}`}>
                <h3 className="text-brand-deep font-bold mt-2 text-lg">{product.name}</h3>
            </Link>
            <p className="text-brand-deep text-sm line-clamp-2 mb-2 px-2">{product.description}</p>
            <p className="text-red-400 font-bold text-xl mb-3">${(product.priceCents / 100).toFixed(2)}</p>
            <button
                onClick={() => add(product)}
                disabled={product.stock === 0}
                className="bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-deep transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            </button>
        </div>
    )
}