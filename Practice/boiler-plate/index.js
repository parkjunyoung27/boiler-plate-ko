const express = require('express') //package.json 에 있는 express 모듈
const app = express()
const bodyParser = require('body-parser');
const config = require("./server/config/key");
const cookieParser = require('cookie-parser');
const { User } = require("./server/models/User");
const { auth } = require("./server/middleware/auth")

//aplication/x-www-form-urlencoded\
app.use(bodyParser.urlencoded({extended: true}))

//aplication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => { res.send('Hello World! ~ 자동재시작!') })

// client  호출 받기
app.get('/api/hello', (req,res) => 
  //받은 건 없으니 req 는 쓰지 않음
  res.send("안녕하세요 ~ ") //응답 값 보내기
)

// 회원가입 위한 Route 만들기 
app.post('/api/users/register', (req, res) =>{ 
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면

  // 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err }) // 통신이 안되면
    return res.status(200).json({ // 통신이 되면
      success: true
    })
  }) 
})

app.post('/api/users/login', (req,res) => {

  //요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log('user._id', user._id);
      console.log('req.body.password', req.body.password);
      console.log('isMatch', isMatch);

      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
      //비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth", user.token) // 쿠키에 들어감
        .status(200)
        .json({loginSuccess: true, userId: user._id})

      })
    })
  })
})

// role 1 어드민   role 2 특정 부서 어드민
// role 0 일반유저 role 0 이 아니면 관리자
app.post('/api/users/auth', auth, (req,res) => { // auth함수 
  // 여기까지 middleware로 왔다는거는 authentication이 True라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

// 로그아웃 
app.get('/api/users/logout', auth, (req, res) => {
  console.log('req.user', req.user)
  User.findOneAndUpdate({_id: req.user._id},
  {token: ""}
  ,(err, user) => {
    if(err) return res.json({ success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})

const port = 5000

// app이 5000에 listen 하면 메세지가 나옴
app.listen(port, () => { console.log(`Example app listening on port ${port}`) })