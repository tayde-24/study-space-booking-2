"use client"

import { useEffect, useState } from "react";
import api from "@/lib/api";
import BookingForm from "@/components/booking/BookingForm";
import BuildingRoomSelector from "@/components/booking/BuildingRoomSelector";
import SideBarLayout from "@/components/layouts/SideBar";
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
  
    <main>
      <SideBarLayout>
      <section className="text-center p-6 py-20">
  <h1 className="text-5xl font-bold mb-4">
    Study Space Booking
  </h1>

  <p className="text-lg text-gray-600 mb-8">
    Find available study rooms and reserve them quickly.
  </p>

  <div className="space-x-4">
    <Link
      href="/reservation"
      className="bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      Reserve a Room
    </Link>

    <Link
      href="/dashboard"
      className="border px-6 py-3 rounded-lg"
    >
      Dashboard
    </Link>
  </div>
</section>
<div className="text-center py-4 bg-blue-100">
  <h2 className="text-2xl font-semibold mb-4">
    Features
  </h2>
  <p className="text-lg text-gray-600">
    Our study space booking system offers the following features:
  </p>
  <ul className="list-disc list-inside text-lg text-gray-600 text-left my-4 table mx-auto font-bold ">
    <li>Real-time availability</li>
    <li>Weekly Calendar View</li>
    <li>Schedule Tracking</li>
  </ul>
</div>
<section className="text-center py-15 ">
  <h2 className="text-2xl font-semibold mb-4">
    How It Works
  </h2>
  <p className="text-lg text-gray-600">
    Booking a study room is simple and fast. Just follow these steps:
  </p>
  <ol className="list-decimal list-inside text-lg text-gray-600 text-left my-4 table mx-auto">
    <li>Select Building</li>
    <li>Choose Room</li>
    <li>Pick Time</li>
    <li>Reserve</li>
  </ol>
</section>
      </SideBarLayout>
    </main>
  )
}
