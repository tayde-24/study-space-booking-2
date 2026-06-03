"use client";
import { useEffect, useState } from "react"
import api from "@/lib/api";

export default function BookingForm() {
    const [message, setMessage] = useState("");
    //added more down here
    const [bookings, setBookings] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [roomStatuses, setRoomStatuses] = useState([]);
    const [availability, setAvailability] = useState([]);

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
          roomId: Number(selectedRoom),
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
    const fetchBuildings = async () => {
      try {
        const res = await api.get("/buildings")
        setBuildings(res.data)
      } catch (error) {
        console.error(error);
      }
      }
    fetchBuildings()
    }, []);

    //Update rooms when building changes
    const handleBuildingChange = async (e) => {
      const buildingId = e.target.value;
      setSelectedBuilding(buildingId);
      const building = buildings.find(b => b.id === Number(buildingId));
      setRooms(building?.rooms || []);
      setSelectedRoom(""); // Reset selected room
    };

    //Submit booking

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
            "http://localhost:3001/rooms"
        )
        const data = await res.json();
        //console.log("Rooms:", data);
        setRooms(Array.isArray(data) ? data: data.rooms || [])
        
      } catch (error) {
        console.error(error)
        setRooms([])
      }
    }

    fetchRooms()
  }, []);

  useEffect(() => {
    if(!selectedRoom) {
      setBookings([]);
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await api.get(`/bookings/room/${selectedRoom}`);
        setBookings(res.data);

      } catch (error) {
        console.error(error);
      }
  }
    fetchBookings();
}, [selectedRoom]);

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

useEffect(() => {
  if (!startTime || !endTime) {
    //  setRoomStatuses([]);
     setAvailability([]);
    return;
  }
  const fetchAvailability = async () => {
    try {
      const res = await api.get(
        `/rooms/availability`,
        {
          params: {
            startTime,
            endTime
        }
      }
      );
      console.log("Availability:", res.data);
      setAvailability(Array.isArray(res.data) ? res.data : res.data.rooms || []);
      //  setRoomStatuses(res.data);
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  }
  fetchAvailability();

  console.log("startTime:", startTime)
console.log("endTime:", endTime)
      
}, [startTime, endTime]);

const isRoomAvailable = (roomId) => {
  const room = availability.find(room => room.id === Number(roomId));
  
  return room?.available ?? true;
}
        
// const formatDate = (date) => {
//     return new Date(date).toLocaleString(
//         "en-US",
//         {
//           dateStyle: "medium",
//           timeStyle: "short"
//         }
//     );
// }



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


// return (
//     // <div className="mt-6">
//     //     <button onClick={handleBooking} className="bg-black text-white px-4 py-2 rounded-lg">
//     //         Book Room 
//     //     </button>
//     //     {message && <p className="mt-2 text-red-500">{message}</p>}
//     // </div>

//     <form
//       onSubmit={handleBooking}
//       className="p-8 flex flex-col gap-4"
//     >
//       {/* <input
//         type=""
//         placeholder="Room ID"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         className="border p-2"
//       /> */}

//       <select
//         value={roomId}
//         onChange={(e) => setRoomId(Number(e.target.value))}
//         className="border p-2"
//       >
//         <option value="">Select Room</option>
//         {Array.isArray(rooms) && rooms.map((room) => (
//             <option 
//                 key={room.id} 
//                 value={room.id}> 
//                     {room.name}
//             </option>
//         ))}
//         </select>

//       <input
//         type="datetime-local"
//         value={startTime}
//         onChange={(e) => setStartTime(e.target.value)}
//         className="border p-2"
//       />

//       <input
//         type="datetime-local"
//         value={endTime}
//         onChange={(e) => setEndTime(e.target.value)}
//         className="border p-2"
//       />

//       <button
//         type="submit"
//         className="bg-blue-500 text-white p-2 rounded"
//       >
//         Book Room
//       </button>
//     </form>
// )

useEffect(() => {
  const fetchAvailability = async () => {
    try {
      const res = await api.get(`/rooms/availability`);
      // setRoomStatuses(res.data);
      setAvailability(Array.isArray(res.data) ? res.data : res.data.rooms || []);
        console.log("Availability:", res.data);
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }
  }
  fetchAvailability();
}, []);

return (<div className="space-y-6 max-w-xl">

      {/* Building */}
      <div>

        <label className="block mb-2 font-semibold">
          Building
        </label>

        <select
          value={selectedBuilding}
          onChange={handleBuildingChange}
          className="border rounded-lg p-2 w-full"
        >

          <option value="">
            Select Building
          </option>

          {buildings.map((building) => (

            <option
              key={building.id}
              value={building.id}
            >
              {building.name}
            </option>

          ))}

        </select>

      </div>

      {/* Room */}
      <div>

        <label className="block mb-2 font-semibold">
          Room
        </label>

        <select
          value={selectedRoom}
          onChange={(e) =>
            setSelectedRoom(e.target.value)
          }
          className="border rounded-lg p-2 w-full"
          disabled={!selectedBuilding}
        >

          <option value="">
            Select Room
          </option>

          {Array.isArray(rooms) && rooms.map((room) => (

            <option
              key={room.id}
              value={room.id}
              disabled={!isRoomAvailable(room.id)}
            >
              {room.name}
              {" "}
              {isRoomAvailable(room.id)
                ? "🟢 (Available)"
                : "🔴 (Unavailable)"}
            </option>

          ))}
          

        </select>

      </div>

      {/* Start Time */}
      <div>

        <label className="block mb-2 font-semibold">
          Start Time
        </label>

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) =>
            setStartTime(e.target.value)
          }
          className="border rounded-lg p-2 w-full"
        />

      </div>

      {/* End Time */}
      <div>

        <label className="block mb-2 font-semibold">
          End Time
        </label>

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) =>
            setEndTime(e.target.value)
          }
          className="border rounded-lg p-2 w-full"
        />

      </div>

      {/* Submit */}
      <button
        onClick={handleBooking}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Reserve Room
      </button>

      {/* Message */}
      {message && (
        <p className="font-medium">
          {message}
        </p>
      )}



  <h2 className="font-bold text-lg mb-3">
    Existing Reservations
  </h2>

  {bookings.length === 0 ? (
    <p>No reservations found.</p>
  ) : (
    bookings.map((booking) => (
      <div
        key={booking.id}
        className="border-b py-2"
      >
        <div>
          Start:
          {" "}
          {new Date(
            booking.startTime
          ).toLocaleString()}
        </div>

        <div>
          End:
          {" "}
          {new Date(
            booking.endTime
          ).toLocaleString()}
        </div>
      </div>
    ))
  )}

  <div>
    <p> Start: {formatDate(bookings[0]?.startTime)}</p>  
    <p>End: {formatDate(bookings[0]?.endTime)}</p>
  </div>

  {roomStatuses.map(room => (
    <div key={room.id}
    className="border p-3 rounded mt-2">
    <div>
      <div>{room.name}</div>
      <div className="text-sm text-gray-500">
        {room.building}
      </div>
    </div>
    
    <div>
      {room.occupied ? "🔴 Occupied"
          : "🟢 Available"}
    </div>
    </div>
  ))}

  {availability.map(room => (
          <div key={room.id}
            className="border p-3 rounded mt-2">
          <div>
          <strong>{room.name}</strong>
          <div className="text-sm text-gray-500">
          {room.available ? "🟢 Available"
          : "🔴 Unavailable"}
      </div>
    </div>
    </div>
  ))}
  
</div>
  )
}