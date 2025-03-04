import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/App.css';
import AppRoutes from './routes/Routes';
import AppNavbar from './layout/AppNavbar';

function App() {

  //강제 로그아웃 상태 디비 연결후 변경 필요
  //테스트용
  const [state, setState] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
});

const logout = () => {
    localStorage.removeItem("user");
    setState({});
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
