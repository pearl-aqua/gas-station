import { Routes, Route } from 'react-router-dom';

import Intro from '../container/Intro';
import Login from '../container/Login';
import Logout from '../container/Logout';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
};

export default Root;
