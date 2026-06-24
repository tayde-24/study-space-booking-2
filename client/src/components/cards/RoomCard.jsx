import Image from "next/image";

export default function RoomCard({ room, onSelect, selected }) {
    return (
        <div 
        onClick={() => onSelect(room)}
        //className="border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition" 
        className={`border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition
            ${selected ? "ring-2 ring-blue-500": ""}`}
        >
            <div className="relative w-full h-40">
            <Image
                src={room.imageUrl || "/placeholder.jpg"}
                alt={room.name}
                width={300}
                height={200}
                className="object-cover"
            />
            </div>

            <div className="p-3">
            <h2 className="font-semibold">
                {room.name}
            </h2>
            <p className="text-gray-500 text-sm">
                Capacity: {room.capacity}
            </p>
            <p className="text-gray-600 text-sm">
                {room.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
          {room.amenities?.slice(0, 3).map((a) => (
            <span
              key={a}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {a}
            </span>
          ))}
        </div>
        
            </div>
        </div>
    )
}