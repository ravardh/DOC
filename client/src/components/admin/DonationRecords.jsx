import React, { useState, useEffect } from "react";
import axios from "../../config/api";

function DonationRecords() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/public/donations");
      setDonations(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/public/donations/${id}/status`, {
        receiptGenerated: newStatus,
      });

      setDonations((prevDonations) =>
        prevDonations.map((donation) =>
          donation._id === id ? { ...donation, receiptGenerated: newStatus } : donation
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    if (filter === "all") return true;
    return donation.receiptStatus === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6F00]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Donation Records</h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-[#FF6F00] focus:ring-[#FF6F00]"
          >
            <option value="all">All Donations</option>
            <option value="pending">Pending Receipt</option>
            <option value="sent">Receipt Sent</option>
            <option value="delivered">Receipt Delivered</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UTR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonations.map((donation) => (
              <tr key={donation._id}>
                <td className="px-3 py-4 whitespace-nowrap">{donation.name}</td>
                <td className="px-3 py-4 whitespace-nowrap">{donation.email}</td>
                <td className="px-3 py-4 whitespace-nowrap">₹{donation.amount}</td>
                <td className="px-3 py-4 whitespace-nowrap">{donation.mode}</td>
                <td className="px-3 py-4 whitespace-nowrap">{donation.utr}</td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                <select
                    value={donation.receiptGenerated}
                    onChange={(e) => handleStatusChange(donation._id, e.target.value === "true")}
                    disabled={donation.receiptGenerated}
                    className={`px-1 py-1 rounded ${
                      donation.receiptGenerated ? "bg-green-200 text-green-800 cursor-not-allowed" : "bg-gray-200"
                    }`}
                  >
                    <option value="false">Pending</option>
                    <option value="true">Done</option>
                  </select>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  {/* View Screenshot Button */}
                  <button
                    onClick={() => setSelectedScreenshot(donation.screenshotPath)}
                    className="mr-2 px-1 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    View Screenshot
                  </button>

                  {/* Status Dropdown */}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-lg">
            <h3 className="text-lg font-semibold mb-2">Donation Screenshot</h3>
            <img src={selectedScreenshot} alt="Donation Screenshot" className="w-full rounded" />
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationRecords;
