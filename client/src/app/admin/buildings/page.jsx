"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminBuildingsPage() {
    const [name, setName] = useState("");
    const [buildings, setBuildings] = useState([]);

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

    //Check if I can delete building with rooms
    const deleteBuilding = async (id) => {
        const confirmed = window.confirm(
            "Delete this building?"
        );

        if(!confirmed) return;

        await fetch(`http://localhost:3001/admin/buildings/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        fetchBuildings();
    };

    const createBuilding = async () => {
        await fetch("http://localhost:3001/admin/buildings", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name
            })
        });

        setName("");
        fetchBuildings();
    }

    return(
        <div className="p-8">
            <h1 className="text-2x1 font-bold mb-6">
                Manage Buildings
            </h1>

            <input
                    type="text"
                    placeholder="Building Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded mb-2"
                />
            <button
                    onClick={createBuilding}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Create Building
                </button>

            {buildings.map((building) => (

        <div
          key={building.id}
          className="border p-4 rounded mb-2"
        >

          <div className="font-bold">
            {building.name}
          </div>

          <div>
            Rooms: {building.rooms?.length || 0}
          </div>

          <button
            onClick={() =>
              deleteBuilding(building.id)
            }
            className="bg-red-500 text-white px-2 py-1 rounded mt-2"
          >
            Delete
          </button>

        </div>

      ))}
        </div>
    )
}