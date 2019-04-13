<template>
    <div class="root">
        <div class="main">
            <div class="header1">
                订单列表
            </div>
            <div class="body1" :style="`height:${height_window - 140}px`">
                <div class="header11">
                    <Search
                        placeholder="请输入订单号进行搜索"
                        v-model="value_search"
                        @search="search_mainPageTable"/>
                    <span class="addBtn fr" @click="showModel_addOrder">
                        <span class="fa fa-plus"></span><span class="name">新增订单</span>
                    </span>
                </div>
                <div class="body11">
                    <el-table
                            border
                            :data="array_policyExplain"
                            class="nowrap-td-last"
                            :height="height_window - 220">
                        <el-table-column
                                prop="index"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="plotCategoryCode"
                                label="订单编号">
                        </el-table-column>
                        <el-table-column
                                prop="plotCategoryName"
                                label="订单分类名称">
                        </el-table-column>
                        <el-table-column
                                prop="explainTitle"
                                label="订单标题">
                        </el-table-column>
                        <el-table-column
                                prop="auditView"
                                label="订单说明">
                        </el-table-column>
                        <el-table-column
                                prop="auditStateView"
                                label="状态">
                            <template slot-scope="scope">
                                <span class="a">{{scope.row.auditStateView}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="245">
                            <template slot-scope="scope">
                                <span class="updateBtn_small" @click="showModel_updateOrder(scope)">
                                    <span class="fa fa-edit"></span><span class="name">修改</span>
                                </span>
                                <span class="btn_small" @click="showModel_orderDetail(scope)" style="margin-left:3px">
                                    <span class="name">查看</span>
                                </span>
                                <span class="btn_small" @click="AI(scope)" style="margin-left:3px">
                                    <span class="name">AI识别</span>
                                </span>
                                <span class="btn_small" @click="correct(scope)" style="margin-left:3px">
                                    <span class="name">纠偏</span>
                                </span>
                                <span class="deleteBtn_small" @click="deleteOrder(scope)" style="margin-left:3px">
                                    <span class="fa fa-trash-o"></span><span class="name">删除</span>
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

        <Model
                style_model="z-index:2000"
                style_dialog="width:100%;"
                :style_body="`max-height:inherit;height:${height_window - 138}px`"
                :title="title_addOrderModel"
                v-if="boolean_show_addOrderModel"
                @hide="boolean_show_addOrderModel=false"
                @save="confirmBtn_addOrderModel">
            <div class="each fl">
                <span class="name">
                    <span class="notNull">*</span>
                    公司<span>：</span>
                </span>
                <el-select
                        filterable
                        style="margin-right:20px"
                        v-model="obj_addOrderModel.company">
                    <el-option
                            v-for="item in array_company_addOrderModel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <LabelAndValue
                    style="margin-right:20px"
                    class="fl"
                    label="类型"
                    type="select"
                    :isNotNull="true"
                    name="type"
                    :options='Constant.array_type'
                    :formObj="obj_addOrderModel"/>
            <LabelAndValue
                    class="fl"
                    label="标题"
                    :isNotNull="true"
                    name="datasourceName"
                    :formObj="obj_addOrderModel"/>
            <LabelAndValue
                    class="fl"
                    label="说明"
                    placeholder="请输入说明"
                    type="textarea"
                    :isNotNull="true"
                    name="policyTitle"
                    width="785"
                    :formObj="obj_addOrderModel"/>
            <el-upload
                    class="cb"
                    ref="upload_addOrderModel"
                    :multiple="true"
                    list-type="picture"
                    name="tempFile"
                    :data="{}"
                    :action="Constant.ctx+'/policyDetail/uploadDetailFile.do'"
                    :auto-upload="false"
                    :file-list="array_file_addOrderModel"
                    :on-success="uploadSuccess"
                    :on-change="uploadChange"
                    :on-remove="uploadRemove">
                <button>上传附件</button>
            </el-upload>
        </Model>

        <Model
                class="correctModel"
                style_dialog="width:100%;"
                :style_body="`padding:25px 25px 10px;max-height:inherit;height:${height_window - 138}px`"
                title="订单纠偏"
                v-if="boolean_show_correctModel"
                @hide="boolean_show_correctModel=false"
                @save="confirmBtn_correctModel">

                <LabelAndValue
                        class="fl"
                        label="订单名称"
                        :isNotNull="true"
                        name="datasourceName"
                        :formObj="obj_correctModel"/>
                <LabelAndValue
                        class="fl"
                        label="订单描述"
                        :isNotNull="true"
                        name="datasourceName"
                        :formObj="obj_correctModel"/>
                <!--<LabelAndValue-->
                        <!--class="fr"-->
                        <!--label="数据源类型"-->
                        <!--type="select"-->
                        <!--:isNotNull="true"-->
                        <!--name="datasourceType"-->
                        <!--:options='Constant.array_datasourceType'-->
                        <!--:formObj="obj_addDatasourceModel"/>-->

                <LabelAndValue
                        class="fl"
                        label="订单号"
                        :isNotNull="true"
                        name="datasourceName"
                        :formObj="obj_correctModel"/>
                <LabelAndValue
                        class="fl"
                        label="订单类型"
                        :isNotNull="true"
                        name="datasourceName"
                        :formObj="obj_correctModel"/>

            <div class="cb" style="border-top: 1px #F2F2F2 solid;padding-top:20px">
                <div class="imgWrapper fl" :style="`width:calc(100% - 450px);height:${height_window - 290}px`">
                    <img
                            class="leftArrow"
                            :src="require('@/assets/image/leftArrow.png')"
                            @click="leftArrow_correctModel">
                    <img :src="src_correctModel" style="width:100%">
                    <img
                            class="rightArrow"
                            :src="require('@/assets/image/rightArrow.png')"
                            @click="rightArrow_correctModel">
                </div>
                <div class="fieldWrapper fl" :style="`width:425px;height:${height_window - 290}px`">
                    <LabelAndValue
                            label="订单类型"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型1"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型2订单类型2"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>

                    <LabelAndValue
                            label="订单类型"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型1"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型2订单类型2"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型1"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型2订单类型2"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型1"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>
                    <LabelAndValue
                            label="订单类型2订单类型2"
                            :isNotNull="true"
                            name="datasourceName"
                            :formObj="obj_correctModel"/>

                </div>
            </div>
        </Model>

        <Model
                :hideFooter="true"
                style_body="min-height:300px"
                title="订单详情"
                v-if="boolean_show_orderDetailModel"
                @hide="boolean_show_orderDetailModel=false">
            <LabelAndValue
                    label="公司"
                    type="label"
                    :value="obj_orderDetailModel.company"/>
            <LabelAndValue
                    label="类型"
                    type="label"
                    :value="obj_orderDetailModel.type"/>
            <LabelAndValue
                    label="标题"
                    type="label"
                    :value="obj_orderDetailModel.title"/>
            <LabelAndValue
                    label="说明"
                    type="label"
                    :value="obj_orderDetailModel.sm"/>
            <div class="each" v-for="(item,index) in obj_orderDetailModel.fileList">
                        <span class="name" :class="{vh:index}">
                            附件<span>：</span>
                        </span>
                <span class="aBtn" @click="openFile(item.url)">{{item.name}}</span>
            </div>
        </Model>

    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                operationType:"",
                total_policyExplain:0,
                value_search:"",
                pageSize:Constant.array_pageSize[0],
                height_window:$(window).height(),
                boolean_show_pagination:true,
                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                array_policyExplain:[],

                title_addOrderModel:"",
                boolean_show_addOrderModel:false,
                array_file_addOrderModel:[],
                array_company_addOrderModel:[],
                obj_addOrderModel:{},

                boolean_show_correctModel:false,
                obj_correctModel:{},
                src_correctModel:"",

                boolean_show_orderDetailModel:false,
                obj_orderDetailModel:{
                    company:"图之深",
                    type:"图之深1",
                    title:"图之深2",
                    sm:"图之深3",
                    fileList:[
                        {
                            name:"111.jpg",
                            url:require('@/assets/image/111.jpg')
                        },
                        {
                            name:"222.jpg",
                            url:require('@/assets/image/222.jpg')
                        }
                    ]
                }
            }
        },
        computed: {

        },
        mounted () {
            this.$nextTick(function () {
                this.getMainPageTable_pagination();
                this.getCompanyList();
            })
            $(window).resize(() => {
                var height=$(window).height();
//                if(height < 550){
//                    height = 550;
//                }
                this.height_window=height;
            })
        },
        destroyed (){
            $(window).unbind("resize");
        },
        methods: {
            openFile(url){
                window.open(url);
            },
            showModel_orderDetail(){
                this.boolean_show_orderDetailModel=true;
            },
            showModel_addOrder(){
                Util.resetObj(this.obj_addOrderModel);
                this.array_file_addOrderModel=[];
                this.operationType="add";
                this.title_addOrderModel="新增订单";
                this.boolean_show_addOrderModel=true;
            },
            showModel_updateOrder(scope){
                this.operationType="update";
                this.title_addOrderModel="修改订单";
                this.boolean_show_addOrderModel=true;
                return;
                this.obj_addPolicyModel_current=this.obj_addPolicyModel[item.index];
                var fileText=diagram.selection.first().data.fileText;
                var fileUrl=diagram.selection.first().data.fileUrl;
                var nameList=fileText?fileText.split(","):[];
                var urlList=fileUrl?fileUrl.split(","):[];
                this.array_file_addOrderModel=[];
                for(var i=0;i<nameList.length;i++){
                    this.array_file_addOrderModel.push({
                        name:nameList[i],
                        url:urlList[i],
                        fileName:nameList[i],
                        fileUrl:urlList[i],
                    })
                }
            },
            correct(scope){
                this.src_correctModel=require('@/assets/image/111.jpg');
                this.boolean_show_correctModel=true;
            },
            deleteOrder(scope){
                Util.showTipModel("确定删除该条数据吗",() => {
                    Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/delete.do",
                        {deleteStr:JSON.stringify({policyId: item.policyId})}
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                this.obj_page.pageIndex=0;
                this.getMainPageTable_pagination();
            }, response => {
                    Util.removeWaiting();
                });
            })
            },
            AI(){

            },
            getMainPageTable_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                    });
                }
                var param={
                    auditState:this.value_search
                };
                this.getMainPageTable(this.obj_page,param);
            },
            sizeChange_policyExplain(val){
                this.pageSize=val;
                this.obj_page.pageSize=val;
                this.obj_page.pageIndex=0;
                this.getMainPageTable_pagination();
            },
            currentChange_policyExplain(val){
                this.obj_page.pageIndex=val - 1;
                this.getMainPageTable_pagination();
            },
            search_mainPageTable(value){
                this.obj_page.pageIndex=0;
                this.getMainPageTable_pagination();
            },

            getMainPageTable(obj_page,param_search){
                param_search=param_search?param_search:{};
                var param={...obj_page,...param_search};
//                var param={...obj_page,queryStr:(param_search?JSON.stringify(param_search):"")};
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

            getCompanyList(param={}){
                this.$http.post(Constant.ctx+"/province/list.do",
                        {criteriaStr:JSON.stringify(param)}
                ).then(response => {
                    var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                for(var i=0;i<data.length;i++){
                    data[i].value=data[i].id;
                    data[i].label=data[i].name;
                }
                this.array_company_addOrderModel=data;
            }, response => {
                    Util.removeWaiting();
                });
            },

            confirmBtn_addOrderModel(data){
//                this.array_file_param=[];
//                this.needUploadFileCount=0;
                if (!this.array_file_addOrderModel.length) {
                    Util.showTipModel('请至少选择一个文件进行上传');
                    return;
                }
                this.boolean_show_addOrderModel=false;
                return;
                for(var i=0;i<this.array_file_addOrderModel.length;i++){
                    if(!this.array_file_addOrderModel[i].fileName){
                        this.needUploadFileCount++;
                    }
                }
                for(var i=0;i<this.array_file_addOrderModel.length;i++){
                    if(!this.array_file_addOrderModel[i].fileName){
                        this.$refs.upload_addOrderModel.submit();
                        return;
                    }
                }
                var fileText="";
                var fileUrl="";
                for(var i=0;i<this.array_file_addOrderModel.length;i++){
                    fileText+=this.array_file_addOrderModel[i].name;
                    fileUrl+=this.array_file_addOrderModel[i].url;
                    if(i != this.array_file_addOrderModel.length - 1){
                        fileText+=",";
                        fileUrl+=",";
                    }
                }
                this.obj_addPolicyModel_current.diagram.startTransaction("edit");
                this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileText", fileText);
                this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileUrl", fileUrl);
                this.obj_addPolicyModel_current.diagram.commitTransaction("edit");
                this.boolean_show_addOrderModel=false;
            },
            uploadChange(file,fileList){
//                var list=[];
//                for(var i=0;i<fileList.length;i++){
//                    if(fileList[i].fileId){
//                        list.push(fileList[i]);
//                        continue;
//                    }
//                    var type=fileList[i].name.substring(fileList[i].name.lastIndexOf(".")+1);
//                    var isWord = type === "doc" || type === "docx";
//                    var isLt2M = fileList[i].size / 1024 / 1024 < 2;
//                    if (!isWord) {
//                        Util.showTipModel('只能上传word文档!');
//                        continue;
//                    }
//                    if (!isLt2M) {
//                        Util.showTipModel('上传文件大小不能超过 2MB!');
//                        continue;
//                    }
//                    list.push(fileList[i]);
//                }
                var list=fileList;
                for(var i=0;i<list.length-1;i++){
                    for(var j=i+1;j<list.length;j++){
                        if(list[i].name == list[j].name){
                            list.splice(i,1);
                            break;
                        }
                    }
                }
                this.array_file_addOrderModel=list;
            },
            uploadRemove(file,fileList){
                this.array_file_addOrderModel=fileList;
            },
            uploadSuccess(res,file){
                console.log(res);
                this.array_file_param.push({
                    name:res.data.fileName,
                    url:res.data.fileUrl,
                })
                if(this.array_file_param.length == this.needUploadFileCount){
                    for(var i=0;i<this.array_file_addOrderModel.length;i++){
                        for(var j=0;j<this.array_file_param.length;j++){
                            if(this.array_file_addOrderModel[i].name == this.array_file_param[j].name){
                                this.array_file_addOrderModel[i].url = this.array_file_param[j].url
                            }
                        }
                    }
                    var fileText="";
                    var fileUrl="";
                    for(var i=0;i<this.array_file_addOrderModel.length;i++){
                        fileText+=this.array_file_addOrderModel[i].name;
                        fileUrl+=this.array_file_addOrderModel[i].url;
                        if(i != this.array_file_addOrderModel.length - 1){
                            fileText+=",";
                            fileUrl+=",";
                        }
                    }
                    this.obj_addPolicyModel_current.diagram.startTransaction("edit");
                    this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileText", fileText);
                    this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileUrl", fileUrl);
                    this.obj_addPolicyModel_current.diagram.commitTransaction("edit");
                    this.boolean_show_addOrderModel=false;
                }
            },

            leftArrow_correctModel(){
                this.src_correctModel=require('@/assets/image/111.jpg');
            },

            rightArrow_correctModel(){
                this.src_correctModel=require('@/assets/image/222.jpg');
            }

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

    .correctModel .imgWrapper{
        /*border: 1px red solid;*/
        padding-top:20px;
        overflow: auto;
        position: relative;
        .leftArrow{
            position: absolute;
            top:0px;
            left:0px;
            cursor: pointer;
        };
        .rightArrow{
            position: absolute;
            top:0px;
            right:0px;
            cursor: pointer;
        }
    }

    .correctModel .fieldWrapper{
        overflow: auto;
        margin-left:10px;
        padding-right:5px;
    }

</style>
