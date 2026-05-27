"use client";
import { useEffect, useState } from "react"
import api from "@/lib/api";

export default function BookingForm() {
    const [message, setMessage] = useState("");
    //added more down here
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleBooking = async (e) => {
    e.preventDefault()

    // PUT FETCH CODE HERE
    const res = await fetch(
      "http://localhost:3001/bookings",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roomId,
          startTime,
          endTime
        })
      }
    )

    const data = await res.json()

    // HANDLE CONFLICT ERROR
    if (!res.ok) {
      alert(data.error)
      return
    }

    alert("Booking created!")
  }

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
            "http://localhost:3001/rooms"
        )
        const data = await res.json();
        console.log("Rooms:", data);
        setRooms(Array.isArray(data) ? data: data.rooms || [])
        
      } catch (error) {
        console.error(error)
        setRooms([])
      }
    }

    fetchRooms()
  }, [])
        

    // const handleBooking = async () => {
    //     try {
    //         await api.post("/bookings", {
    //             userId: 7, // Replace with actual user ID
    //             roomId: 1, // Replace with actual room ID
    //             startTime: "2024-07-01T10:00:00Z",
    //             endTime: "2024-07-01T12:00:00Z"
    //         });

    //         setMessage("Booking submitted successfully!");
    //     } catch (error) {
    //         //console.error("Error submitting booking:", error);
    //         // console.error("Error submitting booking:", error);
    //         setMessage(
    //             error.response?.data?.error ||
    //             "Failed to submit booking.");
    //     }
    // }    


return (
    // <div className="mt-6">
    //     <button onClick={handleBooking} className="bg-black text-white px-4 py-2 rounded-lg">
    //         Book Room 
    //     </button>
    //     {message && <p className="mt-2 text-red-500">{message}</p>}
    // </div>
    <form
      onSubmit={handleBooking}
      className="p-8 flex flex-col gap-4"
    >
      {/* <input
        type=""
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2"
      /> */}

      <select
        value={roomId}
        onChange={(e) => setRoomId(Number(e.target.value))}
        className="border p-2"
      >
        <option value="">Select Room</option>
        {Array.isArray(rooms) && rooms.map((room) => (
            <option 
                key={room.id} 
                value={room.id}> 
                    {room.name}
            </option>
        ))}
        </select>

      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border p-2"
      />

      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border p-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
      >
        Book Room
      </button>
    </form>
)
}