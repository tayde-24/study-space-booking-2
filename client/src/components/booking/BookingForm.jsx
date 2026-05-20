"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function BookingForm() {
    const [message, setMessage] = useState("");

    const handleBooking = async () => {
        try {
            await api.post("/bookings", {
                userId: 7, // Replace with actual user ID
                roomId: 1, // Replace with actual room ID
                startTime: "2024-07-01T10:00:00Z",
                endTime: "2024-07-01T12:00:00Z"
            });

            setMessage("Booking submitted successfully!");
        } catch (error) {
            //console.error("Error submitting booking:", error);
            // console.error("Error submitting booking:", error);
            setMessage(
                error.response?.data?.error ||
                "Failed to submit booking.");
        }
    }    


return (
    <div className="mt-6">
        <button onClick={handleBooking} className="bg-black text-white px-4 py-2 rounded-lg">
            Book Room 
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
)
}