"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

// const links = [
//         {name: "Home", href: "/"},  
//         {name: "Dashboard", href: "/admin"},
//         {name: "Buildings", href: "/admin/buildings"},
//         {name: "Rooms", href: "/admin/rooms"},
//         {name: "Bookings", href: "/admin/bookings"},
//         {name: "Users", href: "/admin/users"},
//     ]

export default function AdminLayout({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

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
    }, []);

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
            <AdminSidebar /> 

            {/**Page Content */}

            <main className="flex-1 p-6 bg-gray-100">
                {children}
            </main>

        </div>
    )
}