import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getUserInfo } from '../firebase/title';
import { getLetter } from '../firebase/letter';

import { getSeat } from '../util';

const FirstSong = () => {
  const [letterId, setLetterId] = useState(null);
  const [seatList, setSeatList] = useState([]);
  const [letterInfo, setLetterInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const id = window.localStorage.getItem('gas_id');

  useEffect(() => {
    const checkLogin = async () => {
      const userInfoResult = await getUserInfo({ id });
      setUserInfo(userInfoResult);
    };

    if (id) {
      checkLogin();
    }
  }, [id]);

  useEffect(() => {
    const setSeat = async () => {
      const seatList = await getSeat();
      setSeatList(seatList);
    };

    setSeat();
  }, []);

  useEffect(() => {
    const getLetterInfo = async () => {
      const letter = await getLetter(letterId);
      setLetterInfo(letter);
    };
    if (letterId) {
      getLetterInfo();
    } else {
      setLetterInfo(null);
    }
  }, [letterId]);

  const pageUrl = 'gas-station-theta.vercel.app';

  const clickShareButton = (seatNum) => {
    const sendText = `2022년의 기범이에게 ${seatNum}번 좌석에 편지를 남겼습니다.🖋

2022년 기범이에게 편지 쓰기📮->
`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        sendText
      )}&url=${encodeURI(pageUrl)}`
    );
  };

  const bg2 =
    'https://images.unsplash.com/photo-1573480597196-8d5f304bb4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

  const paperBG =
    'https://images.unsplash.com/photo-1637325258040-d2f09636ecf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80';

  return (
    <div
      style={{
        backgroundImage: `url(${bg2})`,
      }}
      className="flex flex-col justify-center items-center text-center w-full md:w-96 h-[600px] rounded-2xl text-white z-50 bg-cover bg-center "
    >
      {!letterId ? (
        <div className=" flex flex-col justify-center items-center w-full h-full p-5 rounded-2xl bg-black bg-opacity-20">
          <div className="w-52 text-2xl font-semibold mb-6">
            2022년 기범이에게 남겨둔 말들
          </div>
          <div className="flex flex-col w-[300px] p-2 mb-2 text-left">
            <span className="text-sm mb-1">
              - 작성해주신 편지들은 2022년 12월 31일에 편지들을 공개할
              예정입니다.
            </span>
            <span className="text-sm mb-1">
              - 본인이 작성한 편지 확인 및 수정을 위해 로그인이 필요합니다.
            </span>
          </div>

          {/* <div className="flex flex-col w-full md:w-[300px] p-3 bg-white text-sm text-slate-400 mb-4 rounded-xl">
            <span>to. 2022년의 기범</span>
          </div> */}

          <div className="flex flex-wrap w-[300px] h-60 p-4 bg-white rounded-xl">
            {seatList.map((el) => (
              <div
                key={el.num}
                className={`flex justify-center items-center w-[18px] h-[18px] m-0.5 rounded-sm text-white ${
                  !!el.id ? 'bg-emerald-700 cursor-pointer ' : 'bg-slate-200'
                }`}
                onClick={() => setLetterId(el.letterId)}
              ></div>
            ))}
          </div>
          <div className="mt-4 cursor-pointer">
            <Link to="/">뒤로가기</Link>
          </div>
          <div className="mt-1 cursor-pointer">
            <Link to="/">로그인하기</Link>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col w-full md:w-[320px] min-h-[300px] px-4 pt-2 pb-4 bg-white rounded-xl border border-slate-200 text-slate-400 z-50"
          style={{
            backgroundImage: `url(${paperBG})`,
          }}
        >
          <div
            className="text-lg font-medium text-stone-600 mb-2 self-end cursor-pointer"
            onClick={() => setLetterId(null)}
          >
            X
          </div>

          <div className="flex justify-between mb-6 pb-2 border-b-[1px] border-slate-300">
            <div className="text-left text-sm font-semibold text-stone-600">
              좌석번호: {letterInfo?.seat}{' '}
            </div>
            <div className="text-left text-sm font-serif font-semibold text-stone-600">
              by {letterInfo?.name}
            </div>
          </div>

          {letterId !== userInfo.letterId ? (
            <div>편지 내용은 12월 30일에 공개됩니다</div>
          ) : (
            <div className="flex flex-col justify-between h-full">
              <div>
                <div>편지 내용은 12월 30일에 공개됩니다</div>
                <div
                  className="mt-4 cursor-pointer"
                  onClick={() => clickShareButton(letterInfo?.seat)}
                >
                  📮 편지 쓰기 공유하기 📮
                </div>
              </div>

              {/* <div className="text-left text-stone-600 mb-4 whitespace-pre-wrap max-h-[580px] overflow-auto">
                {letterInfo?.text}
              </div> */}

              <div className="text-right mt-4 cursor-pointer">
                <Link to="/">수정하기</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FirstSong;
