import React from 'react';
import { DollarSign, Search, Users } from 'lucide-react';

const Donations = () => {
  const donations = [
    { id: 1, donor: 'Alice', amount: 200, frequency: 'شهري' },
    { id: 2, donor: 'Bob', amount: 150, frequency: 'مرة واحدة' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign size={20} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            إدارة التبرعات
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="بحث في التبرعات..." 
              className="pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="bg-gray-50 text-right">
                {["المتبرع", "المبلغ", "التكرار"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {donations.map(donation => (
                <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {donation.donor.charAt(0)}
                      </div>
                      <div className="mr-3">
                        <p className="font-medium text-gray-800">{donation.donor}</p>
                        <p className="text-xs text-gray-500">donor#{donation.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-medium">${donation.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      donation.frequency === 'شهري' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {donation.frequency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {donations.length === 0 && (
            <div className="py-12 text-center bg-white">
              <Users size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">لم يتم العثور على تبرعات</p>
              <p className="text-gray-400 text-sm mt-1">أضف تبرعًا جديدًا للبدء</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            عرض {donations.length} من {donations.length} تبرعات
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 text-sm hover:bg-gray-50 transition-colors">
              السابق
            </button>
            <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded-md text-white text-sm hover:bg-blue-700 transition-colors">
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;