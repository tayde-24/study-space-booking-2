"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminBuildingCard from "@/components/admin/AdminBuildingCard";
import BuildingForm from "@/components/admin/BuildingForm";

export default function AdminBuildingsPage() {
    const [name, setName] = useState("");
    const [buildings, setBuildings] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [editingBuilding, setEditingBuilding] = useState(null);
    

    const fetchBuildings = async() => {
        const res = await fetch(
            "http://localhost:3001/admin/buildings",
            {
                credentials: "include"
            }
        );

        const data = await res.json();
        setBuildings(data);
    };

    useEffect(() => {
        fetchBuildings();
    }, []);

    const saveBuilding = async (formData) => {
        if (editingBuilding) {
            // Update existing building
            await fetch(`http://localhost:3001/admin/buildings/${editingBuilding.id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
        } else {
            // Create new room
            await fetch("http://localhost:3001/admin/buildings", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
        }
        await fetchBuildings();
        setShowModal(false);
        setEditingBuilding(null);
    };

    const handleEdit = (building) => {
        console.log("Editing building:", building);
        setEditingBuilding(building);
        setShowModal(true);
    }

    //Check if I can delete building with rooms
    const deleteBuilding = async (id) => {
        const confirmed = window.confirm(
            "Delete this building?"
        );

        if(!confirmed) return;

        try{
            await fetch(`http://localhost:3001/admin/buildings/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );
        } catch (error) {
            console.error("Error deleting building:", error);
            alert("Failed to delete building. Please try again.");
            return;
        }
        

        fetchBuildings();
    };

    //Check to see if I did this right
    const editBuilding = async(id) => {
        await fetch(`http://localhost:3001/admin/buildings/${id}`,
            {
                method: "PUT",
                credentials: "include"
            }
        );
    }

    // const createBuilding = async () => {
    //     await fetch("http://localhost:3001/admin/buildings", {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name
    //         })
    //     });

    //     setName("");
    //     fetchBuildings();
    // }

    return(
        <div className="p-8">
            <h1 className="text-2x1 font-bold mb-6">
                Manage Buildings
            </h1>

            {/* <input
                    type="text"
                    placeholder="Building Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded mb-2"
                /> */}
            <button
                    //onClick={createBuilding}
                    onClick={() => {
                        setShowModal(true)
                        setEditingBuilding(null)
                    } // Reset editing building when creating a new one
                    }
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Create Building
                </button>

                {showModal && (
                    <BuildingForm
                        building={editingBuilding}
                        onSubmit={saveBuilding}
                        onCancel={() => setShowModal(false)}
                        />
                    )}

                <div className="grid gap-6 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  mt-6">
                    {Array.isArray(buildings) && buildings.length > 0 ? (
                        buildings.map((building) => (
                            <AdminBuildingCard
                        key={building.id}
                        building={building}
                        // onEdit={(building) => {
                        //     handleEdit(building);
                        // }}
                        onEdit={
                            handleEdit
                        }
                        onDelete={deleteBuilding}/>
                    ))) : (
                        <p>No buildings available.</p>
                    )}
                </div>
        </div>
    )
}