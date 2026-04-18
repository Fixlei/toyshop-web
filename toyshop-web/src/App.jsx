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
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Nunito', 'Fredoka', system-ui, sans-serif" }}>
            <header className="sticky top-0 z-10" style={{ backgroundColor: '#E3000B' }}>
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-3xl font-black tracking-tight"
                        style={{ color: '#FFED00', letterSpacing: '-0.03em' }}
                    >
                        TOY SHOP
                    </Link>
                    <nav className="flex items-center gap-6 text-white font-bold">
                        {user ? (
                            <>
                                <Link to="/orders" className="flex items-center gap-1 hover:text-yellow-300">
                                    <Package size={18} /> Orders
                                </Link>
                                <span className="text-sm opacity-90">Hi, {user.fullName || user.email}</span>
                                <button onClick={handleLogout} className="flex items-center gap-1 hover:text-yellow-300">
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-1 hover:text-yellow-300">
                                    <User size={18} /> Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-3 py-1 rounded text-black font-black hover:brightness-95"
                                    style={{ backgroundColor: '#FFED00' }}
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                        <Link to="/cart" className="relative flex items-center hover:text-yellow-300">
                            <ShoppingCart size={22} />
                            {count > 0 && (
                                <span
                                    className="absolute -top-2 -right-3 text-xs font-black rounded-full w-5 h-5 flex items-center justify-center"
                                    style={{ backgroundColor: '#FFED00', color: '#000' }}
                                >
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