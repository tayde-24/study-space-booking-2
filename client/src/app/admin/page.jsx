"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "./layout";
import StatCard from "@/components/admin/StatCard";


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
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <h2 className="text-xl italic mb-5">Welcome back, <strong>{user?.name}</strong>!</h2>

            <p>Welcome to the admin dashboard. Here you can manage buildings, rooms, and bookings.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-center">
                <StatCard title="Buildings" value={4} icon="🏢" color="bg-blue-300" />
                <StatCard title="Rooms" value={24} icon="🚪" color="bg-green-300" />
                <StatCard title="Bookings" value={18} icon="📅" color="bg-purple-300" />
                <StatCard title="Users" value={12} icon="👤" color="bg-orange-300" />
            </div>


    {/* Showing the bookings */}
    <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">

    <h2 className="text-xl font-semibold mb-4">
        Recent Bookings
    </h2>

    <table className="w-full">

        <thead className="border-b-gray-300 border-b">

            <tr className="text-left">

                <th className="pb-3">Student</th>
                <th className="pb-3">Room</th>
                <th className="pb-3">Date</th>

            </tr>

        </thead>

        <tbody>

            <tr className="border-b-gray-300 border-b">

                <td className="py-4">John Smith</td>
                <td>Library 101</td>
                <td>Today</td>

            </tr>

            <tr>

                <td className="py-4">Jane Doe</td>
                <td>Engineering 220</td>
                <td>Today</td>

            </tr>

        </tbody>

    </table>
    </div>

    {/* Quick links to some options */}

    <div className="mt-8 flex gap-4">

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            + Add Building
        </button>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            + Add Room
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            View Bookings
        </button>

    </div>

            
        </div>
    )
}