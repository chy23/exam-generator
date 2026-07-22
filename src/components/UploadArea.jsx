import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, FileText, FileSpreadsheet, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';

// Note: 'Presentation' icon was removed — use a generic icon instead
function PresentationIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export default function UploadArea({ file, setFile, status, setStatus }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setStatus('analyzing');
      setTimeout(() => {
        setStatus('success');
      }, 3000);
    }
  }, [setFile, setStatus]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  const getFileIcon = (type) => {
    if (!type) return <FileText className="h-8 w-8 text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />;
    if (type.includes('word') || type.includes('docx')) return <FileText className="h-8 w-8 text-blue-600" />;
    if (type.includes('sheet') || type.includes('xlsx')) return <FileSpreadsheet className="h-8 w-8 text-emerald-600" />;
    if (type.includes('presentation') || type.includes('pptx')) return <PresentationIcon className="h-8 w-8 text-orange-500" />;
    if (type.includes('image')) return <ImageIcon className="h-8 w-8 text-purple-500" />;
    return <FileText className="h-8 w-8 text-slate-500" />;
  };

  if (status === 'analyzing') {
    return (
      <section className="glass p-8 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <h3 className="font-semibold text-lg text-slate-800 mb-1">AI 正在深度解析教材內容...</h3>
        <p className="text-sm text-slate-500">這可能需要幾秒鐘的時間，請稍候</p>
      </section>
    );
  }

  if (status === 'success' && file) {
    return (
      <section className="glass p-8 rounded-2xl flex flex-col items-center justify-center min-h-[220px]">
        <div className="bg-emerald-100 p-3 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="font-semibold text-lg text-emerald-800 mb-1">解析完成</h3>
        <p className="text-sm text-emerald-600 flex items-center gap-2">
          {getFileIcon(file.type)}
          <span className="font-medium">{file.name}</span>
        </p>
        <button
          onClick={() => { setFile(null); setStatus('idle'); }}
          className="mt-4 text-xs text-slate-500 underline hover:text-slate-700"
        >
          重新上傳
        </button>
      </section>
    );
  }

  return (
    <section
      {...getRootProps()}
      className={`glass p-8 rounded-2xl border-dashed border-2 cursor-pointer text-center group transition-all min-h-[220px] flex flex-col items-center justify-center ${
        isDragActive ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-blue-200 bg-blue-50/30 hover:bg-blue-50'
      }`}
    >
      <input {...getInputProps()} />
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm transition-transform ${isDragActive ? 'bg-blue-100 scale-110' : 'bg-white group-hover:scale-110'}`}>
        <FileUp className={`h-8 w-8 ${isDragActive ? 'text-blue-600' : 'text-blue-500'}`} />
      </div>
      <h3 className="font-semibold text-lg text-slate-800 mb-2">
        {isDragActive ? '放開以開始上傳' : '點擊或拖曳教材檔案至此'}
      </h3>
      <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
        支援 PDF, Docx, Excel, PPTX 簡報 或圖片格式<br />
        系統將自動識別 108 課綱學習重點並生成對應試題
      </p>
      <div className="flex justify-center flex-wrap gap-3">
        {[
          { Icon: FileText, color: 'text-red-500', label: 'PDF' },
          { Icon: FileText, color: 'text-blue-600', label: 'Word' },
          { Icon: FileSpreadsheet, color: 'text-emerald-600', label: 'Excel' },
          { Icon: PresentationIcon, color: 'text-orange-500', label: 'PowerPoint' },
          { Icon: ImageIcon, color: 'text-purple-500', label: 'Images' },
        ].map(({ Icon, color, label }) => (
          <span key={label} className="flex items-center text-xs text-slate-500 bg-white/60 px-2 py-1 rounded">
            <Icon className={`w-3 h-3 mr-1 ${color}`} /> {label}
          </span>
        ))}
      </div>
    </section>
  );
}
