"use client";

import { useEffect, useState } from "react";
import DarkModeToggle from "@/components/admin/DarkModeToggle";


export default function AdminSettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/auth/me", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);



  return ( 
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>

      {/* Profile */}

      <section className="bg-white shadow-md rounded-lg p-6 mt-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Profile</h2>

      <div className="mb-4">
        <p className="text-black dark:text-white">Name:</p>
        <p className="text-lg italic text-black dark:text-white">{user?.name}</p>
      </div>
      <div className="mb-4">
        <p className="text-black dark:text-white">Email:</p>
        <p className="text-lg italic text-black dark:text-white">{user?.email}</p>
      </div>
      <div className="mb-4">
        <p className="text-black dark:text-white">Role:</p>
        <p className="text-lg italic text-black dark:text-white">{user?.role}</p>
      </div>
      </section>


      {/* Dark Mode  */}
      {/* <section className="bg-white rounded-xl mt-6 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Appearance</h2>

        <DarkModeToggle />

      </section> */}

      <section className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">System Information</h2>
        <p className="text-gray-600 dark:text-white">Study Space Booking System</p>
        <p className="text-gray-600 dark:text-white">Version: 1.0.0</p>
        <p className="text-gray-600 dark:text-white">Last Updated: 2024-06-01</p>
      </section>

    </div>
  )
}