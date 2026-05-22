import { useState } from "react";
import DashboardStatistics from "../components/admin/DashboardStatistics";
import RegistrationTable from "../components/admin/RegistrationTable";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [activeTab, setActiveTab] = useState("statistics");

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.displayName || user?.email}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tabs tabs-boxed bg-white mb-6 p-4 rounded-lg shadow">
          <button
            className={`tab ${activeTab === "statistics" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("statistics")}
          >
            Statistics
          </button>
          <button
            className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`tab ${activeTab === "accepted" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted
          </button>
          <button
            className={`tab ${activeTab === "rejected" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("rejected")}
          >
            Rejected
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "statistics" && <DashboardStatistics />}
          {activeTab === "pending" && <RegistrationTable status="pending" />}
          {activeTab === "accepted" && <RegistrationTable status="accepted" />}
          {activeTab === "rejected" && <RegistrationTable status="rejected" />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
