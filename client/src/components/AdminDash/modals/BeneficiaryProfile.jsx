import React from 'react';
import { X, User, CheckCircle, FileText, Calendar, Mail, Phone, Briefcase, Settings } from 'lucide-react';

const BeneficiaryProfile = ({ beneficiary, onClose }) => {
  if (!beneficiary) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-gray-700 bg-opacity-30 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md border border-gray-100" dir="rtl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            ملف {beneficiary.fullName} الشخصي
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <Briefcase size={18} />
            </div>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">اسم المنظمة:</span>{" "}
              <span className="ml-1">{beneficiary.organization_name}</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <Mail size={18} />
            </div>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">البريد الإلكتروني:</span>{" "}
              <span className="ml-1">{beneficiary.email}</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <Phone size={18} />
            </div>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">الهاتف:</span>{" "}
              <span className="ml-1">{beneficiary.phone}</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <User size={18} />
            </div>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">الشخص المسؤول:</span>{" "}
              <span className="ml-1">{beneficiary.contact_person}</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <Phone size={18} />
            </div>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">الهاتف المسؤول:</span>{" "}
              <span className="ml-1">{beneficiary.contact_phone}</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <Settings size={18} />
            </div>
            <p className="text-gray-700">
              <span className="font-medium text-gray-500">الأدوات:</span>{" "}
              <span className="ml-1">{beneficiary.tool_name}</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 flex-shrink-0 text-gray-400">
              <CheckCircle size={18} />
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-500">الحالة:</span>{" "}
              <span
                className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  beneficiary.status === 'تمت الموافقة'
                    ? 'bg-green-100 text-green-800'
                    : beneficiary.status === 'مرفوض'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {beneficiary.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 flex-shrink-0 text-gray-400 pt-1">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium text-gray-500">التفاصيل:</span>{" "}
                <span className="ml-1">{beneficiary.details}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-10 flex-shrink-0 text-gray-400 pt-1">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium text-gray-500">المستندات:</span>{" "}
                <div className="mt-1">
                  {beneficiary.documents.map((doc, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center ml-2 mb-2 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-left">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryProfile;