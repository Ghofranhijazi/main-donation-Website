import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaHandHoldingHeart,
  FaUsers,
  FaChartBar,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  // Arabic menu items
  const menuItems = [
    { icon: <FaTachometerAlt />, label: "لوحة التحكم", path: "/AdminDash" },
    { icon: <FaHandHoldingHeart />, label: "التبرعات", path: "/AdminDash/donations" },
    { icon: <FaUsers />, label: "المستفيدين", path: "/AdminDash/beneficiaries" },
    { icon: <FaChartBar />, label: "التقارير", path: "/AdminDash/reports" },
  ];

  return (
    <aside
      className={`
        fixed sm:sticky top-0 left-0
        w-64 h-screen
        bg-[#662480] text-white shadow-xl z-40
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}
      dir="rtl" 
    >
      {/* Header / Logo */}
      <div className="p-4 sm:p-6 border-b border-[#662480] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg">
            <FaHome className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">لوحة الإدارة</h1>
        </div>
        <button
          className="text-white hover:text-gray-200 text-2xl sm:hidden focus:outline-none"
          onClick={toggleSidebar}
          aria-label="إغلاق القائمة الجانبية"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 sm:px-3 py-4 sm:py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-white transition-all duration-300 group hover:bg-[#8A4BA8] hover:text-white"
                onClick={toggleSidebar} 
              >
                <span className="text-lg text-white group-hover:text-white ml-3">
                  {item.icon}
                </span>
                <span className="text-sm sm:text-base font-medium group-hover:text-white">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}