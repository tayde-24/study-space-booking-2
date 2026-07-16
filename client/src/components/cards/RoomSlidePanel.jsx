"use client";

import RoomListSlidePanel from "./RoomListSlidePanel";

export default function RoomSlidePanel({
  isOpen,
  building,
  onClose,
  onSelectRoom,
  selectedRoom,
  rooms
  
})
{

  console.log("onClose function:", onClose);
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
        className={`fixed top-0 right-0 h-full w-full xxs:w-[200px] xs:w-[300px] sm:w-[400px] md:w-[450px]
        bg-white shadow-xl z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b flex justify-between">
          <h2 className="text-xl font-semibold">
            {building?.name} Rooms
          </h2>

          <button
            // onClick={onClose}
            onClick={() => {
            console.log("Close button clicked");
            onClose();
            }}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-2 overflow-y-auto h-full">
          <RoomListSlidePanel
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