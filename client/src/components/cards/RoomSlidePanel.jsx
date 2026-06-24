"use client";

import RoomList from "./RoomList";

export default function RoomSlidePanel({
  isOpen,
  building,
  onClose,
  onSelectRoom,
  selectedRoom,
  rooms
  
}

) {
  console.log("BUILDING:", building);
console.log("ROOMS:", rooms);
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity z-40
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[450px]
        bg-white shadow-xl z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b flex justify-between">
          <h2 className="text-xl font-semibold">
            {building?.name} Rooms
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-full">
          {/* {building?.rooms?.map((room) => (
            <div
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className="border rounded-xl p-4 cursor-pointer hover:bg-gray-50"
            >
              <h3 className="font-semibold">
                {room.name}
              </h3>

              <p className="text-sm text-gray-500">
                Capacity: {room.capacity}
              </p>

              <p className="text-sm mt-2">
                {room.description}
              </p>
            </div>
          ))} */}
          <RoomList
            //rooms={rooms}
            rooms={building?.rooms || []}
            selectedRoom={selectedRoom}
            onSelectRoom={onSelectRoom}
            />
        </div>
      </div>
    </>
  );
}