import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getQuestionResult } from '../firebase/title';
import { selectedOptionsIdState } from '../recoil';
import {taeminText, shineeText} from '../contants'

const pageUrl = 'gas-station-theta.vercel.app';



const Conclusion = ({ data, answered, isAnsweredUser, optionsId }) => {
  const [newData, setNewData] = useState(null);
  const [selectOption, setSelectOption] = useState([]);
  const selectedOptionsId = useRecoilValue(selectedOptionsIdState);

  useEffect(() => {
    if (isAnsweredUser) {
      setNewData(data);
      const selectedOption = data.options.filter(({ id }) =>
        optionsId?.includes(id)
      );
      setSelectOption(selectedOption);
    } else if (answered) {
      const questionResult = async () => {
        const result = await getQuestionResult(data.id);
        setNewData(result);

        const selectedOption = result.options.filter(({ id }) =>
          selectedOptionsId?.includes(id)
        );

        setSelectOption(selectedOption);
      };
      questionResult();
    }
  }, [isAnsweredUser, answered, data, optionsId]);

  const getOptionWidth = (count) => {
    if (!count || !newData.count) {
      return '0';
    }

    const widthNum = Math.round((count / newData?.count) * 312);

    return `${widthNum}p`;
  };

  const sendText = data.id ==='40001' ? taeminText(data, newData, selectOption)  : shineeText(data, newData, selectOption)
const clickShareButton = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        sendText
      )}&url=${encodeURI(pageUrl)}`
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-312p mb-2">
        <div className="text-left text-lg text-stone-800 font-semibold mb-2">
          Q. {newData?.text || data?.text}
        </div>
        <div className="self-end text-sm text-stone-600">{`총 ${
          newData?.count || 0
        }표`}</div>
      </div>

      {newData
        ? newData?.options?.map(({ id, text, count }) => (
            <div
              key={id}
              className="relative flex flex-col item-start justify-center w-278p h-[38px] px-4 mb-2 text-slate-800 border border-teal-100 rounded-lg box-content"
            >
              <div className="flex justify-between w-full z-20">
                <span className="">{text}</span>
                <span className="text-sm text-slate-400 mt-0.5">{`${parseFloat(
                  ((count / newData?.count || 0) * 100).toFixed(2)
                )}%`}</span>
              </div>
              <div
                className={`absolute top-0 left-0 w-${getOptionWidth(
                  count
                )} h-[38px] bg-teal-100 rounded-[7px] z-100 border border-teal-100`}
              />
            </div>
          ))
        : data?.options?.map(({ id, text, count }) => (
            <div
              key={id}
              className="relative flex flex-col item-start justify-center w-278p h-[38px] px-4 mb-2 text-slate-600 border border-teal-100 rounded-lg box-content"
            >
              <div className="flex justify-between w-full z-20">
                <span>{text}</span>
                <span className="text-sm mt-0.5">{`${Math.round(
                  (count / newData?.count || 0) * 100
                )}%`}</span>
              </div>
            </div>
          ))}
      {!(data?.id === '10007'||data?.id === '50002') && (
        <div className="flex flex-col items-center justify-center">
          <button
            className="flex items-center justify-center w-160p px-5 mt-5 text-teal-400 hover:text-teal-600"
            onClick={clickShareButton}
          >
            결과 공유하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Conclusion;
