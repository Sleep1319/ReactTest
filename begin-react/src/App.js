import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/App.css';
import AppRoutes from './routes/Routes';
import AppNavbar from './layout/AppNavbar';

function App() {

  //강제 로그아웃 상태 디비 연결후 변경 필요
  //테스트용
  const [state, setState] = useState({
    userId: null,
    nickName: "",
    userRole: ""
  });

  const logout = () => {
    setState({ userId: null, nickName: "", userRole: "" });
  };

  return (
    <>
      <Router>
        <AppNavbar state={state} logout={logout} />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
