"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import SideBarLayout from "@/components/layouts/SideBar";

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])
  const [building, setBuilding] = useState([]);

  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const res = await fetch(
          "http://localhost:3001/auth/me",
          {
            credentials: "include"
          }
        )
        

        const data = await res.json()
        console.log("Auth user:", data);

        // IMPORTANT FIX:
        if (!data || !data.user) {
          router.push("/login")
          return
        }
        const actualUser = data?.user ?? data;

        setUser(actualUser)
      } catch (err) {
        console.error(err)
        router.push("/login")
      } finally {
        setLoading(false)
      }
      
    }

    checkAuth()
  }, [])

useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/bookings/me",
          {
            credentials: "include"
          }
        )

        const data = await res.json()
        console.log("Bookings:", data)

        setBookings(data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      }
    }

    fetchBookings()
  }, [])
  
  const logout = async () => {
            await fetch("http://localhost:3001/auth/logout", {
            credentials: "include"
        })

        setUser(null);
        router.push("/login");
        
    }

    const handleCancelBooking = async (bookingId) => {

      const confirmed = window.confirm("Are you sure you want to cancel this booking?")
      if (!confirmed) return;

      try {
        await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        // await api.delete(`http://localhost:3001/bookings/${bookingId}`, {
          method: "DELETE",
          credentials: "include"
        })
        setBookings(bookings.filter(b => b.id !== bookingId))

      } catch (error) {
        console.error("Error canceling booking:", error)
      }
    }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Redirecting...</div>
  }

  return (
    <SideBarLayout>
    <div className="p-8 ">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>
      
      <p className="text-lg italic mt-1">Welcome, <strong>{user.name}</strong></p>
      
      {/* <button
      onClick={logout}
      className="mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
    >
      Logout
    </button> */}
    <div className="mt-10 mb-5">

    <div className="grid grid-cols-2">
    <h2 className="text-xl font-bold">Your Bookings</h2>
    <Link
      href="/reservation"
      className="bg-blue-600 text-white px-6 py-3 
      rounded-lg transition-colors hover:bg-blue-700
      text-right self-end justify-self-end"
    >
      Reserve a Room
    </Link>
    </div>
    <p className="italic text-gray-500">Total reservations made: <strong>{bookings.length}</strong></p>

    <div className="mt-4 scrollbar-thin scrollbar-thumb-gray-300 
    scrollbar-track-gray-100 overflow-y-auto max-h-[calc(100vh-280px)]
    p-3">
    {bookings.length === 0 ? (
        <p>No bookings yet</p>
            ) : (
            bookings.map((b) => (
        <div
            key={b.id}
            className="bg-white p-3 rounded-xl shadow-md mt-2 grid 
            grid-cols-1 md:grid-cols-2 gap-20 mb-4 transition 
            hover:shadow-lg hover:shadow-blue-500 duration-300"
        >
        <div className="ml-4 mt-3">
        <p className="xl:text-lg md:text-md">Building: <strong><span className="text-blue-900">{b.room?.building?.name}</span></strong></p>
        <p className="xl:text-lg md:text-md">Room: <strong><span className="text-blue-900">{b.room?.name}</span></strong></p>
        
        <p className="xl:text-lg md:text-md">
          Date: <strong><span className="text-blue-900">
            {
            new Date(b.startTime).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            })}
            {" → "}
            
            {
            new Date(b.endTime).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            })}
            </span></strong>
        </p>

        <button onClick={handleCancelBooking.bind(null, b.id)}
        className="mt-2 rounded-lg bg-red-500 
        px-3 py-1 text-white xl:text-lg md:text-md
        hover:bg-red-600 transition-colors mt-10">
          Cancel Reservation
        </button>
      </div>
      <div className=" mt-3 mb-3 table ml-auto mr-4">
        <img
          src={b.room?.imageUrl || "/room/placeholder_room.png"}
          alt="Room"
          className="w-fill rounded-xl object-cover relative h-48"
        />
      </div>
      </div>
      ))
    )}
  </div>
    </div>

    </div>
    </SideBarLayout>
  )
}