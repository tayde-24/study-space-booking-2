"use client";

import React from "react";
import Image from "next/image";
import {useMemo} from "react";

export default function WeeklyCalendar({
    room,
    weeklySchedule = [],
    onSlotClick,
    weekStart,
    onPrevWeek,
    onNextWeek,
    selectedRoom,
    weekOffset,
    setWeekOffset,
    handleSlotClick,
    selectedSlot,
    isSlotBooked,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    handleBooking,
    setShowConfirmation,
    selectedBuilding,
    isHourBooked
}) {
  const isHourBookedSlot = typeof isHourBooked === "function" ? isHourBooked : () => false;

  const isPastSlot = (dayIndex, hour) => {
    const now = new Date();


    // Get start of current displayed week
    const today = new Date();
    const currentDay = today.getDay();

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - currentDay + dayIndex + weekOffset * 7);
    
    //Build slot date
    // const slotDate = new Date(weekStart);
    const slotDate = getSlotDate(dayIndex, hour);
    // slotDate.setHours(hour, 0, 0, 0);
    // slotDate.setDate(weekStart.getDate() + dayIndex);

    // return slotDate < now;
    return slotDate < new Date();
  }
  
  console.log("WeeklyCalendar isHourBooked:", typeof isHourBooked);
    const hours = Array.from({ length: 15 }, (_, i) => i + 8);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const {availableSlots, reservedSlots} = useMemo(() => {

      const totalSlots = days.length * hours.length;
      const reserved = weeklySchedule.reduce((count, booking) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);

      return count + (end.getHours() - start.getHours());
    }, 0);

      return {
        availableSlots: totalSlots - reserved, 
        reservedSlots: reserved};
    }, [weeklySchedule]);
    

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


