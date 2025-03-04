const express =require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Sleep1205!',
    database: 'Apiboard4'
});

db.connect((err) => {
    if(err) {
        console.log("MySql 연결 실패: " + err);
    } else {
        console.log("MySql 연결 성공" )
    }
});

//회원가입 중복검증식 추가가
app.post("/api/sign-up", (req, res) => {
    const { email, password, username, nickname } = req.body;
    const sql = "INSERT INTO member (email, password, username, nickname) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [email, password, username, nickname], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "회원가입 중 오류 발생", details: err.sqlMessage });
        } 
        res.json({ message: "회원가입 성공!" });
    });
});

//로그인
app.post("/api/sign-in", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM member where email = ? AND password = ?";

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("로그인 오류", err);
            return res.status(500).json({ error: "서버 오류 발생" });
        }

        if (results.length > 0) {
            res.json({ message: "로그인 성공!", user: results[0] });
        } else {
            res.status(401).json({ error: "이메일 또는 비밀번호가 틀렸습니다." });
        }
    });
});

// 서버 실행
app.listen(5000, () => {
    console.log("서버 실행 중... 포트 5000");
});