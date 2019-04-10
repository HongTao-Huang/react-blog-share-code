import React from 'react'
import {Link} from 'react-router-dom'
import {LoginRegister} from 'components/'

const Register = ({history}) => {
  return (
      <LoginRegister type="register" history={history}>
        <p className="notice">已有账号？
          <Link to="/login">直接登录</Link>
        </p>
      </LoginRegister>
  )
};

export default Register;