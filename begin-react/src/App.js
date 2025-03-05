import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/App.css';
import AppRoutes from './routes/Routes';
import AppNavbar from './layout/AppNavbar';

function App() {

  //강제 로그아웃 상태 디비 연결후 변경 필요
  //로컬스토리지지용
//   const [state, setState] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : {};
// });
//세션용
const [state, setState] = useState(() => {
  const savedUser = sessionStorage.getItem("user");  // sessionStorage로 변경
  return savedUser ? JSON.parse(savedUser) : null;
});

const logout = () => {
    sessionStorage.removeItem("user");
    setState(null);
    alert("로그아웃");
};

  return (
    <>
      <Router>
        <AppNavbar state={state} logout={logout} />
        <AppRoutes state={state} setState={setState}/>
      </Router>
    </>
  );
}

export default App;
