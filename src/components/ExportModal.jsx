import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function ExportModal({ onClose }) {
    const [options, setOptions] = useState({
        questionOnly: true,
        withAnswers: false,
        answerSheet: false,
        withExplanations: false,
        includeMeta: true // 包含學習重點與認知能力
    });
    const [exporting, setExporting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleExport = () => {
        setExporting(true);
        setTimeout(() => {
            setExporting(false);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 2000);
    };

    const Option = ({ id, label, desc }) => (
        <label className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-colors ${options[id] ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'}`}>
            <input
                type="checkbox"
                className="mt-1 flex-shrink-0 appearance-none w-4 h-4 text-blue-600 bg-white border border-slate-300 rounded focus:ring-blue-500 checked:bg-blue-500 checked:border-transparent mr-3"
                checked={options[id]}
                onChange={() => setOptions({ ...options, [id]: !options[id] })}
            />
            <div>
                <div className="font-semibold text-slate-800 leading-tight">{label}</div>
                <div className="text-xs text-slate-500 mt-1">{desc}</div>
            </div>
        </label>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden transform transition-all">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold flex items-center text-slate-800">
                        <Download className="mr-2 h-5 w-5 text-blue-600" />
                        匯出 Docx 試卷
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 p-1 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {success ? (
                    <div className="p-12 flex flex-col items-center justify-center py-20">
                        <CheckCircle2 className="h-20 w-20 text-emerald-500 mb-6 animate-[bounce_1s_ease-in-out]" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">匯出成功！</h3>
                        <p className="text-slate-500">正在下載您的考卷檔案...</p>
                    </div>
                ) : (
                    <div className="p-6">
                        <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">選擇匯出內容</h3>
                        <div className="space-y-3 mb-8">
                            <Option id="questionOnly" label="題目卷 (無答案)" desc="純題目，適合直接發給學生作答" />
                            <Option id="withAnswers" label="題目卷 (含答案)" desc="題目下方附有正確答案，供教師對卷" />
                            <Option id="answerSheet" label="單純答案卷" desc="只有填答欄位，適合配合題目卷使用" />
                            <Option id="withExplanations" label="題目卷 (含解析)" desc="包含解題思路與詳解，適合課後檢討" />

                            <div className="my-5 border-t border-slate-100 pt-5">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={options.includeMeta}
                                        onChange={() => setOptions({ ...options, includeMeta: !options.includeMeta })}
                                        className="w-4 h-4 text-blue-600 bg-white border border-slate-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">附上 108 課綱學習重點及認知能力程度標籤</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                disabled={exporting}
                            >
                                取消
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex-[2] flex items-center justify-center px-4 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={exporting || (!options.questionOnly && !options.withAnswers && !options.answerSheet && !options.withExplanations)}
                            >
                                {exporting ? (
                                    <span className="flex items-center"><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 產生中...</span>
                                ) : (
                                    <span className="flex items-center"><FileText className="h-5 w-5 mr-2" /> 生成 Docx 檔案</span>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Simple inline SVG loader if lucide reacts loader is missing
function Loader2({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
}
