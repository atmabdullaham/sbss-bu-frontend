import { Suspense, useEffect, useState } from "react";
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProgrammeCard from "../components/programme/ProgrammeCard";

const Programme = () => {
  const [programmes, setProgrammes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      fetch("/programms.json")
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          setProgrammes(data);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          if (!isMounted) return;
          console.error("Error loading programmes:", err);
          setError("প্রোগ্রাম লোড করতে সমস্যা হয়েছে");
          setIsLoading(false);
        });
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-800 text-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            প্রোগ্রামসমূহ{" "}
          </h1>
          <p className="text-xl text-blue-100">
            আমাদের সকল আসন্ন এবং চলমান প্রোগ্রামগুলি
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" message="প্রোগ্রাম লোড হচ্ছে..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <EmptyState
            title="সমস্যা হয়েছে"
            description={error}
            actionButton={
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:from-teal-600 hover:to-cyan-700 transition-colors"
              >
                পুনরায় চেষ্টা করুন
              </button>
            }
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && programmes.length === 0 && (
          <EmptyState
            title="কোনো প্রোগ্রাম পাওয়া যায়নি"
            description="বর্তমানে কোনো প্রোগ্রাম উপলব্ধ নেই। শীঘ্রই আপডেট করা হবে।"
          />
        )}

        {/* Programmes Grid */}
        {!isLoading && !error && programmes.length > 0 && (
          <Suspense fallback={<LoadingSpinner size="lg" />}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programmes.map((program) => (
                <ProgrammeCard key={program.id} program={program} />
              ))}
            </div>
          </Suspense>
        )}
      </div>

      {/* CTA Section */}
    </div>
  );
};

export default Programme;
