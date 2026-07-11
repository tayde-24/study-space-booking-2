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

                <div className="bg-blue-50 rounded-lg p-4 mb-4 shadow-lg">
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

                    <p>🏢 <strong>Building:</strong> {selectedBuilding?.name}</p>
                    <p>🚪 <strong>Room:</strong> {selectedRoom?.name}</p>
                    <p>👥 <strong>Capacity:</strong> {selectedRoom?.capacity}</p>
                    <p className="mt-4">
                        <strong>Start: </strong>
                        {new Date(startTime).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true
                            })}
                    </p>

                    <p>
                        <strong>End: </strong>
                        {new Date(endTime).toLocaleString("en-US", {
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true
                            })}
                    </p>
                </div>


                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded transition duration-300 hover:bg-gray-200">
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-700">
                        Confirm Booking
                    </button>

                </div>

            </div>
        </div>
    )
}