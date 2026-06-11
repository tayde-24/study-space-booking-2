"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [buildingId, setBuildingId] = useState("");

    useEffect(() => {
        fetchRooms();
        fetchBuildings();
    }, [])

    const fetchRooms = async () => {
        const res = await fetch("http://localhost:3001/admin/rooms", {
            credentials: "include"
        });
        const data = await res.json();
        setRooms(data);
    }

    const fetchBuildings = async () => {
        const res = await fetch("http://localhost:3001/admin/buildings", {
            credentials: "include"
        });
        const data = await res.json();
        setBuildings(data);
    }

    const createRoom = async () => {
        await fetch("http://localhost:3001/admin/rooms", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                capacity,
                buildingId
            })
        });

        setName("");
        setCapacity("");
        setBuildingId("");
        fetchRooms();
    }

    const deleteRoom = async (id) => {
        await fetch(`http://localhost:3001/admin/rooms/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        fetchRooms();
    }

    const handleBuildingChange = async (e) => {
        const buildingId = e.target.value;
        setBuildingId(buildingId);

        const building = buildings.find(b => b.id === Number(buildingId));

        setRooms(building?.rooms || []);
        //setName(""); // Reset selected room
    };

    return (
        <div className="p-8">
            <Link href="/admin" className="p-4 border rounded">
                Admin Dashboard
            </Link>
            <h1 className="text-2xl font-bold mb-4">Manage Rooms</h1>

            {/* Room creation form */}
            <div className="border p-4 rounded mb-6">
                <h2 className="text-xl font-semibold mb-2">Create New Room</h2>
                <input
                    type="text"
                    placeholder="Room Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded mb-2"
                />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="border p-2 rounded mb-2"
                />
                {/* <select 
                    value={buildingId}
                    onChange={(e) => setBuildingId(e.target.value)}
                    className="border p-2 rounded mb-2"
                >
                    <option value="">Select Building</option>
                    {buildings.map(building => (
                        <option key={building.id} value={building.id}>{building.name}</option>
                    ))}
                </select> */}
                <select
                    value={buildingId}
                    onChange={handleBuildingChange}
                    className="border p-2 rounded mb-2"
                >
                    <option value="">Select Building</option>
                    {buildings.map(building => (
                        <option key={building.id} value={building.id}>{building.name}</option>
                    ))}
                </select>
                <button
                    onClick={createRoom}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Create Room
                </button>
            </div>

            {/* Room list */}
            {Array.isArray(rooms) && rooms.map((room) => (
                <div 
                    key={room.id}
                    className="border p-4 rounded mb-2">
                        <div className="font-bold">{room.name}</div>
                        <div>Capacity: {room.capacity}</div>
                        <div>Building: {room.building?.name}</div>
                        <button onClick={() => deleteRoom(room.id)} className="bg-red-500 text-white p-1 rounded mt-2 hover:bg-red-600">
                            Delete Room
                        </button>
                </div>
            ))}
        </div>
    )
}