import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../store'

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', fullName: '' })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const login = useAuth((s) => s.login)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const { data } = await api.post('/api/auth/register', form)
            login(data.user, data.token)
            localStorage.setItem('token', data.token)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create account</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full name</label>
                    <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password (min 8 chars)</label>
                    <input
                        type="password"
                        required
                        minLength={8}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {loading ? 'Creating...' : 'Sign up'}
                </button>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    )
}
