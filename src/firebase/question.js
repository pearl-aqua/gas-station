import { collection, getDocs } from 'firebase/firestore';
import { store } from './index';

const optionRef = collection(store, 'g_option');
const questionRef = collection(store, 'g_question');

const listOrder = ['40001', '50001', '50002'];

export const getQuestionList = async () => {
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

    questionsList.push({
      id: doc.id,
      options: currentOptions,
      ...doc.data(),
    });
  });

  const sortList = listOrder.map((listId) =>
    questionsList.find(({ id }) => id === listId)
  );

  return sortList;
};
