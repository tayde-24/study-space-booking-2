"use client";

import React from "react";
import Image from "next/image";

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
}) {
    const hours = Array.from({ length: 15 }, (_, i) => i + 8);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
      return weeklySchedule.find((booking) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        return (
          start.getDay() === dayIndex &&
          hour >= start.getHours() &&
          hour < end.getHours()
        );
      });
    }

        return (

            <div>
<div className="overflow-x-auto">

    <div className="p-4 grid grid-cols-2">

            {/* <Image
              src={selectedRoom?.imageUrl}
              alt={selectedRoom?.name}
              width={600}
              height={400}
              className="w-full rounded-lg mb-4 object-cover"
            /> */}
            <img
            src={selectedRoom?.imageUrl}
            alt={selectedRoom?.name}
            className="w-full rounded"
            />

            {/* <div className="">
                Paragraph
            </div> */}
    </div>

    <div className="flex justify-between items-center mb-4">

  <button
    onClick={() => setWeekOffset(prev => prev - 1)}
    className="px-3 py-1 border rounded hover:bg-gray-100 transition-all"
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

    {/**Calender Table */}
    <table className="w-full border-collapse">

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

            {days.map((_, dayIndex) => {
  const booking = getBookingForSlot(dayIndex, hour);
  const isBooked = !!booking;

  return (
    <td
      key={`${dayIndex}-${hour}`}
      onClick={() => handleSlotClick(dayIndex, hour)}
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
        border p-2 text-center cursor-pointer
        ${isBooked ? "bg-red-100" : "bg-green-100"}
        ${selectedSlot === `${dayIndex}-${hour}` ? "ring-2 ring-blue-500" : ""}
      `}
    >
      {isBooked ? "🔴" : "🟢"}
    </td>
  );
    })}

          </tr>

        ))}

      </tbody>

    </table>

  </div>

{/* Start time */}
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

      {/* End time */}
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
      {/* <button
        onClick={handleBooking}
        className="bg-black text-white px-4 py-2 rounded-xl"
      > */}
      <button
        onClick={() => setShowConfirmation(true)}
        disabled={!selectedRoom || !startTime || !endTime}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Reserve Room
      </button>

</div>
    //         <div>
    //   {/* Week Navigation */}
    //   <div className="flex justify-between items-center mb-4">
    //     <button
    //       onClick={() => setWeekOffset((prev) => prev - 1)}
    //       className="px-4 py-2 border rounded"
    //     >
    //       Previous Week
    //     </button>

    //     <h2 className="font-semibold text-lg">
    //       {selectedRoom?.name || "Select a Room"}
    //     </h2>

    //     <button
    //       onClick={() => setWeekOffset((prev) => prev + 1)}
    //       className="px-4 py-2 border rounded"
    //     >
    //       Next Week
    //     </button>
    //   </div>

    //   {/* Calendar Grid */}
    //   <div className="overflow-auto">
    //     <div
    //       className="grid"
    //       style={{
    //         gridTemplateColumns: "80px repeat(7, 1fr)",
    //       }}
    //     >
    //       {/* Header */}
    //       <div className="border p-2 font-semibold">
    //         Time
    //       </div>

    //       {days.map((day) => (
    //         <div
    //           key={day}
    //           className="border p-2 font-semibold text-center"
    //         >
    //           {day}
    //         </div>
    //       ))}

    //       {/* Time Slots */}
    //       {hours.map((hour) => (
    //         <React.Fragment key={hour}>
    //           <div className="border p-2 text-sm">
    //             {hour}:00
    //           </div>

    //           {days.map((_, dayIndex) => {
    //             const booked = isSlotBooked(dayIndex, hour);

    //             return (
    //               <div
    //                 key={`${dayIndex}-${hour}`}
    //                 onClick={() =>
    //                   !booked &&
    //                   handleSlotClick(dayIndex, hour)
    //                 }
    //                 className={`
    //                   border h-12 cursor-pointer
    //                   transition-colors
    //                   ${
    //                     booked
    //                       ? "bg-red-200"
    //                       : "hover:bg-green-100"
    //                   }
    //                 `}
    //               />
    //             );
    //           })}
    //         </React.Fragment>
    //       ))}
    //     </div>
    //   </div>
    // </div>
        //     <div>
        //         {/* Header */}
        //         <div className="flex justify-between items-center mb-4">
        //             <button
        //                 onClick={onPrevWeek}
        //                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        //             >
        //                 Previous Week
        //             </button>

        //             <h2 className="text-lg font-semibold">
        //                 {room?.name || "Select a Room" }
        //             </h2>

        //             <button
        //                 onClick={onNextWeek}
        //                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        //             >
        //                 Next Week
        //             </button>
        //         </div>

        //         {/* Calendar Grid */}
        //         <div className="overflow-x-auto">
        //             <table className="w-full border-collapse">
        //                 <thead>
        //                     <tr>
        //                         <th className="border p-2">Time</th>
        //                         {days.map((day) => (
        //                             <th key={day} className="border p-2">
        //                                 {day} <br />
        //                                 {/* {new Date(weekStart.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString()} */}
        //                             </th>
        //                         ))}
        //                     </tr>
        //                 </thead>

        //                 <tbody>
        //                     {hours.map((hour) => (
        //                         <tr key={hour}>
        //                             <td className="border p-2 font-medium">
        //                                 {hour}:00
        //                             </td>

        //                             {days.map((_, dayIndex) => {
        //                                 const booked = isSlotBooked(dayIndex, hour);
        //                                 return (
        //                                     <td
        //                                         key={`${dayIndex} - ${hour}`}
        //                                         onClick={() => !booked && onSlotClick(dayIndex, hour)}
        //                                         className={`border p-2 cursor-pointer ${booked ? "bg-red-200" : "hover:bg-blue-100"}`}
        //                                     >
        //                                         {booked ? "Booked" : "Available"}
        //                                     </td>
        //                                 );
        //                             })}
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>

        //     </div>
        // </div>
    );
}