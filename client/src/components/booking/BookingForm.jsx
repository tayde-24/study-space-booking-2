"use client";
import { useEffect, useState } from "react"
import api from "@/lib/api";
import BuildingList from "../cards/BuildingList";
import RoomList from "../cards/RoomList";
import BuildingPreview from "../cards/BuildingPreview";
import RoomSlidePanel from "../cards/RoomSlidePanel";
import WeeklyCalendar from "../calendar/WeeklyCalendar";

export default function BookingForm() {
    const [message, setMessage] = useState("");
    // //added more down here
    // const [bookings, setBookings] = useState([]);
    // const [buildings, setBuildings] = useState([]);
    // const [selectedBuilding, setSelectedBuilding] = useState("");
    // const [selectedRoom, setSelectedRoom] = useState("");
    // const [roomId, setRoomId] = useState("");
    // const [rooms, setRooms] = useState("");
    // const [startTime, setStartTime] = useState("");
    // const [endTime, setEndTime] = useState("");
    const [roomStatuses, setRoomStatuses] = useState([]);
    // const [availability, setAvailability] = useState([]);
    // const [schedule, setSchedule] = useState([]);
    // const [weeklySchedule, setWeeklySchedule] = useState([]);
    // const [selectedSlot, setSelectedSlot] = useState(null);
    // const [weekOffset, setWeekOffset] = useState(0)
    //const hours = [];
    const [bookings, setBookings] = useState([])
    const [buildings, setBuildings] = useState([])
    const [rooms, setRooms] = useState([])


    const [selectedBuilding, setSelectedBuilding] = useState("")
    const [showRoomsPanel, setShowRoomsPanel] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState("")
    const [roomId, setRoomId] = useState(null);

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const [weeklySchedule, setWeeklySchedule] = useState([])
    const [availability, setAvailability] = useState([])

    const [selectedSlot, setSelectedSlot] = useState(null)
    const [weekOffset, setWeekOffset] = useState(0)

    const [schedule, setSchedule] = useState([]);

    // for (let hour = 8; hour <= 22; hour++) {
    //   hours.push(hour);
    // }
    const hours = Array.from(
      { length: 15 },
      (_, i) => i + 8
    );

    const days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];

const getWeekStart = (offset = 0) => {
  const today = new Date();

  const day = today.getDay();
  const diff = today.getDate() - day + offset *7;

  const weekStart = new Date(today);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);

  return weekStart;

}

const fetchWeeklySchedule = async () => {
    try {
      const res = await api.get(`/bookings/week/${selectedRoom?.id}`);
      setWeeklySchedule(res.data);
    } catch (error) {
      console.error("Error fetching weekly schedule:", error);
       //setWeeklySchedule([]);
    }
  }

