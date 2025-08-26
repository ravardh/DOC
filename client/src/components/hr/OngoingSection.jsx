import React from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';

const OngoingSection = ({ applicants, onStatusChange, onEdit, onViewDetails }) => {
  // Filter out Active and Inactive applicants, then sort by date
  const sortedApplicants = [...applicants]
    .filter(applicant => applicant.status !== "active" && applicant.status !== "inactive")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "interview":
        return "bg-blue-100 text-blue-800";
      case "onboarded":
        return "bg-purple-100 text-purple-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Ongoing Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedApplicants.map((applicant) => (
              <tr key={applicant._id}>
                <td 
                  className="px-6 py-4 whitespace-nowrap cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => onViewDetails(applicant)}
                >
                  {applicant.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{applicant.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{applicant.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(applicant.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={applicant.status}
                    onChange={(e) => onStatusChange(applicant._id, e.target.value, applicant.status)}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(applicant.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="interview">Interview</option>
                    <option value="onboarded">Onboarded</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(applicant)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEye className="inline-block mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => onEdit(applicant)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FaEdit className="inline-block mr-1" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OngoingSection;