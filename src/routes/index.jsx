import { Routes, Route } from 'react-router-dom';

// import Intro from '../container/Intro';
import Login from '../container/Login';
// import Logout from '../container/Logout';
// import Memo from '../container/Memo';
import Result from '../container/Result';
import Best3 from '../container/Best3';

import Best3Result from '../container/Best3Result';
import Landing from '../container/Landing';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="2022-to-kibum" element={<Best3 />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="logout" element={<Logout />} />
      <Route path="result" element={<Result />} />
      <Route path="memo" element={<Memo />} /> */}
      <Route path="2022-happy-kibum-day" element={<Result />} />
      <Route path="2022-best-kibum" element={<Best3Result />} />
    </Routes>
  );
};

export default Root;
