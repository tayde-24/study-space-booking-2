"use client";
import { useEffect, useState } from "react"
import api from "@/lib/api";
import BuildingList from "../cards/BuildingList";
import RoomList from "../cards/RoomList";
import BuildingPreview from "../cards/BuildingPreview";
import RoomSlidePanel from "../cards/RoomSlidePanel";
import WeeklyCalendar from "../calendar/WeeklyCalendar";
import BookingConfirmationModal from "../modals/BookingConfirmationModal";

export default function BookingForm() {
    const [message, setMessage] = useState("");
    // //added more down here
    const [roomStatuses, setRoomStatuses] = useState([]);
    
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

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showRoomSection, setShowRoomSection] = useState(false);
    const [showRoomPanel, setShowRoomPanel] = useState(false);

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

      const res = await api.get(`/bookings/week/${selectedRoom?.id}`,
        {
          params: {
            weekOffset
          }
        }
      );
      setWeeklySchedule(res.data);

      //const res = await api.get(`/bookings/week/${selectedRoom?.id}`);
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

    const isHourBooked = (dayIndex, hour) => {
  return schedule.some(booking => {
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    const slot = new Date(start);
    slot.setDate(start.getDate() + dayIndex);
    slot.setHours(hour, 0, 0, 0);

    return slot >= start && slot < end;
  });
};
    

    // const isHourBooked = (hour) => {
    //   return schedule.some(booking => {
    //     const start = new Date(booking.startTime).getHours();
    //     const end = new Date(booking.endTime).getHours();

    //     return hour >= start && hour < end;
    //   })
    // }

    const isBlockStart = (booking, hour) => {
      const start = new Date(booking.startTime);
      return start.getHours() === hour;
    }

    const currentHour = new Date().getHours(); 

    const handleBooking = async (e) => {
    e?.preventDefault()

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
      setShowRoomPanel(false);
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
      //possibly here
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
    return
  }
  fetchWeeklySchedule()
}, [selectedRoom, weekOffset]);

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
  document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
}, [selectedRoom])

const handleViewRooms = () => {
  console.log("View Rooms clicked");
  console.log({
    showRoomPanel,
    showRoomSection
  })
  setShowRoomSection(true);
  setShowRoomPanel(true);
};

console.log("selectedBuilding:", selectedBuilding);
console.log("BookingForm isHourBooked:", typeof isHourBooked);

return (
// Probably change this part
<div className="justify-content">

<div className="flex flex-row gap-20">
      {/* Building */}

  <div className="" id="flexxx left">
      <div className="">
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
              onViewRooms={handleViewRooms}
              />
            </div>
        </div> 

{/* Mobile version here */}
      <div className="lg:hidden">
        <RoomSlidePanel
            // isOpen={showRoomsPanel}
            isOpen={showRoomPanel}
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

        <div className="p-6" >
        {selectedRoom && (
          <div className="mt-6 p-4 border rounded-xl bg-blue-50">
            <h3 className="font-semibold">
              Selected Room
            </h3>

            <p>{selectedRoom.name}</p>

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
                    isHourBooked={isHourBooked}
                    handleBooking={handleBooking}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    startTime={startTime}
                    endTime={endTime}
                    setShowConfirmation={setShowConfirmation}
                  />  
                )}

          </div>
        )}  

        </div>
        </div>

        

        {/* Room Section */}
        {showRoomSection && (
          <div className={`hidden p-6 lg:grid grid-cols-1 lg:grid-cols-4 gap-6 
          transition-all duration-500 ${showRoomSection ? "opacity-100 translate-y-0" :
            "opacity-0 translate-y-4 hidden"
          }`} id="calendar">
          {/**LEFT: Room Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
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
              <div className="bg-white rounded-xl shadow-md p-4">
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
                    isHourBooked={isHourBooked}
                    handleBooking={handleBooking}
                    setStartTime={setStartTime}
                    setEndTime={setEndTime}
                    startTime={startTime}
                    endTime={endTime}
                    setShowConfirmation={setShowConfirmation}
                    selectedBuilding={selectedBuilding}  
                  />

                  
                )}


              </div>
            </div>

            

        </div>
        )}
        
<BookingConfirmationModal
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={async () => {
              await handleBooking();
              setShowConfirmation(false);
            }}
            selectedBuilding={selectedBuilding}
            selectedRoom={selectedRoom}
            startTime={startTime}
            endTime={endTime}
            >

            
            </BookingConfirmationModal>

      </div>

</div>

</div>

</div>
  )
}
