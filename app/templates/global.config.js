module.exports = {
  pageConfig: {
    //重要! 页面标题
    title: '页面标题' 
  },
  //本地服务端口
  serverPort: 8000,
  rap: {
    host: 'rap.ops.xkeshi.so',    //启动的服务主机, 基本不需要修改
    // port: '80',                //端口号, 基本不需要修改
    projectId: 19,   //RAP配置的项目ID, 不同的项目不同 [记得修改]!!!
    mock: '/mockjs/',             //RAP前缀, 基本不需要修改
    wrapper: ''                   //不需要包装, 基本不需要修改
  }
};
