import React from 'react'
import { Layout, Button } from 'antd';
import { Link } from "react-router-dom";
import './index.less'
const {
  Header, Footer, Content,
} = Layout;

const Page = ({ children }) => {
  const YesLogin = () => <div className="wrapper">
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
  return (
      <Layout className="app">
        <Header className="header">
          <YesLogin />
        </Header>
        <Content>
          { children }
        </Content>
        <Footer className="footer">
          <p>© github.com/HongTao-Huang 2019 wechat: hht51770</p>
        </Footer>
      </Layout>
  );
};

export default Page;