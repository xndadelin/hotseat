export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
      <span className="text-orange-500 text-lg font-semibold">Loading...</span>
    </div>
  );
}
