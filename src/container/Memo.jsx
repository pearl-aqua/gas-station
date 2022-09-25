import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserInfo, updateMemo } from '../firebase/title';

const Memo = () => {
  const [text, setText] = useState('');
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

  const handleOnChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length < 300) {
      setText(e.target.value);
    } else {
      alert('150자 이내로 작성해주세요');
    }
  };

  const handleClickButton = async () => {
    await updateMemo({ userId: userInfo?.id, email: userInfo?.email, text });

    alert('제출이 완료되었습니다. 감사합니다.');
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center w-[350px] md:w-96 px-8 py-10 mt-16 mb-16 bg-white rounded-2xl border border-slate-200 text-left z-50">
      <div className="flex flex-col text-sm text-slate-400 mb-4 w-full">
        <span>
          - 투표받고 싶은 질문이 있으면 작성해주세요. 선택지도 같이 작성해주시면
          됩니다.
        </span>
        <span className="mt-1"> - 300자 이내로 작성 가능합니다.</span>
      </div>
      <textarea
        className="w-full h-64 border border-slate-200 p-3 text-slate-600 text-sm"
        value={text}
        onChange={(e) => handleOnChange(e)}
      />
      <div className="flex mt-5">
        <button
          className="flex items-center justify-center w-100p px-5 py-2 mr-2 rounded-xl bg-neutral-400 text-white hover:bg-neutral-500"
          onClick={() => navigate('/')}
        >
          뒤로가기
        </button>
        <button
          className="flex items-center justify-center w-100p px-5 py-2 rounded-xl bg-violet-400 text-white hover:bg-violet-500 disabled:bg-neutral-400"
          disabled={!text}
          onClick={handleClickButton}
        >
          제출하기
        </button>
      </div>
    </div>
  );
};

export default Memo;
