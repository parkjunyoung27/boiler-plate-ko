import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("") 

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    // 페이지 리프레쉬를 막음 
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        console.log(response);
          if(response.payload.loginSuccess){
            navigate('/')
            // props.history.push('/')
          }else{
            alert('Error')
          }
        })

  }

  return (
    <div style={{
      display:'flex', justifyContent: 'center', alignItems:'center',
      width:'100%', height:'100vh'
    }}>

      <form style={{display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="Password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button> 
            Login
        </button>
      </form>
     </div>
  )
}

export default LoginPage