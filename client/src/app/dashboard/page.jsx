"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";
import SideBarLayout from "@/components/layouts/SideBar";

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])

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
      {/* <Link href="/" className="underline text-blue-600">
        Back to Home
      </Link> */}
      <p className="text-lg italic mt-1">Welcome, <strong>{user.name}</strong></p>
      {/* <p>{user.email}</p> */}
      <button
      onClick={logout}
      className="mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-colors"
    >
      Logout
    </button>
    <div className="mt-10 mb-5">
    <h2 className="text-xl font-bold">Your Bookings</h2>

    {bookings.length === 0 ? (
        <p>No bookings yet</p>
            ) : (
            bookings.map((b) => (
        <div
            key={b.id}
            className="border p-3 rounded mt-2"
        >
          <div></div>
        <p className="font-semibold">Room: {b.room?.name}</p>
        <p>
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
        </p>

        <button onClick={handleCancelBooking.bind(null, b.id)}
        className="mt-2 rounded-lg bg-red-500 px-3 py-1 text-white">
          Cancel Reservation
        </button>
      </div>
    ))
  )}
    </div>

    <Link
      href="/reservation"
      className="bg-blue-600 text-white px-6 py-3 mt-10 rounded-lg transition-colors hover:bg-blue-700"
    >
      Reserve a Room
    </Link>

    </div>
    </SideBarLayout>
  )
}