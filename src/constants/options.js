export const GRADE_LEVELS = [
    '國小一年級', '國小二年級', '國小三年級', '國小四年級', '國小五年級', '國小六年級',
    '國中一年級', '國中二年級', '國中三年級'
];

export const LEARNING_STAGES = [
    '第一學習階段 (小一~小二)',
    '第二學習階段 (小三~小四)',
    '第三學習階段 (小五~小六)',
    '第四學習階段 (國一~國三)'
];

export const SUBJECTS = [
    { id: 'general', label: '通用領域' },
    { id: 'chinese', label: '國語領域' },
    { id: 'math', label: '數學領域' },
    { id: 'science', label: '自然領域' }
];

export const QUESTION_TYPES = {
    general: ['是非題', '選擇題', '問答題', '簡答題', '詳答題', '配合題', '連連看', '短文閱讀測驗', '長文閱讀測驗', '勾選題'],
    chinese: ['國字', '注音', '改錯字', '造樣造句', '造句'],
    math: ['數學應用問題', '情境式應用問題'],
    science: ['實驗操作素養題']
};

export const BLOOMS_TAXONOMY = [
    '記憶 (Remembering)',
    '理解 (Understanding)',
    '應用 (Applying)',
    '分析 (Analyzing)',
    '評鑑 (Evaluating)',
    '創造 (Creating)'
];

// Layout Options
export const LAYOUT_SIZES = ['A4', 'A3', 'B4', 'B5'];
export const LAYOUT_ORIENTATIONS = ['直向', '橫向'];
export const LAYOUT_MARGINS = [
    { id: 'standard', label: '標準版面 (上下2.54cm, 左右3.17cm)' },
    { id: 'narrow', label: '窄版面 (上下1.27cm, 左右1.27cm)' },
    { id: 'wide', label: '寬版面 (上下2.54cm, 左右5.08cm)' }
];
export const LAYOUT_COLUMNS = [1, 2, 3, 4, 5];
export const TEXT_DIRECTIONS = ['橫書', '直書'];
