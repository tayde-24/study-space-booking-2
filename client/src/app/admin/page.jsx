"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "./layout";


//const user = await res.data;

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
    const checkAuth = async() => {
        const res = await fetch('http://localhost:3001/auth/me',
            {
                credentials: 'include'
            }
        );

        const data = await res.json();

        if (!data.user) {
            router.push('/login');
            return;
        }

        if (data.user.role !== "ADMIN") {
            router.push('/login');
            return;
        }
        setUser(data.user);
    }
        checkAuth();
    }, [])
    return (
        
        <div className="p-6">
            {/* {user?.role === "ADMIN" && (
            <Link href="/admin" className="p-4 border rounded">
                Admin Dashboard
            </Link>
            
        )} */}
        {/* <Link
            href="/admin/bookings"
            className="block border p-4 rounded"
        >
            Manage Reservations
        </Link> */}
        

            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage buildings, rooms, and bookings.</p>

            {/* <div className="grid grid-cols-3 gap-4 mt-6">
                <a href="/admin/buildings" className="p-4 border rounded">
                    Manage Buildings
                </a>

                <a href="/admin/rooms" className="p-4 border rounded">
                    Manage Rooms
                </a>

                <a href="/admin/bookings" className="p-4 border rounded">
                    Manage Bookings
                </a>
                
            </div>   */}
            
            
        </div>
    )
}