import React from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';

const InternsSection = ({ interns, onStatusChange, onEdit, onViewDetails }) => {
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
        return "bg-gray-100 text-gray-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Interns</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interns.map((intern) => (
              <tr key={intern._id}>
                <td 
                  className="px-6 py-4 whitespace-nowrap cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => onViewDetails(intern)}
                >
                  {intern.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{intern.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{intern.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={intern.status}
                    onChange={(e) => onStatusChange(intern._id, e.target.value, intern.status)}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(intern.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="interview">Interview</option>
                    <option value="onboarded">Onboarded</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onViewDetails(intern)}
                    className="text-blue-600 hover:text-blue-900 p-2"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onEdit(intern)}
                    className="text-indigo-600 hover:text-indigo-900 p-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onViewDetails(intern)}
                    className="text-green-600 hover:text-green-900"
                    title="View Remarks"
                  >
                    View Remarks
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

export default InternsSection; 