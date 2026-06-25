"use client";
import Image from "next/image";

export default function BookingConfirmationModal ({
    isOpen,
    onClose,
    onConfirm,
    selectedBuilding,
    selectedRoom,
    startTime,
    endTime,
}) {
    if (!isOpen) return null;

    return(
        <div className="fixed inset-0 bg-black/50 flex item-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">

                <h2 className="text-xl font-bold mb-4">
                    Confirm Reservation
                </h2>

                {/* <div className="space-y-3 mb-6">
                    <p>
                        <strong>Building: </strong>
                        {selectedBuilding?.name}
                    </p>

                    
                    <p>
                        <strong>Room: </strong>
                        {selectedRoom?.name}
                    </p>

                    <p>
                        <strong>Start: </strong>
                        {new Date(startTime).toLocaleString()}
                    </p>

                    <p>
                        <strong>End: </strong>
                        {new Date(endTime).toLocaleString()}
                    </p>
                </div> */}

                <div className="bg-gray-50 rounded-lg p-4">
                    <Image
                      src={selectedRoom?.imageUrl}
                      alt={selectedRoom?.name}
                      width={400}
                      height={200}
                      className="rounded-lg mb-4"
                    />
                    <h3 className="font-semibold mb-2">
                      Reservation Details
                    </h3>

                    <p>🏢 {selectedBuilding?.name}</p>
                    <p>🚪 {selectedRoom?.name}</p>
                    <p>👥 Capacity: {selectedRoom?.capacity}</p>
                    <p>
                        <strong>Start: </strong>
                        {new Date(startTime).toLocaleString()}
                    </p>

                    <p>
                        <strong>End: </strong>
                        {new Date(endTime).toLocaleString()}
                    </p>
                </div>


                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded">
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded">
                        Confirm Booking
                    </button>

                </div>

            </div>
        </div>
    )
}