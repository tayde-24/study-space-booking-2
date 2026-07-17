"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminRoomCard from "@/components/admin/AdminRoomCard";
import RoomForm from "@/components/admin/RoomForm";

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [buildingId, setBuildingId] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchRooms();
        fetchBuildings();
    }, [])

    const filterRooms = rooms.filter((room) => {
        const search = searchTerm.toLowerCase();
        return (
            room.name.toLowerCase().includes(search) ||
            room.building.name.toLowerCase().includes(search)
        );
    })

    const fetchRooms = async (buildingId = "") => {
        let url = "http://localhost:3001/admin/rooms";
        if (buildingId) {
            url += `?buildingId=${buildingId}`;
        }

        console.log("Fetching rooms from URL:", url); // Log the URL being fetched
        const res = await fetch(url , {
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
        if (!window.confirm("Are you sure you want to delete this room?")){ 
            return;
            }
        fetchRooms(buildingId);
    }

    const saveRoom = async (formData) => {
        if (editingRoom) {
            // Update existing room
            await fetch(`http://localhost:3001/admin/rooms/${editingRoom.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
        } else {
            // Create new room
            await fetch("http://localhost:3001/admin/rooms", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
        }
        await fetchRooms(buildingId);
        setShowModal(false);
        setEditingRoom(null);
    };

    // const handleBuildingChange = async (e) => {
    const handleBuildingChange = (e) => {
        const buildingId = e.target.value;
        setBuildingId(buildingId);

        // const building = buildings.find(b => b.id === Number(buildingId));

        // setRooms(building?.rooms || []);
        fetchRooms(buildingId);
        //setName(""); // Reset selected room
    };

    const handleEdit = (room) => {
        console.log("Editing room:", room);
        setEditingRoom(room);
        setShowModal(true);
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Manage Rooms</h1>
                <button
                        // onClick={createRoom}
                        onClick={() => {
                            setShowModal(true);
                            setEditingRoom(null); // Reset editing room when creating a new one
                        }}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Create Room
                </button>

            </div>
            

            {/* Room creation form */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            {/* <div className="border p-4 rounded mb-6"> */}
                {/* <h2 className="text-xl font-semibold mb-2">Create New Room</h2> */}
                {/* <input
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
                /> */}
                <select
                    value={buildingId}
                    onChange={handleBuildingChange}
                    className="border p-2 rounded mb-2"
                >
                    <option value="">All Buildings</option>
                    {Array.isArray(buildings) && 
                        buildings.map((building) => (
                        <option key={building.id} value={building.id}>{building.name}</option>
                    ))}
                </select>

                

                <input
                    type="text"
                    placeholder="Search rooms or buildings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                    w-full
                    md:w-1/2
                    border
                    rounded-lg
                    p-3
                    dark:bg-gray-800
                    dark:text-white"
                />
            </div>

            {/* Room list */}
            {showModal && (
                    <RoomForm
                        room={editingRoom}
                        buildings={buildings}
                        onSubmit={saveRoom}
                        onCancel={() => setShowModal(false)}
                        />
                )}
            <div className="grid gap-6 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-6">

                {/* {Array.isArray(rooms) && rooms.map((room) => ( */}
                {filterRooms.length === 0 ? (
                    <p className="text-gray-600 dark:text-white">No rooms found.</p>
                ) : (
                    Array.isArray(rooms) && filterRooms.map((room) => (
                    <AdminRoomCard
                        key={room.id}
                        room={room}
                        onDelete={deleteRoom}
                        onEdit={(room) => {
                            handleEdit(room);
                        }}
                    />
                )))}

            </div>
        </div>
    )
}