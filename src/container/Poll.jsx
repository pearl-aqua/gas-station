import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoState } from '../recoil';

import Question from './Question';
import Conclusion from './Conclusion';

const Poll = ({ data }) => {
  const [answered, setAnswered] = useState(false);

  const userInfo = useRecoilValue(userInfoState);

  const { questionId = [], optionsId = [] } = userInfo || {};

  useEffect(() => {
    if (data.id && questionId.length > 0) {
      setAnswered(questionId.includes(data.id));
    }
  }, [data?.id, questionId]);

  const isAnsweredUser = questionId?.includes(data?.id);

  return (
    <div className="flex flex-col justify-center items-center w-[350px] md:w-96 py-10 mb-4 bg-white rounded-2xl border border-slate-200 z-50">
      {answered ? (
        <Conclusion
          data={data}
          answered={answered}
          isAnsweredUser={isAnsweredUser}
          optionsId={optionsId}
        />
      ) : (
        <Question setAnswered={setAnswered} data={data} />
      )}
    </div>
  );
};

export default Poll;
