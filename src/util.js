import { getSeatList } from './firebase/letter';

const seatArr = Array(84);
seatArr.fill(1);

export const getSeat = async () => {
  const seatData = await getSeatList();
  const seatId = seatData.map((el) => +el.id);
  const filterSeat = seatArr.map((el, index) => {
    if (seatId.includes(index + 1)) {
      return seatData.find((el) => +el.id === index + 1);
    }
    return { num: index + 1 };
  });

  return filterSeat;
};
