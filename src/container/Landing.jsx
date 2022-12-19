import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mt-20 md:mt-36 mb-2 bg-white rounded-2xl border border-slate-200 text-slate-400 z-50">
        <span className="text-lg">Coming Soon!!</span>
      </div>
      {/* <div className="flex flex-col w-[350px] md:w-96 px-8 py-7 mb-2 bg-white rounded-2xl border border-slate-200 text-slate-400 z-50">
        <div className="text-left text-lg text-stone-800  font-semibold mb-4">
          Q. ??? ??? ????
        </div>
        <input
          type="text"
          className="w-full h-10 border border-slate-200 p-3 text-slate-600 text-sm"
          disabled
        />
      </div> */}
      <div className="flex flex-col w-[350px] md:w-96 mb-20 md:mb-36 bg-white rounded-2xl border border-slate-200 text-slate-400 z-50">
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
