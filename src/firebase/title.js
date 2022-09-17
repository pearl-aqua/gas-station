import {
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from 'firebase/firestore';
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
      return currentOptionsId.includes(id);
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

export const getQuestionResult = async (questionId) => {
  const questionOneRef = doc(store, 'g_question', questionId);

  const oneQuestion = await getDoc(questionOneRef);
  const querySnapshot = await getDocs(optionRef);

  let optionList = [];
  querySnapshot.forEach((doc) => {
    if (oneQuestion.data().optionsId?.includes(doc.id)) {
      optionList.push({
        id: doc.id,
        text: doc.data().text,
        count: doc.data().count,
      });
    }
  });

  const result = oneQuestion.data();
  result.options = optionList;

  return result;
};

export const updateCount = async ({ questionId, selectedIds, userId }) => {
  const questionOneRef = doc(store, 'g_question', questionId);
  const userRef = doc(store, 'g_user', userId);

  await updateDoc(userRef, {
    questionId: arrayUnion(questionId),
  });
  await updateDoc(questionOneRef, {
    count: increment(selectedIds.length),
  });
  selectedIds.forEach((id) => {
    const optionRef = doc(store, 'g_option', id);

    const updateOption = async () => {
      await updateDoc(optionRef, {
        count: increment(1),
      });
      await updateDoc(userRef, {
        optionsId: arrayUnion(id),
      });
    };
    updateOption();
  });
};

export const getUserInfo = async ({ id, email }) => {
  const userRef = doc(store, 'g_user', id);
  const userInfo = await getDoc(userRef);
  console.log(userInfo.data(), 'userInfo');
  if (userInfo.exists()) {
    return userInfo.data();
  } else {
    const userData = {
      id,
      email,
      questionId: [],
      optionsId: [],
    };
    await setDoc(doc(store, 'g_user', id), userData);
    return userData;
  }
};
