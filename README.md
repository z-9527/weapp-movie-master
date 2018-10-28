# 基于原生小程序精仿的猫眼电影

最近基于原生小程序精仿猫眼电影，数据API都是在网上抓取的
由于没有获得猫眼城市ID的API，所有数据接口没有添加城市ID参数，仅靠IP定位，所以数据可能不准确


`github地址`：[基于原生小程序精仿的猫眼电影](https://github.com/zhangZhiHao1996/weapp-movie-master)
`扫描体验`：（正在制作）
<br/>

### 项目截图

<table>
	 <tr>
        <td><img src='https://img-blog.csdnimg.cn/201810281359590.png'></img></td>
        <td><img src='https://img-blog.csdnimg.cn/201810281400081.png'></img></td>
        <td><img src='https://img-blog.csdnimg.cn/2018102814001653.png'></img></td>
         <td><img src='https://img-blog.csdnimg.cn/20181028140035728.png'></img></td>
    </tr>
    <tr>
        <td><img src='https://img-blog.csdnimg.cn/20181028130912721.gif'></img></td>
        <td><img src='https://img-blog.csdnimg.cn/20181028130943704.gif'></img></td>
        <td><img src='https://img-blog.csdnimg.cn/20181028131030913.gif'></img></td>
         <td><img src='https://img-blog.csdnimg.cn/201810281311057.gif'></img></td>
    </tr>
</table>

`注：点击图片可放大;gif图可能有些失帧`
<br/>

### 实现的功能

- [x] 页面滚动到底部加载更多
- [x] 电影详情页面、影院详情页面
- [x] 电影购票功能、小吃购买功能
- [x] 显示历史订单，可删除、可添加
- [x] 电影显示所有评论功能
- [x] 影院地图
- [x] 电影预告播放页面
- [x] 城市选择页面
- [x] 客服功能
- [x] 页面分享功能
- [x] 用户拒绝地理位置授权情况处理
	...
<br/>

### 项目目录结构

总共`18`个page、`3`个component、`6`个template

```
├── assets                               
│   ├── font                                 # 项目的icon文件
│   ├── images                               # 图片资源
│   └── libs                    	     # 三方支持库
├── components
│   ├── filter-nav                           # 筛选条件组件
│   ├── select-movie                         # 选择电影组件
│   └── select-time                          # 选择时间组件
├── pages
│   ├── subPages                             # 非tab页面
│   │   ├── about-page                       # “关于”页面
│   │   ├── buy-snack                        # “购票确认订单”页面
│   │   ├── buy-ticket                       # “小吃确认订单”页面
│   │   ├── cinema-detail                    # “影院详情”页面
│   │   ├── cinema-map                       # “影院地图”页面
│   │   ├── city-select                      # “选择城市”页面
│   │   ├── comment-page                     # “评论”页面
│   │   ├── movie-detail                     # “电影详情”页面
│   │   ├── movie-order                      # “电影订单”页面
│   │   ├── movie-order-detail               # “电影订单详情”页面
│   │   ├── search-page                      # “搜索”页面
│   │   ├── select-cinema                    # “选择影院”页面
│   │   ├── snack-order                      # “小吃订单”页面
│   │   ├── snack-page                       # “小吃详情”页面
│   │   └── video-page                       # “电影预告”页面
│   └── tabBar                               # tab页面
│       ├── cinema                           # “影院”页面
│       ├── movie                            # “电影”页面 
│       └── user                             # “我的”页面
├── templates
│   ├── cinemaMap                            # 影院地图section样式模板
│   ├── cinemaSection                        # 影院section样式模板
│   ├── commentSection                       # 评论section样式模板
│   ├── loadingMore                          # 加载更多功能样式模板
│   ├── movieSection                         # 电影section样式模板
│   └── nothing                              # 查询空值样式模板
├── utils                                    
│   └── util.js                              # 工具函数
├── app.js                                   # 小程序逻辑
├── app.json                                 # 小程序公共配置
├── app.wsxx                                 # 小程序公共样式表
└── project.config.json                      # 项目配置文件
```
<br/>

### 问题
正在整理...
<br/>


### 运行本项目
1. 克隆项目到本地后用微信开发者工具打开
2. 关闭安全域名的校验（设置 --> 项目设置 --> 不校验合法域名）
<br/>


### 其他个人项目

- [基于vue+vue-router+jsonp+vuex仿制的移动端`QQ音乐`](https://github.com/zhangZhiHao1996/vue-music-master)
- [基于React-Antd的`后台模板Demo`](https://github.com/zhangZhiHao1996/react-admin-master)
- [基于原生小程序精仿的`猫眼电影小程序`](https://github.com/zhangZhiHao1996/weapp-movie-master)

<br/>

<hr/>

`觉得不错的给个star鼓励支持！^_^`







