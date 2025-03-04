import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, Search, FileText, User } from 'lucide-react';
import BeneficiaryProfile from './modals/BeneficiaryProfile';

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      organization_name: 'جمعية الخير',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      contact_person: 'محمد أحمد',
      contact_phone: '098-765-4321',
      tool_name: 'أدوات طبية',
      medical_equipment: 'path/to/image.jpg', // Path to image
      quantity: 10,
      estimated_cost: 5000.00,
      proof_document: 'path/to/document.pdf', // Path to document
      has_fundraising_license: true,
      agreement: true,
      status: 'قيد الانتظار',
      details: 'يحتاج إلى دعم تعليمي',
      documents: ['إثبات الهوية', 'شهادة الدخل'],
    },
    {
      id: 2,
      organization_name: 'مؤسسة الإغاثة',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      contact_person: 'فاطمة علي',
      contact_phone: '012-345-6789',
      tool_name: 'أدوات تعليمية',
      medical_equipment: 'path/to/image2.jpg', // Path to image
      quantity: 5,
      estimated_cost: 3000.00,
      proof_document: 'path/to/document2.pdf', // Path to document
      has_fundraising_license: false,
      agreement: true,
      status: 'تمت الموافقة',
      details: 'يحتاج إلى مساعدة طبية',
      documents: ['تقرير طبي', 'شهادة الدخل'],
    },
  ]);

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [loading, setLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const updateBeneficiaryStatus = (id, newStatus) => {
    setLoading(id);
    setTimeout(() => {
      setBeneficiaries((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      setLoading(null);
    }, 1000);
  };

  const viewProfile = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
  };

  // Filter beneficiaries based on search query
  const filteredBeneficiaries = beneficiaries.filter(
    (beneficiary) =>
      beneficiary.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100" dir="rtl">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <User size={20} className="text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            إدارة المستفيدين
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="بحث في المستفيدين..." 
              className="pr-9 pl-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full min-w-[600px] sm:min-w-0">
          <thead>
            <tr className="bg-gray-50 text-right">
              {['اسم المنظمة', 'البريد الإلكتروني', 'الهاتف', 'الأدوات', 'الحالة', 'التفاصيل', 'الإجراءات'].map((header) => (
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
            {filteredBeneficiaries.map((beneficiary) => (
              <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                      {beneficiary.organization_name.charAt(0)}
                    </div>
                    <div className="mr-3">
                      <p className="font-medium text-gray-800">{beneficiary.organization_name}</p>
                      <p className="text-xs text-gray-500">ID: {beneficiary.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {beneficiary.email}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {beneficiary.phone}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {beneficiary.tool_name}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      beneficiary.status === 'تمت الموافقة'
                        ? 'bg-green-100 text-green-800'
                        : beneficiary.status === 'مرفوض'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {beneficiary.status === 'تمت الموافقة' && <CheckCircle size={12} className="ml-1" />}
                    {beneficiary.status === 'مرفوض' && <XCircle size={12} className="ml-1" />}
                    {beneficiary.status === 'قيد الانتظار' && <FileText size={12} className="ml-1" />}
                    {beneficiary.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                  {beneficiary.details}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => viewProfile(beneficiary)}
                      className="inline-flex items-center justify-center p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                      title="عرض الملف الشخصي"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => updateBeneficiaryStatus(beneficiary.id, 'تمت الموافقة')}
                      className="inline-flex items-center justify-center p-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                      disabled={loading === beneficiary.id || beneficiary.status === 'تمت الموافقة'}
                      title="موافقة"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => updateBeneficiaryStatus(beneficiary.id, 'مرفوض')}
                      className="inline-flex items-center justify-center p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
                      disabled={loading === beneficiary.id || beneficiary.status === 'مرفوض'}
                      title="رفض"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          
          {filteredBeneficiaries.length === 0 && (
            <div className="py-12 text-center bg-white">
              <User size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">لم يتم العثور على مستفيدين</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchQuery ? 'حاول تعديل مصطلح البحث' : 'أضف مستفيدًا جديدًا للبدء'}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            عرض {filteredBeneficiaries.length} من {beneficiaries.length} مستفيدين
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 text-sm hover:bg-gray-50 transition-colors">
              السابق
            </button>
            <button className="px-3 py-1 bg-indigo-600 border border-indigo-600 rounded-md text-white text-sm hover:bg-indigo-700 transition-colors">
              التالي
            </button>
          </div>
        </div>
      </div>

      {/* Use the BeneficiaryProfileModal component */}
      <BeneficiaryProfile
        beneficiary={selectedBeneficiary}
        onClose={() => setSelectedBeneficiary(null)}
      />
    </div>
  );
};

export default Beneficiaries;