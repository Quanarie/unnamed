"use client";
import React, { useEffect, useState } from 'react';
import { Phrase } from "@prisma/client";

const Page = () => {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [newPhrase, setNewPhrase] = useState<string>('');

  const fetchPhrases = async () => {
    const response = await fetch('/api/filip/get');
    const data = await response.json();
    setPhrases(data.result);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch('/api/filip/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: newPhrase })
    });

    setNewPhrase('');
    await fetchPhrases();
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

  return (
    <main>
      <h1>Filip</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newPhrase}
          onChange={(e) => setNewPhrase(e.target.value)}
          placeholder="Add a new phrase"
          required
        />
        <button type="submit">Add Phrase</button>
      </form>

      <ul className="flex flex-col-reverse">
        {phrases.map((phrase) => (
          <li key={phrase.id}>{phrase.content}</li>
        ))}
      </ul>
    </main>
  );
}

export default Page;
