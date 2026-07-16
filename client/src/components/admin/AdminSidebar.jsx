"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const links = [
        {name: "Home", href: "/"},  
        {name: "Dashboard", href: "/admin"},
        {name: "Buildings", href: "/admin/buildings"},
        {name: "Rooms", href: "/admin/rooms"},
        {name: "Bookings", href: "/admin/bookings"},
        {name: "Users", href: "/admin/users"},
        {name: "Settings", href: "/admin/settings"},
    ]

export default function AdminLayout({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
            await fetch("http://localhost:3001/auth/logout", {
            credentials: "include"
        })

        setUser(null);
        router.push("/login");
        
    }

    // const handleLogout = async () => {
    //     try {
    //         await fetch('http://localhost:3001/auth/logout', {
    //             method: 'POST',
    //             credentials: 'include'
    //         });
    //         router.push("/login");
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };

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
                    {links.map((link) => (
                        <Link 
                            key={link.name}
                            href={link.href}
                            className={`hover:bg-gray-700 p-2 rounded transition ${pathname === link.href ? "bg-gray-700" : ""}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button onClick={logout} className="bg-blue-700 hover:bg-blue-900 p-2 rounded transition mt-10">
                        Logout
                    </button>
                </nav>
            </aside>

            {/**Page Content */}

            {/* <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main> */}

        </div>
    )
}