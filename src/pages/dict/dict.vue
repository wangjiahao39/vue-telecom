<template>
    <div class="dict">
        <div v-for="(item,index) in applylist" :key="index">
            <router-link :to="{name:item.to}">{{item.name}}</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:'dist',
    data(){
        return {
            applylist:[
                {
                    to:'newdict',
                    name:'发起更名流程工单'
                },
                {
                    to:'newdict',
                    name:'发起过户流程工单'
                },
                {
                    to:'newdict',
                    name:'工程维护单'
                },
                {
                    to:'newdict',
                    name:'其他类型工单'
                }
            ]
        }
    }
};
</script>
<style>
.dict{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
.dict div{
    width: 30%;
    height: 40%;
    background: #eee;
    margin: 15px;
    display: inline-block;
    text-align: center;
    font-size: 20px;
    color: #666;
}
.dict div a{
    width: 100%;
    height: 100%;
    line-height: 200px;
    display: inline-block;
    text-decoration: none;
    color: #666;
}
</style>
