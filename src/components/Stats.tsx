import React from 'react';
import { FileText, Users, Clock, CheckCircle } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: FileText,
      label: 'إجمالي المستندات',
      value: '2,451',
      color: 'blue',
      trend: '+12%',
      trendUp: true,
    },
    {
      icon: Users,
      label: 'أعضاء الفريق',
      value: '49',
      color: 'green',
      trend: '+4',
      trendUp: true,
    },
    {
      icon: Clock,
      label: 'المستندات المعلقة',
      value: '13',
      color: 'yellow',
      trend: '-2',
      trendUp: false,
    },
    {
      icon: CheckCircle,
      label: 'المستندات المعتمدة',
      value: '1,842',
      color: 'indigo',
      trend: '+8%',
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {stat.trend}
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">{stat.value}</p>
          <h3 className="text-gray-500 text-sm">{stat.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default Stats;