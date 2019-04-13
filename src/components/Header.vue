<template>
    <div class="navbar-top">
        <span class="logo"></span>
        <router-link to="/orderManage">订单管理</router-link>
        <router-link to="/infoNotice">数据管理</router-link>
        <el-dropdown :hide-timeout="400"  @command="command_ruleManage" class="dropdownWrapper">
          <span class="el-dropdown-link ruleManage">
              规则管理
          </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="checkRule" class="checkRule" data-dropdown="ruleManage">
                    检查规则
                </el-dropdown-item>
                <el-dropdown-item command="accountRule" class="accountRule" data-dropdown="ruleManage">
                    记账规则
                </el-dropdown-item>
                <el-dropdown-item command="checkRuleCorrect" class="checkRuleCorrect" data-dropdown="ruleManage">
                    检查规则纠偏
                </el-dropdown-item>
                <el-dropdown-item command="accountRuleCorrect" class="accountRuleCorrect" data-dropdown="ruleManage">
                    记账规则纠偏
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <router-link to="/policyRead">系统管理</router-link>
        <el-dropdown :hide-timeout="400" class="userWrapper" @command="handleCommand">
          <span class="el-dropdown-link cp">
            <span style="color:#fff">你好，</span><span style="color:#2B77C5">{{nickname}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

    </div>
</template>

<script>
export default {
  data () {
    return {
      nickname: '',
    }
  },
    mounted () {
        var path=this.$router.history.current.path;
        var $li=$("."+path.split("/")[1]);
        if($li.length){
            $("."+$li.attr("data-dropdown")).addClass("a");
        }
        this.$router.afterEach((to, from) => {
            $(".el-dropdown-link").removeClass("a");
            var $li=$("."+to.path.split("/")[1]);
            if($li.length){
                $("."+$li.attr("data-dropdown")).addClass("a");
            }
        })
        this.getNickname();
    },
    methods:{
        getNickname(){
            this.$http.post(Constant.ctx+"/sysLogin/getNickname.do",
                    {}
            ).then(response => {
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.nickname=result.data.nickname;
            }, response => {
                Util.removeWaiting();
            });
        },
        command_ruleManage(command){
            if(command=="checkRule"){
                this.$router.push("/checkRule");
            }
            if(command=="accountRule"){
                this.$router.push("/accountRule");
            }
            if(command=="checkRuleCorrect"){
                this.$router.push("/checkRuleCorrect");
            }
            if(command=="accountRuleCorrect"){
                this.$router.push("/accountRuleCorrect");
            }
        },
        handleCommand(command){
            if(command=="logout"){
                this.$http.post(Constant.ctx+"/sysLogin/loginOut.do",
                        {}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    location.href=Constant.ctx+"/login.html";
                }, response => {
                    Util.removeWaiting();
                });
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
