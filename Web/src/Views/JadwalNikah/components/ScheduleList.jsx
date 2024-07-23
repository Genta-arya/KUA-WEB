// src/components/ScheduleList.js
import React from 'react';
import schedule from '../Data';

const ScheduleList = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-lg font-bold mb-4">Jadwal Pernikahan</h1>
      <ul className="space-y-4">
        {schedule.map((item, index) => (
          <li key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
            <p className="text-xs text-gray-600">Tanggal: <span className="font-medium">{item.date}</span></p>
            <p className="text-xs text-gray-600">Waktu: <span className="font-medium">{item.time}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleList;
