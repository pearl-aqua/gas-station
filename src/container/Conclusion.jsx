import { useState, useEffect } from 'react';
import { getQuestionResult } from '../firebase/title';

const Conclusion = ({ data, answered, isAnsweredUser }) => {
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    if (isAnsweredUser) {
      setNewData(data);
    } else if (answered) {
      const questionResult = async () => {
        const result = await getQuestionResult(data.id);
        setNewData(result);
      };
      questionResult();
    }
  }, [isAnsweredUser, answered]);

  const getOptionWidth = (count) => {
    if (!count || !data.count) {
      return '0';
    }

    const widthNum = Math.round((count / data?.count) * 320);

    return `${widthNum}p`;
  };

  const clickShareButton = () => {
    const sendText =
      '가솔린을 선택하셨습니다. 56%가 같은 선택을 하였습니다. 이번 앨범에서 좋아하는 곡은? 투표하기 및 결과보러가기';
    const pageUrl = 'news.v.daum.net/v/20220319120213003';

    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        sendText
      )}&url=${encodeURI(pageUrl)}`
    );
  };

  return (
    <div>
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
              className="relative flex flex-col item-start justify-center w-312p h-12 px-4 mb-2.5 text-slate-800 border border-teal-100 rounded-lg"
            >
              <div className="flex justify-between w-full z-20">
                <span className="">{text}</span>
                <span className="text-sm text-slate-400">{`${parseFloat(
                  ((count / newData?.count || 0) * 100).toFixed(2)
                )}%`}</span>
              </div>
              <div
                className={`absolute top-0 left-0 w-${getOptionWidth(
                  count
                )} h-12 bg-teal-200 rounded-lg z-100`}
              />
            </div>
          ))
        : data?.options?.map(({ id, text, count }) => (
            <div
              key={id}
              className="relative flex flex-col item-start justify-center w-320p h-12 px-4 mb-2.5 text-slate-600 border border-teal-100 rounded-lg"
            >
              <div className="flex justify-between w-full z-20">
                <span>{text}</span>
                <span className="text-sm">{`${Math.round(
                  (count / newData?.count || 0) * 100
                )}%`}</span>
              </div>
            </div>
          ))}
      <button
        className="flex items-center justify-center w-200p px-5 py-3 mt-6 rounded-2xl bg-teal-400 text-white hover:bg-teal-500 self-end"
        onClick={clickShareButton}
      >
        결과 공유하기
      </button>
    </div>
  );
};

export default Conclusion;
