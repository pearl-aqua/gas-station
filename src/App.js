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
          <Suspense fallback={<div>Loading...</div>}>
            <Root />
          </Suspense>
        </RecoilRoot>
        <div className="h-40 pt-8 mt-6 bg-violet-500 w-full md:w-[436px]">
          <div className="font-bold text-2xl text-white">Happy Kibum Day!</div>
        </div>
      </div>
    </>
  );
}

export default App;
