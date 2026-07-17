import Image from "next/image";

export default function RoomCardSlide({ room, onSelect, selected }) {
    return (
        <div 
        onClick={() => onSelect(room)} 
        className={`bg-gray-50 shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-xl 
          
            ${selected ? "ring-2 ring-blue-500": ""}`}
        >
            <div className="relative w-full md:h-50 sm:h-40 xs:h-30">
            <Image
                src={room.imageUrl || "/placeholder.jpg"}
                alt={room.name}
                width={300}
                height={200}
                className="object-cover w-full h-full"
            />
            </div>

            <div className="p-3">
            <h2 className="font-semibold">
                {room.name}
            </h2>
            <p className="text-gray-500 text-sm">
                Capacity: {room.capacity}
            </p>
        
            </div>
        </div>
    )
}