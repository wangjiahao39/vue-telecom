<template>
    <div class="login">
        <div class="top">
            <img src="../../images/logo.gif" alt="">
            <span>企业信息管理平台</span>
        </div>
        <div class="banner">
            <img src="../../images/login.gif" alt="">
            <div class="box">
                <p class="p">
                    <span v-on:click="tab_change('imgs')" :class="active_change('imgs')">二维码登录</span>
                    <span v-on:click="tab_change('number')" :class="active_change('number')">账号登录</span>
                </p>
                <div class="box-content">
                    <component :is="login_way"></component>
                </div>
            </div>
        </div>
        <div class="foot">
            <ul>
                <img src="../../images/timg.jpg" alt="">
                <li>集团邮件系统</li>|
                <li>集团OA系统</li>|
                <li>集团BSS系统</li>|
                <li>集团邮件系统</li>|
                <li>集团官网</li>|
                <li>北京电信通官网</li>
            </ul>
            <p>北京电信通电信工程有限公司 版权所有 2011-2111 技术支持：IT共享中心</p>
        </div>
    </div>
</template>
<script>
import imgs from "./imgs";
import number from "./number";
export default {
    data() {
        return {
            login_way: "imgs"
        };
    },
    beforeRouteEnter(to, from, next) {
        // console.log('component login enter')
        next();
    },
    components: {
        imgs: imgs,
        number: number
    },
    methods: {
        tab_change(str) {
            this.login_way = str;
        },
        active_change(str) {
            return this.login_way === str ? "active" : "";
        }
    }
};
</script>
<style>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.active {
    background: #eee;
}
.top {
    width: 100%;
    height: 60px;
    line-height: 60px;
}
.top img {
    padding: 3px 10px;
    float: left;
}
.top span {
    line-height: 50px;
    font-size: 20px;
    color: skyblue;
    float: left;
    padding-left: 15px;
    border-left: 1px solid #ccc;
    margin-top: 5px;
}
.banner {
    flex: 1;
    width: 100%;
    position: relative;
}
.banner img {
    width: 100%;
    height: 100%;
}
.box {
    width: 260px;
    height: 70%;
    background: #fff;
    position: absolute;
    right: 6%;
    bottom: 10%;
    border-radius: 5px;
    font-size: 13px;
    overflow: hidden;
}
.p {
    display: flex;
    height: 40px;
    border-bottom: 1px solid #999;
}
.p span {
    flex: 1;
    line-height: 40px;
    text-align: center;
}
.p span:nth-child(1) {
    border-radius: 5px 0 0 0;
}
.p span:nth-child(2) {
    border-radius: 0 5px 0 0;
}
.bg {
    background: #ccc;
}
.con {
    width: 100%;
    height: 100%;
}
.foot {
    height: 162px;
    text-align: center;
}
.foot img {
    width: 50px;
    height: 50px;
    float: left;
}
.foot ul {
    height: 50px;
    line-height: 50px;
    display: inline-block;
}
.foot ul li {
    display: inline-block;
    line-height: 50px;
    margin-left: 10px;
    padding-right: 10px;
}
.box-content {
    position: relative;
}
.number,
.img {
    width: 100%;
    position: absolute;
    top: 0;
}
</style>
