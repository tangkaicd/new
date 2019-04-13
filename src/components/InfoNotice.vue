<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                消息提醒列表
            </div>
            <div class="body1">
                <div class="header11">
                    <!--<el-date-picker-->
                            <!--style="margin-right: 10px"-->
                            <!--v-model="daterange_search"-->
                            <!--type="daterange"-->
                            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                            <!--range-separator="至"-->
                            <!--start-placeholder="请选择开始日期"-->
                            <!--end-placeholder="请选择结束日期">-->
                    <!--</el-date-picker>-->
                    <el-date-picker
                            v-model="dateFrom_search"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择开始日期">
                    </el-date-picker>
                    <span style="margin: 0px 5px">至</span>
                    <el-date-picker
                            v-model="dateTo_search"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择结束日期">
                    </el-date-picker>
                    <Search
                            style="margin-left: 15px"
                            placeholder="请输入关键字查询"
                            v-model="value_search"
                            @search="search_mainPageTable"
                    />
                </div>
                <div class="body11">
                    <el-table
                            border
                            :data="array_mainPageTable"
                            style="min-width: 400px;"
                            :height="height_mainPageTable">
                        <el-table-column
                                prop="index"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="explainCode"
                                label="解读编码">
                        </el-table-column>
                        <el-table-column
                                prop="explainTitle"
                                label="解读标题">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceName"
                                label="数据源名称">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceDesc"
                                label="数据源描述">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceContent"
                                label="数据源内容">
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="创建时间">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            v-if="boolean_show_pagination"
                            style="margin-top:15px;text-align: right"
                            @size-change="sizeChange_mainPageTable"
                            @current-change="currentChange_mainPageTable"
                            :page-sizes="Constant.array_pageSize"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total_mainPageTable">
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
                total_mainPageTable:0,
                pageSize:Constant.array_pageSize[0],
                height_mainPageTable:$(window).height() - 240,
                dateFrom_search:"",
                dateTo_search:"",
                value_search:"",

                boolean_show_pagination:true,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },

                array_mainPageTable:[],

            }
        },
        computed: {

        },
        mounted () {
            this.$nextTick(function () {
                this.getMainPageTable(this.obj_page);
            })
        },
        methods: {
            getMainPageTable_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
                    createDateBegin:this.dateFrom_search,
                    createDateEnd:this.dateTo_search,
                    queryLikeVal:this.value_search,
                };
                this.getMainPageTable(this.obj_page,param);
            },
            sizeChange_mainPageTable(val){
                this.pageSize=val;
                this.obj_page.pageSize=val;
                this.obj_page.pageIndex=0;
                this.getMainPageTable_pagination();
            },
            currentChange_mainPageTable(val){
                this.obj_page.pageIndex=val - 1;
                this.getMainPageTable_pagination();
            },
            search_mainPageTable(){
                this.obj_page.pageIndex=0;
                this.getMainPageTable_pagination();
            },

            getMainPageTable(obj_page,param_search){
//                param_search=param_search?param_search:{};
//                var param={...obj_page,...param_search};
                var param={...obj_page,queryStr:(param_search?JSON.stringify(param_search):"")};
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/restWeb/dsMsgList.do",
                        param
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.total_mainPageTable=result.total;
                var data=result.data;
                for(var i=0;i<data.length;i++){
//                            data[i].explainAuditStateView=Constant.obj_auditState[data[i].explainAuditState];
//                            data[i].auditStateView=Constant.obj_translateState[data[i].auditState];
                    data[i].index=(i+1)+this.obj_page.pageIndex*this.obj_page.pageSize
                }
                this.array_mainPageTable=data;
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
        margin-bottom:10px;
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
    .zoomBtnWrapper{
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 10000;
        color:#2B77C5;
        user-select:none;
    }
    .planScheme{
        min-height:430px;
    }

</style>