const getBookingForSlot = (dayIndex, hour) => {
    const weekStart = getWeekStart();

    const slotDate = new Date(weekStart);
    slotDate.setDate(weekStart.getDate() + dayIndex);
    slotDate.setHours(hour, 0, 0, 0);

      return weeklySchedule.find((booking) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        return (
          //start.getDay() === dayIndex &&
          start.toDateString() === slotDate.toDateString() && 
          hour >= start.getHours() &&
          hour < end.getHours()
        );
      });
    }

    const getWeekStart = () => {
      const today = new Date();
      //const day = today.getDay(); // 0 (Sun) to 6 (Sat)

      //const mondayOffset = today.getDate() - day + (weekOffset * 7); // Adjust for Sunday
      //const start = new Date(today);
      const start = new Date(today);
      // start.setDate(mondayOffset);
      start.setDate(today.getDate() - today.getDay() + weekOffset * 7);;
      start.setHours(0, 0, 0, 0);

      return start;
    
    }

    const getSlotDate = (dayIndex, hour) => {
      const weekStart = getWeekStart();

      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + dayIndex);
      date.setHours(hour, 0, 0, 0);

      return date;
    };

    return (

            <div>
<div className="overflow-x-auto ">

    <div className="p-4 grid grid-cols-2 text-wrap gap-4">

            <img
            src={selectedRoom?.imageUrl}
            alt={selectedRoom?.name}
            className="w-full rounded shadow-sm"
            />

            <div className="ml-5">
              {selectedBuilding?.name && (
                <p className="text-sm text-gray-600">
                  🏢 Building: {selectedBuilding.name}
                </p>
              )}
              {selectedRoom?.name && (
                <p className="text-sm text-gray-600">
                  🚪 Room: {selectedRoom.name}
                </p>
              )}
              {selectedRoom?.capacity && (
                <p className="text-sm text-gray-600">
                  👥 Capacity: {selectedRoom.capacity}
                </p>
              )}
              

              {selectedRoom?.description && (
            <p className="text-sm text-gray-500 mt-3">
              {selectedRoom.description}
            </p>
          )}
          </div>
          
          <div>
            <span className="text-sm">Amenities:</span>
              {selectedRoom?.amenities ? (
                  selectedRoom.amenities.split(",").map((a) => (
                    
                    <p
                    key={a}
                    className="text-xs bg-gray-100 px-3 py-2 rounded-full mt-2"
                    >
                      {a}
                    </p>
            
          ))) : (
            
              <p className="text-sm text-gray-500">
                No amenities listed.
              </p>
          )}
          </div>

    </div>


  <div className="grid grid-cols-2 gap-4 mb-6 mt-5">

{/* //Try to fix here, numbers are lagging*/}
  <div className="bg-green-50 p-4 rounded-lg shadow-md">

    <div className="text-sm">
      Available Slots
    </div>

    <div className="text-2xl font-bold">
      {
        availableSlots
      }
    </div>

  </div>

<div className="bg-red-50 p-4 rounded-lg shadow-md">

    <div className="text-sm">
      Reserved Slots
    </div>

    <div className="text-2xl font-bold">
      {
        reservedSlots
      }
    </div>

  </div>

  </div>

  <div className="mt-5 text-sm border rounded bg-gray-50 p-3">
    <p className="mb-2"><strong>Legend: </strong></p>
    <p>🟢 Available</p>
    <p>🔴 Reserved</p>
  </div>


  <div className="flex justify-between items-center mb-4 mt-5">

  <button
    onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
  disabled={weekOffset === 0}
  className={`px-3 py-1 border rounded transition duration-300 shadow-sm
    ${weekOffset === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
  `}
>
  ← Prev Week
</button>

  <h2 className="font-bold">
    Week {weekOffset === 0 ? "Current" : `${weekOffset}`}
  </h2>

  <button
    onClick={() => setWeekOffset(prev => prev + 1)}
    className="px-3 py-1 border rounded transition duration-400 hover:bg-gray-100 shadow-sm"
  >
    Next Week →
  </button>
    </div>

    {/**Calender Table */}
    <table className="w-full border-collapse">

      <thead>

        <tr className="bg-gray-300 text-sm">

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

            <td className="border p-2 text-sm">
              {formatHour(hour)}
            </td>

            {days.map((_, dayIndex) => {
              const booking = getBookingForSlot(dayIndex, hour);
              const isBooked = !!booking;
              const isPast = isPastSlot(dayIndex, hour);

  return (
    <td
      key={`${dayIndex}-${hour}`}
      onClick={ () => {
        if (isPast || isBooked) return;
        handleSlotClick(dayIndex, hour)}}
      title={
        booking
          ? `Reserved ${new Date(
              booking.startTime
            ).toLocaleTimeString()} - ${new Date(
              booking.endTime
            ).toLocaleTimeString()}`
          : "Available"
      }
      className={`
        border p-2 text-center cursor-pointer transition duration-300
        ${isPast ? "bg-gray-200 cursor-not-allowed" : ""}
        ${!isPast && !isBooked ? "hover:bg-green-200 bg-green-50" : ""}
        ${isPast && isBooked ? "bg-red-200" : ""}
        
        ${isBooked ? "bg-red-100" : "bg-green-100"}
        ${selectedSlot === `${dayIndex}-${hour}` ? "ring-2 ring-blue-500" : ""}
      `}
    >
      {isPast ? "⚪" : isBooked ? "🔴" : "🟢"}
    </td>
  );
    })}

          </tr>

        ))}

      </tbody>

    </table>

  </div>

{/* Start time */}
      <div className="mt-5">
        <label className="block mb-2 font-semibold">
          Start Time
        </label>

        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) =>
            setStartTime(e.target.value)
          }
          className="border rounded-lg p-2 w-full transition duration-300 hover:shadow-lg"
        />

      </div>

      {/* End time */}
      <div className="mt-3">
        <label className="block mb-2 font-semibold">
          End Time
        </label>

        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) =>
            setEndTime(e.target.value)
          }
          className="border rounded-lg p-2 w-full transition duration-300 hover:shadow-lg"
        />

      </div> 

      {/* Submit */}
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={!selectedRoom || !startTime || !endTime}
        className="bg-black text-white px-4 py-2 rounded-xl mt-5 shadow-md transition duration-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reserve Room
      </button>

</div>
    );
}