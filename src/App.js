import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
// import { Link } from 'react-router-dom';

import './App.css';
import Root from './routes';

function App() {
  return (
    <>
      <div className="flex flex-col justify-between items-center text-center w-full h-auto min-h-screen">
        <div className="h-40 pt-12 bg-emerald-800 md:rounded-b-4xl -mb-12 w-full md:w-[436px]">
          <div className="font-bold text-2xl text-white">Gas Station</div>
          <div className="font-light text-sm text-white">
            Baby I know where to go
          </div>
        </div>
        <RecoilRoot>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-[600px]">
                <div className="animate-bounce text-2xl font-semibold text-emerald-500">
                  Greatest Of All Time
                </div>
              </div>
            }
          >
            <Root />
          </Suspense>
        </RecoilRoot>
        <div className="h-40 pt-20 bg-emerald-800 -mt-12 md:rounded-t-4xl w-full md:w-[436px] z-10">
          <div className="font-bold text-xl text-white">
            Greatest Of All Time
          </div>
          {/* <div className="mt-2 font-light text-sm text-white">
            <Link to="/logout">logout</Link>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
