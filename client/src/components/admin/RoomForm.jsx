"use client";
import { useState, useEffect } from "react";

export default function RoomForm({ room, buildings, onSubmit, onCancel}) {
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        capacity: "",
        // buildingId: Number(buildings.length > 0 ? buildings[0].id : ""),
        buildingId: "",
        description: "",
        amenities: "",
    });

    useEffect(() => {
        if (room) {
            setFormData({
                name: room.name || "",
                imageUrl: room.imageUrl || "",
                capacity: room.capacity || "",
                // buildingId: room.buildingId || Number(buildings.length > 0 ? buildings[0].id : ""),
                buildingId: room.buildingId || "",
                description: room.description || "",
                amenities: room.amenities || "",
            });
        } else {
            setFormData({
                name: "",
                imageUrl: "",
                capacity: "",
                // buildingId: Number(buildings.length > 0 ? buildings[0].id : ""),
                buildingId: "",
                description: "",
                amenities: "",
            });
        }
            }, [room, buildings]);

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });

        }

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
                {room ? "Edit Room" : "Create New Room"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field goes here */}
                <img className=" h-40 m-auto rounded-lg mb-4 object-cover w-full"
                    src={room?.imageUrl || "/rooms/default-room.jpg"}
                    alt={room?.name || "Room Image"}
                />

                <input
                    name="name"
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Room Name"
                    className="border p-2 rounded-lg w-full
                    onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                />

                {/* {room && ( */}
                    <input 
                        name="imageUrl"
                        value={formData.imageUrl || "/rooms/default-room.jpg"}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="border p-2 rounded-lg w-full
                        onFocus:outline-none 
                        focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                    />
                {/* )} */}

                <input
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Capacity"
                    className="border p-2 rounded-lg w-full onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                />

                <input 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded-lg w-full
                    onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                />

                <select
                    name="buildingId"
                    value={formData.buildingId}
                    onChange={handleChange}
                    className="border p-2 rounded-lg w-full
                    onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                >
                    <option value="">Choose Building</option>
                    {buildings.map((building) => (
                        <option key={building.id} value={building.id}>
                            {building.name}
                        </option>
                    ))}
                </select>

                <textarea
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Amenities (comma-separated)"
                    className="border p-2 rounded-lg w-full
                    onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                    style={{ minHeight: "75px" }}
                />

                <div className="flex justify-end gap-3">
    <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border rounded-lg"
    >
        Cancel
    </button>

    <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
        {room ? "Update Room" : "Create Room"}
    </button>
</div>

            </form>
            </div>
            </div>
        );
        }
