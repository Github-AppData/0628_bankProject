const setup = require("./db_setup");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const session = require("express-session");
app.use(session({
    secret: "암호화키",
    resave: false,
    saveUninitialized: false,
}));

//


const cookieParser=require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));

// "/routes/bank_post"에 / 로 들어오는 모든 요청을 받아들인다. 그런 뜻이다.
app.use("/", require("./routes/bank_post"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/m_page"));

// ejs 
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
    res.render("test.ejs");
});

app.get("/qrcode", async (req, res) => {
    res.sendFile(__dirname+ "/test-qrcode.html");
});


app.listen(8080, async() => {
    await setup(); // 디비 셋업 
    console.log("포트 8080으로 서버 대기중 ... ");
  });
