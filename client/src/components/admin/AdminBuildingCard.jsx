import Image from "next/image";
import { useState } from "react";
export default function AdminBuildingCard({ 
    building, 
    onEdit, 
    onDelete }) {

        const [expanded, setExpanded] = useState(false);

        return (
            <div className="bg-white rounded-2xl shadow border overflow-hidden">
                
                <div className="relative h-48">

                    <Image
                        src={building.imageUrl || "/default-building.jpg"}
                        alt={building.name}
                        fill
                        className="w-full sm:h-48 md:h-60 lg:h-100 object-cover"
                    />

                </div>
                <div className="p-5">
                    <h2 className="text-xl font-bold">
                        {building.name}
                    </h2>

                     <div className={`overflow-hidden transition-all duration-300
                        ${expanded ? "max-h-[1300px]" : "max-h-35 md:max-h-50"}`}>
                            
                            <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: expanded ? building?.description 
                                : building?.description?.slice(0, 180) + (building?.description?.length > 180 
                                ? "..." : "") }}>
                            </p>
                            {building?.description?.length > 180 && (
                                    <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="text-blue-500 ml-2 mt-2 hover:text-blue-700 transition font-medium"
                                    >
                                    {expanded ? "Show Less" : "Read More"}
                                    </button>
                                )}
                    </div>

                    <p className="mt-3">
                        Rooms: {building.rooms?.length || 0}
                    </p>

                    <div className="flex gap-2 mt-4">

                        <button onClick={() => onEdit(building)}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Edit
                        </button>

                        <button onClick={() => onDelete(building.id)}
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                            Delete
                        </button>

                    </div>
                </div>
            </div>
        )
}