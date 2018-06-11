<template>
    <div class="apply">
        <div class="left">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="right">
            <el-form ref="newf" :inline="true" :rules="newFormRules" :model="newform" label-position="left" label-width="80">
                <el-form-item label="员工姓名：" prop="name">
                    <el-input size="small" v-model="newform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input size="small" v-model="newform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select size="small" v-model="newform.type" placeholder="请选择活动区域">
                        <el-option label="身份证" value="shanghai"></el-option>
                        <el-option label="户口簿" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码：">
                    <el-input size="small" v-model="newform.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="人员状态">
                    <el-select size="small" v-model="newform.status" placeholder="请选择活动区域">
                        <el-option label="在职" value="shanghai"></el-option>
                        <el-option label="离职" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input size="small" v-model="newform.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工编号：">
                    <el-input size="small" v-model="newform.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="归属组织：">
                    <el-input size="small" v-model="newform.org" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="sure" size="small">确 定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        let validator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不能为空'));
            }
            return callback()
        }
        return {
            data: [
                {
                    label: '应用菜单树',
                    children: [{
                        label: '组织权限管理',
                        children: [
                            {
                                label: '员工账号管理'
                            },{
                                label: '应用功能管理'
                            },{
                                label: '配置业务字典'
                            },{
                                label: '设置安全策略'
                            }
                        ]
                    }, {
                        label: '我的工作',
                        children: [
                            {
                                label: '员工账号管理'
                            },{
                                label: '应用功能管理'
                            },{
                                label: '配置业务字典'
                            },{
                                label: '设置安全策略'
                            }
                        ]
                    },{
                        label: '客户管理',
                        children: [
                            {
                                label: '员工账号管理'
                            },{
                                label: '应用功能管理'
                            },{
                                label: '配置业务字典'
                            },{
                                label: '设置安全策略'
                            }
                        ]
                    },{
                        label: '业务审批',
                        children: [
                            {
                                label: '员工账号管理'
                            },{
                                label: '应用功能管理'
                            },{
                                label: '配置业务字典'
                            },{
                                label: '设置安全策略'
                            }
                        ]
                    },{
                        label:'工程管理',
                        children: [
                            {
                                label: '员工账号管理'
                            }
                        ]
                    },{
                        label:'计费账目',
                        children: [
                            {
                                label: '员工账号管理'
                            },{
                                label: '应用功能管理'
                            }
                        ]
                    }]
                }
            ],
            newform: {
                name: "",
                email: "",
                type:'',
                num:'',
                status:'',
                mobile:'',
                id:'',
                org:''
            },
            newFormRules:{
                name:[
                    {validator,trigger:'blur'}
                ],
                email:[
                    {required:true,message:'请填写邮箱',trigger:'blur'},
                    {type:'string',message:'邮箱格式不正确',trigger:'change'}
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dialogFormVisible: false
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        sure(){
            this.$refs.newf.validate((isValid,tag)=>{
                this.dialogFormVisible = false;
            })
        }
    }
};
</script>
<style>
.apply{
    width: 100%;
    height: 100%;
}
.left{
    width: 20%;
    height: 100%;
    border-right: 1px solid #ccc;
    float: left;
    box-sizing: border-box;
}
.right{
    width: 80%;
    float: right;
    padding: 20px;
    box-sizing: border-box;
}
</style>
