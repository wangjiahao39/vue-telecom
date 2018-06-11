<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="用户姓名:">
                <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="用户手机号:">
                <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱:">
                <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="归属组织:">
                <el-popover placement="bottom" width="400" trigger="click" @after-enter="toFetGroup">
                    <el-container direction="vertical" v-loading="flag">
                        <el-form>
                            <el-row>
                                <el-col :span="12">
                                    <el-input size="small" v-model="abc"></el-input>
                                </el-col>
                                <el-col :span="12">
                                    <el-button size="small" @click="filterItem=abc">查询</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-table :data="filterGroup()(filterItem)" :stripe="true" :height="300" @row-click="rowClick">
                            <el-table-column width="50" type="index" label="序号"></el-table-column>
                            <el-table-column width="150" property="ORGNAME" label="组织名称"></el-table-column>
                            <el-table-column width="200" property="FORGNAME" label="上级组织" :show-overflow-tooltip="true"></el-table-column>
                        </el-table>
                    </el-container>
                    <el-input v-model="form.group" slot="reference" size="small">
                        <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
                    </el-input>
                </el-popover>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button size="small" type="promary" @click="addNew">添加</el-button>
        <el-table size="small" :data="tableData" border style="width: 100%" v-loading="tableLodaing">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="id" label="员工ID" width="160"></el-table-column>
            <el-table-column prop="code" label="员工编号" width="100"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="140"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="280" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="org" label="归属组织" width="150"></el-table-column>
            <el-table-column prop="auth" label="权限" width="120"></el-table-column>
            <el-table-column prop="forg" label="上级组织" width="200" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="data" label="创建时间" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="change(scope)" type="text" size="small">编辑</el-button>
                    <el-button @click="remove(scope)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination @current-change="pageChange" :page-size="pageSize" background layout="prev, pager, next" :total="table.length"></el-pagination>
        </div>

        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
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
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        let validator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('不能为空'));
            }
            return callback()
        }
        return {
            form: {
                name: "test",
                group: "未知组织"
            },
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
            flag: false,
            filterItem: "",
            abc: "",
            tableLodaing: false,
            pageSize: 5,
            page: 1,
            dialogFormVisible: false
        };
    },
    computed: {
        tableData() {
            return this.$store.state.table.slice(
                this.pageSize * (this.page - 1),
                this.pageSize * this.page
            );
        },
        ...mapState(["table"])
    },
    methods: {
        toFetGroup() {
            this.flag = true;
            this.fetGroup(() => {
                this.flag = false;
            });
        },
        toFetTable() {
            this.tableLodaing = true;
            this.fetTable(() => {
                this.tableLodaing = false;
            });
        },
        rowClick(row, event, colum) {
            this.form.group = row.ORGNAME;
        },
        change(scope) {
            //console.log(JSON.stringify(scope.row));
            this.dialogFormVisible = true;
            this.newform = scope.row
        },
        remove(scope){
            this.$confirm('你确定要删除吗？','提示',{
                callback:()=>{
                    this.deleteItem({
                        code:scope.row.code,
                        cb:()=>{
                            this.$message('删除成功！')
                        }
                    })
                }
            })
        },
        addNew(){
            this.newform = {
                name: "",
                email: "",
                type:'',
                num:'',
                status:'',
                mobile:'',
                id:'',
                org:''
            }
            this.dialogFormVisible = true;
        },
        sure(){
            this.$refs.newf.validate((isValid,tag)=>{
                this.dialogFormVisible = false;
                //this.$http('./addnew',this.newform).then(res=>{})
            })
        },
        pageChange(page) {
            this.page = page;
        },
        ...mapMutations(["deleteItem"]),
        ...mapActions(["fetGroup", "fetTable"]),
        ...mapGetters(["filterGroup"])
    },
    mounted() {
        this.toFetTable();
    }
};
</script>
<style>
.el-form-item {
    display: inline-block;
}
hr {
    margin: 10px 0;
}
</style>
