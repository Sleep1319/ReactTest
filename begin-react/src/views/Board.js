import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

//"" 값 설정이유 언디파인 대용 콘솔창 에러로그들..
function Board() {
    const { state } = useUser();
    const { id } = useParams();
    const [post, setPost] = useState({ title: "", nickname: "", content: "" });
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [editedContent, setEditedContent] = useState(""); 
    console.log("유저 아이디 값",state.userId)

    useEffect(() => {
        const getBoardById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/post/${id}`);
                setPost(response.data || { title: "", nickname: "", content: "" });
                console.log("서버 응답:", response.data);
            } catch (error) {
                console.error("불러오기 실패", error); 
            }
        };
    
        if (id) getBoardById();
    }, [id]);

    const updateBoard = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/update-board/${id}`, { content: editedContent });
            setPost((prevPost) => ({ ...prevPost, content: editedContent }));
            setIsReadOnly(true);
            alert(response.data.message);
        } catch (error) {
            console.error("수정 실패", error)
        }
    };

    useEffect(() => {
        console.log("현재 post 상태:", post);
    }, [post]);


    const handleCancel = () => {
        setIsReadOnly(true);
        setEditedContent(post.content);
    };
    
    return (
        <main className="main">
            <form className="boardForm">
                <span className="d-flex gap-3">
                    <div className="mb-3" style={{ width: "45%" }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">제목</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" value={post.title || ""} readOnly/>
                    </div>
                    <div className="mb-3" style={{ width: "45%" }}>
                        <label htmlFor="exampleFormControlInput2" className="form-label">작성자</label>
                        <input type="text" className="form-control" id="exampleFormControlInput2" value={post.nickname || ""} readOnly/>
                    </div>
                </span>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
                    <textarea className="form-control" id="content" rows="20" value={post.content || ""} readOnly></textarea>
                </div>
            </form>
            {post && post.member_id && Number(state.userId) === Number(post.member_id) && (
                <>
                    {isReadOnly ? (
                        <button className="btn btn-warning" onClick={() => setIsReadOnly(false)}>수정하기</button>
                    ) : (
                        <>
                            <button className="btn btn-success" onClick={updateBoard}>확인</button>
                            <button className="btn btn-danger" onClick={handleCancel}>취소</button>
                        </>
                    )}
                </>
            )}
            <Link to="/">메인으로 돌아가기</Link>
        </main>
    );
}
export default Board;