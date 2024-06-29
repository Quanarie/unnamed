'use client';

import React, {useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';

class Phrase {
  constructor(public id: number, public content: string, public user_email: string) {
  }
}

export default function Page() {
  const {data: session} = useSession();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [newPhrase, setNewPhrase] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPhrases();
  }, []);

  const fetchPhrases = async () => {
    const response = await fetch('/api/filip/get');
    const data = await response.json();
    setPhrases(data);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const response = await fetch('/api/filip/post', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: newPhrase})
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error);
    } else {
      setNewPhrase('');
      await fetchPhrases();
    }
  };

  const deletePhrase = async (phrase: Phrase) => {
    await fetch('/api/filip/delete', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(phrase)
      }
    );

    await fetchPhrases();
  };

  return (
    <main className='flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>filip</h1>

      {error && <p className='text-red-500 mb-4'>{error}</p>}

      <form onSubmit={handleFormSubmit} className='mb-6 w-full max-w-md'>
        <input
          type='text'
          value={newPhrase}
          onChange={(e) => setNewPhrase(e.target.value)}
          placeholder='add a new phrase'
          required
          className='w-full px-3 py-2 mb-4 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          add phrase
        </button>
      </form>

      <ul className='flex flex-col gap-y-2 list-disc pl-5 w-full max-w-md h-96 overflow-y-auto'>
        {phrases.slice().reverse().map((phrase) => (
          <li key={phrase.id}>
            <div className='flex justify-between items-center'>
              <span className='flex-1 text-white'>{phrase.content}</span>
              <span className='flex-1 text-gray-400 text-right'>{phrase.user_email}</span>
              {(session && session.user && (session.user.email === phrase.user_email || !phrase.user_email)) && (
                <button
                  onClick={() => deletePhrase(phrase)}
                  className='ml-4 bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-2 rounded-md'
                >
                  ✖
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}