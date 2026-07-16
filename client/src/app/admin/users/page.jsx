"use client";

import {useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/admin/users", {
        credentials: "include"
      });
      const data = await res.json();
      console.log("Fetched users:", data); // Log the fetched users for debugging
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const updateRole = async (userId, role) => {
    try {
      const res = await fetch(`http://localhost:3001/admin/users/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role })
      });
      if (!res.ok) {
        const errorData = await res.json();
        //console.error("Error updating user role:", errorData);
        //throw new Error(errorData.error || "Failed to update user role");
        window.alert(errorData.error || "Failed to update user role");
        return;
      } 
      fetchUsers(); // Refresh the users list after updating the role
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3001/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) {
        const errorData = await res.json();
        window.alert(errorData.error || "Failed to delete user");
        return;
      }
      fetchUsers(); // Refresh the users list after deleting a user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Users</h1>

      <table className="min-w-full mt-4 border border-gray-300 bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr className="p-3 text-left">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left"></th>
            <th className="p-3 text-left">Bookings</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users ?? []).map((user) => (
            <tr key={user.id} className="border-b hover:bg-blue-50 transition-colors duration-300">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <select
                value={user.role}
                onChange={(e) => updateRole(user.id, e.target.value)}
                className="border rounded-lg p-2 w-full hover:shadow-lg"
                >
                  <option value="USER">Student (USER)</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              <td className="p-3">{user.bookings.length}</td>
              <td className="p-3" colSpan="6">
            <button className={`${user.role === "ADMIN" 
            ? "opacity-50 cursor-not-allowed bg-white hover:bg-white" : ""}
            bg-red-500 text-white px-4 py-2 
            rounded hover:bg-red-800 transition-colors duration-300
            `} 
            onClick= { () => deleteUser(user.id)}
            >
            Delete
            </button>
          </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
}