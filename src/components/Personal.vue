<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                个人所得税明细表
            </div>
            <div class="body1">
                <div class="header11">
                    <el-date-picker
                            style="width: 180px"
                            value-format="yyyy-MM"
                            v-model="incomeTime_search"
                            type="month"
                            placeholder="请选择所得期间查询">
                    </el-date-picker>
                    <input v-model="planName_search" placeholder="请输入方案名称查询" type="text">
                    <input v-model="companyData_search" placeholder="请输入公司信息查询" type="text">
                    <input v-model="userName_search" placeholder="请输入姓名查询" type="text">
                    <Search
                            style="margin-left: 15px"
                            style_input="width:180px"
                            placeholder="请输入身份证件号码查询"
                            v-model="idCard_search"
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
                                prop="incomeTime"
                                label="所得期间">
                        </el-table-column>
                        <el-table-column
                                prop="planName"
                                show-overflow-tooltip
                                label="方案名称">
                        </el-table-column>
                        <el-table-column
                                prop="companyName"
                                label="公司名称">
                        </el-table-column>
                        <el-table-column
                                prop="unifiedCreditCode"
                                label="统一信用代码">
                        </el-table-column>
                        <el-table-column
                                prop="userName"
                                label="姓名">
                        </el-table-column>
                        <el-table-column
                                prop="idType"
                                label="证件类型">
                        </el-table-column>
                        <el-table-column
                                prop="idCard"
                                show-overflow-tooltip
                                label="身份证件号码">
                        </el-table-column>
                        <el-table-column
                                prop="totalPayroll"
                                label="总发放工资">
                        </el-table-column>
                        <el-table-column
                                min-width="90"
                                prop="totalChouHuaQianYjse"
                                label="筹划前应缴税额">
                        </el-table-column>
                        <el-table-column
                                min-width="90"
                                prop="totalChouHuaHouYjse"
                                label="筹划后应缴税额">
                        </el-table-column>
                        <el-table-column
                                prop="totalShiJiJieShui"
                                label="实际节税">
                        </el-table-column>
                        <el-table-column
                                prop="yingnasuisuodee"
                                label="应纳所得税额">
                        </el-table-column>
                        <el-table-column
                                prop="gsshuilv"
                                width="50"
                                label="税率">
                        </el-table-column>
                        <el-table-column
                                prop="gssukoushu"
                                label="速算扣除数">
                        </el-table-column>
                        <el-table-column
                                prop="yingnasuie"
                                label="应纳税额">
                        </el-table-column>
                        <el-table-column
                                prop="jianmiansuie"
                                label="减免税额">
                        </el-table-column>
                        <el-table-column
                                prop="leijiyijiaosuie"
                                label="已扣缴税额">
                        </el-table-column>
                        <el-table-column
                                prop="yingbukoujiaosuie"
                                label="应补(退)税额">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="50">
                            <template slot-scope="scope">
                                <span  class="aBtn" @click="showDetailModel(scope)">
                                    详情
                                </span>
                            </template>
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

        <Model
                title="详情"
                style_dialog="width:100%;min-width:1100px"
                :style_body="'padding:20px;max-height:inherit;min-height:500px;height:'+(height_model)+'px'"
                :hideFooter="true"
                v-if="boolean_show_simulationRunModel1"
                @hide="boolean_show_simulationRunModel1=false">
            <el-table
                    :height="height_model - 20"
                    :data="array_simulationRunModel2"
                    :span-method="rowspan_simulationRunModel2"
                    border
                    :cell-style="cellStyle_simulationRunModel2"
                    style="width: 100%;text-align: center">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="totalProjectName"
                        label="总项目名称">
                </el-table-column>
                <el-table-column
                        prop="projectName"
                        label="项目名称">
                </el-table-column>
                <el-table-column
                        prop="projectAmount"
                        label="项目金额">
                </el-table-column>
                <el-table-column
                        label='要素解读'>
                    <template slot-scope="scope">
                        <span class="aBtn" @click="openFile(scope.row.eleFileUrl0)">{{scope.row.eleFileName0}}</span>
                    </template>
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
                total_mainPageTable:0,
                pageSize:Constant.array_pageSize[0],
                height_mainPageTable:$(window).height() - 240,
                incomeTime_search:"",
                planName_search:"",
                companyData_search:"",
                userName_search:"",
                idCard_search:"",

                boolean_show_pagination:true,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },

                array_mainPageTable:[],

                height_model:$(window).height()-66,
                boolean_show_simulationRunModel1:"",
//                boolean_show_simulationRunModel2:"",
                array_simulationRunModel2:[],
                array_rowspan:[],

            }
        },
        computed: {

        },
        mounted () {
            this.incomeTime_search=this.$route.params.incomeTime || "";
            this.planName_search=this.$route.params.planName || "";
            this.companyData_search=this.$route.params.unifiedCreditCode || "";
            this.$nextTick(function () {
//                this.getMainPageTable(this.obj_page);
                this.getMainPageTable_pagination();
            })
        },
        methods: {
            openFile(fileUrl){
                window.open(fileUrl);
            },
            showDetailModel(scope){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/runResult/statisticsPersonDetail.do",
                        {
                            planName:scope.row.planName,
                            incomeTime:scope.row.incomeTime,
                            userName:scope.row.userName,
                            idCard:scope.row.idCard,
                        }
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                var list=data;
                var totalProjectNameList=[];
                for(var i=0;i<data.length;i++){
                    totalProjectNameList.push(data[i].totalProjectName);
                }
                var totalProjectNameList1=[...new Set(totalProjectNameList)];
                var list1=[];
                for(var i=0;i<totalProjectNameList1.length;i++){
                    for(var j=0;j<list.length;j++){
                        if(totalProjectNameList1[i] == list[j].totalProjectName){
                            list1.push(list[j]);
                        }
                    }
                }
                this.array_rowspan=[0];
                for(var i=0;i<list1.length-1;i++){
                    if(list1[i].totalProjectName != list1[i+1].totalProjectName){
                        this.array_rowspan.push(i+1);
                    }
                }
                for(var i=0;i<list1.length;i++){
                    list1[i].projectAmountAfter=list1[i].projectAmount;
                }
                this.array_simulationRunModel2=list1;
//                this.boolean_show_simulationRunModel2=true;
                this.boolean_show_simulationRunModel1=true;
                }, response => {
                    Util.removeWaiting();
                });
            },
            rowspan_simulationRunModel2({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 1) {
                    for(var i=0;i<this.array_rowspan.length;i++){
                        if (rowIndex === this.array_rowspan[i]) {
                            var rowspan;
                            if(i == this.array_rowspan.length - 1){
                                rowspan=this.array_simulationRunModel2.length - this.array_rowspan[i];
                            }else{
                                rowspan=this.array_rowspan[i + 1] - this.array_rowspan[i];
                            }
                            return {
                                rowspan: rowspan,
                                colspan: 1
                            };
                        }
                    }
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            },
            cellStyle_simulationRunModel2({row, column, rowIndex, columnIndex}){
                if(row.projectAmount == 0 && column.property == "projectAmount"){
                    return {color:"red"};
                }
            },
            getMainPageTable_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
                    incomeTime:this.incomeTime_search,
                    planName:this.planName_search,
                    companyData:this.companyData_search,
                    userName:this.userName_search,
                    idCard:this.idCard_search,
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
                param_search=param_search?param_search:{};
                var param={...obj_page,...param_search};
//                var param={...obj_page,queryStr:(param_search?JSON.stringify(param_search):"")};
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/runResult/statisticsPerson.do",
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
        input{
            margin-left:15px;
            width: 180px;
        }
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
