import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../firebase/title';
import { postLetter, removeTempSeat, setTempSeat } from '../firebase/letter';

import { getSeat } from '../util';

// FACE
// 이 앨범은 나와 우리의 능력을 증명하는 것이고 이것은 계속될 것이다. 나의 모든 행위는 나의 진실이며, 당신들을 위한 것이다
// CHASE
// 다시 한 번 나 자신을 돌아보고, 앞으로도 열심히 하면서 겸손과 감사의 마음으로 나의 신념을 항상 지킬 것이다. 우리가 틀리지 않았음을 보여줄 것이다.

// 이것은 불가능에 도전하거나 한계로 몰아 붙이는 것이 아니다. 이 앨범은 나와 우리의 능력을 증명하는 것이고 이것은 계속될 것이다. 나의 모든 행위는 나의 진실이며, 당신들을 위한 것이다.

// THIS IS NOT DEFEATING AN IMPOSSIBLE FOR NOR PUSHING LIMITS. THIS ALBUM ASSURES MY CAPABILITY WITHIN US AND THIS WILL CONTINUE. ALL MY ACTIONS ARE THE TRUTH OF ME AND ALL FOR YOU.

const FirstSong = () => {
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [seatList, setSeatList] = useState([]);
  const [selectedNum, setSelectedNum] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const id = window.localStorage.getItem('gas_id');

  // const id = 'kXc4iHYDHmTULJxgXmCiXzNO3Lh2';

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

  const handleOnChangeName = (e, id) => {
    const inputText = e.target.value;
    if (inputText.length < 10) {
      setName(e.target.value);
    } else {
      alert('10자 이내로 작성해주세요');
    }
  };

  const handleOnChange = (e, id) => {
    const inputText = e.target.value;
    if (inputText.length < 500) {
      setText(e.target.value);
    } else {
      alert('200자 이내로 작성해주세요');
    }
  };

  const handleClickButton = async () => {
    const letterData = {
      seat: selectedNum,
      name,
      text,
      isPublic: true,
    };

    const seatData = {
      num: selectedNum,
      userId: id,
    };

    await postLetter({
      letterData,
      seatNum: selectedNum,
      userId: id,
      seatData,
    });

    alert('제출이 완료되었습니다. 감사합니다.');
    navigate('/2022-best-kibum');
  };

  const getSeatColor = (seat, index) => {
    if (!!seat.id) {
      return 'bg-slate-200';
    }
    if (selectedNum === index) {
      return 'bg-emerald-800';
    }
    return 'bg-red-600';
  };

  const onClickSeat = (seat, index) => {
    if (!!seat.id) {
      alert('이미 선택된 좌석입니다');
      return;
    }
    setSelectedNum(index);
  };

  const moveLoginPage = () => {
    const confirmLogin = window.confirm(
      '편지 등록 및 수정을 위해 구글 로그인이 필요합니다 로그인 페이지로 이동합니다'
    );
    if (confirmLogin) {
      navigate('/login');
    } else {
      return;
    }
  };

  const onClickStepOne = () => {
    if (!id) {
      moveLoginPage();
      return;
    }
    setStep(2);
  };

  const onClickStepTwo = async () => {
    if (!selectedNum) {
      alert('좌석을 선택해주세요');
      return;
    }
    const res = await setTempSeat(selectedNum);

    if (res === 'success') {
      setStep(3);
      return;
    }
    if (res === 'already') {
      alert('이미 선택된 좌석 입니다');
      return;
    }
  };

  const onClickBackTwo = async () => {
    await removeTempSeat(selectedNum);
    setStep(2);
  };

  const bg1 =
    'https://images.unsplash.com/photo-1577218545653-dc9aa94b3568?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

  const paperBG =
    'https://images.unsplash.com/photo-1637325258040-d2f09636ecf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80';

  const paperBG1 =
    'https://images.unsplash.com/photo-1615800098779-1be32e60cca3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1010&q=80';
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${step !== 3 ? bg1 : paperBG1})`,
        }}
        className={`flex justify-center items-center text-center w-full md:w-96 rounded-2xl text-white z-50 bg-cover bg-center ${
          step === 3 ? 'h-[700px]' : 'h-[600px]'
        }`}
      >
        {step === 0 && (
          <div className="flex flex-col justify-between items-center pt-20 pb-10 w-full h-full bg-black bg-opacity-30 rounded-2xl">
            <div className="flex-col">
              <div className="text-2xl font-semibold mb-2">2022년</div>
              <div className="w-64 text-2xl font-semibold">
                기범이에게 하고 싶은 말을 남겨주세요!
              </div>
            </div>

            <div className="flex flex-col">
              {(!userInfo || !userInfo?.letterId) && (
                <button
                  className="flex items-center justify-center w-full h-14 text-lg font-semibold rounded-xl border text-white hover:text-emerald-800 hover:bg-white hover:bg-opacity-60"
                  onClick={() => setStep(1)}
                >
                  편지 쓰러 가기!
                </button>
              )}

              <Link to="/2022-best-kibum">
                <div className="flex items-center justify-center w-full h-14 mt-1 text-lg font-semibold rounded-xl border text-white hover:text-emerald-800 hover:bg-white hover:bg-opacity-60">
                  편지들 보러 가기
                </div>
              </Link>

              <Link to="/2022-happy-kibum-day">
                <div className="mt-4">2022 Happy kibum Day! 결과 보러 가기</div>
              </Link>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center bg-white bg-opacity-80 text-emerald-800 p-8 rounded-xl">
            <div className="flex flex-col text-left text-sm mt-4">
              <span className="mb-1">
                - 2022년 기범이에게 편지를 남기고 싶어서 만든 페이지입니다.
              </span>
              <span className="mb-1">
                - 짐작하셨듯이 요즘 많이 보이는 트리에서 아이디어를 얻는
                작업입니다
              </span>
              <span className="mb-1">
                - 작성해주신 편지들은 2022년 12월 31일에 편지들을 공개할
                예정입니다.
              </span>
              <span className="mb-1">
                - 아마도 모니터링을 하고 있을테니 기범이에도 이 편지들이
                보여지지 않을까 생각하며 만들었으며
              </span>
              <span className="mb-1">
                - 가닿지 않을 경우도 생각해 보았으나 릴프릭들끼리 2022년
                기범이에 대한 소회를 나누는 것도 의미가 있을 거라고
                생각했습니다.
              </span>
              <span className="mb-1">
                - 편지 저장 및 수정을 위해 로그인이 필요합니다.
              </span>
              <span className="mb-6">- 잘 부탁드립니다.</span>
            </div>
            <button
              className="flex items-center justify-center w-200p px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-800 text-center"
              onClick={onClickStepOne}
            >
              편지 쓰러 가기
            </button>

            <div
              className="mt-2 cursor-pointer text-center"
              onClick={() => setStep(0)}
            >
              뒤로 가기
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col w-full justify-center items-center h-full bg-black bg-opacity-10 rounded-2xl">
            <div className="text-left text-xl font-semibold mb-6">
              편지를 남길 자리를 선택해 주세요!
            </div>
            <div className="text-left text-lg mb-4">
              선택 좌석 : {selectedNum}
            </div>
            <div className="flex flex-wrap w-[300px] h-60 p-4 bg-white rounded">
              {seatList.map((el, index) => (
                <div
                  key={`${index}-${el.num}`}
                  className={`flex flex-col w-[18px] h-[18px] m-0.5 rounded-sm ${getSeatColor(
                    el,
                    index
                  )}`}
                  onClick={() => onClickSeat(el, index)}
                ></div>
              ))}
            </div>

            <div className="flex flex-col mt-12">
              <button
                disabled={!selectedNum}
                className="flex items-center justify-center w-64 px-5 py-3 text-lg font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-800 disabled:bg-neutral-400"
                onClick={onClickStepTwo}
              >
                선택 완료
              </button>
              <div className="mt-2 cursor-pointer" onClick={() => setStep(1)}>
                뒤로 가기
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col w-full h-full px-6 py-7 bg-white bg-opacity-10 rounded-2xl text-black overflow-auto">
            <div className="text-right mb-2">좌석 번호 : {selectedNum}</div>

            <div className="text-left">이름을 입력해주세요</div>
            <div className="border-b-2 border-slate-300 mb-6">
              <input
                id={1}
                type="text"
                className="w-full h-10 bg-transparent border-none py-2 outline-none"
                value={name}
                onChange={(e) => handleOnChangeName(e, id)}
              />
            </div>
            <div className="text-left mb-4">
              2022년 기범이에게 하고 싶은 말을 남겨주세요! (500자까지
              가능합니다)
            </div>
            <textarea
              id={1}
              type="text"
              className="w-full h-80 p-3 mb-2 text-slate-600 whitespace-pre-wrap outline-none"
              value={text}
              onChange={(e) => handleOnChange(e, id)}
            />
            <div className="mb-2 text-sm self-end text-slate-400">
              {text.length} / 500
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-5">
              <div className="mb-2 cursor-pointer" onClick={() => setStep(4)}>
                미리 보기
              </div>
              <button
                className="flex items-center justify-center w-200p px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-800 disabled:bg-neutral-400"
                disabled={!text}
                onClick={handleClickButton}
              >
                제출하기
              </button>
              <div className="mt-2 cursor-pointer" onClick={onClickBackTwo}>
                뒤로 가기
              </div>
            </div>
          </div>
        )}
        {step === 4 && (
          <div
            className="flex flex-col p-4 w-full md:w-[320px] min-h-[360px] rounded-xl  text-slate-400 z-50"
            style={{
              backgroundImage: `url(${paperBG})`,
            }}
          >
            <div
              className="text-lg font-medium text-stone-600 mb-2 self-end cursor-pointer"
              onClick={() => setStep(3)}
            >
              X
            </div>

            <div className="flex justify-between  mb-6 pb-1 border-b-[1px] border-slate-300">
              <div className="text-left font-medium text-emerald-700">
                좌석번호: {selectedNum}
              </div>
              <div className="text-left font-medium text-emerald-700">
                by {name}
              </div>
            </div>
            <div className="text-left text-stone-600 mb-4 whitespace-pre-wrap max-h-[580px] overflow-auto">
              {text}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FirstSong;
