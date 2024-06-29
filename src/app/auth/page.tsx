"use client";

import React, {FormEvent, useState} from 'react'
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const response = await fetch('/api/auth/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      }
    )

    if (response.ok) {
      return router.push('/');
    }

    const responseData = await response.json();
    setError(responseData.error);
  }

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Login / Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email"
               className="w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
               required/>
        <input type="password" name="password" placeholder="Password"
               className="w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
               required/>
        <button type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
      </form>
    </main>

  )
}