"use client";

import { useEffect, useState } from "react";


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
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Profile */}

      <section className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      <div className="mb-4">
        <p className="">Name:</p>
        <p className="text-lg italic">{user?.name}</p>
      </div>
      <div className="mb-4">
        <p>Email:</p>
        <p className="text-lg italic">{user?.email}</p>
      </div>
      <div className="mb-4">
        <p>Role:</p>
        <p className="text-lg italic">{user?.role}</p>
      </div>

        {/* <p className="text-gray-600">Manage your profile settings here.</p> */}
      </section>

      <section className="bg-white rounded-xl mt-6 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Toggle Dark Mode
        </button>

      </section>

      <section className="bg-white rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">System Information</h2>
        <p className="text-gray-600">Study Space Booking System</p>
        <p className="text-gray-600">Version: 1.0.0</p>
        <p className="text-gray-600">Last Updated: 2024-06-01</p>
      </section>

    </div>
  )
}