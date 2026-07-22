import React from 'react';
import { Target, BrainCircuit } from 'lucide-react';

const PAPER_SIZES = {
  A4:  { w: 735,  h: 1040 },
  A3:  { w: 1040, h: 1470 },
  B4:  { w: 875,  h: 1235 },
  B5:  { w: 616,  h: 875  },
};

const MARGIN_STYLES = {
  standard: { padding: '40px 48px' },
  narrow:   { padding: '24px 24px' },
  wide:     { padding: '40px 80px' },
};

export default function ExamPreview({ settings, layout, status }) {
  if (status !== 'success') {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="text-center">
          <Target className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">請先上傳教材檔案</p>
          <p className="text-sm">系統將自動提煉重點並在此預覽</p>
        </div>
      </div>
    );
  }

  const dims = PAPER_SIZES[layout.size] || PAPER_SIZES.A4;
  const isLandscape = layout.orientation === '橫向';
  const paperW = isLandscape ? dims.h : dims.w;
  const paperH = isLandscape ? dims.w : dims.h;
  const marginStyle = MARGIN_STYLES[layout.margin] || MARGIN_STYLES.standard;
  const isVertical = layout.textDirection === '直書';

  const paperStyle = {
    width: `${paperW}px`,
    minHeight: `${paperH}px`,
    maxWidth: '100%',
    background: '#fff',
    boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
    writingMode: isVertical ? 'vertical-rl' : 'horizontal-tb',
  };

  const innerStyle = {
    ...marginStyle,
    height: '100%',
    columnCount: layout.columns,
    columnGap: '2rem',
  };

  return (
    <div style={paperStyle}>
      <div style={innerStyle}>
        <div style={{ columnSpan: 'all' }} className="text-center mb-8 border-b-2 border-slate-800 pb-4">
          <h1 className="text-2xl font-bold mb-2">
            {settings.grade} {
              settings.subject === 'general' ? '跨領域' :
              settings.subject === 'chinese' ? '國語' :
              settings.subject === 'math' ? '數學' : '自然'
            }平時測驗
          </h1>
          <h2 className="text-lg text-slate-600">範圍：綜合練習</h2>
          <div className="flex justify-between items-end mt-4 text-sm font-medium">
            <span>班級：_______ 座號：____ 姓名：___________</span>
            <span>得分：</span>
          </div>
        </div>

        {settings.questionTypes.length === 0 ? (
          <div className="text-center text-slate-400 py-10">
            尚未選擇任何題型
          </div>
        ) : (
          settings.questionTypes.map((type, index) => (
            <div key={type} className="mb-8" style={{ breakInside: 'avoid' }}>
              <h3 className="font-bold text-lg mb-4">{index + 1}. {type}</h3>
              <div className="space-y-6">
                <QuestionItem
                  num={1}
                  content="根據108課綱的核心素養，下列何者是正確的學習態度？"
                  options={['(A) 死記硬背', '(B) 探究實作', '(C) 盲目服從', '(D) 拒絕合作']}
                  bloom="理解"
                  learningFocus="理解核心素養內涵"
                />
                <QuestionItem
                  num={2}
                  content="結合日常生活情境，解決複雜問題屬於哪一層次的認知能力？"
                  options={['(A) 記憶', '(B) 創造', '(C) 應用', '(D) 分析']}
                  bloom="應用"
                  learningFocus="分析問題解決策略"
                />
              </div>
            </div>
          ))
        )}

        <div style={{ columnSpan: 'all' }} className="mt-12 text-center text-xs text-slate-300">
          — 試卷底端 —
        </div>
      </div>
    </div>
  );
}

function QuestionItem({ num, content, options, bloom, learningFocus }) {
  return (
    <div style={{ breakInside: 'avoid' }} className="pl-2 group hover:bg-blue-50/50 p-2 rounded transition-colors">
      <div className="flex mb-2 text-slate-800">
        <span className="font-semibold mr-2">{num}.</span>
        <p className="flex-1">{content}</p>
      </div>
      {options && (
        <div className="grid grid-cols-1 gap-1 pl-6 mb-2 text-slate-700">
          {options.map(opt => <div key={opt}>{opt}</div>)}
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2 pl-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-flex items-center text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
          <BrainCircuit className="w-3 h-3 mr-1" />
          布魯姆: {bloom}
        </span>
        <span className="inline-flex items-center text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
          <Target className="w-3 h-3 mr-1" />
          學習重點: {learningFocus}
        </span>
      </div>
    </div>
  );
}
