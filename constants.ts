import { HanziChar } from './types';

// A curated list of first 50 characters to start. 
export const HANZI_DATA: HanziChar[] = [
  { id: 1, char: '一', pinyin: 'yī', meaning: '数字一', example: '一个', level: 1 },
  { id: 2, char: '二', pinyin: 'èr', meaning: '数字二', example: '二月', level: 1 },
  { id: 3, char: '三', pinyin: 'sān', meaning: '数字三', example: '三天', level: 1 },
  { id: 4, char: '人', pinyin: 'rén', meaning: '人类', example: '大人', level: 1 },
  { id: 5, char: '口', pinyin: 'kǒu', meaning: '嘴巴', example: '人口', level: 1 },
  { id: 6, char: '大', pinyin: 'dà', meaning: '大小', example: '大家', level: 1 },
  { id: 7, char: '小', pinyin: 'xiǎo', meaning: '细小', example: '小孩', level: 1 },
  { id: 8, char: '中', pinyin: 'zhōng', meaning: '中间', example: '中国', level: 1 },
  { id: 9, char: '上', pinyin: 'shàng', meaning: '上面', example: '早上', level: 1 },
  { id: 10, char: '下', pinyin: 'xià', meaning: '下面', example: '下午', level: 1 },
  { id: 11, char: '天', pinyin: 'tiān', meaning: '天空', example: '今天', level: 1 },
  { id: 12, char: '地', pinyin: 'dì', meaning: '地面', example: '地上', level: 1 },
  { id: 13, char: '日', pinyin: 'rì', meaning: '太阳', example: '日记', level: 1 },
  { id: 14, char: '月', pinyin: 'yuè', meaning: '月亮', example: '月光', level: 1 },
  { id: 15, char: '水', pinyin: 'shuǐ', meaning: '河流', example: '喝水', level: 1 },
  { id: 16, char: '火', pinyin: 'huǒ', meaning: '火焰', example: '火车', level: 1 },
  { id: 17, char: '木', pinyin: 'mù', meaning: '树木', example: '木头', level: 1 },
  { id: 18, char: '山', pinyin: 'shān', meaning: '高山', example: '爬山', level: 1 },
  { id: 19, char: '石', pinyin: 'shí', meaning: '石头', example: '岩石', level: 1 },
  { id: 20, char: '田', pinyin: 'tián', meaning: '农田', example: '田地', level: 1 },
  { id: 21, char: '马', pinyin: 'mǎ', meaning: '大马', example: '马车', level: 2 },
  { id: 22, char: '牛', pinyin: 'niú', meaning: '黄牛', example: '牛奶', level: 2 },
  { id: 23, char: '羊', pinyin: 'yáng', meaning: '山羊', example: '绵羊', level: 2 },
  { id: 24, char: '鱼', pinyin: 'yú', meaning: '游鱼', example: '金鱼', level: 2 },
  { id: 25, char: '虫', pinyin: 'chóng', meaning: '昆虫', example: '虫子', level: 2 },
  { id: 26, char: '鸟', pinyin: 'niǎo', meaning: '飞鸟', example: '小鸟', level: 2 },
  { id: 27, char: '草', pinyin: 'cǎo', meaning: '青草', example: '草地', level: 2 },
  { id: 28, char: '花', pinyin: 'huā', meaning: '花朵', example: '红花', level: 2 },
  { id: 29, char: '爸', pinyin: 'bà', meaning: '父亲', example: '爸爸', level: 2 },
  { id: 30, char: '妈', pinyin: 'mā', meaning: '母亲', example: '妈妈', level: 2 },
];

export const getAllHanzi = (): HanziChar[] => {
  const current = [...HANZI_DATA];
  return current;
};

export const INITIAL_PROGRESS = {
  unlockedIndex: 0, 
  mastery: {},
  stars: 0,
  streak: 0,
  lastLoginDate: new Date().toDateString(),
};