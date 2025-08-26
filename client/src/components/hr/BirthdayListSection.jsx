import React, { useState } from "react";
import { FaEnvelope, FaFilter } from "react-icons/fa";
import axios from "../../config/api";

const BirthdayListSection = ({ applicants }) => {
  const monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsList[currentMonth]);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState([]);
  const [error, setError] = useState(null);

  // Helper function to get month name
  const getMonthName = (monthIndex) => {
    return monthsList[monthIndex];
  };

  // Format date for display
  const formatBirthday = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()} ${getMonthName(date.getMonth())}`;
  };

  // Filter and group applicants by birth month
  const getFilteredBirthdays = () => {
    // Filter applicants with valid DOB
    const validApplicants = applicants.filter((app) => app.dob);

    // Sort by month and then by date
    const sortedApplicants = validApplicants.sort((a, b) => {
      const dateA = new Date(a.dob);
      const dateB = new Date(b.dob);

      // If showing all months, sort by month first
      if (selectedMonth === "All") {
        if (dateA.getMonth() !== dateB.getMonth()) {
          return dateA.getMonth() - dateB.getMonth();
        }
      }

      // Then sort by date within month
      return dateA.getDate() - dateB.getDate();
    });

    // If "All" is selected, group by month
    if (selectedMonth === "All") {
      const grouped = {};
      // Initialize all months to ensure proper order
      monthsList.forEach((month) => {
        grouped[month] = [];
      });

      sortedApplicants.forEach((applicant) => {
        const date = new Date(applicant.dob);
        const monthName = getMonthName(date.getMonth());
        grouped[monthName].push(applicant);
      });

      // Remove empty months
      Object.keys(grouped).forEach((month) => {
        if (grouped[month].length === 0) {
          delete grouped[month];
        }
      });

      return grouped;
    }
    // Otherwise, filter by selected month
    else {
      const filtered = sortedApplicants.filter((applicant) => {
        const date = new Date(applicant.dob);
        return getMonthName(date.getMonth()) === selectedMonth;
      });
      return filtered.length ? { [selectedMonth]: filtered } : {};
    }
  };

  // Send birthday wish email
  const sendBirthdayWish = async (applicant) => {
    try {
      setSending(true);
      setError(null);

      // Call API to send birthday wish email
      await axios.post("/api/hr/send-birthday-wish", {
        email: applicant.email,
        name: applicant.name,
      });

      // Update sent status
      setSentTo([...sentTo, applicant._id]);
      setSending(false);
    } catch (error) {
      console.error("Error sending birthday wish:", error);
      setError("Failed to send birthday wish. Please try again.");
      setSending(false);
    }
  };

  const groupedBirthdays = getFilteredBirthdays();
  const displayMonths = Object.keys(groupedBirthdays);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Birthday List</h2>
        <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
          <FaFilter className="text-blue-500" />
          <label
            htmlFor="monthFilter"
            className="text-sm font-medium text-blue-700"
          >
            Filter by Month:
          </label>
          <select
            id="monthFilter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select rounded-md border-2 border-blue-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white font-medium text-blue-800"
          >
            <option value="All">All Months</option>
            {monthsList.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {displayMonths.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No birthdays{" "}
          {selectedMonth === "All" ? "found" : `in ${selectedMonth}`}.
        </div>
      ) : (
        <div className="space-y-6">
          {displayMonths.map((month) => (
            <div key={month} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-medium text-blue-600 mb-3 bg-blue-50 p-2 rounded-md inline-block">
                {selectedMonth === "All" ? month : `${month} Birthdays`}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groupedBirthdays[month].map((applicant) => (
                      <tr key={applicant._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {applicant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {applicant.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatBirthday(applicant.dob)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => sendBirthdayWish(applicant)}
                            // disabled={sending || sentTo.includes(applicant._id)}
                            disabled
                            className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                              sentTo.includes(applicant._id)
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }`}
                          >
                            <FaEnvelope className="mr-1.5" />
                            {sentTo.includes(applicant._id)
                              ? "Wish Sent"
                              : "Send Birthday Wish"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BirthdayListSection;
