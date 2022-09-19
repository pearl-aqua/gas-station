import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Link } from 'react-router-dom';

import './App.css';
import Root from './routes';

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center w-full">
        <div className="h-44 pt-12 bg-violet-500 rounded-b-4xl -mb-12 w-full md:w-[436px]">
          <div className="font-bold text-2xl text-white">Gas Station</div>
          <div className="font-light text-sm text-white">
            Baby I know where to go
          </div>
        </div>
        <RecoilRoot>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-[600px]">
                <div className="animate-bounce text-2xl font-semibold text-violet-500">
                  Happy kibum Day!
                </div>
              </div>
            }
          >
            <Root />
          </Suspense>
        </RecoilRoot>
        <div className="h-44 pt-20 bg-violet-500 -mt-12 rounded-t-4xl w-full md:w-[436px] z-10">
          <div className="font-bold text-2xl text-white">Happy Kibum Day!</div>
          <div className="font-light text-sm text-white">
            The reason I can breathe
          </div>
          <div className="mt-2 font-light text-sm text-white">
            <Link to="/logout">logout</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
