"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function SideBarLayout({children}) {
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
    }, [user]);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.push("/login");
            return;
        }
    }, [user, loading, router]);
    
    // if (loading) {
    //             return <div className="flex items-center justify-center h-screen">Loading...</div>;
    // }
    return (
        
        // <div className="flex min-h-screen">
        <div className="flex min-h-screen">
            {/* Sidebar*/}
            <aside className="w-64 bg-gray-900 text-white p-4 sticky top-0 h-screen">
                {/* <h1 className="text-x1 font-bold mb-6">
                    User Panel
                </h1> */}

                <nav className="flex flex-col gap-2">
                    <Link href="/" className="hover:bg-gray-700 p-2 rounded">
                        Home
                    </Link>
                    <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
                        User Dashboard
                    </Link>
                    <Link href="/reservation" className="hover:bg-gray-700 p-2 rounded">
                        Reservation
                    </Link>
                    
                    
                </nav>
            </aside>

            {/**Page Content */}

            <main className="flex-1 bg-gray-100">
                {children}
            </main>

        </div>
    )
}