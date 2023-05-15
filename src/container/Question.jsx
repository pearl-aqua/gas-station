import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { userInfoState, selectedOptionsIdState } from '../recoil';
import { updateCount } from '../firebase/title';

const Question = ({ data, setAnswered, answerNum }) => {
  const [selectedOption, setSelectOption] = useState([]);
  const userInfo = useRecoilValue(userInfoState);
  const [selectedOptionsId, setSelectedOptionsId] = useRecoilState(
    selectedOptionsIdState
  );

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

  const handleSelectOption = (id) => {
    if (!userInfo?.id) {
      moveLoginPage();
    }

    if (selectedOption.includes(id)) {
      const filterOption = selectedOption.filter((optionId) => optionId !== id);
      setSelectOption(filterOption);
    } else if (selectedOption.length < answerNum) {
      setSelectOption([...selectedOption, id]);
    } else {
      alert(`${answerNum}개 이상 선택하실 수 없습니다`);
    }

    // if (selectedOption.includes(id)) {
    //   const filterOption = selectedOption.filter((optionId) => optionId !== id);
    //   setSelectOption(filterOption);
    // } else {
    //   setSelectOption([id]);
    // }
  };

  const getButtonStyle = (id) => {
    if (selectedOption.includes(id)) {
      return 'bg-teal-100 font-medium shadow';
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
          className={`flex items-center w-312p h-10 px-4 py-3 mb-2 text-teal-900 hover:shadow-sm border border-teal-100 rounded-lg ${getButtonStyle(
            id
          )}`}
          onClick={() => handleSelectOption(id)}
        >
          {text}
        </button>
      ))}
      <button
        className="flex items-center justify-center w-160p px-5 py-3 mt-5 rounded-2xl bg-teal-300 text-white hover:bg-teal-500 disabled:bg-neutral-400"
        disabled={selectedOption.length === 0}
        onClick={handleClickButton}
      >
        투표하기
      </button>
    </div>
  );
};

export default Question;
