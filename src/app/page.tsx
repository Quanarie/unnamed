'use client';

import Link from 'next/link';
import {useSession, signIn, signOut} from 'next-auth/react'

export default function Page() {
  const {data: session} = useSession();

  return (
    <main className='flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>unnamed</h1>
      <ul className='list-disc pl-5'>
        <li className='mb-2'>
          <Link href='/filip'>
            <p className='text-blue-500 text-xl hover:underline'>filip</p>
          </Link>
        </li>
        {!session && (
          <li className='mb-2'>
            <button onClick={() => signIn()}>
              <p className='text-blue-500 text-xl hover:underline'>login/register</p>
            </button>
          </li>
        )}
        {session && (
          <li className='mb-2'>
            <button onClick={() => signOut()}>
              <p className='text-blue-500 text-xl hover:underline'>logout</p>
            </button>
          </li>
        )}
      </ul>
      {session && (
        <div>
          you are logged as {session?.user?.email}
        </div>
      )}
    </main>
  );
}
