import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        alert(`로그인 시도: 이메일 - ${email}, 비밀번호 - ${password}`);
    };

    return (
    <main className="main">
        <div id="signInForm">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby="passwordHelp" />
                <div id="passwordHelp" className="form-text">
                알파벳, 숫자, 특수 기호를 쓰십시오
                {/* 검증 미구현 */}
                </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={signIn}>로그인</button>
        </div>
        <Link to="/">메인으로 이동</Link> / <Link to="/sign-up">회원가입</Link>
    </main>
    );
}

export default SignIn;
