import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoState } from '../recoil';

import Question from './Question';
import Conclusion from './Conclusion';

const Poll = ({ data }) => {
  const [answered, setAnswered] = useState(false);

  const userInfo = useRecoilValue(userInfoState);

  const { questionId = [] } = userInfo || {};

  const isAnsweredUser = questionId.includes(data.id);

  return (
    <div className="flex flex-col justify-center items-center w-[350px] md:w-96 py-10 mb-4 bg-white rounded-2xl border border-slate-200">
      {answered || isAnsweredUser ? (
        <Conclusion
          data={data}
          answered={answered}
          isAnsweredUser={isAnsweredUser}
        />
      ) : (
        <Question setAnswered={setAnswered} data={data} />
      )}
    </div>
  );
};

export default Poll;
