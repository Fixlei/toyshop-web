import { Link, Outlet, useNavigate } from 'react-router-dom'
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
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            <nav className="bg-brand-blue text-white flex justify-between items-center px-5 py-2 flex-wrap">
                <Link to="/" className="flex-shrink-0">
                    <div className="hover:animate-shake rounded-full bg-white p-1 inline-block transition-shadow hover:shadow-xl">
                        <span className="font-script text-3xl text-brand-deep px-3">Toy'S</span>
                    </div>
                </Link>

                <div className="flex items-center gap-2 order-3 w-full md:w-auto md:order-2 mt-2 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search.."
                        className="px-3 py-2 rounded-lg border-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-deep"
                    />
                    <button className="bg-white text-brand-deep px-4 py-2 rounded-lg hover:bg-brand-deep hover:text-white transition-colors">
                        <i className="fa fa-search" />
                    </button>
                </div>

                <ul className="flex flex-wrap gap-5 list-none m-0 p-0 order-2 md:order-3">
                    <li>
                        <Link to="/" className="text-white hover:text-yellow-200 hover:capitalize transition-colors">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-white hover:text-yellow-200 transition-colors">
                            <i className="fa fa-shopping-cart" /> Cart
                            {count > 0 && (
                                <span className="ml-1 bg-brand-yellow text-brand-deep font-bold rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
                            )}
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/orders" className="text-white hover:text-yellow-200 transition-colors">
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-white hover:text-yellow-200 transition-colors">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-white hover:text-yellow-200 transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-white hover:text-yellow-200 transition-colors">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-6">
                <Outlet />
            </main>

            <footer className="bg-brand-blue text-white p-5 mt-12" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-bold mb-2">Toy'S® Customer Service (English)</h4>
                        <p className="text-sm opacity-90">
                            1-844-903-0000<br />
                            Monday to Friday 8am - 10pm ET<br />
                            Saturday to Sunday 10am - 6pm ET
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Toy'S™ Customer Service (Spanish)</h4>
                        <p className="text-sm opacity-90">
                            1-833-692-0006<br />
                            Monday to Friday 10am - 8pm ET
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Toy'S® Education Tech Support</h4>
                        <p className="text-sm opacity-90">
                            1-866-349-5000<br />
                            Monday to Friday 8am - 10pm ET
                        </p>
                    </div>
                </div>
                <div className="text-center mt-6 opacity-80">
                    <h3>Toy'S© All Rights Reserved.</h3>
                </div>
            </footer>
        </div>
    )
}