import React from "react";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6" dir="rtl">
      <div className="flex items-center w-full max-w-xl">
        {/* Hamburger (mobile only) */}
        <button
          className="sm:hidden ml-2 text-[#662480]"
          onClick={toggleSidebar}
          aria-label="فتح القائمة الجانبية"
        >
          <FaBars className="w-5 h-5" />
        </button>
        
        <div className="relative w-full">
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full pr-10 pl-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base"
            placeholder="بحث..."
          />
        </div>
      </div>
      <div className="flex items-center space-x-3 sm:space-x-5 mr-2">
        <button className="relative text-gray-500 hover:text-indigo-600">
          <FaBell className="w-5 h-5" />
          <span className="absolute top-0 left-0 inline-block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-500/30 hover:border-indigo-500 transition-colors cursor-pointer"
          src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          alt="صورة المدير"
        />
      </div>
    </header>
  );
}