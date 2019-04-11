import React from 'react'
import {Link} from 'react-router-dom'
import {LoginRegister} from 'components/'

const Login = ({...props}) => {
  return (
      <LoginRegister type="login" {...props}>
        <p className="notice">没有账号？
          <Link to="/register">注册新用户</Link>
        </p>
      </LoginRegister>
  );
};

export default Login;