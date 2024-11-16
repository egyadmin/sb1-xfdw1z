import React from 'react';
import { Bell, Lock, Globe, Moon, User, Check, X, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const Settings = () => {
  const { pendingRegistrations, approvePendingRegistration, rejectPendingRegistration } = useStore();

  const settingSections = [
    {
      id: 'profile',
      title: 'الملف الشخصي',
      icon: User,
      settings: [
        {
          id: 'name',
          label: 'الاسم',
          value: 'أحمد محمد',
          type: 'text',
        },
        {
          id: 'email',
          label: 'البريد الإلكتروني',
          value: 'ahmed@example.com',
          type: 'email',
        },
        {
          id: 'phone',
          label: 'رقم الهاتف',
          value: '+966 50 123 4567',
          type: 'tel',
        },
      ],
    },
    {
      id: 'notifications',
      title: 'الإشعارات',
      icon: Bell,
      settings: [
        {
          id: 'email_notifications',
          label: 'إشعارات البريد الإلكتروني',
          value: true,
          type: 'toggle',
        },
        {
          id: 'push_notifications',
          label: 'الإشعارات المنبثقة',
          value: true,
          type: 'toggle',
        },
      ],
    },
    {
      id: 'appearance',
      title: 'المظهر',
      icon: Moon,
      settings: [
        {
          id: 'theme',
          label: 'السمة',
          value: 'light',
          type: 'select',
          options: [
            { label: 'فاتح', value: 'light' },
            { label: 'داكن', value: 'dark' },
            { label: 'تلقائي', value: 'auto' },
          ],
        },
      ],
    },
  ];

  const handleApprove = (id: string) => {
    approvePendingRegistration(id);
  };

  const handleReject = (id: string) => {
    rejectPendingRegistration(id);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">الإعدادات</h1>
        <p className="text-gray-600">تخصيص إعدادات حسابك</p>
      </div>

      <div className="space-y-6">
        {/* User Registration Approvals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">طلبات تسجيل المستخدمين</h2>
              <p className="text-sm text-gray-500">إدارة طلبات التسجيل الجديدة</p>
            </div>
          </div>

          {pendingRegistrations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              لا توجد طلبات تسجيل جديدة
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRegistrations.map((registration) => (
                <motion.div
                  key={registration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{registration.name}</h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>{registration.email}</p>
                        <p>القسم: {registration.department}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(registration.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>قبول</span>
                    </button>
                    <button
                      onClick={() => handleReject(registration.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>رفض</span>
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="flex items-center gap-2 mt-4 p-4 bg-yellow-50 rounded-lg text-yellow-800 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>
                  سيتم إرسال إشعار تلقائي للمستخدم عند قبول أو رفض طلب التسجيل
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Other Settings */}
        {settingSections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <section.icon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between">
                  <label htmlFor={setting.id} className="text-gray-700">
                    {setting.label}
                  </label>

                  {setting.type === 'toggle' ? (
                    <button
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        setting.value ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  ) : setting.type === 'select' ? (
                    <select
                      id={setting.id}
                      className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={setting.value}
                    >
                      {setting.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={setting.id}
                      type={setting.type}
                      defaultValue={setting.value}
                      className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Settings;