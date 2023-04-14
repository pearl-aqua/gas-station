import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Poll from './Poll';
import { questionListState, userInfoState } from '../recoil';

import { getUserInfo } from '../firebase/title';

const Taemin = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const questionList = useRecoilValue(questionListState);

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

  const [filteredList] = questionList.filter((el) => el.id === '40001');

  return (
    <>
      <div className="flex flex-col w-[350px] md:w-96 px-7 py-5 mb-2 bg-white rounded-2xl border border-slate-200 text-left">
        <span className="text-lg text-teal-500 font-semibold">
          2023 TAEMIN IS BACK
        </span>
      </div>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-left text-sm text-slate-400">
        <span>- 2023 태민 컴백을 기념하여 만든 페이지입니다.</span>
        <span className="mt-1"> </span>
        <span className="mt-1"> - 결과 공유하기는 twitter만 가능합니다.</span>
        {userInfo?.email && (
          <span className="text-slate-500 mt-1">
            - 현재 {userInfo.email}로 로그인 되어 있습니다.
          </span>
        )}
      </div>
      <div className="flex w-[350px] md:w-96 bg-white text-left text-sm flex-wrap">
        <Poll data={filteredList} />
      </div>
    </>
  );
};

export default Taemin;
