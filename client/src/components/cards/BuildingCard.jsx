import Image from "next/image";

export default function BuildingCard({ building, onSelect, isSelected }) {
    return (
        <div
            className={`
      border rounded-xl overflow-hidden cursor-pointer
      hover:shadow-lg transition
      ${isSelected ? "ring-2 ring-blue-500" : ""}
      
    `}
            onClick={() => onSelect(building)}
        >
            <div className="relative w-full sm:h-40 md:h-30 lg:h-40">
            <Image
                src={building.imageUrl}
                alt={building.name}
                width={300}
                height={200}
                className="object-cover"
            />
            </div>

            <div className="p-4">
            <h2 className="font-bold text-lg mt-3 mb-2">
                {building.name}
            </h2>
            {/* <p className="text-gray-600">
                {building.description}
            </p> */}

            {/* <div className="flex flex-wrap gap-2 mt-3">
          {building.amenities?.slice(0, 3).map((a) => (
            <span
              key={a}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {a}
            </span>
          ))}
        </div> */}
        
            </div>
        </div>
    );
}