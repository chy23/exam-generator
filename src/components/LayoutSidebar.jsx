import React from 'react';
import { LayoutTemplate } from 'lucide-react';
import {
    LAYOUT_SIZES, LAYOUT_ORIENTATIONS, LAYOUT_MARGINS, LAYOUT_COLUMNS, TEXT_DIRECTIONS
} from '../constants/options';

const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white/50 rounded-xl p-4 border border-slate-100 shadow-sm space-y-3 mt-4">
        <h3 className="flex items-center text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">
            <Icon className="h-4 w-4 mr-2 text-indigo-500" />
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

export default function LayoutSidebar({ layout, setLayout }) {
    return (
        <Section title="版面配置" icon={LayoutTemplate}>
            <div className="grid grid-cols-2 gap-3">
                {/* Orientation */}
                <div className="col-span-2 flex rounded-lg overflow-hidden border border-slate-200 bg-white p-1">
                    {LAYOUT_ORIENTATIONS.map(ori => (
                        <button
                            key={ori}
                            onClick={() => setLayout({ ...layout, orientation: ori })}
                            className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${layout.orientation === ori ? 'bg-indigo-100 text-indigo-700 font-medium shadow-sm' : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {ori}
                        </button>
                    ))}
                </div>

                {/* Paper Size */}
                <div className="col-span-1">
                    <label className="block text-xs text-slate-500 mb-1">紙張尺寸</label>
                    <select
                        value={layout.size}
                        onChange={e => setLayout({ ...layout, size: e.target.value })}
                        className="w-full text-xs border-slate-200 rounded-md bg-white/80"
                    >
                        {LAYOUT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                {/* Columns */}
                <div className="col-span-1">
                    <label className="block text-xs text-slate-500 mb-1">欄位數</label>
                    <select
                        value={layout.columns}
                        onChange={e => setLayout({ ...layout, columns: parseInt(e.target.value) })}
                        className="w-full text-xs border-slate-200 rounded-md bg-white/80"
                    >
                        {LAYOUT_COLUMNS.map(c => <option key={c} value={c}>{c}欄</option>)}
                    </select>
                </div>

                {/* Margins */}
                <div className="col-span-2">
                    <label className="block text-xs text-slate-500 mb-1">邊界</label>
                    <select
                        value={layout.margin}
                        onChange={e => setLayout({ ...layout, margin: e.target.value })}
                        className="w-full text-xs border-slate-200 rounded-md bg-white/80"
                    >
                        {LAYOUT_MARGINS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                    </select>
                </div>

                {/* Text Direction */}
                <div className="col-span-2">
                    <label className="block text-xs text-slate-500 mb-1">文字排版</label>
                    <div className="flex space-x-2">
                        {TEXT_DIRECTIONS.map(dir => (
                            <button
                                key={dir}
                                onClick={() => setLayout({ ...layout, textDirection: dir })}
                                className={`flex-1 text-xs py-1.5 rounded border transition-colors ${layout.textDirection === dir ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {dir}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
