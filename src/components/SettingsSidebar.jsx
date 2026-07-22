import React, { useState } from 'react';
import { Layers, CheckSquare, Settings2 } from 'lucide-react';
import {
    GRADE_LEVELS, LEARNING_STAGES, SUBJECTS, QUESTION_TYPES, BLOOMS_TAXONOMY
} from '../constants/options';

const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white/50 rounded-xl p-4 border border-slate-100 shadow-sm space-y-3">
        <h3 className="flex items-center text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">
            <Icon className="h-4 w-4 mr-2 text-blue-500" />
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

export default function SettingsSidebar({ settings, setSettings }) {

    const handleSubjectChange = (e) => {
        setSettings({
            ...settings,
            subject: e.target.value,
            // Reset question types when subject changes
            questionTypes: []
        });
    };

    const handleTypeToggle = (type) => {
        const currentTypes = settings.questionTypes;
        if (currentTypes.includes(type)) {
            setSettings({ ...settings, questionTypes: currentTypes.filter(t => t !== type) });
        } else {
            setSettings({ ...settings, questionTypes: [...currentTypes, type] });
        }
    };

    const availableTypes = [
        ...QUESTION_TYPES.general,
        ...(settings.subject !== 'general' ? QUESTION_TYPES[settings.subject] || [] : [])
    ];

    return (
        <div className="space-y-4">
            <Section title="基礎設定" icon={Settings2}>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">適用對象</label>
                    <select
                        value={settings.grade}
                        onChange={e => setSettings({ ...settings, grade: e.target.value })}
                        className="w-full text-sm border-slate-200 rounded-lg bg-white/80 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                        {GRADE_LEVELS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">學習階段</label>
                    <select
                        value={settings.learningStage}
                        onChange={e => setSettings({ ...settings, learningStage: e.target.value })}
                        className="w-full text-sm border-slate-200 rounded-lg bg-white/80 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                        {LEARNING_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">科目領域</label>
                    <select
                        value={settings.subject}
                        onChange={handleSubjectChange}
                        className="w-full text-sm border-slate-200 rounded-lg bg-white/80 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                        {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                </div>
            </Section>

            <Section title="題目設定" icon={Layers}>
                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">布魯姆認知程度</label>
                    <select
                        value={settings.bloomLevel}
                        onChange={e => setSettings({ ...settings, bloomLevel: e.target.value })}
                        className="w-full text-sm border-slate-200 rounded-lg bg-white/80 focus:ring-blue-500 focus:border-blue-500 shadow-sm mb-3"
                    >
                        <option value="all">不限 (自動分配)</option>
                        {BLOOMS_TAXONOMY.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">題型選擇 (可複選)</label>
                    <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
                        {availableTypes.map(type => (
                            <label key={type} className={`
                flex items-center p-2 rounded-lg border cursor-pointer text-xs transition-colors
                ${settings.questionTypes.includes(type)
                                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                                    : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'}
              `}>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={settings.questionTypes.includes(type)}
                                    onChange={() => handleTypeToggle(type)}
                                />
                                <div className="flex-1 truncate" title={type}>{type}</div>
                                {settings.questionTypes.includes(type) && <CheckSquare className="h-3 w-3 ml-1 flex-shrink-0" />}
                            </label>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
