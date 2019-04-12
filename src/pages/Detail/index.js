import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import marked from 'marked'
import hljs from 'highlight/lib/vendor/highlight.js/highlight'
import 'highlight/lib/vendor/highlight.js/styles/github.css'
import blog from 'api/blog'
import utils from 'utils/'
import './index.less'

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      rawContent: '',
      user: {},
      createdAt: '',
    }
  }

  componentWillMount() {
    const {match} = this.props;
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      escaped: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        return hljs.highlightAuto(code).value;
      }
    });
    blog.getDetail({blogId: match.params.blogId || 1})
        .then(res => {
          this.setState({
            title: res.data.title,
            rawContent: res.data.content,
            user: res.data.user,
            createdAt: res.data.createdAt,
          });
        })
  }

  render() {
    const {user, rawContent, title, createdAt} = this.state;
    return (
        <div className="detail">
          {
            user ? <div className="title">
              <img src={user.avatar} alt={user.username} title={user.username}/>
              <h3>{title}</h3>
              <div className="autho">
                <span className="user">
                  <Link to={`/user/${user.id}`}>{user.username}</Link>
                </span>
                <span>{createdAt.substr(0, 10)}发布 于{utils.friendlyDate(createdAt)}</span>
              </div>
            </div> : null
          }
          <div className="markdown"
               dangerouslySetInnerHTML={{__html: marked(rawContent)}}>
          </div>
        </div>
    )
  }
}

export default Detail;