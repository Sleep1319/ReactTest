import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(state) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

        useEffect(() => {
            if (state?.userId) {
                navigate("/");
            }
        }, [state, navigate]);

    const signUp = async (e) => {
        e.preventDefault(); // 폼 기본 제출 동작 막기

        if (!email || !password || !username || !nickname) {
            alert("모든 필드를 입력하세요.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/sign-up", {
                email,
                password,
                username,
                nickname
            });

            alert(response.data.message);
            window.location.href="/sign-in";
        } catch (error) {
            console.error("회원가입 오류: ", error);
            if (error.response && error.response.data.error) {
                alert(error.response.data.error); 
            } else {
                alert("회원가입입 실패! 다시 시도해주세요.");
            }
            resetForm();
        }
    };




    const resetForm = () => {
        setEmail("");
        setPassword("");
        setUsername("");
        setNickname("");
    };

    return (
        <main className="main">
            <form id="signUpForm" onSubmit={signUp}>
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
                <button type="submit" className="btn btn-primary" >가입</button>
                <button type="reset" className="btn btn-secondary">다시</button>
            </form>
            <Link to="/">메인으로 이동</Link> / <Link to="/sign-in">로그인</Link>
        </main>
    );
}

export default SignUp;