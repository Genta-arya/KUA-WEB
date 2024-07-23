// src/components/ScheduleList.js

import React from "react";
import schedule from "../Data";
import { formatDate } from "../../../lib/Utils/Utils";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ScheduleList = () => {
  return (
    <div>
      <div className="">
        <ul className="space-y-4 h-[450px] overflow-auto">
          {schedule.map((item, index) => (
            <li
              key={index}
              className="bg-white border border-l-8  border-hijau-tua rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between ">
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(item.date)}
                </p>
                <p className="text-sm text-hijau-tua font-bold italic">
                  {item.time} Wib
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="">
        <h1 className="lg:text-xl text-sm font-bold mb-5">Ajukan Pernikahan</h1>
        <div className="border rounded-lg py-4 px-4">
          <p className="text-xs w-52 text-gray-500">
            Isi dan lengkapi data pernikhan agar segera kami proses.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              to={"/permohonan"}
              className="bg-hijau-tua w-full rounded-md hover:opacity-90"
            >
              <div className="flex items-center justify-center py-2 gap-2">
                <FaArrowRight size={16} className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;
