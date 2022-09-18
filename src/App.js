import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

import './App.css';
import Root from './routes';

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center w-full">
        <div className="h-56 pt-32 bg-violet-500 rounded-b-4xl -mb-10 w-full md:w-[436px]">
          <div className="font-bold text-2xl text-white">Gas Station</div>
        </div>
        <RecoilRoot>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-[560px]">
                <div className="animate-bounce text-2xl font-semibold text-violet-500">
                  Happy kibum Day!
                </div>
              </div>
            }
          >
            <Root />
          </Suspense>
        </RecoilRoot>
        <div className="h-48 pt-24 bg-violet-500 -mt-10 rounded-t-4xl w-full md:w-[436px] z-10">
          <div className="font-bold text-2xl text-white">Happy Kibum Day!</div>
          <div className="font-light text-sm text-white">by pearl-aqua</div>
        </div>
      </div>
    </>
  );
}

export default App;
