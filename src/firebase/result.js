import { collection, getDocs } from 'firebase/firestore';
import { store } from './index';

const optionRef = collection(store, 'g_option');
const questionRef = collection(store, 'g_question');

const listOrder = [
  '10002',
  '10003',
  '10004',
  '10001',
  '10005',
  '10006',
  '10007',
];

export const get2022ResultList = async () => {
  const questionSnapshot = await getDocs(questionRef);
  const optionSnapshot = await getDocs(optionRef);

  let optionList = [];

  optionSnapshot.forEach((doc) => {
    optionList.push({
      id: doc.id,
      text: doc.data().text,
      count: doc.data().count,
    });
  });

  let questionsList = [];

  questionSnapshot.forEach((doc) => {
    const currentOptionsId = doc.data().optionsId;

    const currentOptions = optionList.filter(({ id }) => {
      return currentOptionsId?.includes(id);
    });

    const sortOptions = currentOptions.sort((a, b) => b.count - a.count);

    questionsList.push({
      id: doc.id,
      options: sortOptions,
      ...doc.data(),
    });
  });

  const sortList = listOrder.map((listId) =>
    questionsList.find(({ id }) => id === listId)
  );

  return sortList;
};
