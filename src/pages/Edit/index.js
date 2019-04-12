import React, {Component} from 'react'
import {Input, Switch, Button, message} from 'antd'
import blog from 'api/blog'
import '../Create/index.less'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: '',
      atIndex: false
    };
  }

  componentWillMount() {
    const {match} = this.props;
    blog.getDetail({blogId: match.params.blogId || 1})
        .then(res => {
          const {title, description, content, atIndex} = res.data;
          this.setState({title, description, content, atIndex,});
        })
  }

  handleInput = (type, e) => {
    this.setState({
      [type]: type === 'atIndex' ? e : e.target.value
    });
  };

  handleEdit = () => {
    const {history, match} = this.props;
    blog.updataBlog({blogId: match.params.blogId}, this.state)
        .then((res) => {
          message.success(res.msg);
          history.push(`/detail/${match.params.blogId}`);
        })
  };

  render() {
    const {title, description, content, atIndex} = this.state;
    return (
        <div className="create">
          <h2>创建文章</h2>
          <h3>文章标题</h3>
          <Input.TextArea rows="1" maxLength="30" style={{resize: 'none'}}
                          onChange={this.handleInput.bind(null, 'title')}
                          value={title}/>
          <span className="position-span">限30个字</span>
          <h3>内容简介</h3>
          <Input.TextArea rows="3" maxLength="200" style={{resize: 'none'}}
                          onChange={this.handleInput.bind(null, 'description')}
                          value={description}/>
          <span className="position-span">限200个字</span>
          <h3>文章内容</h3>
          <Input.TextArea rows="10" maxLength="10000" style={{resize: 'none'}}
                          onChange={this.handleInput.bind(null, 'content')}
                          value={content}/>
          <span className="position-span">限10000个字</span>
          <div className="is-index">
            <label>是否展示到首页</label>
            <Switch
                checkedChildren="是"
                unCheckedChildren="否"
                onChange={this.handleInput.bind(null, 'atIndex')}
                checked={atIndex}>
            </Switch>
          </div>
          <Button className="button" htmlType="button" onClick={this.handleEdit}>保存</Button>
        </div>
    )
  }
}

export default Edit;