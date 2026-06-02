"use client"

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BookingForm from "@/components/booking/BookingForm";
import BuildingRoomSelector from "@/components/booking/BuildingRoomSelector";
import Link from "next/link";

export default function Home() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms")
        setRooms(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRooms()
  }, [])

  return (

    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Study Rooms
      </h1>

      <div className="grid gap-4">
        <Link
          href="/dashboard"
          className="underline text-blue-600"
        >
          View Dashboard
        </Link>
        {/* {rooms.map((room) => (
          <div
            key={room.id}
            className="border p-4 rounded-xl"
          >
            <h2 className="text-xl font-semibold">
              {room.name}
            </h2>

            <p>
              Capacity: {room.capacity}
            </p>
          </div>
        ))} */}
      </div>
      <BuildingRoomSelector />

      <BookingForm />
      
    </main>
  )
}
