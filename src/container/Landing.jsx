import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mt-36 mb-2 bg-white rounded-2xl border border-slate-200 text-slate-400 z-50">
        <span className="">Coming Soon!!</span>
      </div>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-slate-400 z-50">
        <div className="text-left text-lg text-stone-800  font-semibold mb-4">
          Q. ??? ??? ????
          {/* Q. 내가 예상하는 or 원하는 G.O.A.T. IN THE KEYLAND 의 첫곡은? */}
        </div>
        <input
          type="text"
          className="w-full h-10 border border-slate-200 p-3 text-slate-600 text-sm"
          disabled
        />
      </div>
      <div className="flex flex-col w-[350px] md:w-96 mb-36 bg-white rounded-2xl border border-slate-200 text-slate-400 z-50">
        <Link to="/2022-happy-kibum-day">
          <div className="w-full h-full px-8 py-7 ">
            2022 Happy kibum Day! 결과 보러 가기
          </div>
        </Link>
      </div>
    </>
  );
};

export default Landing;
