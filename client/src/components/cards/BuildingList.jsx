import BuildingCard from "./BuildingCard";

export default function BuildingList({ buildings, onSelectBuilding, selectedBuilding }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {buildings.map((building) => (
                <BuildingCard
                    key={building.id}
                    building={building}
                    onSelect={onSelectBuilding}
                    isSelected={selectedBuilding?.id === building.id}
                />
            ))}
        </div>
    );
}