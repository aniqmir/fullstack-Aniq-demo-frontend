'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, fetchProtected } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const roles = ['ADMIN', 'MANAGER', 'USER'] as const;

export default function RBACPage() {
    const { token, role, login: doLogin, logout } = useAuth();
    const [selectedRole, setSelectedRole] = useState('USER');
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter();

    const handleLogout = () => {
        logout()
        setResult(null)
    }

    const handleLogin = async () => {
        setIsLoading(true)
        const data = await login(selectedRole);
        doLogin(data.token, selectedRole as any);
        setIsLoading(false)
    };

    const callApi = async (path: string) => {
        if (!token) return;
        setIsLoading(true)
        try {
            const res = await fetchProtected(path, token);
            setIsLoading(false)
            setResult(res.message);
        } catch (e: any) {
            setIsLoading(false)
            setResult(e.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4">
                <h1 className="text-xl font-semibold">RBAC Demo</h1>

                {!token ? (
                    <>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {roles.map((r) => (
                                <option key={r}>{r}</option>
                            ))}
                        </select>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
                        >
                            {isLoading ? 'Loading...' : ' Login'}
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-gray-600">
                            Logged in as <b>{role}</b>
                        </p>

                        <div className="space-y-2">
                            <button
                                onClick={() => callApi('/api/profile')}
                                className="w-full bg-gray-200 py-2 rounded cursor-pointer"
                            >
                                Profile (All)
                            </button>

                            <button
                                onClick={() => callApi('/api/reports')}
                                className="w-full bg-yellow-200 py-2 rounded cursor-pointer"
                            >
                                Reports (Admin / Manager)
                            </button>

                            <button
                                onClick={() => callApi('/api/admin/metrics')}
                                className="w-full bg-red-200 py-2 rounded cursor-pointer"
                            >
                                Admin Metrics
                            </button>
                        </div>

                        {role === 'ADMIN' && (
                            <button
                                onClick={() => router.push('/users')}
                                className="w-full bg-green-600 text-white py-2 rounded cursor-pointer"
                            >
                                Go to Users Management
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="w-full text-sm text-red-500 cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                )}

                {result && (
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                        {isLoading ? 'Loading...' : result}
                    </pre>
                )}


            </div>
        </div>
    );
}
