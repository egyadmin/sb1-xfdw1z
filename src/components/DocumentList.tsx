import React, { useState } from 'react';
import { File, MoreVertical, Download, Share2, FileText, FileSpreadsheet, FileCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import AddDocumentModal from './AddDocumentModal';
import DocumentApprovalFlow from './DocumentApprovalFlow';

const DocumentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'مخطط الطابق الأول',
      fileName: 'floor-plan-1.pdf',
      fileType: 'PDF',
      fileSize: '2.4 MB',
      uploadDate: new Date('2024-03-10'),
      category: 'architectural',
      author: 'سارة أحمد',
      status: 'pending_approval',
      statusColor: 'yellow',
      icon: FileText,
      approvalFlow: [
        {
          id: 1,
          role: 'رافع الطلب',
          status: 'approved',
          approver: {
            name: 'سارة أحمد',
            role: 'مهندس معماري',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
          },
          date: '2024-03-10',
          comments: 'تم رفع المخططات النهائية للمراجعة',
        },
        {
          id: 2,
          role: 'المدير المباشر',
          status: 'approved',
          approver: {
            name: 'محمد علي',
            role: 'مدير القسم المعماري',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          },
          date: '2024-03-11',
          comments: 'تمت المراجعة والموافقة على المخططات',
        },
        {
          id: 3,
          role: 'مدير الإدارة',
          status: 'current',
          approver: {
            name: 'أحمد محمد',
            role: 'مدير إدارة المشاريع',
          },
        },
        {
          id: 4,
          role: 'مدير المنطقة',
          status: 'pending',
          approver: {
            name: 'خالد عبدالله',
            role: 'مدير المنطقة الغربية',
          },
        },
        {
          id: 5,
          role: 'مدير المراسلات والمتابعة',
          status: 'pending',
          approver: {
            name: 'فيصل العمري',
            role: 'مدير المراسلات والمتابعة',
          },
        },
      ],
    },
  ]);

  const handleUpload = (documentData: any) => {
    const newDocument = {
      id: documents.length + 1,
      ...documentData,
      uploadDate: new Date(),
      author: 'أحمد محمد',
      status: 'pending_approval',
      statusColor: 'yellow',
      icon: FileText,
      approvalFlow: [
        {
          id: 1,
          role: 'رافع الطلب',
          status: 'approved',
          approver: {
            name: 'أحمد محمد',
            role: 'مدير المشروع',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          },
          date: format(new Date(), 'yyyy-MM-dd'),
          comments: 'تم رفع المستند',
        },
        ...documentData.approvalFlow.map((approver: any) => ({
          id: approver.order + 1,
          role: approver.role,
          status: 'pending',
          approver: {
            name: approver.name,
            role: approver.role,
          },
        })),
      ],
    };

    setDocuments(prev => [newDocument, ...prev]);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return 'قيد الموافقة';
      case 'approved':
        return 'معتمد';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">المستندات الحديثة</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة مستند
            </button>
          </div>
        </div>
        
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <doc.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-1">{doc.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{doc.fileType}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>{format(doc.uploadDate, 'dd/MM/yyyy')}</span>
                      <span>•</span>
                      <span>{doc.author}</span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${doc.statusColor}-100 text-${doc.statusColor}-700`}>
                        {getStatusIcon(doc.status)}
                        <span>{getStatusLabel(doc.status)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setSelectedDocument(doc)}
                  >
                    عرض مسار الموافقات
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {selectedDocument?.id === doc.id && (
                <div className="mt-6 pt-6 border-t">
                  <DocumentApprovalFlow stages={doc.approvalFlow} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddDocumentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
};

export default DocumentList;