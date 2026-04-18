import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Package } from 'lucide-react'
import { useCart, useAuth } from './store'

export default function App() {
    const count = useCart((s) => s.count())
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-indigo-600">
                        🧸 Toy Shop
                    </Link>
                    <nav className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to="/orders" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
                                    <Package size={18} /> Orders
                                </Link>
                                <span className="text-gray-600 text-sm">Hi, {user.fullName || user.email}</span>
                                <button onClick={handleLogout} className="flex items-center gap-1 text-gray-700 hover:text-red-600">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-indigo-600">
                                    <User size={18} /> Login
                                </Link>
                                <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
                            </>
                        )}
                        <Link to="/cart" className="relative flex items-center gap-1 text-gray-700 hover:text-indigo-600">
                            <ShoppingCart size={20} />
                            {count > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}