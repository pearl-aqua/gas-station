import { atom, selector } from 'recoil';

import { getQuestionList } from '../firebase/title';

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

export const selectedOptionsIdState = atom({
  key: 'selectedOptionsIdState',
  default: [],
});

export const loginModalOpenState = atom({
  key: 'loginModalOpenState',
  default: false,
});
