import RoomCardSlide from "./RoomCardSlide";

export default function RoomListSlidePanel({ rooms = [], onSelectRoom, selectedRoom }) {
    const safeRooms = Array.isArray(rooms) ? rooms: [];
    return (
        <div className="pt-2 pb-4">
        <div className="grid grid-cols-1 gap-6">
            {safeRooms.map((room) => (
                <RoomCardSlide
                    key={room.id}
                    room={room}
                    onSelect={onSelectRoom}
                    selected={selectedRoom?.id === room.id}
                />
            ))}
        </div>
        </div>
    );
}