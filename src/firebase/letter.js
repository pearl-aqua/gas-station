import {
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { store } from './index';

const seatRef = collection(store, 'g_seat');
// const letterRef = collection(store, 'g_letter');

export const getSeatList = async () => {
  const seatSnapshot = await getDocs(seatRef);

  let seatList = [];

  seatSnapshot.forEach((doc) => {
    seatList.push({
      id: doc.id,
      num: doc.data().num,
      letterId: doc.data().letterId,
      word: doc.data().word,
    });
  });

  return seatList;
};

export const getLetter = async (letterId) => {
  const letterRef = doc(store, 'g_letter', letterId);

  const letterData = await getDoc(letterRef);

  return letterData.data();
};

// user letter id
// seat [ { id num userId letterId }]
// letter [{id seat name text isPublic}]

export const postLetter = async ({ letterData, seatNum, userId, seatData }) => {
  const userRef = doc(store, 'g_user', userId);

  const docId = Date.now();

  seatData.letterId = docId.toString();

  await setDoc(doc(store, 'g_letter', docId.toString()), letterData);
  await setDoc(doc(store, 'g_seat', seatNum.toString()), seatData);

  await updateDoc(userRef, {
    letterId: docId.toString(),
  });
};
