import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                {/* <Link
                    href="/"
                    className="text-lg font-semibold text-gray-900"
                >
                    RBAC Demo
                </Link> */}

                {/* Links */}
                <div className="flex gap-6 text-sm text-gray-600">
                    <Link href="/" className="hover:text-gray-900">
                        Home
                    </Link>
                    <Link href="/rbac" className="hover:text-gray-900">
                        RBAC
                    </Link>
                    <Link href="/users" className="hover:text-gray-900">
                        Users
                    </Link>
                    <Link href="/version" className="hover:text-gray-900">
                        Version
                    </Link>
                </div>
            </div>
        </nav>
    );
}
