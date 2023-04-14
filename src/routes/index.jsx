import { Routes, Route } from 'react-router-dom';

import Login from '../container/Login';
// import Logout from '../container/Logout';
// import Memo from '../container/Memo';
import Result from '../container/Result';
import Shinee2023 from '../container/NewIntro';

import Landing from '../container/Landing';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="logout" element={<Logout />} />
      <Route path="memo" element={<Memo />} /> */}
      <Route path="2022-happy-kibum-day" element={<Result />} />
      {/* <Route path="2023-shinee-day" element={<Shinee2023 />} /> */}
    </Routes>
  );
};

export default Root;