const formatForDateTimeLocal = (date) => {
  const offset = date.getTimezoneOffset()

  const localDate = new Date(
    date.getTime() - offset * 60000
  )

  return localDate
    .toISOString()
    .slice(0, 16)
}

    const handleSlotClick = (dayIndex, hour) => {
      const weekStart = getWeekStart(weekOffset);
      const startDate = new Date(weekStart);
      //const today = new Date();

      //const startDate = new Date(today);
      // startDate.setDate(
      //   today.getDate() - today.getDay() + dayIndex);
      startDate.setDate(
        weekStart.getDate() + dayIndex);

      startDate.setHours(hour, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1);

      setSelectedSlot(`${dayIndex}-${hour}`);

      // setStartTime(startDate.toISOString().slice(0, 16));
      setStartTime(formatForDateTimeLocal(startDate));
      setEndTime(formatForDateTimeLocal(endDate));
    }

    const isSlotBooked = (dayIndex, hour) => {
      return weeklySchedule.some(booking => {
        const date = new Date(booking.startTime);

        return (
          date.getDay() === dayIndex &&
          hour >= date.getHours() &&
          hour < new Date(booking.endTime).getHours()
        )
      }
        )
    }

    

    const isHourBooked = (hour) => {
      return schedule.some(booking => {
        const start = new Date(booking.startTime).getHours();
        const end = new Date(booking.endTime).getHours();

        return hour >= start && hour < end;
      })
    }

    const isBlockStart = (booking, hour) => {
      const start = new Date(booking.startTime);
      return start.getHours() === hour;
    }

    const currentHour = new Date().getHours(); 

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
          roomId: Number(selectedRoom?.id),
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
    //await res.json()
    await fetchWeeklySchedule();
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
    // const handleBuildingChange = async (e) => {
    //   const buildingId = e.target.value;
    //   setSelectedBuilding(buildingId);
    //   const building = buildings.find(b => b.id === Number(buildingId));
    //   setRooms(building?.rooms || []);
    //   setSelectedRoom(""); // Reset selected room
    // };
    const handleBuildingChange = async (building) => {
      //const buildingId = building.id;

      setSelectedBuilding(building);
      const res = await fetch(`http://localhost:3001/rooms?buildingId=${building.id}`);
      //const data = await res.json;

      setRooms(building.rooms || []);
      //setRooms(Array.isArray(data) ? data : []);
    };

    const handleRoomChange = (room) => {
      setSelectedRoom(room);
      setRoomId(room.id);
      console.log({
        roomId,
        selectedRoom,
        startTime,
        endTime,
      })
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
        const res = await api.get(`/bookings/room/${selectedRoom?.id}`);
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

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    // hour12: true
  })
}

const formatHour = (hour) => {
  return new Date(
    2026,
    0,
    1,
    hour
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    // hour12: true
  })
}

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

useEffect(() => {
  if (!selectedRoom) {
    setSchedule([]);
    return;
  }

  const fetchSchedule = async () => {
    try {
      const res = await api.get(`/bookings/schedule/${selectedRoom?.id}`);
      setSchedule(res.data);
    } catch (error) {
      console.error("Error fetching room schedule:", error);
       setSchedule([]);
    }
  }
  fetchSchedule();

}, [selectedRoom]);

useEffect(() => {
  if (!selectedRoom) {
    setWeeklySchedule([]);
    return;
  }

  const fetchWeeklySchedule = async () => {
    try {
      console.log("selectedRoom:", selectedRoom);
console.log("selectedRoom type:", typeof selectedRoom);
      const res = await api.get(`/bookings/week/${selectedRoom?.id}`);
      setWeeklySchedule(res.data);
    } catch (error) {
      console.error("Error fetching weekly schedule:", error);
       //setWeeklySchedule([]);
    }
  }
  fetchWeeklySchedule();
}, [schedule]);



useEffect(() => {
  if (!selectedRoom) return
  fetchWeeklySchedule()
}, [selectedRoom, weekOffset])

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

useEffect(() => {
  if (!selectedRoom) return;
  document.getElementById("calendar").scrollIntoView({ behavior: "smooth" });
}, [selectedRoom])

console.log("selectedBuilding:", selectedBuilding);

