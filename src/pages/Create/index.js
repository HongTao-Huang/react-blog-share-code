import React from 'react'
import {Input, Switch, Button, message} from 'antd'
import blog from 'api/blog'
import './index.less'

const Create = ({ history }) => {
  const obj = {
    title: '',
    description: '',
    content: '',
    atIndex: false
  };
  const handleInput = (type, e) => {
    obj[type] = type === 'atIndex' ? e : e.target.value;
  };
  const handleCreate = () => {
    blog.createBlog(obj)
        .then((res) => {
          message.success(res.msg);
          history.push(`/detail/${res.data.id}`);
        })
  };
  return (
      <div className="create">
        <h2>创建文章</h2>
        <h3>文章标题</h3>
        <Input.TextArea rows="1" maxLength="30" style={{resize: 'none'}} onChange={handleInput.bind(null,'title')}/>
        <span className="position-span">限30个字</span>
        <h3>内容简介</h3>
        <Input.TextArea rows="3" maxLength="200" style={{resize: 'none'}} onChange={handleInput.bind(null,'description')}/>
        <span className="position-span">限200个字</span>
        <h3>文章内容</h3>
        <Input.TextArea rows="10" maxLength="10000" style={{resize: 'none'}} onChange={handleInput.bind(null,'content')}/>
        <span className="position-span">限10000个字</span>
        <div className="is-index">
          <label>是否展示到首页</label>
          <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              onChange={handleInput.bind(null,'atIndex')}>
          </Switch>
        </div>
        <Button className="button" htmlType="button" onClick={handleCreate}>立刻创建</Button>
      </div>
  )
};

export default Create;