// components/ErrorComponent.js
import { useRouter } from 'next/router';

export default function ErrorComponent({ error }:{error:string,}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-700 mb-6">{error || 'An unexpected error occurred.'}</p>

        <div className="flex justify-center space-x-4">
          
          <button
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}