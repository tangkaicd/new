<template>
    <div class="root">
        <div class="main">
            <div class="header1">
                检查规则纠偏列表
            </div>
            <div class="body1" :style="`height:${height_body1}px`">
                <div class="header11">
                    <Search
                        placeholder="请输入订单号进行搜索"
                        @search="search"/>
                </div>
                <div class="body11">
                    <el-table
                            border
                            :data="array_policyExplain"
                            :height="height_body1 - 80">
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
                                prop="auditView"
                                label="审批说明">
                        </el-table-column>
                        <el-table-column
                                prop="auditStateView"
                                label="状态">
                            <template slot-scope="scope">
                                <span class="a">{{scope.row.auditStateView}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <span class="btn_small" @click="showQueryPolicyExplainModel(scope)">
                                    <span class="name">详情</span>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            v-if="boolean_show_pagination"
                            style="margin-top:10px;text-align: right"
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

    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                total_policyExplain:0,
                pageSize:Constant.array_pageSize[0],
                height_body1:$(window).height() - 140,

                boolean_show_pagination:true,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },

                array_policyExplain:[],
                labelWidth_policyDetail:140,
                state_search:"",
            }
        },
        computed: {

        },
        mounted () {
            this.$nextTick(function () {
                this.getPolicyExplainList(this.obj_page);
            })
            $(window).resize(() => {
                var height=$(window).height() - 140;
                if(height < 400){
                    height = 400;
                }
                this.height_body1=height;
            })
        },
        destroyed (){
            $(window).unbind("resize");
        },
        methods: {
            showQueryPolicyExplainModel(scope){

            },
            getPolicyExplainList_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
                    auditState:this.state_search
                };
                this.getPolicyExplainList(Object.assign({},param,this.obj_page));
            },
            sizeChange_policyExplain(val){
                this.pageSize=val;
                this.obj_page.pageSize=val;
                this.obj_page.pageIndex=0;
                this.getPolicyExplainList_pagination();
            },
            currentChange_policyExplain(val){
                this.obj_page.pageIndex=val - 1;
                this.getPolicyExplainList_pagination();
            },
            search(value){
                this.obj_page.pageIndex=0;
                this.getPolicyExplainList_pagination();
            },

            getPolicyExplainList(param){
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
                    data[i].auditStateView=Constant.obj_auditState[data[i].auditState];
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
        margin-bottom:10px;
        color: #000;
    }
    .main  .body1{
        padding:15px;
        background: #fff;
    }
    .main  .header11{
        margin-bottom:10px;
    }

</style>
