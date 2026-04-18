import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import api from '../api'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setLoading(true)
        const params = searchTerm ? { q: searchTerm } : {}
        api.get('/api/products', { params })
            .then((r) => setProducts(r.data))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false))
    }, [searchTerm])

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchTerm(query)
    }

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Toys</h1>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search toys..."
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        Search
                    </button>
                </form>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    )
}