import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import blog from 'api/blog'
import util from 'utils/'
import './index.less'
import {Pagination} from 'antd';
import queryString from 'query-string'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      total: 0,
      page: 1
    }
  }

  componentDidMount() {
    const { location } = this.props;
    let urlQuery = queryString.parse(location.search);
    this.getIndexBlogs({page: parseInt(urlQuery ? urlQuery.page : 1) || 1});
  }

  getIndexBlogs = (page) => {
    return blog.getIndexBlogs(page)
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
    this.getIndexBlogs({page: pageNumber}).then(() =>{
      history.push({pathname: '/', search:`?page=${pageNumber}`})
    });
  };

  render() {
    const {blogs, total, page} = this.state;
    return (
        <div className="index">
          {
            blogs.map((blog, index) =>{
              const { user } = blog;
              return (
                  <Link className="index-blog-wrapper" to={`/detail/${blog.id}`} key={'blog' + index}>
                    {
                      user ? <div className="img-wrapper">
                        <img src={ user.avatar } alt={ user.username } title={ user.username }/>
                        <span>{ user.username }</span>
                      </div> : null
                    }
                    <h3>{blog.title}<span>{blog.createdAt.substr(0, 10)}发布 于{util.friendlyDate(blog.createdAt)}</span>
                    </h3>
                    <p>{blog.description}</p>
                  </Link>
              );
            })
          }
          <Pagination className="pagination"
                      hideOnSinglePage
                      showQuickJumper
                      total={total}
                      onChange={this.onChange}
                      current={page}/>
        </div>
    );
  }
}

export default Index;