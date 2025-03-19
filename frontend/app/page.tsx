import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          We&apos;re working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Notify Me
          </button>

          <Link
            href="/home"
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
