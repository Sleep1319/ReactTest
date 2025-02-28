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

//로그인

//회원가입
app.post("/api/sign-up", (req, res) => {
    const { email, password, username, nickname } = req.body;
    const sql = "INSERT INTO member (null, email, password, username, nickname) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [email, password, username, nickname], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: "회원가입 성공!" });
        }
    });
});

// 서버 실행
app.listen(5000, () => {
    console.log("서버 실행 중... 포트 5000");
});