import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { userInfoState } from '../recoil';
import { userLogout } from '../firebase/index';

const Logout = () => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const navigate = useNavigate();

  const clickLogout = async () => {
    await userLogout();

    setUserInfo({});
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center w-[350px] md:w-96 px-8 py-10 mt-28 mb-28 bg-white rounded-2xl border border-slate-200 text-left z-50">
      <button
        className="flex items-center justify-center w-[280px] py-3 rounded-3xl text-stone-700 hover:shadow border border-slate-200"
        onClick={clickLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Logout;
