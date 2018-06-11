# 项目总结

1. 整个项目使用vue框架完成，并结合vuex以及用vue-router做数据管理

2. 整个项目使用vue-cli的脚手架

   * npm init webpack telecom
   * yarn add vuex axios mockjs element-ui
   
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
  * 将这些模块进行封装