return (
// Probably change this part
<div className="justify-content">

<div className="flex flex-row gap-20">
      {/* Building */}

  <div className="" id="flexxx left">
      <div className="">

        {/* <label className="block mb-2 font-semibold">
          Building
        </label> */}

        {/* <select
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

        </select> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {buildings.map((building) => (
  <div
    key={building.id}
    onClick={() => {
      setSelectedBuilding(building.id)
      setRooms(building.rooms || [])
      setSelectedRoom("")
    }}
    className={`
      border rounded-xl overflow-hidden cursor-pointer
      hover:shadow-lg transition

      ${selectedBuilding === building.id
        ? "ring-2 ring-blue-500"
        : ""}
    `}
  > */}

    {/* Image */}
    {/* <img
      src={building.imageUrl || "/placeholder.jpg"}
      className="h-40 w-full object-cover"
    /> */}

    {/* Content */}
    {/* <div className="p-3">
      <h2 className="font-bold text-lg">
        {building.name}
      </h2>

      <p className="text-sm text-gray-600">
        {building.description || "No description"}
      </p>

      <div className="mt-2 text-sm font-medium">
        🏢 {building.rooms?.length || 0} rooms
      </div>
    </div>

  </div>
))} */}
          {/* </div> */}


          {/* {!selectedBuilding? (
          <BuildingList
            buildings={buildings}
            //selectedBuilding={selectedBuilding}
            onSelectBuilding={handleBuildingChange}
          />) : (
            <RoomList
            rooms={selectedBuilding?.rooms || []}
            selectedRoom={selectedRoom}
            onSelectRoom={handleRoomChange}
          />
        )} */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/**LEFT: Building Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Select Building</h2>
              <BuildingList
                buildings={buildings}
                // onSelectBuilding={setSelectedBuilding}
                onSelectBuilding={handleBuildingChange}
                selectedBuilding={selectedBuilding}
              />
            </div>

            {/**RIGHT: Preview Panel */}
            <div>
              <BuildingPreview 
              building={selectedBuilding}
              onViewRooms={() => setShowRoomsPanel(true)}
              />
            </div>
        </div> 

{/* Mobile version here 
        <RoomSlidePanel
            isOpen={showRoomsPanel}
            building={selectedBuilding}
            rooms={rooms}
            selectedRoom={selectedRoom}
            onClose={() => setShowRoomsPanel(false)}
            onSelectRoom={(room) => {
              handleRoomChange(room);
              setShowRoomsPanel(false);
            }}
        >
          <RoomList
            rooms={rooms}
            selectedRoom={selectedRoom}
            onSelectRoom={(room) =>{
              handleRoomChange(room);
              setShowRoomsPanel(false)
            }}
          />
        </RoomSlidePanel>

        <div className="p-6" id="calendar">
        {selectedRoom && (
          <div className="mt-6 p-4 border rounded-xl bg-blue-50">
            <h3 className="font-semibold">
              Selected Room
            </h3>

            <p>{selectedRoom.name}</p>
          </div>
        )}
        </div>*/}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6" id="calendar">
          {/**LEFT: Room Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">
                Available Rooms
              </h2>
              <RoomList
                rooms={selectedBuilding?.rooms || []}
                selectedRoom={selectedRoom}
                onSelectRoom={handleRoomChange}
              />
            </div>
          </div>

            {/* Left side panel */}
            <div className="lg:col-span-3">
              <div className="bg-white border rounded-xl shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedRoom ? `Schedule for ${selectedRoom.name}` 
                  : "Select a room"}
                </h2>

                {!selectedRoom ? (
                  <div className="text-center text-gray-500 py-12">
                    Select a room to view its schedule.
                  </div>
                ) : (
                  <WeeklyCalendar
                    selectedRoom={selectedRoom}
                    selectedSlot={selectedSlot}
                    weeklySchedule={weeklySchedule}
                    weekOffset={weekOffset}
                    setWeekOffset={setWeekOffset}
                    handleSlotClick={handleSlotClick}
                    isSlotBooked={isSlotBooked}
                    handleBooking={handleBooking}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    startTime={startTime}
                    endTime={endTime}
                  />

                  
                )}


              </div>
            </div>


        </div>

      </div>








      

      {/* Room */}
      <div>

        {/* <label className="block mb-2 font-semibold">
          Room
        </label> */}

        {/* <select
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
          

        </select> */}
        {/* {!selectedBuilding && (
            <div className="text-center p-6">
              <p>Please select a building to view its rooms.</p>
            </div>
          )} */}

        {/* <div className="mb-6"> */}

  {/* <h2 className="text-xl font-bold mb-4">
    Select Room
  </h2> */}

  {/* {!selectedBuilding && (

    <div className="text-gray-500">
      Select a building first.
    </div>

  )} */}

  {/* {selectedBuilding && (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {rooms.map((room) => {

        const available =
          isRoomAvailable(room.id)

        return (

          <div
            key={room.id}
            onClick={() => {
              if (!available) return

              setSelectedRoom(room.id)
            }}
            className={`
              cursor-pointer
              border
              rounded-xl
              overflow-hidden
              transition

              ${
                selectedRoom === room.id
                  ? "ring-2 ring-green-500"
                  : "hover:shadow-lg"
              }

              ${
                !available
                  ? "opacity-50"
                  : ""
              }
            `}
          >

            <img
              src={
                room.imageUrl ||
                "/images/rooms/default.jpg"
              }
              alt={room.name}
              className="h-32 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">
                {room.name}
              </h3>

              <div className="text-sm text-gray-600">
                Capacity: {room.capacity}
              </div>

              {room.description && (
                <p className="text-sm mt-2">
                  {room.description}
                </p>
              )}

              {room.amenities && (

                <div className="flex flex-wrap gap-2 mt-3">

                  {room.amenities
                    .split(",")
                    .map((item, index) => (

                      <span
                        key={index}
                        className="
                          bg-gray-100
                          px-2
                          py-1
                          rounded
                          text-xs
                        "
                      >
                        {item.trim()}
                      </span>

                    ))}

                </div>

              )}

              <div className="mt-3">

                {available
                  ? "🟢 Available"
                  : "🔴 Reserved"}

              </div>

            </div>

          </div>

        )
      })}

    </div>

  )} */}

