import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';
import Auth from './hoc/auth';


function RegisterPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler =(event) => {
      event.preventDefault(); // 이게 없으면 refresh 

      if(Password !== ConfirmPassword){
        return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
      }

      let body = {
        email: Email,
        password: Password,
        name:Name
      }

      //redux가 없었으면 
      //Axios.post('/api/users/register',body)

      // 어떤식으로 loginUser를 부르는지...
      dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
              props.history.push("/login")
            }else{
              alert("Failed to sign up")
            }
        })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      ,width: '100%', height:'100vh'
    }}>
      <form style={{ display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler}/>

          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler}/>

          <label>Password</label>
          <input type="Password" value={Password} onChange={onPasswordHandler}/>

          <label>ConfirmPassword</label>
          <input type="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
          <br />
          <button type="submit">
            회원가입
          </button>
      </form>
    </div>
  )
}

export default Auth(withRouter(RegisterPage), null);