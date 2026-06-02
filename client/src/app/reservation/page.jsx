"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import BookingForm from "@/components/booking/BookingForm";

export default function ReservationPage() { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3001/auth/me",
                    {
                        credentials: "include"
                    }
                )
                const data = await res.json()
                console.log("Auth user:", data);
                if (!data || !data.user) {
                    router.push("/login")
                    return
                }
                const actualUser = data?.user ?? data;
                setUser(actualUser)
            } catch (err) {
                console.error(err)
                router.push("/login")
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">
                Make a Reservation
            </h1>
            <BookingForm />
        </div>
    )
}