import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import utils from 'utils/'
import {Pagination} from "antd";
import queryString from "query-string";
import blog from 'api/blog'
import './index.less'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      page: 1,
      total: 0,
      user:{},
      month: ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    }
  }

  componentDidMount() {
    const {location} = this.props;
    let urlQuery = queryString.parse(location.search);
    this.getBlogsByUserId({page: parseInt(urlQuery ? urlQuery.page : 1) || 1});
  }

  getBlogsByUserId = (page) => {
    const { userId } = this.props.match.params;
    return blog.getBlogsByUserId(userId ? userId : '', {page})
        .then(res => {
          this.setState({
            blogs: res.data,
            total: res.total,
            page: res.page,
            user: res.data.length > 0 ? res.data[0].user : '',
          });
        })
  };

  onChange = (pageNumber) => {
    const {history} = this.props;
    this.getBlogsByUserId({page: pageNumber}).then(() => {
      history.push({pathname: '/', search: `?page=${pageNumber}`})
    });
  };

  render() {
    const {blogs, month, total, page, user} = this.state;
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

export default User;