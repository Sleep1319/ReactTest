const express =require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session')

const app = express();
app.use(cors({
    credential: true
}));
app.use(express.json());

app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // HTTPS가 아니므로 false
}));

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
    const sql = 
    'SELECT m.id, m.email, m.username, m.nickname, r.role_name FROM member m JOIN member_roles mr ON m.id = mr.member_id JOIN roles r ON mr.role_id = r.id WHERE m.email = ? AND m.password = ?'

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("로그인 오류", err);
            return res.status(500).json({ error: "서버 오류 발생" });
        }

        if (results.length > 0) {
            const userData = {
                userId: results[0].id,  // 'id'를 'userId'로 바꿈
                email: results[0].email,
                nickname: results[0].nickname,
                roleName: results[0].role_name // 'role_name'은 그대로 반환
            };
        
            res.status(200).json({ message: '로그인 성공!', user: userData });
        } else {
            res.status(401).json({ error: "이메일 또는 비밀번호가 틀렸습니다." });
        }
    });
});

// 서버 실행
app.listen(5000, () => {
    console.log("서버 실행 중... 포트 5000");
});