{/* </div> */}

      </div>

      {/* Start Time */}
      {/* <div>

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

      </div> */}

      {/* End Time */}
      {/* <div>

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

      </div> */}

      {/* Submit */}
      {/* <button
        onClick={handleBooking}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Reserve Room
      </button> */}

      {/* Message */}
      {/* {message && (
        <p className="font-medium">
          {message}
        </p>
      )} */}




{/* {!selectedRoom && (
  <div className="text-center p-6">
    <p>Please select a room to view its schedule.</p>
  </div>
)}

<div className="mt-6">

  <h2 className="text-xl font-bold mb-3">
    Room Schedule
  </h2>


  {schedule.length === 0 ? (

    <p>No reservations found.</p>

  ) : (

    schedule.map((booking) => (

      <div
        key={booking.id}
        className="border rounded p-3 mb-2"
      >

        <div>
          {formatTime(booking.startTime)}
          {" - "}
          {formatTime(booking.endTime)}
        </div>

        <div>
          🔴 Reserved
        </div>

      </div>

    ))

  )}
 

</div> */}
</div>




{/* {hours.map(hour => (
  <div 
    key={hour}
    className="flex justify-between border-b py-2"
    >
      <span>{formatHour(hour)}</span>
      <span>
        {isHourBooked(hour) ? "🔴 Booked" : "🟢 Available"}
      </span>
  </div>
))} */}


