import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';

import { resultListState } from '../recoil';

const pageUrl = 'gas-station-theta.vercel.app';

const Result = () => {
  const questionList = useRecoilValue(resultListState);
  const getOptionWidth = (count, dataCount) => {
    if (!count || !dataCount) {
      return '0';
    }

    const widthNum = Math.round((count / dataCount) * 312);

    return `${widthNum}p`;
  };

  const clickShareButton = (data, questionCount) => {
    let optionText = '';
    data?.options?.forEach(({ text, count }, index) => {
      if (index < 3) {
        optionText += `${index + 1}위 : ${text} (${parseFloat(
          ((count / questionCount || 0) * 100).toFixed(2)
        )}%)
  `;
      }
    });
    const sendText = `🎂 김기범 생일 기념 질문 최종 결과 🎂
  Q.${data?.text}
  ${optionText}
  더보기 ->
`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        sendText
      )}&url=${encodeURI(pageUrl)}`
    );
  };
  return (
    <>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-left text-sm text-slate-400">
        <span>- 기범이 생일을 맞아 재미삼아 만든 페이지입니다.</span>
        <span className="mt-1">
          - 더이상 투표자가 없어 미리 고지한 27일보다 이른 26일 1시에 투표
          종료하였습니다.
        </span>
        <span className="mt-1">
          - 최종 투표 결과는 아래에서 확인 가능합니다.
        </span>
        <span className="mt-1">
          - 투표해주신 분들, 공유해주신 분들 모두에게 감사드립니다.
        </span>
      </div>
      {questionList.map((data) => (
        <div
          key={data.id}
          className="flex flex-col justify-center items-center w-[350px] md:w-96 py-10 mb-4 bg-white rounded-2xl border border-slate-200 z-50"
        >
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-312p mb-2">
              <div className="text-left text-lg text-stone-800  font-semibold mb-2">
                Q. {data?.text}
              </div>
              <div className="self-end text-sm text-stone-600">{`총 ${
                data?.count || 0
              }표`}</div>
            </div>

            {data?.options?.map(({ id, text, count }) => (
              <div
                key={id}
                className="relative flex flex-col item-start justify-center w-278p h-[32px] px-4 mb-2 text-slate-800 border border-violet-100 rounded-lg box-content"
              >
                <div className="flex justify-between w-full z-20">
                  <span className="">{text}</span>
                  <span className="text-sm text-slate-400 mt-0.5">{`${parseFloat(
                    ((count / data?.count || 0) * 100).toFixed(2)
                  )}%`}</span>
                </div>
                <div
                  className={`absolute top-0 left-0 w-${getOptionWidth(
                    count,
                    data?.count
                  )} h-[32px] bg-violet-200 rounded-[7px] z-100 border border-violet-200`}
                />
              </div>
            ))}
          </div>
          <div
            className="text-sm text-slate-400 self-end mr-10 mt-1 cursor-pointer"
            onClick={() => clickShareButton(data, data?.count)}
          >
            공유하기
          </div>
        </div>
      ))}
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-left text-sm text-slate-400 z-50">
        <span className="text-base">P.S</span>
        <span className="mt-2.5">
          - 다시 한번 투표해주신 모든 분들께 감사드립니다. '다른 릴프릭들은 어떤
          생각을 가지고 있는지 궁금해!'가 이 작업의 시작점이었고, 어느 정도는
          궁금증을 해소할 수 있는 결과였습니다. 투표해주신 분들 뿐 아니라
          공유해주신 분들에게도 감사의 말씀을 드립니다.
        </span>
        <span className="mt-2.5">
          - 내년 기범이의 생일에도 여유가 된다면 같은 작업을 해보고 싶은 생각이
          있습니다. 같은 질문을 했을때 내년에는 또 어떻게 달라져있을지
          궁금하기도 하고, 올해 시간상 하지 못했던 작업들도 있어서 2023 버전도
          만들 수 있으면 좋을거 같아요. 물론 내년 상황이 어떠할지 모르겠지만.
        </span>
        <span className="mt-2.5">
          - 혹시 '투표해 봤으면 하는 질문'이 있으시다면 남겨주시면 참고해보도록
          하겠습니다. (아마도 내년에...) 아래 링크에 남기실 수 있으며, 9월
          29일까지 열어놓도록 하겠습니다.
        </span>
        <span className="mt-1">
          <Link to="/memo">질문 링크</Link>
        </span>
        <span className="mt-2.5">
          - 마지막으로 이 모든 계기를 만들어준 김기범씨에게 무한한 감사와 사랑을
          전하며. 언제나 응원하고 사랑하고 있어. 앞으로도 잘 부탁해.
        </span>
      </div>
    </>
  );
};

export default Result;
