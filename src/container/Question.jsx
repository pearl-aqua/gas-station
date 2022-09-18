import { useState } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import {
  userInfoState,
  selectedOptionsIdState,
  // loginModalOpenState,
} from '../recoil';
import { updateCount } from '../firebase/title';

const Question = ({ data, setAnswered }) => {
  const [selectedOption, setSelectOption] = useState([]);
  const userInfo = useRecoilValue(userInfoState);
  const [selectedOptionsId, setSelectedOptionsId] = useRecoilState(
    selectedOptionsIdState
  );
  // const setLoginModalOpen = useSetRecoilState(loginModalOpenState);
  const navigate = useNavigate();

  const moveLoginPage = () => {
    const confirmLogin = window.confirm(
      '중복 투표 방지를 위해 구글 로그인이 필요합니다 로그인 페이지로 이동합니다'
    );
    if (confirmLogin) {
      navigate('/login');
    } else {
      return;
    }
  };

  // const openLoginModal = () => {
  //   setLoginModalOpen(true);
  // };

  const handleSelectOption = (id) => {
    if (!userInfo?.id) {
      moveLoginPage();
      // openLoginModal();
    }

    if (data.id === '10001') {
      if (selectedOption.includes(id)) {
        const filterOption = selectedOption.filter(
          (optionId) => optionId !== id
        );
        setSelectOption(filterOption);
      } else if (selectedOption.length < 3) {
        setSelectOption([...selectedOption, id]);
      } else {
        alert('3개 이상 선택하실 수 없습니다');
      }
      return;
    }

    if (selectedOption.includes(id)) {
      const filterOption = selectedOption.filter((optionId) => optionId !== id);
      setSelectOption(filterOption);
    } else {
      setSelectOption([id]);
    }
  };

  const getButtonStyle = (id) => {
    if (selectedOption.includes(id)) {
      return 'bg-violet-200 font-medium shadow-md';
    }
    return '';
  };

  const handleClickButton = async () => {
    if (userInfo?.id) {
      await updateCount({
        questionId: data?.id,
        selectedIds: selectedOption,
        userId: userInfo.id,
      });
      setSelectedOptionsId([...selectedOptionsId, ...selectedOption]);
      setAnswered(true);
    } else {
      moveLoginPage();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-312p mb-2 text-left">
        <div className="mb-2 text-lg text-stone-800 font-semibold">
          Q. {data?.text}
        </div>
        <div className="mb-4 text-sm text-stone-600">{data?.subText}</div>
      </div>

      {data?.options?.map(({ id, text }) => (
        <button
          key={id}
          className={`flex items-center w-312p h-10 px-4 py-3 mb-2.5 text-violet-900 hover:shadow-md border border-violet-200 rounded-lg ${getButtonStyle(
            id
          )}`}
          onClick={() => handleSelectOption(id)}
        >
          {text}
        </button>
      ))}
      <button
        className="flex items-center justify-center w-160p px-5 py-3 mt-5 rounded-2xl bg-violet-400 text-white hover:bg-violet-500 disabled:bg-neutral-400"
        disabled={selectedOption.length === 0}
        onClick={handleClickButton}
      >
        투표하기
      </button>
    </div>
  );
};

export default Question;
