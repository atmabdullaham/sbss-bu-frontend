import { Image, ImageKitProvider } from "@imagekit/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RegistrationTable = ({ status }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchTransactionId, setSearchTransactionId] = useState("");
  const [searchSendmoneyNumber, setSearchSendmoneyNumber] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const {
    data: registrations,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "admin",
      "registrations",
      status,
      searchTransactionId,
      searchSendmoneyNumber,
      user?.email,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTransactionId)
        params.append("transaction_id", searchTransactionId);
      if (searchSendmoneyNumber)
        params.append("sendmoney_number", searchSendmoneyNumber);

      const res = await axiosSecure.get(
        `/admin/registrations/${status}?${params}`,
      );
      return res.data?.data || [];
    },
    enabled: !!user?.email,
  });

  const handleStatusChange = async (registrationId, newStatus) => {
    try {
      setIsUpdating(registrationId);
      await axiosSecure.patch(`/admin/registrations/${registrationId}/status`, {
        status: newStatus,
      });

      toast.success(`Status updated to ${newStatus}`);
      queryClient.invalidateQueries({
        queryKey: ["admin", "registrations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "statistics"],
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating status");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (registrationId) => {
    if (!window.confirm("Are you sure you want to delete this registration?"))
      return;

    try {
      setIsDeleting(registrationId);
      await axiosSecure.delete(`/admin/registrations/${registrationId}`);

      toast.success("Registration deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin", "registrations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin", "statistics"],
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting registration");
    } finally {
      setIsDeleting(null);
    }
  };

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
        <span>Error loading registrations: {error.message}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Transaction ID
          </label>
          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={searchTransactionId}
            onChange={(e) => setSearchTransactionId(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Send Money Number
          </label>
          <input
            type="text"
            placeholder="Enter Send Money Number"
            value={searchSendmoneyNumber}
            onChange={(e) => setSearchSendmoneyNumber(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Result Count */}
      <p className="text-sm text-gray-600">
        Found{" "}
        <span className="font-semibold">{registrations?.length || 0}</span>{" "}
        registration(s)
      </p>

      {/* Table */}
      {registrations && registrations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left">Image</th>
                <th className="text-left">Name (Bengali)</th>
                <th className="text-left">Transaction ID</th>
                <th className="text-left">Send Money #</th>
                <th className="text-left">Phone</th>
                <th className="text-left">Category</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id} className="hover:bg-gray-50">
                  <td>
                    <ImageKitProvider urlEndpoint="https://ik.imagekit.io/atm">
                      <Image
                        src={reg.imageUrl}
                        width={40}
                        height={30}
                        alt="Image"
                      />
                    </ImageKitProvider>
                  </td>
                  <td>
                    <div className="font-medium text-gray-900">
                      {reg.name_bn}
                    </div>
                    <div className="text-xs text-gray-500">
                      {reg.daitto || "N/A"}
                    </div>
                  </td>
                  <td>
                    <span className="font-mono text-sm">
                      {reg.transaction_Id}
                    </span>
                  </td>
                  <td>
                    <span className="font-mono text-sm">
                      {reg.sendmoney_number}
                    </span>
                  </td>
                  <td>
                    <div className="text-sm">{reg.phone_number}</div>
                  </td>
                  <td>
                    <div className="text-xs space-y-1">
                      <div className="badge badge-sm">{reg.sabek_bortoman}</div>
                      <div className="badge badge-sm badge-outline">
                        {reg.songotonik_man}
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div
                      className="badge badge-lg"
                      data-theme={getStatusTheme(status)}
                    >
                      {status}
                    </div>
                  </td>
                  <td className="text-center inline-flex items-center justify-center gap-1">
                    {/* Status Change Dropdown */}
                    {status === "pending" && (
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button
                          onClick={() =>
                            handleStatusChange(reg._id, "accepted")
                          }
                          disabled={isUpdating === reg._id}
                          className="btn btn-xs btn-success"
                          title="Accept"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(reg._id, "rejected")
                          }
                          disabled={isUpdating === reg._id}
                          className="btn btn-xs btn-error"
                          title="Reject"
                        >
                          ✗
                        </button>
                      </div>
                    )}

                    {(status === "accepted" || status === "rejected") && (
                      <div className="flex gap-2 justify-center flex-wrap">
                        <button
                          onClick={() => handleStatusChange(reg._id, "pending")}
                          disabled={isUpdating === reg._id}
                          className="btn btn-xs btn-warning"
                          title="Revert to Pending"
                        >
                          ↶
                        </button>
                      </div>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(reg._id)}
                      disabled={isDeleting === reg._id}
                      className="btn btn-xs btn-outline btn-error ml-2"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No registrations found</p>
        </div>
      )}
    </div>
  );
};

const getStatusTheme = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "accepted":
      return "success";
    case "rejected":
      return "error";
    default:
      return "neutral";
  }
};

export default RegistrationTable;
