'use client';

import Link from 'next/link';
import {useSession, signIn, signOut} from "next-auth/react"

export default function Page() {
  const {data: session} = useSession()

  if (session) {
    return (
      <div>
        <p>Logged As</p>
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Hello World</h1>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <Link href="/filip">
            <p className="text-blue-500 text-xl hover:underline">Filip</p>
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/auth">
            <p className="text-blue-500 text-xl hover:underline">Auth</p>
          </Link>
        </li>
      </ul>
    </main>
  );
}
