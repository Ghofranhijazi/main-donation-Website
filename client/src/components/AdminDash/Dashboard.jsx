import React from 'react';
import { Info, MoreHorizontal, DollarSign, Users, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const donationStats = {
    totalDonations: 10000,
    donorCount: 150,
    recentDonations: [
      { id: 1, donor: 'Alice', amount: 200 },
      { id: 2, donor: 'Bob', amount: 150 },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          نظرة عامة على لوحة التحكم
        </h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Info size={18} className="text-gray-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg ml-3">
                <DollarSign size={20} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">إجمالي التبرعات</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">${donationStats.totalDonations.toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-2">+12% عن الشهر الماضي</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm border border-emerald-100">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg ml-3">
                <Users size={20} className="text-emerald-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">إجمالي المتبرعين</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{donationStats.donorCount}</p>
            <p className="text-sm text-emerald-600 mt-2">+5 جديد هذا الأسبوع</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl shadow-sm border border-amber-100">
            <div className="flex items-center mb-2">
              <div className="p-2 bg-amber-100 rounded-lg ml-3">
                <TrendingUp size={20} className="text-amber-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">معدل التحويل</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">24.8%</p>
            <p className="text-sm text-amber-600 mt-2">+2.3% عن الشهر الماضي</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg ml-3">
                <Activity size={20} className="text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800">التبرعات الأخيرة</h3>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">عرض الكل</button>
          </div>
          
          <ul className="divide-y divide-gray-100">
            {donationStats.recentDonations.map(donation => (
              <li key={donation.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3 text-gray-600 font-medium">
                    {donation.donor.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{donation.donor}</p>
                    <p className="text-xs text-gray-500">الآن</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">${donation.amount}</span>
              </li>
            ))}
          </ul>
          
          {donationStats.recentDonations.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500">لا توجد تبرعات حديثة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;