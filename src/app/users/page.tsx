'use client';

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UsersTable from './UsersTable';

import { useRouter } from 'next/navigation';

export default function UsersPage() {
    const { token, role, isAuthReady } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthReady) return;

        if (!token) router.push('/rbac');
        else if (role !== 'ADMIN') router.push('/rbac');
    }, [isAuthReady, token, role]);

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Please login first.</p>
            </div>
        );
    }

    if (role !== 'ADMIN') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Access denied. Admins only.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-2xl font-semibold mb-6">Users Management</h1>
            <UsersTable />

            <button
                onClick={() => router.push('/rbac')}
                className="w-full mt-10 bg-green-600 text-white py-2 rounded cursor-pointer"
            >
                Go to RBAC
            </button>
        </div>
    );
}
