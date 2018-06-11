# 项目总结

1. 整个项目使用vue框架完成，并结合vuex以及用vue-router做数据管理

2. 整个项目使用vue-cli的脚手架

   * npm init webpack telecom
   * yarn add vuex axios mockjs element-ui（除了脚手架以外所用的组件）
   
3. 路由

   * 项目使用了二级路由对页面进行处理
   * routes: [
        {
        
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
        
            path: '/home',
            name: 'home',
            component: Home,
            children:[
                {
                    path: 'staff',
                    name: 'staff',
                    component: Staff,
                },
                {
                    path: 'dictionaries',
                    name: 'dictionaries',
                    component: Dictionaries,
                },
                {
                    path: 'apply',
                    name: 'apply',
                    component: Apply,
                },
                {
                    path: 'institutional',
                    name: 'institutional',
                    component: Institutional,
                },
                {
                    path: 'newdict',
                    name: 'newdict',
                    component: Newdict,
                }
            ]
        }
    ]
4. 用到的模块

  * element里面的
    * Layout 布局
    * Form 表单
    * Table 表格
    * Tree 树形控件
    * Pagination 分页
    * Dialog 对话框
  * axios请求数据
  * 对这些模块进行封装，调用
  
5. 开发过程中遇到的问题

  * 登录页安全性能不够高
    * 登录页需要进行导航守卫，提高安全性能
  * element-ui里面的组件跟需求不完全相同
    * 需要自己对组件进行调整
  * 使用Tree 树形控件时不能给点击的节点添加路由
  * 请求数据时，请求数据失败
    * 一定要将将模拟的数据放到静态资源中进行请求
