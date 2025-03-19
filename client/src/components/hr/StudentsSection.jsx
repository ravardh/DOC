import React from 'react';
import { FaUserEdit, FaPlus, FaEye } from 'react-icons/fa';

const StudentsSection = ({ students, onEdit, onAdd, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Students</h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Student
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student._id}>
                <td 
                  className="px-6 py-4 whitespace-nowrap cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => onViewDetails(student)}
                >
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.classStudying}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.schoolName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(student)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <FaEye className="inline-block mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FaUserEdit className="inline-block mr-1" />
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

export default StudentsSection; 