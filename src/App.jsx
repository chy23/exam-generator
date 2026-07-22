import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import SettingsSidebar from './components/SettingsSidebar';
import LayoutSidebar from './components/LayoutSidebar';
import UploadArea from './components/UploadArea';
import ExamPreview from './components/ExamPreview';
import ExportModal from './components/ExportModal';

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, analyzing, success
  const [settings, setSettings] = useState({
    grade: '國中一年級',
    learningStage: '第四學習階段 (國一~國三)',
    subject: 'general',
    bloomLevel: 'all',
    questionTypes: ['選擇題', '問答題']
  });
  const [layout, setLayout] = useState({
    orientation: '直向',
    size: 'A4',
    margin: 'standard',
    columns: 1,
    textDirection: '橫書'
  });
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
              108課綱 智能題庫生成器
            </h1>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium text-sm shadow-md
              ${uploadStatus === 'success'
                ? 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-lg'
                : 'hidden'}`}
            disabled={uploadStatus !== 'success'}
          >
            <Download className="h-4 w-4" />
            <span>匯出試卷</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <SettingsSidebar settings={settings} setSettings={setSettings} />
          <LayoutSidebar layout={layout} setLayout={setLayout} />
        </aside>

        <div className="flex-1 space-y-6 min-w-0">
          <UploadArea file={file} setFile={setFile} status={uploadStatus} setStatus={setUploadStatus} />

          <section className="glass rounded-2xl p-0 overflow-hidden flex flex-col min-h-[600px] shadow-lg border border-slate-200/60">
            <div className="bg-slate-100/80 backdrop-blur-sm p-4 border-b border-slate-200 flex justify-between items-center z-10">
              <h3 className="font-semibold text-slate-700 flex items-center">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                試卷預覽
              </h3>
              <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 font-medium tracking-wide">
                {layout.size} • {layout.orientation} • {layout.margin === 'standard' ? '標準邊界' : layout.margin === 'narrow' ? '窄邊界' : '寬邊界'} • {layout.columns} 欄
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-slate-200 p-8 flex justify-center relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <ExamPreview settings={settings} layout={layout} status={uploadStatus} />
            </div>
          </section>
        </div>
      </main>

      {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
    </div>
  );
}

export default App;
