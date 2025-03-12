import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Main() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getBoard = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/posts");
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
    
        getBoard();
    }, []);

    const selectBoard = (id) => {
        navigate(`/board/${id}`);
    };

    return (
        <main className="main">
            {posts.length > 0 ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>게시글 번호</td>
                        <td>제목</td>
                        <td>작성자</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                            <tr key={post.id} onClick={() => selectBoard(post.id)} style={{ cursor: "pointer" }}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.nickname}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <div>
                게시글이 없습니다다
            </div>
            )}
            <Link to="/write-board">
            <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off"/>
            <label class="btn btn-primary" for="btn-check">글쓰기</label>
            </Link>
        </main>
    );
}

export default Main;