# apollo-manage

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).  

### 注意的问题：  
(1): 登录、注册、忘记密码的图片验证码问题(验证码+图片是个一体的问题)  
（2）：监控：爬虫任务的监控(是否正常， 是否异常)；机器的监控；celery、flower的监控 ；.......   
（3）：详情(表格)：爬虫任务发具体详情：名称， 爬虫id，描述，状态，创建时间，运行多少次，URL参数情况或文件包含的参数情况，每次爬取的情况；.....  
（4）：配置(非表格)：爬虫任务的具体配置： 下载延迟，并发数，定时情况，......  
（5）：日志(表格)：每次爬虫任务的具体日志，......  
（6）：表格(表格)：无需每次每次爬虫的数据，统一展示即可，......  


