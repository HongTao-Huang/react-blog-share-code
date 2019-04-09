import React from 'react'
import './index.less'

const NotFound = () => (
    <div style={{backgroundColor: "#494949", height: "100vh"}}>
      <div className="head404"></div>
      < div className="txtbg404">
        < div className="txtbox">
          < p> 对不起，您请求的页面不存在、或已被删除、或暂时不可用 </p>
        </div>
      </div>
    </div>
);

export default NotFound;