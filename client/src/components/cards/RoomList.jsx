import RoomCard from "./RoomCard";

export default function RoomList({ rooms = [], onSelectRoom, selectedRoom }) {
    const safeRooms = Array.isArray(rooms) ? rooms: [];
    return (
        <div className="pt-6 pb-6">
        <div className="grid grid-cols-1 gap-6">
            {safeRooms.map((room) => (
                <RoomCard
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