import { atom, selector } from 'recoil';

import { getResultList } from '../firebase/title';
import { getQuestionList } from '../firebase/question';

export const userInfoState = atom({
  key: 'userInfoState',
  default: {},
});

export const questionListState = selector({
  key: 'questionListState',
  get: async ({ get }) => {
    const list = await getQuestionList();
    return list;
  },
});

export const resultListState = selector({
  key: 'resultListStat',
  get: async ({ get }) => {
    const list = await getResultList();
    return list;
  },
});

export const selectedOptionsIdState = atom({
  key: 'selectedOptionsIdState',
  default: [],
});

export const loginModalOpenState = atom({
  key: 'loginModalOpenState',
  default: false,
});
