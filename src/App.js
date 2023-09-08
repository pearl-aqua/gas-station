import { Suspense } from "react";
import { RecoilRoot } from "recoil";
// import { Link } from 'react-router-dom';

import "./App.css";
import Root from "./routes";

function App() {
  return (
    <>
      <div className="flex flex-col justify-between items-center text-center w-full h-auto min-h-screen">
        <div className="h-40 pt-12 bg-violet-500 md:rounded-b-4xl -mb-12 w-full md:w-[436px]">
          <div className="font-bold text-2xl text-white">Gas Station</div>
          <div className="font-light text-sm text-white">
            2022 Happy Kibum day
          </div>
        </div>
        <RecoilRoot>
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-[600px]">
                <div className="animate-bounce text-2xl font-semibold text-violet-300">
                  2022 Happy Kibum day
                </div>
              </div>
            }
          >
            <Root />
          </Suspense>
        </RecoilRoot>
        <div className="h-40 pt-20 bg-violet-500 -mt-12 md:rounded-t-4xl w-full md:w-[436px] z-10">
          <div className="font-bold text-xl text-white">
            2022 Happy Kibum day
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
