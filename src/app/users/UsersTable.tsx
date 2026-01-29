'use client';

import { useEffect, useState } from 'react';
import { fetchProtected } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  createdAt: string;
}

interface ApiResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function UsersTable() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const [meta, setMeta] = useState<ApiResponse['meta'] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    if (!token) return;

    setLoading(true);

    const params = new URLSearchParams({
      page: page.toString(),
      limit: '5',
      ...(role && { role }),
      ...(search && { search }),
    });

    try {
      const res: ApiResponse = await fetchProtected(
        `/api/users?${params}`,
        token
      );

      setUsers(res.data);
      setMeta(res.meta);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, role, search]);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="border rounded px-3 py-2"
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value);
          }}
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="USER">USER</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="border px-3 py-2">{u.name}</td>
                  <td className="border px-3 py-2">{u.email}</td>
                  <td className="border px-3 py-2 text-center">{u.role}</td>
                  <td className="border px-3 py-2 text-center">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
