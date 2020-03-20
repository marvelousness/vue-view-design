# vue-view-design

Vue 是目前国内前端开发工程师最为熟悉的开发框架，本文特将工作中涉猎较多的几个内容整理成一个简单案例，仅供学习。主要涉及如下五个内容：

1. vue@2.6.10
2. view-design@4.1.3-rc.2 （前身是 iview）
3. axios@0.18.1
4. mockjs@1.1.0
5. webpack@4.41.2

很多 vue 项目都是在一个简单的小案例的基础上进行不断的拓展，在本例中，为了将 vue、viewui、axios、mock 和 webpack 这五个内容简单的整合。并没有编写很复杂的代码。可通过这个案例，以小见大。根据这个项目可以清晰知道一个前端项目需要的基础设施和基础结构，可以在此基础上做的任何拓展。


## 项目结构

```
vue-view-design
	│
	├─node_modules
	├─src			--> 源码目录
	│  ├─api		-->	 ├ API 配置文件目录
	│  ├─assets		-->	 ├ 资源文件目录
	│  │  ├─css		-->	 │ 	└ 样式表文件目录
	│  │  └─images		-->	 │	└ 图片文件目录
	│  └─mock		-->	 └ mock 配置文件
	├─target		--> 使用 wabpack 打包后的目标目录
	├─test			--> 测试目录
	└─webpack		--> webpack 配置目录
```


## 关于 vue

1. 官网：[https://cn.vuejs.org/](https://cn.vuejs.org/)
2. 文档: [https://cn.vuejs.org/v2/api/](https://cn.vuejs.org/v2/api/)


## 关于 view-design

1. 官网：[https://www.iviewui.com/](https://www.iviewui.com/)
2. 文档：[https://www.iviewui.com/docs/introduce](https://www.iviewui.com/docs/introduce)
3. 关于：该项目即为原先的 iView，从 2019 年 10 月起正式更名为 View UI，并使用全新的 Logo 。
iView 作者将在新仓库（https://github.com/view-design/ViewUI）继续开发 iView 4.0 和后续版本，以及维护工作。
原仓库 iView 作者不再继续提交内容。


## 关于 axios

1. 官网：[http://www.axios-js.com/](http://www.axios-js.com/)
2. 文档：[http://www.axios-js.com/zh-cn/docs/](http://www.axios-js.com/zh-cn/docs/)


## 关于 mockjs

1. 官网：[http://mockjs.com/](http://mockjs.com/)
2. 文档：[https://github.com/nuysoft/Mock/wiki](https://github.com/nuysoft/Mock/wiki)


## 关于 webpack

1. 官网：[https://www.webpackjs.com/](https://www.webpackjs.com/)
2. 文档：[https://www.webpackjs.com/concepts/](https://www.webpackjs.com/concepts/)


## 附言

本项目仅作学习。如果您对该项目有什么建议或者意见，欢迎给我留言 [marvelousness@foxmail.com](mailto:marvelousness@foxmail.com)