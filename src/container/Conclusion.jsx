import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { getQuestionResult } from '../firebase/title';
import { selectedOptionsIdState } from '../recoil';

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

  const sendText =
    data.id !== '10001'
      ? `🎂 김기범 생일 기념 질문 🎂
  Q.${newData?.text || data?.text}
  - 당신의 선택 : ${selectOption[0]?.text}
  - ${parseFloat(
    ((selectOption[0]?.count / newData?.count || 0) * 100).toFixed(2)
  )}%의 릴프릭이 같은 선택을 하였습니다.
  
  투표하기 및 결과보러가기 ->
`
      : `🎂 김기범 생일 기념 질문 🎂
Q.${newData?.text || data?.text}
- 당신의 선택 : ${selectOption?.map(({ text }) => text)}

투표하기 및 결과보러가기 ->
`;

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
        <div className="text-left text-lg text-stone-800  font-semibold mb-2">
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
              className="relative flex flex-col item-start justify-center w-278p h-[38px] px-4 mb-2 text-slate-800 border border-violet-100 rounded-lg box-content"
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
                )} h-[38px] bg-violet-200 rounded-[7px] z-100 border border-violet-200`}
              />
            </div>
          ))
        : data?.options?.map(({ id, text, count }) => (
            <div
              key={id}
              className="relative flex flex-col item-start justify-center w-278p h-[38px] px-4 mb-2 text-slate-600 border border-violet-100 rounded-lg box-content"
            >
              <div className="flex justify-between w-full z-20">
                <span>{text}</span>
                <span className="text-sm mt-0.5">{`${Math.round(
                  (count / newData?.count || 0) * 100
                )}%`}</span>
              </div>
            </div>
          ))}
      {data?.id !== '10007' && (
        <div className="flex flex-col items-center justify-center">
          <button
            className="flex items-center justify-center w-160p px-5 py-3 mt-5 rounded-2xl bg-violet-400 text-white hover:bg-violet-500"
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
