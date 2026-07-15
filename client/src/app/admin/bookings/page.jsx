"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminBookingPage() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        const res = await fetch(
            "http://localhost:3001/admin/bookings",
            {
                credentials: "include"
            }
        );

        const data = await res.json();
        setBookings(data);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

//     const formatTime = (date) => {
//         return new Date(date).toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         // hour12: true
//     })
// }

const formatDate = (date) => {

    if (!date) {
        return "No Date";
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "Invalid Date";
    }

    return parsedDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
};

    const deleteBooking = async (id) => {
        const confirmed = window.confirm(
            "Cancel this reservation?"
        );

        if(!confirmed) return;

        await fetch(`http://localhost:3001/admin/bookings/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        fetchBookings();
    };

    return (
        // Include a search
        <div className="p-8">
            <h1 className="text-2x1 font-bold mb-6">
                Manage Reservations
            </h1>

            {Array.isArray(bookings) && bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="bg-white rounded-xl shadow-md 
                        hover:shadow-xl transition duration-300 p-4 mb-3 grid grid-cols-2 
                        ">
                        <div className="relative h-48 ml-2 mr-15">
                            <Image
                                src={booking.room?.imageUrl}
                                alt={booking.room?.name}
                                fill
                                className="
                                rounded-xl object-cover rounded-xl"
                                />
                            
                        </div>
                        <div className="ml-6 mt-3 mb-3">
                        <div>
                            <strong>User:</strong>{" "}
                            {booking.user?.name}
                        </div>

                        <div>
                            <strong>Email:</strong>{" "}
                            {booking.user?.email}
                        </div>
                        
                        <div>
                            <strong>Building:</strong>{" "}
                            {booking.room?.building?.name}
                        </div>

                        <div>
                            <strong>Room:</strong>{" "}
                            {booking.room?.name}
                        </div>
                        
                        <div>
                            <strong>Start:</strong>{" "}
                            {formatDate(booking.startTime)}
                        </div>

                        <div>
                            <strong>End:</strong>{" "}
                            {formatDate(booking.endTime)}
                        </div>

                        <button
                            onClick={() =>
                                deleteBooking(
                                    booking.id
                                )
                            }
                            className="bg-red-500 text-white px-3 py-1 
                            rounded mt-2 hover:bg-red-700
                            transition duration-100"
                        >
                            Cancel Reservation
                        </button>
                        </div>

                        
                    </div>
            ))) : (
                <p>No reservations found.</p>
            )}
        </div>
    );
}