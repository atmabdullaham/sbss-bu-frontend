import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DashboardStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "statistics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data?.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error loading statistics: {error.message}</span>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Registrations"
          value={stats.statusCounts.total}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          title="Pending"
          value={stats.statusCounts.pending}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Accepted"
          value={stats.statusCounts.accepted}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          title="Rejected"
          value={stats.statusCounts.rejected}
          bgColor="bg-red-50"
          textColor="text-red-600"
        />
      </div>

      {/* Sabek & Bortoman */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            সবেক (Sabek) vs বর্তমান (Bortoman)
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-700 font-medium">সবেক (Sabek)</span>
              <span className="text-2xl font-bold text-blue-600">
                {stats.sabek}
              </span>
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-blue-700 font-medium">
                বর্তমান (Bortoman)
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {stats.bortoman}
              </span>
            </div>
          </div>
        </div>

        {/* Member & Associate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">
            সদস্য (Member) vs সহযোগী (Associate)
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-purple-700 font-medium">
                সদস্য (Member)
              </span>
              <span className="text-2xl font-bold text-purple-600">
                {stats.member}
              </span>
            </div>
            <div className="divider my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-purple-700 font-medium">
                সহযোগী (Associate)
              </span>
              <span className="text-2xl font-bold text-purple-600">
                {stats.associate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Statistics */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4">
          সম্মিলিত পরিসংখ্যান (Combined Statistics)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CombinedStatCard
            label="সবেক + সদস্য"
            value={stats.combined.sabek_member}
          />
          <CombinedStatCard
            label="সবেক + সহযোগী"
            value={stats.combined.sabek_associate}
          />
          <CombinedStatCard
            label="বর্তমান + সদস্য"
            value={stats.combined.bortoman_member}
          />
          <CombinedStatCard
            label="বর্তমান + সহযোগী"
            value={stats.combined.bortoman_associate}
          />
        </div>
      </div>

      {/* Permanent Union Breakdown */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          স্থায়ী ইউনিয়ন ভাঙ্গন (Permanent Union Breakdown)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats.permanentUnionCounts).map(([union, count]) => (
            <div
              key={union}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <p className="text-gray-600 text-sm capitalize">{union}</p>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, bgColor, textColor }) => (
  <div
    className={`${bgColor} p-6 rounded-lg border border-gray-200 hover:shadow-lg transition`}
  >
    <p className="text-gray-600 text-sm mb-2">{title}</p>
    <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
  </div>
);

const CombinedStatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg border border-green-300 text-center">
    <p className="text-green-700 text-xs font-medium mb-2">{label}</p>
    <p className="text-2xl font-bold text-green-600">{value}</p>
  </div>
);

export default DashboardStatistics;
