import React, {Component} from 'react'
import {Input, Button} from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import "./index.less"
import auth from 'api/auth'

class Login extends Component {
  state = {
    username: '',
    password: '',
    userErr: false,
    passwordErr: false
  };

  handleUserName = e => {
    this.clearMessage('userErr');
    this.setState({username: e.target.value});
  };

  handlePassword = e => {
    this.clearMessage('passwordErr');
    this.setState({password: e.target.value});
  };

  handleSubmit = () => {
    const { username, password } = this.state;
    this.setState({
      userErr: username === '',
      passwordErr: password === ''
    });
    if(username === '' || password === '') {
      return
    }

    auth.login({username: username, password: password})
        .then(() => {

        })
  };

  clearMessage = (type) => {
    if (!this.state[type]) return;
    this.setState({
      [type]: false
    });
  };

  render() {
    return (
        <div className="login">
          <div className="wrapper">
            <h4>用户名</h4>
            <Input placeholder="用户名" onChange={this.handleUserName} allowClear/>
            <div className="p">
              {
                this.state.userErr
                    ? <p className="error"> 用户名不能为空 </p>
                    : null
              }
            </div>
            <h4>密码</h4>
            <Input.Password placeholder="密码" onChange={this.handlePassword}/>
            <div className="p">
              {
                this.state.passwordErr
                    ? <p className="error"> 密码不能为空 </p>
                    : null
              }
            </div>
            <Button onClick={this.handleSubmit}>立即登录</Button>
            <p className="notice">没有账号？<Link to="/register">注册新用户</Link></p>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    user: state.userReducer.user
  }
};

export default connect(mapStateToProps)(Login);