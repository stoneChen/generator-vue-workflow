# A Yeoman generator used to scaffolding vuejs projects 

*使用本generator前,需先安装全局 [yeoman](http://yeoman.io)*

### 安装
```
npm install generator-vue-workflow -g
```
### 使用
新建一个工程目录并进入,然后:
```
yo vue-workflow 
```

### 启动
```
npm start
```

### 构建
```
npm run build
```
### 说明
本工具生成的vue工程,除了`vue`本身外,还附带了`vue-resource`,`vue-router`, `vuex`.  
webpack配置基于 [vue-cli](https://github.com/vuejs/vue-cli)的官网模板改造.  
整体上的配置可用于开发大型单页应用.

### TODOs
增加以下子命令:  
 
* 创建组件
* 创建视图
* 创建路由(包含创建路由配置,视图)
* 创建flux(包含创建mutation,action,mutation-type)
