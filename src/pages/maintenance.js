export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-1000 to-gray-900 text-white">
      {/* Animated Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 border-t-4 border-b-4 border-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-cyan-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9h4.5m-4.5 3h4.5m-7.5 3v.75a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25V15m-12 0h12m-10.5-3h9m-10.5-3h9m-9 9h9m-6.75-9h4.5"
            />
          </svg>
        </div>
      </div>

      {/* Title and Message */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 animate-fade-in">
          Working on some updates
        </h1>
        <p className="text-lg text-gray-200 animate-fade-in delay-1">
          We are currently performing maintenance. Please check back later.
        </p>
      </div>

      {/* Animated Button */}

    </div>
  );
}
