import Image from "next/image";

export default function AdminRoomCard({
    room,
    onEdit,
    onDelete
}) {

    return (
        <div className="bg-white rounded-2xl shadow border overflow-hidden">

            <div className="relative h-48">

                <Image
                    src={room.imageUrl || "/default-room.jpg"}
                    alt={room.name}
                    fill
                    className="w-full sm:h-48 md:h-60 lg:h-100 object-cover"
                />
            </div>

            <div className="p-5">
                <h2 className="text-xl font-bold">
                    {room.name}
                </h2>
                <p className="text-gray-500">
                    Building: {room.building?.name || "N/A"}
                </p>

                <div className="mt-4 space-y-1">

                    <p>👥 Capacity: {room.capacity}</p>
                    <p>🖥️ Amenities:</p>
                    <ul className="list-disc list-inside ml-4">
                        {room.amenities?.split(",").map((list) => (
                            <li key={list}>
                                {list}
                            </li>
                        ))}
                    </ul>       
                </div>

                <div className="flex gap-2 mt-6">

                    <button onClick={() => onEdit(room)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        Edit
                    </button>

                    <button onClick={() => onDelete(room.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                        Delete
                    </button>

                </div>

        </div>

        </div>
    )
}