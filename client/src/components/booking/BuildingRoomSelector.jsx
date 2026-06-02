"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function BuildingRoomSelector() {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");

    //Fetch buildings on page load
    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const res = await api.get("/buildings");
                setBuildings(res.data);
                setSelectedBuilding(res.data[0]?.id || ""); // Set default selected building
            } catch (err) {
                console.error(err);
            }
        }
        fetchBuildings();
    }, []);

    //Update rooms when building changes
    const handleBuildingChange = async (e) => {
        const buildingId = e.target.value;
        setSelectedBuilding(buildingId);

        const building = buildings.find(b => b.id === Number(buildingId));

        setRooms(building?.rooms || []);
        setSelectedRoom(""); // Reset selected room
    };

    return (
        <div className="space-y-6">

            {/* Building Dropdown */}
        

        <div>
        <label className="block mb-2 font-semibold">Select Building</label>
        <select
            value={selectedBuilding}
            onChange={handleBuildingChange}
            className="w-full p-2 border rounded"
        >
            <option value="">-- Select a Building --</option>
            {buildings.map(building => (
                <option key={building.id} value={building.id}>{building.name}</option>
            ))}
        </select>
        </div>

        {/* Room Dropdown */}
        <div>
        <label className="bold mb-2 font-semibold">Select Room</label>
        <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!selectedBuilding}
        >
            <option value="">-- Select a Room --</option>
            {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name} (Capacity: {room.capacity})</option>
            ))}
        </select>
        </div>

        {/* Selected Room Display */}   
        {selectedRoom && (
            <div className="p-4 border rounded-x1">
            <p className="font-medium">Selected Room:
                {selectedRoom}
            </p>
            </div>
        )}

        </div>
    )
}