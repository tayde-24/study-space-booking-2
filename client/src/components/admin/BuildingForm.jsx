"use client";
import { useState, useEffect } from "react";

export default function RoomForm({building, onSubmit, onCancel}) {
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        location: "",
        description: "",
    });

    useEffect(() => {
        if (building) {
            setFormData({
                name: building.name || "",
                imageUrl: building.imageUrl || "",
                location: building.location || "",
                description: building.description || "",
            });
        } else {
            setFormData({
                name: "",
                imageUrl: "",
                location: "",
                description: "",
            });
        }
            }, [building]);

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
                {building ? "Edit Building" : "Create New Building"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field goes here */}
                <img className=" h-40 m-auto rounded-lg mb-4 object-cover w-full"
                    src={building?.imageUrl || "/buildings/placeholder_building.png"}
                    alt={building?.name || "Building Image"}
                />

                <input
                    name="name"
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Building Name"
                    className="border p-2 rounded-lg w-full
                    onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                />

                {/* {room && ( */}
                    <input 
                        name="imageUrl"
                        value={formData.imageUrl || "/buildings/placeholder_building.png"}
                        onChange={handleChange}
                        placeholder="/buildings/placeholder_building.png"
                        className="border p-2 rounded-lg w-full
                        onFocus:outline-none 
                        focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                    />
                {/* )} */}

                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="border p-2 rounded-lg w-full onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 rounded-lg w-full
                    onFocus:outline-none 
                    focus:bg-yellow-50 focus:transition focus:duration-300 focus:ease-in-out"
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
        {building ? "Update Building" : "Create Building"}
    </button>
</div>

            </form>
            </div>
            </div>
        );
        }
