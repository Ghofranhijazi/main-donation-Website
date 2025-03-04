import React from 'react';
import { Download, FileText, TrendingUp, Users, ChevronRight } from 'lucide-react';

const Reports = () => {
  const donationTrends = [
    { month: 'يناير', donations: 5000 },
    { month: 'فبراير', donations: 7000 },
  ];

  const retentionRates = [
    { month: 'يناير', rate: '75%' },
    { month: 'فبراير', rate: '80%' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden" dir="rtl">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          التقارير والتحليلات
        </h2>
        <div className="flex items-center text-sm text-gray-500 font-medium">
          <span>آخر تحديث اليوم</span>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-blue-50 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                اتجاهات التبرعات
              </h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">+10% هذا الشهر</span>
            </div>
            <ul className="space-y-3">
              {donationTrends.map(trend => (
                <li key={trend.month} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-800 font-medium">{trend.month}</span>
                  <div className="flex items-center">
                    <span className="text-green-600 font-bold">${trend.donations.toLocaleString()}</span>
                    <ChevronRight size={16} className="mr-2 text-gray-400" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:bg-indigo-50 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                معدلات الاحتفاظ
              </h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">في تحسن</span>
            </div>
            <ul className="space-y-3">
              {retentionRates.map(rate => (
                <li key={rate.month} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg shadow-sm">
                  <span className="text-gray-800 font-medium">{rate.month}</span>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-bold">{rate.rate}</span>
                    <ChevronRight size={16} className="mr-2 text-gray-400" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm">
            <FileText size={16} />
            تصدير كـ PDF
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm">
            <Download size={16} />
            تصدير كـ CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;