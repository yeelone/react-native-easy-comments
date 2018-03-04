### react-native-easy-comments 

#### 截图示例
<img src="https://wx3.sinaimg.cn/mw690/6547935dgy1fp0fr9cnmij20u01hcgs1.jpg" width=250/>      <img src="https://wx1.sinaimg.cn/mw690/6547935dgy1fp0fr96uxcj20u01hcn27.jpg" width=250/>

#### expo扫码体验：
<img src="https://wx1.sinaimg.cn/mw690/6547935dgy1fp0fx9cnauj20dj0imdgf.jpg" width=250 />

～demo文件夹里是一个完整的expo项目，可以导入expo运行查看效果与修改。

[react-native-easy-comments](https://github.com/yeelone/react-native-easy-comments) 是一个react native的评论组件，主要是为了我的主项目[yeetiku](https://github.com/yeelone/yeetiku-mobile-rn)而开发的。封装了几个简单的接口

## Getting started
`$ npm install react-native-easy-comments --save`

你需要同时安装以下依赖：

`
     "react-native-modalbox",
         "react-native-vector-icons",
         `

         * `react-native link`


         ## ToDo
         优化代码

         ## Properties

         | Name            | Type            | Description                  | Must return          | Passed params |
         |-----------------|--------------   |-------------------------------|-------------------|----------|
         | data            | array   | 需要渲染的评论数据 |
         | avatar | string  | 可以指定用户头像|
         | onLike | func    | 当用户点击like时触发 |child item | item |
         | onDown | func    | 当用户点击down时触发| child item | item |
         | onSend | func    | 当用户回复时触发| content | content |
         | onFollow | func  | 当用户点击follow时触发| item id |
         | onEndReached | func            | 当滚动到底部时触发 | bool |

