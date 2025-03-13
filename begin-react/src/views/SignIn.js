import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function SignIn() {
    const { state, setState } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    const signIn = async (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert('아이디와 비밀번호를 입력해 주세요')
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/sign-in", {
                email,
                password
                
            });
            console.log("✅ 서버 응답:", response.data);
            if (response.data.user) {
                alert(response.data.message);
                console.log("setState 실행 전, 현재 state:", state);
                setState(response.data.user);//로그인 성공후 바로 상태값 변경
                console.log("setState 실행 후, 현재 state:", state);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                console.log("✅ 세션에 저장된 값:", sessionStorage.getItem("user"));
            }
            navigate("/");//리엑트 라우터 방식 상태를 유지한다
            // window.location.href='/'
            
        } catch (error) {
            console.error("로그인 에러: ", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);  // 서버에서 보낸 에러 메시지 설정
            } else {
                alert("로그인 실패! 다시 시도해주세요.");
            }
        }
    };

    return (
    <main className="main">
        <form id="signInForm" onSubmit={signIn}>
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
            <button type="submit" className="btn btn-primary">로그인</button>
        </form>
        <Link to="/">메인으로 이동</Link> / <Link to="/sign-up">회원가입</Link>
    </main>
    );
}

export default SignIn;
