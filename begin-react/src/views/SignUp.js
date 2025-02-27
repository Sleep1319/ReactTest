import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[username, setUsername] = useState("");
    const[nickname, setNickname] = useState("");

    const signUp = () => {
        alert(`회원가입 시도 조건 체크 미구현`);
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setUsername("");
        setNickname("");
    };

    return (
        <main className="main">
            <div id="signUpForm">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">이메일</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">비밀번호</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername" className="form-label">이름</label>
                    <input type="text" className="form-control" id="exampleInputUsername" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputNickname" className="form-label">닉네임</label>
                    <input type="text" className="form-control" id="exampleInputNickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={signUp}>가입</button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>다시</button>
            </div>
            <Link to="/">메인으로 이동</Link> / <Link to="/sign-in">로그인</Link>
        </main>
    );
}

export default SignUp;