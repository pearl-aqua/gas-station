import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { userInfoState } from '../recoil';
import { popupLogin } from '../firebase/index';
import { getUserInfo } from '../firebase/title';
import google from '../img/google-logo.svg';

const Login = () => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const navigate = useNavigate();

  const clickLogin = async () => {
    const { id, email } = await popupLogin();
    const userInfoResult = await getUserInfo({ id, email });

    setUserInfo(userInfoResult);
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center w-96 px-8 py-10 mb-6 bg-white rounded-2xl border border-slate-200 text-left">
      <div className="mb-6 text-slate-600">
        중복 투표를 방지하기 위해 구글 로그인을 사용하고 있습니다.
        <div className="flex flex-col mt-2 text-sm text-slate-400">
          <span>
            - 이메일 정보는 회원 관리를 위해서만 사용되며 그 외의 용도로
            사용되지 않습니다.
          </span>
          <span>
            - 이메일 정보는 이 사이트가 유지되는 동안 보관되며 사이트 폐쇄 후
            3일 이내에 폐기 됩니다.
          </span>
        </div>
      </div>
      <button
        className="flex items-center justify-center w-[320px] py-3 rounded-3xl text-stone-700 hover:shadow border border-slate-200"
        onClick={clickLogin}
      >
        <img src={google} alt="google logo" className="w-8 h-8 mr-3" />
        구글로 로그인하기
      </button>
    </div>
  );
};

export default Login;
