import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Poll from './Poll';
import {
  questionListState,
  userInfoState,
  // loginModalOpenState,
} from '../recoil';
// import { redirectResult } from '../firebase/index';
import { getUserInfo } from '../firebase/title';
// import LoginModal from './LoginModal';

const Intro = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const questionList = useRecoilValue(questionListState);
  // const loginModalOpen = useRecoilValue(loginModalOpenState);

  const id = window.localStorage.getItem('gas_id');
  // const isRedirect = window.localStorage.getItem('gas_redirect');

  useEffect(() => {
    const checkLogin = async () => {
      const userInfoResult = await getUserInfo({ id });
      setUserInfo(userInfoResult);
    };
    // const checkLoginResult = async () => {
    //   const { id, email } = redirectResult();
    //   if (id) {
    //     const userInfoResult = await getUserInfo({ id, email });
    //     setUserInfo(userInfoResult);
    //     window.localStorage.setItem('gas_redirect', false);
    //   }
    // };
    if (id) {
      checkLogin();
    }
    // else {
    //   if (isRedirect === 'true') {
    //     checkLoginResult();
    //   }
    // }
  }, [id]);

  return (
    <>
      {/* {loginModalOpen && <LoginModal />} */}
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-12 mb-2 bg-white rounded-2xl border border-slate-200 text-sm text-slate-600">
        <div className="text-lg text-slate-600 mb-2">2022.9.23</div>
        <div className="animate-ping-once text-2xl font-semibold text-violet-500 mb-4">
          김기범 탄신일을 축하합니다
        </div>
        <div className="mb-2">
          기범이도 릴프릭들도 <br />
          모두 즐거움이 가득한 하루이길 바래요!
        </div>
        <div className="text-violet-500">언제나 응원하고 사랑하고 있어!</div>
      </div>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-left text-sm text-slate-400">
        <span>- 기범이 생일을 맞아 재미삼아 만든 페이지입니다.</span>
        <span className="mt-1"> - 투표는 9/20 ~ 9/27까지 진행됩니다.</span>
        <span className="mt-1"> - 결과 공유하기는 twitter만 가능합니다.</span>
        {userInfo?.email && (
          <span className="text-slate-500 mt-1">
            - 현재 {userInfo.email}로 로그인 되어 있습니다.
          </span>
        )}
      </div>
      {questionList.map((data) => (
        <Poll key={data.id} data={data} />
      ))}
    </>
  );
};

export default Intro;
