import { Routes, Route } from 'react-router-dom';

import Login from '../container/Login';
// import Logout from '../container/Logout';
// import Memo from '../container/Memo';
import Result from '../container/Result';

import Landing from '../container/Landing';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="logout" element={<Logout />} />
      <Route path="memo" element={<Memo />} /> */}
      <Route path="2022-happy-kibum-day" element={<Result />} />
    </Routes>
  );
};

export default Root;
