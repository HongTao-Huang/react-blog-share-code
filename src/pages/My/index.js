import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import utils from 'utils/'
import {Pagination, Modal, message} from "antd";
import queryString from "query-string";
import blog from 'api/blog'
import './index.less'

const confirm = Modal.confirm;

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      page: 1,
      total: 0,
      month: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    }
  }

  componentDidMount() {
    const {location} = this.props;
    let urlQuery = queryString.parse(location.search);
    this.getBlogsByUserId({page: parseInt(urlQuery ? urlQuery.page : 1) || 1});
  }

  getBlogsByUserId = (page) => {
    const {user} = this.props;
    blog.getBlogsByUserId(user ? user.id : '', {page})
        .then(res => {
          this.setState({
            blogs: res.data,
            total: res.total,
            page: res.page
          });
        })
  };

  onChange = (pageNumber) => {
    const {history} = this.props;
    this.getBlogsByUserId({page: pageNumber}).then(() => {
      history.push({pathname: '/', search: `?page=${pageNumber}`})
    });
  };

  handleDelete = (blogId) => {
    const that = this;
    confirm({
      title: '提示',
      content: '此操作将永久删除该文件, 是否继续?',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            blog.deleteBlog({blogId}).then(() => {
              message.success('删除成功!');
              let blogs = [];
              blogs = that.state.blogs.filter((blog) => blog.id !== blogId);
              that.setState({blogs,});
              resolve();
            });
          }, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
      },
    });
  };

  render() {
    const {user} = this.props;
    const {blogs, month, total, page} = this.state;
    return (
        <div className="my">
          {
            user ? <div className="title">
              <img src={user.avatar} alt={user.username} title={user.username}/>
              <h3>{user.username}</h3>
            </div> : null
          }
          <hr/>
          {
            blogs.map((blog, index) => <div key={`my${index}`}>
              <Link className="indexBlog-wrapper" to={`/detail/${blog.id}`}>
                <div className="day">
                  <span className="day">{blog.createdAt.substr(8, 2)}</span>
                </div>
                <div className="year-month">
                  <span className="month">{month[parseInt(blog.createdAt.substr(5, 2))]}月</span>
                  <span className="year">{blog.createdAt.substr(0, 4)}</span>
                </div>
                <h3>{blog.title}<span>{blog.createdAt.substr(0, 10)}发布 于{utils.friendlyDate(blog.createdAt)}</span></h3>
                <p>{blog.description}</p>
              </Link>
              <div className="actions">
                <Link to={`/edit/${blog.id}`}>编辑</Link>
                <span onClick={this.handleDelete.bind(this,blog.id)}>删除</span>
              </div>
            </div>)
          }
          <Pagination className="pagination"
                      hideOnSinglePage
                      showQuickJumper
                      total={total}
                      onChange={this.onChange}
                      current={page}/>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.userReducer.isLogin,
    user: state.userReducer.user
  }
};

export default connect(mapStateToProps)(My);