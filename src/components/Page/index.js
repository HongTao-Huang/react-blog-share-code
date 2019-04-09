import React from 'react'
import {Layout, Button} from 'antd';
import {Link} from "react-router-dom";
import { Icon } from 'antd'
import './index.less'
import { connect } from "react-redux";
import authActions from 'actions/'

const {
  Header, Footer, Content,
} = Layout;

const Page = ({children, isLogin, user, dispatch}) => {
  const handleEdit = () => {

  };
  const handleCancel = () => {
    dispatch(authActions.logout());
  };
  const NoLogin = () => <div className="no-login">
    <h1>let's share</h1>
    <p>精品博客汇聚</p>
    <div className="btns">
      <Link to="/login">
        <Button>立即登陆</Button>
      </Link>
      <Link to="/register">
        <Button>注册账号</Button>
      </Link>
    </div>
  </div>;
  const Login = () => <div className="login">
    <h1><Link to="/">let's share</Link></h1>
    <Icon type="edit" className="edit" onClick={handleEdit}/>
    <div className="user">
      <img src={user.avatar} alt={user.username} title={user.username} className="avatar"/>
      <ul>
        <li><Link to="/my">我的</Link></li>
        <li><span onClick={handleCancel}>注销</span></li>
      </ul>
    </div>
  </div>;
  return (
      <Layout className="app">
        <Header className="header">
          {
            isLogin ? <Login /> : <NoLogin />
          }
        </Header>
        <Content>
          {children}
        </Content>
        <Footer className="footer">
          <p>© github.com/HongTao-Huang 2019 wechat: hht51770</p>
        </Footer>
      </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    user: state.userReducer.user
  }
};

export default connect(mapStateToProps)(Page);