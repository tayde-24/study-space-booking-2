"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

const links = [
        {name: "Home", href: "/"},  
        {name: "Dashboard", href: "/dashboard"},
        {name: "Reservations", href: "/reservation"},
    ]

export default function SideBarLayout({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
            await fetch("http://localhost:3001/auth/logout", {
            credentials: "include"
        })

        setUser(null);
        router.push("/login");
        
    }

    // const handleLogout = async () => {
    //     try {
    //         await fetch('http://localhost:3001/auth/logout', {
    //             method: 'POST',
    //             credentials: 'include'
    //         });
    //         router.push("/login");
    //     } catch (error) {
    //         console.error("Error logging out:", error);
    //     }
    // };

    useEffect(() => {
        const checkAuth = async() => {
            try{
                const res = await fetch('http://localhost:3001/auth/me',
                    {
                        credentials: 'include'
                    }
                );
                const data = await res.json();
                setUser(data.user);
                
            } catch(error) {
                console.error("Error checking authentication:", error);
            } finally {
                setLoading(false);
            }

        }
        checkAuth();
        // if (!user) return;

        // if (user.role !== "ADMIN") {
        //     router.push("/dashboard");
        // }
    }, [user]);

    const handleLogin = () => {
        window.location.href =
        "http://localhost:3001/auth/google";
    };

    const handleLogout = async () => {
        await fetch("http://localhost:3001/auth/logout", {
        credentials: "include",
        });

        setUser(null);
        router.push("/login");

        router.refresh(); // App Router
    };

    // useEffect(() => {
    //     if (loading) return;

    //     if (!user) {
    //         router.push("/login");
    //         return;
    //     }
    //     if (user.role !== "ADMIN") {
    //         router.push("/dashboard");
    //     }
    // }, [user, loading, router]);
    
    // if (loading) {
    //             return <div className="flex items-center justify-center h-screen">Loading...</div>;
    // }

    // useEffect(() => {
    //     const checkAuth = async() => {
    //         try{
    //             const res = await fetch('http://localhost:3001/auth/me',
    //                 {
    //                     credentials: 'include'
    //                 }
    //             );
    //             const data = await res.json();
    //             setUser(data.user);
                
    //         } catch(error) {
    //             console.error("Error checking authentication:", error);
    //         } finally {
    //             setLoading(false);
    //         }

    //     }
    //     checkAuth();
    //     // if (!user) return;
    // }, [user]);

    // useEffect(() => {
    //     if (loading) return;

    //     if (!user) {
    //         router.push("/login");
    //         return;
    //     }
    // }, [user, loading, router]);
    
    // if (loading) {
    //             return <div className="flex items-center justify-center h-screen">Loading...</div>;
    // }
    return (
        
        // <div className="flex min-h-screen">
        <div className="flex min-h-screen">
            {/* Sidebar*/}
            <aside className="w-64 bg-gray-900 text-white p-4 sticky top-0 h-screen">
                {/* <h1 className="text-x1 font-bold mb-6">
                    User Panel
                </h1> */}

                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link 
                            key={link.name}
                            href={link.href}
                            className={`hover:bg-gray-700 p-2 rounded transition ${pathname === link.href ? "bg-gray-700" : ""}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {/* <Link href="/" className="hover:bg-gray-700 p-2 rounded">
                        Home
                    </Link>
                    <Link href="/dashboard" className="hover:bg-gray-700 p-2 rounded">
                        User Dashboard
                    </Link>
                    <Link href="/reservation" className="hover:bg-gray-700 p-2 rounded">
                        Reservation
                    </Link> */}
                    
                    {user ? (
                        <button onClick={handleLogout}
                        className="bg-blue-700 hover:bg-blue-900 p-2 rounded transition mt-10"
                        >
                            Logout
                        </button>
                    ): (
                       <button onClick={handleLogin}
                       className="bg-blue-700 hover:bg-blue-900 p-2 rounded transition mt-10">
                            Login
                        </button> 
                    )}
                    {/* <button onClick={logout} className="bg-blue-700 hover:bg-blue-900 p-2 rounded transition mt-10">
                        Logout
                    </button> */}
                    
                </nav>
            </aside>

            {/**Page Content */}

            <main className="flex-1 bg-gray-100">
                {children}
            </main>

        </div>
    )
}