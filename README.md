## React-Node.js

React, Node.js 스터디 기록

# Node.js
- NODE MON : 소스를 변경할때 감지해서 자동으로 서버를 재시작해주는 tool
            (코드로 돌아와 재시작 할 필요 없음)
            npm install nodemon --save-dev
            package.json에 시작 옵션 추가

- 중요 Key 값들은 config 폴더 안에 파일을 생성하여 따로 분리하기 

- npm install bcrypt --save  암호화 패키지 다운로드 
- salt를 이용해서 비밀번호를 암호화 

- Token 생성하는 라이브러리 설치
- npm install jsonwebtoken --save

- cookie parser 라이브러리 설치
- npm install cookie-parser --save 

# React
- create-react-app Command 로 바로 시작할 수 있다. 
(Babel과 Webpack 간편 설치 가능)

- npx create-react-app . (리액트 앱 설치)
- npx가 npm registry에서 create-react-app을 찾아서 다운로드 없이 실행 시켜준다.
- Disk Space를 낭비하지 않을 수 있다.
- 항상 최신 버전을 사용할 수 있다. 

# AXIOS
- React JS 부분에서 Request를 보내면 되는데
  그때 사용할게 AXIOS jQeury를 사용할 때 AJAX라고 보면된다.
- npm install axios --save

# Cors 정책 
- Cross-Origin Resource Sharing 보안을 위해서 필요
- 다른 port 끼리 데이터 교환할 때 설정 필요 
- Proxy 사용하는 방법으로 해결 
- npm install http-proxy-middleware --save 