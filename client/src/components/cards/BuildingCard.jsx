import Image from "next/image";

export default function BuildingCard({ building, onSelect, isSelected }) {
    return (
        <div
            className={`
      shadow-md rounded-xl overflow-hidden cursor-pointer
      hover:shadow-2xl transition duration-300
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

            <div className="p-4 bg-white">
            <h2 className="font-bold text-lg mt-3 mb-2">
                {building.name}
            </h2>
        
            </div>
        </div>
    );
}