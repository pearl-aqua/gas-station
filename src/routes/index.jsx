import { Routes, Route } from 'react-router-dom';

import Intro from '../container/Intro';
import Login from '../container/Login';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default Root;
