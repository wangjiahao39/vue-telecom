<template>
    <el-container class="first">
        <el-header class="header" style="height:30px">
            <span>北京电信通企业信息平台</span>
            <p>当前时间:{{time}}</p>
        </el-header>
        <el-container class="section">
            <el-aside width="200px" class="left">
                <dl>
                    <dt><img src="../../images/head.jpg" alt=""></dt>
                    <dd>
                        <p>您好:***</p>
                        <span>注销</span>
                    </dd>
                </dl>
                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu :default-openeds="['1']">
                            <el-submenu v-for="(item, index) in menu" :index="index+'1'" :key="index">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item v-for="(i,ind) in item.submenus" :index="index+1+'-'+ind+1" :key="ind">
                                        <router-link :to="{name:i.type}">{{i.name}}</router-link>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return {
            time:''
        }
    },
    created(){ 
        setTimeout(()=>{   
            let date = new Date();   
            let year = date.getFullYear();
            let mon = date.getMonth()+1;
            let da = date.getDate();
            let day = date.getDay();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            this.time = year+'年'+mon+'月'+da+'日'+' '+h+':'+m+':'+s+' '+'星期'+day;
        },1000)
    },
    computed:{
        ...mapState(['menu'])
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        ...mapActions(['fetMenu'])
    },
    mounted(){
        // this.$http.get('/static/server/data.json').then(res=>{
        //     this.menu = res.data
        // })
        //dispatch流程
        this.fetMenu()
    }
}
</script>
<style scoped>
.first{
    width: 100%;
    height: 100%;
    font-size: 13px;
}
.header{
    height: 30px;
    line-height: 30px;
    background: #409EFF;
}
.header span{
    padding-left: 20px;
    color: #fff;
}
.header p{
    float: right;
    margin-right: 20px;
}
.section{
    width: 100%;
    height: 100%;
}
.left{
    width: 20%;
    height: 100%;
    background: #eee;
    display: inline-block;
    border-right: 1px solid #ccc;
}
.left dl{
    width: 100%;
    display: flex;
    padding: 10px 0;
}
.left dl dt{
    flex: 1;
}
.left dl dt img{
    width: 70%;
    margin-left: 15%;
}
.left dl dd{
    flex: 2;
    padding-left: 10px;
}
.tac{
    width: 100%;
}
.tac,.el-row,.el-col,.el-col-12{
    width: 100%;
}
a{
    text-decoration: none;
}
.el-main{
    padding: 0;
}
</style>
