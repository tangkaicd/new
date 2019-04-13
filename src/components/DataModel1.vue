<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                数据模型列表
            </div>
            <div class="body1">
                <div class="header11">

                </div>
                <div class="body11">
                    <el-table
                            :data="array_policyExplain"
                            height="400"
                            border
                            style="width: 100%;text-align: center">
                        <el-table-column
                                prop="index"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="plotCategoryCode"
                                label="解读分类编码">
                        </el-table-column>
                        <el-table-column
                                prop="plotCategoryName"
                                label="解读分类名称">
                        </el-table-column>
                        <el-table-column
                                prop="explainTitle"
                                label="解读标题">
                        </el-table-column>
                        <el-table-column
                                prop="state"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                            <span class="btn_small" @click="detail(scope)">
                                                <span class="name">查看详情</span>
                                            </span>
                                <span style="margin-left:5px" class="btn_small" @click="run(scope)">
                                                <span class="name">运行</span>
                                            </span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            v-if="boolean_show_pagination"
                            style="margin-top:15px;text-align: right"
                            @size-change="sizeChange_policyExplain"
                            @current-change="currentChange_policyExplain"
                            :page-sizes="Constant.array_pageSize"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total_policyExplain">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Model
                title="数据模型详情"
                style_dialog="width:900px"
                :hideFooter="true"
                v-if="boolean_show_detailModel"
                @hide="boolean_show_detailModel=false">
            <el-table
                    :data="array_detail"
                    height="300"
                    width="800"
                    border
                    style="width: 100%;text-align: center">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="zt"
                        label="主体">
                </el-table-column>
                <el-table-column
                        prop="sj"
                        label="税负">
                </el-table-column>
                <el-table-column
                        prop="chfamc"
                        label="筹划方案名称">
                </el-table-column>
            </el-table>
        </Model>

    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                total_policyExplain:0,
                boolean_show_detailModel:false,
                boolean_show_pagination:true,
                pageSize:Constant.array_pageSize[0],

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },

                array_policyExplain:[],
                array_detail:[
                    {
                        zt:'光华科技有限公司',
                        sj:'2661952.38',
                        chfamc:'企业所得税筹划',
                    },
                    {
                        zt:'光华科技有限公司',
                        sj:'1064780.95',
                        chfamc:'高新科技型企业所得税筹划',
                    }
                ],
            }
        },
        computed: {

        },
        mounted () {
            this.$nextTick(function () {
                this.queryPolicyExplain(this.obj_page);
            })
        },
        methods: {
            run(scope){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/index/test.do",

                ).then(response => {
                    Util.removeWaiting();
                    Util.showTipModel("运行成功");
                    scope.row.state="完成"
                }, response => {
                    Util.removeWaiting();
                });
            },
            detail(scope){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/index/test.do",

                ).then(response => {
                    Util.removeWaiting();
                    this.boolean_show_detailModel=true;
                }, response => {
                    Util.removeWaiting();
                });

            },
            sizeChange_policyExplain(val){
                this.pageSize=val;
                this.obj_page.pageSize=val;
                this.obj_page.pageIndex=0;
                this.queryPolicyExplain_pagination();
            },
            currentChange_policyExplain(val){
                this.obj_page.pageIndex=val - 1;
                this.queryPolicyExplain_pagination();
            },
            queryPolicyExplain_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                    });
                }
                var param={

                };
                this.queryPolicyExplain(Object.assign({},param,this.obj_page));
            },
            queryPolicyExplain(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/queryPageList.do",
                        param
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    this.total_policyExplain=result.total;
                    var data=result.data;
                    for(var i=0;i<data.length;i++){
                        data[i].state="处理中";
                        data[i].index=(i+1)+this.obj_page.pageIndex*this.obj_page.pageSize
                    }
                    this.array_policyExplain=data;
                }, response => {
                    Util.removeWaiting();
                });
            },

        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .main{
        padding:15px;
        background: #F2F2F2;
    }
    .main  .header1{
        margin-bottom:15px;
        color: #000;
        font-size: 16px;
    }
    .main  .body1{
        padding:15px;
        background: #fff;
        /*height:450px;*/
    }
    .main  .header11{
        margin-bottom:15px;
    }
    .main  .body11{
        /*border:1px #F2F2F2 solid;*/
        /*height:400px;*/
    }
    .main  .body11 > .leftWrapper{
        border-right:1px #F2F2F2 solid;
        height:400px;
        width: 250px;
        float:left;
    }
    .main  .body11 >  .rightWrapper{
        float:right;
        width:calc(100% - 254px);
    }
    .main .header112{
        border-bottom:1px #F2F2F2 solid;
        height: 27px;
        padding-top: 7px;
        padding-right: 7px;
    }
    .main .head1121{
        margin-top:5px;
    }
    .main .body1121{
        padding-top: 10px;
        position: relative;
    .policyContent{
        position: absolute;
        top:10px;
        right:15px;
        width:300px
    }
    }

</style>
