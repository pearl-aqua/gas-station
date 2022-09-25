import { Routes, Route } from 'react-router-dom';

// import Intro from '../container/Intro';
// import Login from '../container/Login';
// import Logout from '../container/Logout';
import Result from '../container/Result';
import Memo from '../container/Memo';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Result />} />
      {/* <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="result" element={<Result />} /> */}
      <Route path="memo" element={<Memo />} />
    </Routes>
  );
};

export default Root;
