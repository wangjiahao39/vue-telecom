<template>
    <div class="number">
        <el-form :model="login_model" label-position="top" ref="form">
            <el-form-item prop="number" :rules="rules" label="登录账号">
                <el-input v-model="login_model.number" placeholder="请输入手机号或者邮箱"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="isphonDisabled" type="primary" v-on:click="checkValidate('phone')">{{phonemsg}}</el-button>
                <el-button :disabled="isemailDisabled" type="primary" v-on:click="checkValidate('email')">{{emailmsg}}</el-button>
            </el-form-item>
            <el-form-item label="动态密码">
                <el-input placeholder="请输入动态密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="up" v-on:click="login()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            login_model: {
                number: ""
            },
            rules: [{ required: true, message: "请输入用户信息" }],
            phonemsg: "手机获取动态密码",
            emailmsg: "邮箱获取动态密码",
            timer: null,
            isphonDisabled: false,
            isemailDisabled: false
        };
    },
    methods: {
        timeout(type) {
            let start = 10;
            this.timer = setInterval(() => {
                start--;
                type == "phone"
                    ? ((this.isphonDisabled = true),
                      (this.phonemsg = start + "s后重新发送"))
                    : ((this.isemailDisabled = true),
                      (this.emailmsg = start + "s后重新发送"));
                if (start <= 0) {
                    type == "phone"
                        ? (this.phonemsg = "重新发送动态密码")
                        : (this.emailmsg = "重新发送动态密码");
                    clearInterval(this.timer);
                    type == "phone"
                        ? (this.isphonDisabled = false)
                        : (this.isemailDisabled = false);
                }
            }, 1000);
        },
        login() {
            sessionStorage.setItem("islogin", 1);
            let input = document.querySelectorAll("input");
            for (let i = 0; i < input.length; i++) {
                if (input[i].value != "") {
                    this.$router.push("/home");
                }
            }
        },
        checkValidate(type) {
            if (this.rules.length > 1) {
                this.rules.pop();
            }
            if (type == "phone") {
                this.rules.push({
                    validator: (rule, value, callback) => {
                        if (/^1[3578]\d{9}$/.test(value)) {
                            callback();
                        } else {
                            callback(new Error("请输入正确的手机号"));
                        }
                    },
                    message: "请输入正确的手机号"
                });
            } else if (type == "email") {
                this.rules.push({ type, message: "请输入正确的邮箱" });
            }

            this.$refs.form.validate((isValid, rules) => {
                if (isValid) {
                    this.timeout(type);
                    // this.$http.post('',{number:login_model.number}).then(res=>{
                    //     console.log(res)
                    // })
                }
            });
        }
    }
};
</script>
<style>
.number {
    width: 70%;
    height: 100%;
    margin-left: 15%;
    font-size: 13px;
}
.el-form-item {
    margin-bottom: 10px;
}
.el-form--label-top .el-form-item__label {
    padding: 0;
}
.el-form-item__label {
    line-height: 30px;
}
.el-form-item__content {
    line-height: 30px;
    display: flex;
    margin-top: 10px;
}
.el-form-item__content button {
    width: 50%;
    flex: 1;
}
.el-button,
.el-button--primary {
    padding: 3px;
    font-size: 12px;
}
.up {
    padding: 8px 0;
}
.el-input__inner {
    height: 30px;
}
</style>
