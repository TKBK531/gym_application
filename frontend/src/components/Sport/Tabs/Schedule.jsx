import React from 'react';
import practiceTimes from '../practicetimes';

const Schedule = ({ sportLabel }) => {
  const sportPracticeTimes = practiceTimes[sportLabel.toLowerCase().replace(/\s+/g, "-")] || [];

  return (
    <section className="p-4 bg-white shadow-md rounded-lg">
      <div>
        <h2 className="text-xl font-bold mb-4">Practice Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Day
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {sportPracticeTimes.length > 0 ? (
                sportPracticeTimes.map((session, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                    <td className="py-2 px-4 border-b border-gray-200">{session.day}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{session.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 px-4 border-b border-gray-200 text-gray-500">
                    No practice times available for this sport.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Schedule;