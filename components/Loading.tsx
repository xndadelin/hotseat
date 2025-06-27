export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <div className="relative flex items-center justify-center h-12 w-12 mb-4">
        <span className="absolute inline-block h-12 w-12 rounded-full border-4 border-zinc-700 border-t-white animate-spin"></span>
        <span className="absolute h-6 w-6 rounded-full bg-zinc-950"></span>
      </div>
      <span className="text-zinc-300 text-base font-medium tracking-wide">Loading...</span>
    </div>
  );
}
