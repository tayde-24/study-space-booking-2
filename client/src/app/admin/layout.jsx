"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminLayout({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async() => {
            try{
                const res = await fetch('http://localhost:3001/auth/me',
                    {
                        credentials: 'include'
                    }
                );
                const data = await res.json();
                setUser(data.user);
                
            } catch(error) {
                console.error("Error checking authentication:", error);
            } finally {
                setLoading(false);
            }

        }
        checkAuth();
        // if (!user) return;

        // if (user.role !== "ADMIN") {
        //     router.push("/dashboard");
        // }
    }, [user]);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/login");
            return;
        }
        if (user.role !== "ADMIN") {
            router.push("/dashboard");
        }
    }, [user, loading, router]);
    
    if (loading) {
                return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    return (
        
        <div className="flex min-h-screen">
            {/* Sidebar*/}
            <aside className="w-64 bg-gray-900 text-white p-4">
                <h1 className="text-x1 font-bold mb-6">
                    Admin Panel
                </h1>

                <nav className="flex flex-col gap-2">
                    <Link href="/admin" className="hover:bg-gray-700 p-2 rounded">
                        Dashboard
                    </Link>
                    <Link href="/admin/rooms" className="hover:bg-gray-700 p-2 rounded">
                        Rooms
                    </Link>
                    <Link href="/admin/bookings" className="hover:bg-gray-700 p-2 rounded">
                        Bookings
                    </Link>
                    <Link href="/admin/buildings" className="hover:bg-gray-700 p-2 rounded">
                        Buildings
                    </Link>
                    <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
                        User Dashboard
                    </Link>
                    <Link href="/" className="hover:bg-gray-700 p-2 rounded">
                        Home
                    </Link>
                    {/* <Link href="/admin/user" className="hover:bg-gray-700 p-2 rounded">
                        Users
                    </Link> */}
                </nav>
            </aside>

            {/**Page Content */}

            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>

        </div>
    )
}