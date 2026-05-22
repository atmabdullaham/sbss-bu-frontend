// Loading skeleton for programme cards while data is fetching
const ProgrammeCardSkeleton = () => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="space-y-4">
        <div className="h-8 w-3/4 rounded-lg bg-gray-200"></div>
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="h-4 w-2/3 rounded bg-gray-200"></div>

        <div className="mt-6 space-y-3">
          <div className="h-4 w-1/3 rounded bg-gray-200"></div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="h-12 rounded-lg bg-gray-200"></div>
            <div className="h-12 rounded-lg bg-gray-200"></div>
          </div>
        </div>

        <div className="mt-6 h-10 w-32 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export function ProgrammeCardSkeletons() {
  return (
    <>
      <ProgrammeCardSkeleton />
      <ProgrammeCardSkeleton />
      <ProgrammeCardSkeleton />
      <ProgrammeCardSkeleton />
    </>
  );
}

export default ProgrammeCardSkeleton;
