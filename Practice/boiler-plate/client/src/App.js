import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
  // ,Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes> 
        <Route exact path="/" component={Auth(LandingPage, null )  } />
          <Route exact path="/login" component={Auth(LoginPage, false) } />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
