"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "./layout";
import StatCard from "@/components/admin/StatCard";
import BuildingForm from "@/components/admin/BuildingForm";
import RoomForm from "@/components/admin/RoomForm";


//const user = await res.data;

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [stats, setStats] = useState({
        buildings: 0,
        rooms: 0,
        bookings: 0,
        users: 0
    });
    const [showBuildingModal, setShowBuildingModal] = useState(false);
    const [showRoomModal, setShowRoomModal] = useState(false);
    const [buildings, setBuildings] = useState([]);

    const [recentBookings, setRecentBookings] = useState([]);

    const fetchBuildings = async () => {

        try {
        const res = await fetch("http://localhost:3001/admin/buildings", {
            credentials: "include"
        });
        const data = await res.json();
        setBuildings(data);
        } catch (error) {
            console.error("Error fetching buildings:", error);
        }
    }

    const handleAddBuilding = async(formData) => {
        try {
            await fetch("http://localhost:3001/admin/buildings", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            
            await fetchBuildings(); // Refresh buildings list after adding a building
            await fetchStats(); // Refresh stats after adding a building
            window.alert("Building added successfully!");
            
        } catch (error) {
            console.error("Error adding building:", error);
        }
        setShowBuildingModal(false);
    };

    const handleAddRoom = async(formData) => {
        try {
            await fetch("http://localhost:3001/admin/rooms", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            await fetchStats(); // Refresh stats after adding a building
            setShowRoomModal(false);
            window.alert("Room added successfully!");
        } catch (error) {
            console.error("Error adding room:", error);
        }
    };

    

    const fetchStats = async () => {
        try {
            const res = await fetch("http://localhost:3001/admin/dashboard/stats", {
                credentials: "include"
            });
            const data = await res.json();
            console.log("Fetched stats:", data); // Log the fetched stats
            setStats({
                buildings: data.buildings,
                rooms: data.rooms,
                bookings: data.bookings,
                users: data.users,
            });
            setRecentBookings(data.recentBookings);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    }
    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        fetchBuildings();
    }, []);


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
                
                <StatCard title="Buildings" value={stats.buildings} icon="🏢" color="bg-blue-300" />
                <StatCard title="Rooms" value={stats.rooms} icon="🚪" color="bg-green-300" />
                <StatCard title="Bookings" value={stats.bookings} icon="📅" color="bg-purple-300" />
                <StatCard title="Users" value={stats.users} icon="👤" color="bg-orange-300" />
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
                <th className="pb-3">Building</th>
                <th className="pb-3">Room</th>
                <th className="pb-3">Date</th>

            </tr>

        </thead>

        <tbody>
            {Array.isArray(recentBookings) && recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-300">
                        <td className="py-4">{booking.user?.name || "N/A"}</td>
                        <td>{booking.room?.building?.name || "N/A"}</td>
                        <td>{booking.room?.name || "N/A"}</td>
                        <td>
                            {new Date(booking.startTime).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",})}
                            <br />
                                <span className="text-sm text-gray-500">
                                    {new Date(booking.startTime).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                    {" - "}
                                    {new Date(booking.endTime).toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </span>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="py-4 text-center">
                        No recent bookings found.
                    </td>
                </tr>
            )}

        </tbody>

    </table>
    </div>

    {/* Quick links to some options */}

    <div className="mt-8 flex gap-4">

        <button className="bg-blue-500 text-white px-4 py-2 
        rounded hover:bg-blue-600 transition-colors duration-300"
        // onClick={() => router.push('/admin/buildings')}>
        onClick={() => setShowBuildingModal(true)}>
            + Add Building
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 
        rounded hover:bg-blue-600 transition-colors duration-300"
        // onClick={() => router.push('/admin/rooms')}>
        onClick={async () => {
            await fetchBuildings(); // Ensure buildings are fetched before showing the room modal
            setShowRoomModal(true)}}>
            + Add Room
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 
        rounded hover:bg-blue-600 transition-colors duration-300"
        onClick={() => router.push('/admin/bookings')}>
            View Bookings
        </button>

        {showBuildingModal && (
            <BuildingForm
                onSubmit={handleAddBuilding}
                onSave={async (formData) => {
                    await handleAddRoom(formData);
                    await fetchBuildings();
                }}
                onCancel={() => setShowBuildingModal(false)}
            />
        )}

        {showRoomModal && (
            <RoomForm
                buildings={buildings}
                onSubmit={handleAddRoom}
                onCancel={() => setShowRoomModal(false)}
            />
        )}


    </div>

            
        </div>
    )
}