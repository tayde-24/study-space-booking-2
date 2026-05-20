"use client"

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:3001/auth/google"
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">
          Study Space Booking
        </h1>

        <button
          onClick={handleGoogleLogin}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}