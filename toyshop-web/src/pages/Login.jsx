import {useState} from 'react'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import api from '../api'
import {useAuth} from '../store'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const login = useAuth((s) => s.login)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const redirect = params.get('redirect') || '/'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const {data} = await api.post('/api/auth/login', {email, password})
            login(data.user, data.token)
            localStorage.setItem('token', data.token)
            navigate(redirect)
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">Log in</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
                <p className="text-sm text-center text-gray-600">
                    No account? <Link to="/register" className="text-indigo-600 hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    )
}