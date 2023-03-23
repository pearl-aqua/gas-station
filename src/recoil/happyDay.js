import { selector } from 'recoil';

import { get2022ResultList } from '../firebase/result';

export const happy2022ResultListState = selector({
  key: 'happy2022ResultListStat',
  get: async ({ get }) => {
    const list = await get2022ResultList();
    return list;
  },
});
