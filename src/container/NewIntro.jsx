import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Poll from './Poll';
import { questionListState, userInfoState } from '../recoil';

import { getUserInfo } from '../firebase/title';

const Intro = () => {
  const [albumNum, setAlbumNum] = useState('30007');
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

  const albumList = [
    { id: '30007', label: '7집 리패키지' },
    { id: '30008', label: '6집' },
    { id: '30009', label: '5집 리패키지' },
    { id: '', label: 'coming ...' },
  ];

  const [filteredList] = questionList.filter((el) => el.id === albumNum);

  return (
    <>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-left text-sm text-slate-400">
        <span>- 2023 샤이니 컴백을 기념하여 만든 페이지입니다.</span>
        <span className="mt-1"> </span>
        <span className="mt-1"> - 결과 공유하기는 twitter만 가능합니다.</span>
        {userInfo?.email && (
          <span className="text-slate-500 mt-1">
            - 현재 {userInfo.email}로 로그인 되어 있습니다.
          </span>
        )}
      </div>
      <div className="flex w-[350px] md:w-96 px-2 mb-2 bg-white text-left text-sm flex-wrap">
        {albumList.map((el, index) => (
          <button
            key={el}
            className={`mr-2 mb-2 border p-2 ${
              el.id === albumNum ? 'bg-teal-100' : 'bg-white'
            } ${index === 3 ? 'bg-gray-100 text-gray-400' : 'text-teal-600'}`}
            disabled={index === 3}
            onClick={() => setAlbumNum(el.id)}
          >
            {el.label}
          </button>
        ))}
      </div>
      <Poll data={filteredList} />

      {/* {questionList.map((data) => (
        <Poll key={data.id} data={data} />
      ))} */}
    </>
  );
};

export default Intro;
