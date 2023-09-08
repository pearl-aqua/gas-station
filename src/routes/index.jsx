import { Routes, Route } from "react-router-dom";

import Result from "../container/Result";
// import Login from "../container/Login";
// import Logout from '../container/Logout';
// import Memo from '../container/Memo';
// import Shinee2023 from "../container/NewIntro";
// import Landing from "../container/Landing";
// import Taemin2023 from "../container/Taemin2023";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Result />} />
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="logout" element={<Logout />} />
      <Route path="memo" element={<Memo />} /> */}
      {/* <Route path="2022-happy-kibum-day" element={<Result />} /> */}
      {/* <Route path="2023-shinee-day" element={<Shinee2023 />} /> */}
      {/* <Route path="2023-taemin-back" element={<Taemin2023 />} /> */}
    </Routes>
  );
};

export default Root;
