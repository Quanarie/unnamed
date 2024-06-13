import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Hello World</h1>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <Link href="/filip">
            <p className="text-blue-500 text-xl hover:underline">Filip</p>
          </Link>
        </li>
      </ul>
    </main>
  );
}