// {/* Weekly Schedule display with colors */}
{/* Shows the available rooms and booked rooms statistics */}
{/* <div className="">
  <div className="grid grid-cols-2 gap-4 mb-6">

  <div className="bg-green-50 p-4 rounded-lg">

    <div className="text-sm">
      Available Slots
    </div>

    <div className="text-2xl font-bold">
      {
        hours.filter(
          hour => !isHourBooked(hour)
        ).length
      }
    </div>

  </div> */}

  {/* <div className="bg-red-50 p-4 rounded-lg"> */}

    {/* <div className="text-sm">
      Reserved Slots
    </div> */}

    {/* <div className="text-2xl font-bold">
      {
        hours.filter(
          hour => isHourBooked(hour)
        ).length
      }
    </div> */}

  {/* </div> */}

  {/* </div> */}

  {/* Weekly Schedule display with colors */}
  {/* <div className="mt-8">

  <h2 className="text-xl font-bold mb-4">
    Weekly Schedule
  </h2>

<div id="calendar"> 
  <div className="overflow-x-auto">

    <div className="flex justify-between items-center mb-4">

  <button
    onClick={() => setWeekOffset(prev => prev - 1)}
    className="px-3 py-1 border rounded"
  >
    ← Prev Week
  </button>

  <h2 className="font-bold">
    Week {weekOffset === 0 ? "(Current)" : weekOffset}
  </h2>

  <button
    onClick={() => setWeekOffset(prev => prev + 1)}
    className="px-3 py-1 border rounded"
  >
    Next Week →
  </button>

</div>
    <table className="border-collapse">

      <thead>

        <tr>

          <th className="border p-2">
            Time
          </th>

          {days.map((day, dayIndex) => (
            <th
              key={day}
              className={`border p-2 ${dayIndex === new Date().getDay() 
                ? "bg-blue-100" : ""}`}
            >
              {day}
            </th>
          ))}

        </tr>

      </thead>

      <tbody>

        {hours.map(hour => (

          <tr key={hour}>

            <td className="border p-2 font-medium">
              {formatHour(hour)}
            </td>

            {days.map(
              (_, dayIndex) => {

                const booking = getBookingForSlot(dayIndex, hour);
                const isBooked = !!booking;
                console.log("booking:", booking)
                // const booked =
                //   isSlotBooked(
                //     dayIndex,
                //     hour
                //   )

                return (
                  <td
  key={`${dayIndex}-${hour}`}
  onClick={() => handleSlotClick(dayIndex, hour)}
  title={
    booking
      ? `Reserved ${new Date(booking.startTime).toLocaleTimeString()} - ${new Date(booking.endTime).toLocaleTimeString()}`
      : "Available"
  }
  className={`
    border p-2 text-center cursor-pointer
    ${booking ? (
  isBlockStart(booking, hour) ? (
    <div className="bg-red-200 rounded p-1">
      🔴
    </div>
  ) : (
    <div className="opacity-0">.</div>
  )
) : (
  <div className="bg-green-100 rounded">🟢</div>
)}

        ${isBooked ? "bg-red-100" : "bg-green-100"}

    ${selectedSlot === `${dayIndex}-${hour}`
      ? "ring-2 ring-blue-500"
      : ""}

  `}
>
  {booking ? "🔴" : "🟢"}
</td>

                  // <td
                  //   key={`${dayIndex}-${hour}`}
                  //   onClick={() => handleSlotClick(dayIndex, hour)}
                  //   className={`
                  //     border
                  //     p-2
                  //     text-center
                  //     cursor-pointer

                  //     ${isBooked ? "bg-red-100" : "bg-green-100"}

                  //     ${selectedSlot === `${dayIndex}-${hour}`
                  //       ? "ring-2 ring-blue-500"
                  //       : ""}

                  //     ${
                  //       booking
                  //         ? `Reserved\n${new Date(booking.startTime).toLocaleString()} - ${new Date(booking.endTime).toLocaleString()}`
                  //         : "Available"
                  //     }
                  //   `}
                  // >

                  //   {booking
                  //     ? "🔴"
                  //     : "🟢"}

                  // </td>

                )
              }
            )}

          </tr>

        ))}

      </tbody>

    </table>

  </div>
</div>

  </div> */}
{/* </div> */}

</div>

{/*Daily Schedule display with colors */}

{/* <div className="bg-white rounded-xl shadow-md p-6 mt-6">

<div className="mt-6">

  <h2 className="text-xl font-bold mb-4">
    Daily Schedule
  </h2>

  <div className="space-y-2">

    {hours.map(hour => {

      const booked = isHourBooked(hour)

      return (

        <div
          key={hour}
          className={`
            flex
            justify-between
            items-center
            p-3
            rounded-lg
            border

            ${
              booked
                ? "bg-red-50 border-red-200"
                : "bg-green-50 border-green-200"
            }

            ${
              hour === currentHour
                ? "ring-2 ring-blue-400"
                : ""
            }
          `}
        >

          <div className="font-medium">
            {formatHour(hour)}
          </div>

          <div className="font-semibold">
            {booked
              ? "🔴 Reserved"
              : "🟢 Available"}
          </div>

        </div>

      )
    })}

  </div>

</div>
</div> */}






  {/* <h2 className="font-bold text-lg mb-3">
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
  ))} */}
  
</div>
  )
}
