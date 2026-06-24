export default function BuildingPreview({building, onViewRooms,}) {
    if(!building) {
        return (
            <div className="p-6 text-gray-500 border rounded-xl">
                Select a building to see details.
            </div>
        );
    }

    return (
        <div className="border rounded-xl overflow-hidden shadow-md">

        {/**Image */}
        <img
            src={building.imageUrl}
            className="w-full sm:h-48 md:h-60 lg:h-100 object-cover"
        />

        <div className="p-4">
            {/**Name */}
            <h2 className="text-xl font-semibold">
                {building.name}
            </h2>

            {/**Description */}
            <p className="text-sm text-gray-600 mt-2">
                {building.description}
            </p>

            {/**Amenities */}
             <div className="flex flex-wrap gap-2 mt-3">
                {building.amenities?.map((a) => (
                    <span
                    key={a}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                >
              {a}
            </span>
          ))}
        </div>

            {/**Room Summary */}
            <div className="mt-4 text-sm text-gray-700">
                Rooms: {building.rooms?.length || 0}
            </div>

            {/* Optional CTA */}
            <button 
            onClick={onViewRooms}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
              View Rooms
            </button>

        </div>

        </div>
    )
}