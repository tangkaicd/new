<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                政策筹划库列表
            </div>
            <div class="body1">
                <div class="header11">
                    <!--<span>政策分类：</span>-->
                    <!--<el-select-->
                            <!--v-model="policyCategory_search"-->
                            <!--placeholder="请选择"-->
                            <!--@change="selectPolicyCategory_search">-->
                        <!--<el-option-->
                                <!--v-for="item in array_options_policyCategory"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <!--<el-date-picker-->
                            <!--class="cm-lr"-->
                            <!--v-model="date_search"-->
                            <!--type="date"-->
                            <!--placeholder="请选择发布时间">-->
                    <!--</el-date-picker>-->
                    <Search
                            placeholder="请输入关键字查询"
                            v-model="value_search"
                            @search="searchPolicyExplain"
                    />
                    <div class="fr" style="margin-top: 8px;margin-right: 10px;">
                        <span class="addBtn_small" @click="showAddCategoryModel">
                            <span class="fa fa-plus"></span><span class="name">新增分类</span>
                        </span>
                        <span class="updateBtn_small"  @click="showUpdateCategoryModel" style="margin: 0px 10px;">
                            <span class="fa fa-edit"></span><span class="name">修改分类</span>
                        </span>
                        <span class="deleteBtn_small" @click="deleteNode">
                            <span class="fa fa-trash-o"></span><span class="name">删除</span>
                        </span>
                    </div>
                </div>
                <div class="body11">
                    <div class="leftWrapper">
                        <div class="body111">
                            <vue-tree
                                    :tree-data="array_tree"
                                    :options="obj_options_tree"
                                    @handle="nodeIsClicked">
                            </vue-tree>
                        </div>
                    </div>
                    <div class="rightWrapper">
                        <div class="header112">
                            <div class="fr">
                                <span class="addBtn_small" @click="showAddPolicyModel">
                                    <span class="fa fa-plus"></span><span class="name">新增解读</span>
                                </span>
                                <span class="updateBtn_small" @click="showUpdatePolicyExplainModel" style="margin: 0px 10px;">
                                    <span class="fa fa-edit"></span><span class="name">修改解读</span>
                                </span>
                            </div>
                        </div>
                        <div class="body112">
                            <div class="body1121">
                                <el-table
                                        :data="array_policyExplain"
                                        height="300"
                                        border
                                        highlight-current-row
                                        @current-change="selectPolicyExplainTableRow"
                                        style="width: 100%;text-align: center">
                                    <el-table-column
                                            type="index"
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
                                            prop="fileState"
                                            label="文件状态">
                                    </el-table-column>
                                    <el-table-column
                                            label="操作">
                                        <template slot-scope="scope">
                                            <span class="deleteBtn_small" @click="deletePolicyDetail(scope.row)">
                                                <span class="fa fa-trash-o"></span><span class="name">删除</span>
                                            </span>
                                            <span style="margin-left:5px" class="btn_small" @click="showQueryPolicyExplainModel(scope)">
                                                <span class="fa fa-trash-o"></span><span class="name">查看</span>
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
                                        :page-size="Constant.array_pageSize[0]"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total_policyExplain">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Model
                :title="title_addCategoryModel"
                :formObj="obj_addCategoryModel"
                v-if="boolean_show_addCategoryModel"
                @hide="boolean_show_addCategoryModel=false"
                @save="confirmBtn_addCategoryModel">
            <!--<LabelAndValue-->
                    <!--label="税务政策解读分类编码"-->
                    <!--:disabled="true"-->
                    <!--name="plotCategoryCode"-->
                    <!--:formObj="obj_addCategoryModel"/>-->
            <LabelAndValue
                    label="税务政策解读分类名称"
                    :isNotNull="true"
                    name="plotCategoryName"
                    :formObj="obj_addCategoryModel"/>
            <LabelAndValue
                    v-if="boolean_showIsLeafRadio_addCategoryModel"
                    label="是否叶子结点"
                    type="radio"
                    :isNotNull="true"
                    name="isLeaf"
                    :radio="Constant.array_yesOrNo"
                    :formObj="obj_addCategoryModel"/>
        </Model>

        <Model
                style_model="z-index:2000"
                title="策划方案名称输入"
                :formObj="obj_planSchemeNameModel"
                v-if="boolean_show_planSchemeNameModel"
                @hide="boolean_show_planSchemeNameModel=false"
                @save="confirmBtn_planSchemeNameModel">
            <LabelAndValue
                    label="策划方案名称"
                    :isNotNull="true"
                    name="name"
                    :formObj="obj_planSchemeNameModel"/>
        </Model>

        <Model
                class="addPolicyModel"
                style_body="padding-left:0px;padding-top:0px;height: 460px;"
                style_header="padding-bottom:20px;padding-top:0px"
                :title="title_addPolicyModel"
                :formObj="obj_addPolicyModel"
                v-if="boolean_show_addPolicyModel"
                @hide="boolean_show_addPolicyModel=false"
                @save="confirmBtn_addPolicyModel">
            <el-tabs v-model="tabsValue"
                     tab-position="left"
                     @tab-click="tabClick_addPolicyModel"
                     style="height: 430px;width:1000px">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in obj_addPolicyModel"
                        :label="item.title"
                        :name="item.name"
                >
                    <div v-if="item.name == 'basicInfo'">
                        <LabelAndValue
                                style="margin-top:15px"
                                label="解读分类"
                                type="label"
                                :labelWidth="140"
                                :value="plotCategoryName_addPolicyModel"/>
                        <LabelAndValue
                                style="margin-top:15px"
                                label="解读标题"
                                type="textarea"
                                :isNotNull="true"
                                width="600"
                                name="explainTitle"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="解读描述"
                                type="textarea"
                                :isNotNull="true"
                                width="600"
                                name="explainDesc"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="使用场景"
                                type="textarea"
                                :isNotNull="true"
                                width="600"
                                name="explainScene"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="文件状态"
                                type="radio"
                                :isNotNull="true"
                                name="fileState"
                                :radio="Constant.array_fileStatus"
                                :formObj="item.basicInfo"/>

                    </div>
                    <div v-else class="planScheme">
                        <el-tabs
                                v-model="tabsValue_planScheme"
                                @tab-click="tabClick_planScheme_addPolicyModel">
                            <el-tab-pane
                                    :key="item_planScheme.name"
                                    v-for="(item_planScheme, index) in item.planScheme"
                                    :label="item_planScheme.title"
                                    :name="item_planScheme.name"
                            >
                                <div class="busLogic dynamicTableWrapper" v-if="item_planScheme.name == 'businessLogic'">
                                    <div style="margin-bottom: 10px">
                                        <span class="btn_small" @click="addRow_addPolicyModel">
                                            <span class="fa fa-plus"></span>增加行
                                        </span>
                                        <span class="btn_small" @click="addColumn_addPolicyModel" style="margin:0 15px">
                                            <span class="fa fa-plus"></span>增加列
                                        </span>
                                        <span class="deleteBtn_small" @click="deleteRow_addPolicyModel">
                                            <span class="fa fa-trash-o"></span><span class="name">删除行</span>
                                        </span>
                                        <span class="deleteBtn_small" @click="deleteColumn_addPolicyModel" style="margin-left:15px">
                                            <span class="fa fa-trash-o"></span><span class="name">删除列</span>
                                        </span>
                                    </div>
                                    <div class="tableWrapper">
                                        <table class="dynamicTable">
                                            <tr>
                                                <td>
                                                    序号
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="项目">
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="内容">
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="政策说明">
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="参考政策">
                                                </td>
                                            </tr>
                                            <tr  style="cursor:pointer;">
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <textarea class="textarea_relation" style="width: calc(100% - 20px);height:80px">

                                                    </textarea>
                                                </td>
                                                <td style="width: 250px">
                                                    <textarea class="textarea_dynamicTable" style="width: calc(100% - 20px);height:80px">

                                                    </textarea>
                                                </td>
                                                <td style="width: 250px">
                                                    <textarea class="textarea_dynamicTable" style="width: calc(100% - 20px);height:80px">

                                                    </textarea>
                                                </td>
                                                <td>
                                                    <span class="selectPolicyBtn" style="background:#45b6af;padding:2px 5px;color:#fff;border-radius: 3px;cursor:pointer;font-size:12px;">
                                                        <span class="fa fa-plus"></span>选择政策
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                                <div class="calcLogic dynamicTableWrapper" v-else>
                                    <div style="margin-bottom: 15px">
                                        <span class="btn_small addRow" @click="addRow_addPolicyModel_calcLogic">
                                            <span class="fa fa-plus"></span>增加行
                                        </span>
                                        <span class="btn_small" @click="addColumn_addPolicyModel_calcLogic" style="margin:0 15px">
                                            <span class="fa fa-plus"></span>增加列
                                        </span>
                                        <span class="deleteBtn_small" @click="deleteRow_addPolicyModel">
                                            <span class="fa fa-trash-o"></span><span class="name">删除行</span>
                                        </span>
                                        <span class="deleteBtn_small" @click="deleteColumn_addPolicyModel" style="margin-left:15px">
                                            <span class="fa fa-trash-o"></span><span class="name">删除列</span>
                                        </span>
                                    </div>
                                    <div class="tableWrapper">
                                        <table class="dynamicTable">
                                            <tr>
                                                <td>
                                                    序号
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="项目">
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="内容">
                                                </td>
                                                <td>
                                                    <input style="text-align: center;border:none;width:120px" type="text" value="政策说明">
                                                </td>
                                            </tr>
                                            <tr  style="cursor:pointer;">
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <textarea class="textarea_dynamicTable" style="width: calc(100% - 20px);height:80px">

                                                    </textarea>
                                                </td>
                                                <td style="width: 250px">
                                                    <textarea class="textarea_dynamicTable" style="width: calc(100% - 20px);height:80px">

                                                    </textarea>
                                                </td>
                                                <td style="width: 250px">
                                                    <textarea class="textarea_dynamicTable" style="width: calc(100% - 20px);height:80px">

                                                    </textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <span class="btn_small addPlanSchemeBtn" @click="addPlanScheme">
                <span class="fa fa-plus"></span>
            </span>
            <span class="deleteBtn_small deletePlanSchemeBtn" @click="deletePlanScheme">
                <span class="fa fa-trash-o"></span>
            </span>
        </Model>

        <Model
                class="addPolicyModel queryPolicyModel"
                :hideFooter="true"
                style_body="padding-left:0px;padding-top:0px;height: 430px;"
                :title="title_addPolicyModel"
                :formObj="obj_addPolicyModel"
                v-if="boolean_show_queryPolicyModel"
                @hide="boolean_show_queryPolicyModel=false">
            <el-tabs v-model="tabsValue"
                     tab-position="left"
                     @tab-click="tabClick_addPolicyModel"
                     style="height: 400px;width:1000px">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in obj_addPolicyModel"
                        :label="item.title"
                        :name="item.name"
                >
                    <div v-if="item.name == 'basicInfo'">
                        <LabelAndValue
                                style="margin-top:15px"
                                :disabled="true"
                                label="解读分类"
                                type="label"
                                :labelWidth="140"
                                :value="plotCategoryName_addPolicyModel"/>
                        <LabelAndValue
                                style="margin-top:15px"
                                :disabled="true"
                                label="解读标题"
                                type="textarea"
                                :isNotNull="true"
                                width="600"
                                name="explainTitle"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="解读描述"
                                :disabled="true"
                                type="textarea"
                                :isNotNull="true"
                                width="600"
                                name="explainDesc"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="使用场景"
                                :disabled="true"
                                type="textarea"
                                :isNotNull="true"
                                width="600"
                                name="explainScene"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="文件状态"
                                :disabled="true"
                                type="radio"
                                :isNotNull="true"
                                name="fileState"
                                :radio="Constant.array_fileStatus"
                                :formObj="item.basicInfo"/>

                    </div>
                    <div v-else>
                        <el-tabs v-model="tabsValue_planScheme">
                            <el-tab-pane
                                    :key="item_planScheme.name"
                                    v-for="(item_planScheme, index) in item.planScheme"
                                    :label="item_planScheme.title"
                                    :name="item_planScheme.name"
                            >
                                <div class="busLogic dynamicTableWrapper" v-if="item_planScheme.name == 'businessLogic'">
                                    <div class="tableWrapper">
                                        <table class="dynamicTable">
                                            <tr>
                                                <td>
                                                    序号
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="项目">
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="内容">
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="政策说明">
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="参考政策">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <textarea disabled style="width:100px;height:50px">

                                                    </textarea>
                                                </td>
                                                <td>
                                                    <textarea disabled style="width:100px;height:50px">

                                                    </textarea>
                                                </td>
                                                <td>
                                                    <textarea disabled style="width:100px;height:50px">

                                                    </textarea>
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                                <div class="calcLogic dynamicTableWrapper" v-else>
                                    <div class="tableWrapper">
                                        <table class="dynamicTable">
                                            <tr>
                                                <td>
                                                    序号
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="项目">
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="内容">
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="政策说明">
                                                </td>
                                                <td>
                                                    <input disabled style="text-align: center;border:none;width:120px" type="text" value="参考政策">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <textarea disabled style="width:100px;height:50px">

                                                    </textarea>
                                                </td>
                                                <td>
                                                    <textarea disabled style="width:100px;height:50px">

                                                    </textarea>
                                                </td>
                                                <td>
                                                    <textarea disabled style="width:100px;height:50px">

                                                    </textarea>
                                                </td>
                                                <td>

                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </Model>

        <div class="selectPolicyModel model">
            <div class="dialog">
                <div class="header">
                    <span class="circle"></span>
                    <span class="title">参考政策列表</span>
                    <span class="close"></span>
                </div>
                <div class="body">
                    <!--<div class="searchWapper">-->
                        <!--<input class="searchInput queryLikeVal" type="text" placeholder="请输入编号或名称进行查询">-->
                        <!--<span class="search"></span>-->
                    <!--</div>-->

                    <div class="tableWrapper">
                        <table>


                        </table>
                    </div>

                </div>
                <div class="footer">
                    <button class="cancel-btn">取消</button>
                    <button class="confirm-btn">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tree from '@/json/tree.json';
    export default {
        components: {

        },
          data () {
            return {
                total_policyExplain:0,
                tabsValue:"basicInfo",
                tabsValue_planScheme:"businessLogic",
                labelWidth_policyDetail:140,
                operationType:"",
                date_search:"",
                key_search:"",
                policyCategory_search:"",
                title_addCategoryModel:"",
                title_addPolicyModel:"",
                value_search:"",
                plotCategoryName_addPolicyModel:"",

                boolean_show_pagination:true,
                boolean_show_addCategoryModel:false,
                boolean_show_addPolicyModel:false,
                boolean_showIsLeafRadio_addCategoryModel:true,
                boolean_show_queryPolicyModel:false,
                boolean_show_planSchemeNameModel:false,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_tabClick_addPolicyModel:"",
                obj_tabClick_planScheme_addPolicyModel:"",
                obj_clickedNode:"",
                obj_options_tree: {
                    checkbox: false,
                    show_labelIcon: true,
                    //            depthOpen: 100
                },
                obj_policyDetail:{},
                obj_addCategoryModel:{
                    plotCategoryCode:"",
                    plotCategoryName:"",
                    isLeaf:Constant.array_yesOrNo[0].value
                },
                obj_planSchemeNameModel:{
                    name:""
                },
                obj_addPolicyModel_basic:[{
                    title: "基础信息",
                    name: "basicInfo",
                    basicInfo:{
                        explainTitle: "",
                        explainDesc: "",
                        explainScene: "",
                        fileState: Constant.array_fileStatus[0].value
                    }
                }],
                obj_addPolicyModel:[{
                    title: "基础信息",
                    name: "basicInfo",
                    basicInfo:{
                        explainTitle: "",
                        explainDesc: "",
                        explainScene: "",
                        fileState: Constant.array_fileStatus[0].value
                    }
                }, {
                    title: "策划方案1",
                    name: this.Util.uuid(),
                    planScheme:[
                        {
                            title: "业务逻辑",
                            name: "businessLogic",
                            content:{
                                msg: "业务逻辑"
                            }
                        },
                        {
                            title: "计算逻辑",
                            name: "calculateLogic",
                            content:{
                                msg: "计算逻辑"
                            }
                        }
                    ]
                }],
                obj_commonCategoryNode:{
                    "labelIcon": require("@/assets/image/folder.png"),
                    "isCategory":true,
                    "isClicked":false,
                },
                obj_commonPolicyNode:{
                    "labelIcon": require("@/assets/image/file.png"),
                    "isCategory":false,
                    "isClicked":false,
                },
                obj_selectedPolicyExplainTableRow:"",

                array_options_policyCategory:[{value:1,label:"房产税"},{value:2,label:"个人所得税"}],
                array_tree: [],
                array_file_addPolicyModel:[],
                array_policyExplain:[],

                $clickedSelectPolicyBtn_addPolicyModel:""
//                fileList3: [{
//                    name: 'food.jpeg',
//                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//                }, {
//                    name: 'food2.jpeg',
//                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
//                }],

//                props_addCategoryModel:[
//                    {
//                        label:"税务分类编码",
//                        isNotNull:false,
//                        disabled:true,
//                        name:"a"
//                    },
//                    {
//                        label:"税务分类名称",
//                        isNotNull:true,
//                        name:"aa"
//                    },
//                    {
//                        label:"上一层结点",
//                        value:1,
//                        options:[{value:1,label:"房产税"},{value:2,label:"个人所得税"}],
//                        type:"select",
//                        isNotNull:true,
//                        name:"aaa"
//                    }
//                ],

            }
          },
        computed: {
            issueTime_policyDetail: function () {
                return `从${this.obj_policyDetail.issueTimeBegin}到${this.obj_policyDetail.issueTimeEnd}`;
            },
            issueDepartment_policyDetail: function () {
                return `${this.obj_policyDetail.county}>${this.obj_policyDetail.province}>${this.obj_policyDetail.city}`;
            },
        },
        mounted () {
            var _this=this;
            var $selectPolicyModel=$(".selectPolicyModel");
            this.$nextTick(function () {
                this.queryByCriteria();
            })
            var boolean_dragTextarea_dynamicTable=false;
            var previousWidth;
            var previousHeight;
            $("body").on("mousedown",".dynamicTable textarea",function(){
                boolean_dragTextarea_dynamicTable=true;
            });
            $("body").on("mouseup",".dynamicTable textarea",function(){
                boolean_dragTextarea_dynamicTable=false;
            });
            $("body").on("mousemove",".dynamicTable textarea",function(){
//                if(!_this.boolean_dragTextarea_dynamicTable){
//                    return;
//                }
                var offsetWidth=$(this).width();
//                var scrollWidth=$(this)[0].scrollWidth;
                var offsetHeight=$(this).height();
//                var scrollHeight=$(this)[0].scrollHeight;
                console.log(offsetWidth);
                if(offsetWidth == previousWidth && offsetHeight == previousHeight){
//                    return;
                }
                previousWidth=offsetWidth;
                previousHeight=offsetHeight;
                console.log(22222222222222222);
                var $tr=$(this).parents("tr");
                var cellIndex=$(this).parent("td")[0].cellIndex;
                var $table=$(this).parents("table");
                $(this).parents("td").siblings("td").find("textarea").width(offsetWidth);
                $table.find("tr").each(function () {
                    $(this).find("td").eq(cellIndex).find("textarea").height(offsetHeight);
                })
            });
            $("body").on("change",".dynamicTable input",function(){
                $(this).attr("value",$(this).val());
            })
            $("body").on("change",".dynamicTable textarea",function(){
                $(this).html($(this).val());
            })
            $("body").on("change",".dynamicTable .textarea_relation",function(){
                var index=$(this).parents("tr").find("td").eq(0).text();
                var aa=$(this).parents(".dynamicTableWrapper").siblings(".calcLogic").find(".dynamicTable");
            })
            $("body").on("click",".dynamicTable .selectPolicyBtn",function(){
                if(!_this.boolean_show_queryPolicyModel){
                    _this.$clickedSelectPolicyBtn_addPolicyModel=$(this);
                    _this.updateTable_selectPolicyModel();
                }
            })
            $("body").on("click",".dynamicTable tr:not(:first-child)",function(){
                $(this).siblings("tr").removeClass("trIsSelected");
                $(this).addClass("trIsSelected");
            })
            $("body").on("click",".dynamicTable .deletableColumn",function(){
                var $dynamicTable=$(this).parents(".dynamicTable");
                $dynamicTable.find("td").removeClass("tdIsSelected");
                $(this).addClass("tdIsSelected");
                var index;
                $dynamicTable.find("tr").eq(0).find("td").each(function (index1) {
                    if($(this).hasClass("tdIsSelected")){
                        index=index1;
                    }
                })
                $dynamicTable.find("tr").each(function () {
                    $(this).find("td").eq(index).addClass("tdIsSelected")
                })
            })

            $selectPolicyModel.on("click",".dialog > .body table tr",function(){
//                $(this).siblings("tr").removeClass("checked_tr");
                $(this).addClass("checked_tr");
            });

            $selectPolicyModel.on("dblclick",".dialog > .body table tr",function(){
                var policyTitle=$(this).attr("data-policyTitle");
                var innerHTML='<span class="selectPolicyBtn" style="color: #3996f5;cursor:pointer;font-size:12px;">'
                        +policyTitle
                        +'</span>';
                _this.$clickedSelectPolicyBtn_addPolicyModel.parents("td").html(innerHTML);
                $selectPolicyModel.hide();
            });
            $selectPolicyModel.on("click",".footer .confirm-btn",function(){
                var $checkedTr=$selectPolicyModel.find("table .checked_tr");
                if(!$checkedTr.length){
                    Util.showTipModel("请至少选择一条数据");
                    return;
                }
                var policyTitle="";
                $checkedTr.each(function () {
                    policyTitle+=$(this).attr("data-policyTitle")+","
                })
                policyTitle=policyTitle.slice(0,policyTitle.length-1);
                var innerHTML='<span class="selectPolicyBtn" style="color: #3996f5;cursor:pointer;font-size:12px;">'
                        +policyTitle
                        +'</span>';
                _this.$clickedSelectPolicyBtn_addPolicyModel.parents("td").html(innerHTML);
                $selectPolicyModel.hide();
            });
            this.queryPolicyExplain(this.obj_page);
        },
        methods: {
            queryPolicyExplain_pagination(){
                this.boolean_show_pagination = false;
                this.$nextTick(() => {
                    this.boolean_show_pagination = true;
                });
                var param={
                    queryLikeName:this.value_search,
                    plotCategoryPath:this.obj_clickedNode?this.obj_clickedNode.plotCategoryCode:""
                };
                this.queryPolicyExplain(Object.assign({},param,this.obj_page));
            },
            sizeChange_policyExplain(val){
                this.obj_page.pageSize=val;
                this.queryPolicyExplain_pagination();
            },
            currentChange_policyExplain(val){
                this.obj_page.pageIndex=val - 1;
                this.queryPolicyExplain_pagination();
            },
            selectPolicyExplainTableRow(val){
                this.obj_selectedPolicyExplainTableRow=val;
            },
            updateTable_selectPolicyModel(pageIndex,pageSize,paramList){
                var $selectPolicyModel=$(".selectPolicyModel");
                var param={
        //                    pageIndex:pageIndex,
        //                    pageSize:pageSize,
        //                    queryLikeVal:paramList?paramList[0]:"",
                }
                Util.makeWaiting();
                $.ajax({
                    type : 'post',
                    url : Constant.ctx+'/policyDetail/queryPageList.do',
                    data : param,
                    success : function(result){
                        Util.removeWaiting();
                        if(!result.success){
                            Util.showTipModel(result.msg);
                            return;
                        }
                        console.log(result);
        //                        global.total=result.total;
        //                        var total=result.total;
        //                        var totalPage=(total%pageSize)?(parseInt(total/pageSize)+1):(parseInt(total/pageSize))
        //                        var $footer=$listModel.find(".footer-searchList");
        //                        $footer.find(".total").html(total);
        //                        $footer.find(".pageSize").html(pageSize);
        //                        $footer.find(".pageIndex").val(pageIndex+1);
        //                        $footer.find(".totalPage").html(totalPage);
                        result=result.data;
                        $selectPolicyModel.find("table").empty();
                        var str='<tr style="background: #F2F2F2">'
                                +'<td>序号</td><td>政策名称</td>'
                                +'</tr>'
                        for(var i=0;i<result.length;i++){
                            var policyTitle=result[i].policyTitle;
                            if(Util.isNull(policyTitle)){
                                continue;
                            }
                            str+='<tr data-policyTitle="'+result[i].policyTitle+'">'
                                    +'<td>'+(i+1)+'</td>'
                                    +'<td>'+policyTitle+'</td>'
                        }
                        $selectPolicyModel.find("table").append(str);
                        $selectPolicyModel.show();
                    }
                })
            },

        //增加行
        addRow_addPolicyModel(e){
            var obj= $(e.currentTarget).parents(".dynamicTableWrapper").find(".dynamicTable")[0];
            var rowCount = obj.rows.length;
            var cellCount = obj.rows[0].cells.length;
            var tRow = obj.insertRow( rowCount );
            tRow.style.cursor="pointer";
            for( var i=0; i< cellCount ; i++ ) {
                var width=$(obj.rows[obj.rows.length - 2]).find("td").eq(i).find("textarea").width();
                var tCell = tRow.insertCell( i );
                var textareaClass="";
                if(i == 1){
                    textareaClass="textarea_relation";
                }
                var innerHTML='<textarea class="'+textareaClass+'" style="width:'+width+'px;height:80px"></textarea>';
                if(i == 0){
                    innerHTML=rowCount;
                }
                if(i == cellCount - 1){
                    innerHTML='<span class="selectPolicyBtn" style="background:#45b6af;padding:2px 5px;color:#fff;border-radius: 3px;cursor:pointer;font-size:12px;">'
                            +'<span class="fa fa-plus"></span>选择政策'
                            +'</span>';
                }
                tCell.innerHTML = innerHTML;
            }
        },
        addRow_addPolicyModel_calcLogic(e){
            var obj= $(e.currentTarget).parents(".dynamicTableWrapper").find(".dynamicTable")[0];
            var rowCount = obj.rows.length;
            var cellCount = obj.rows[0].cells.length;
            var tRow = obj.insertRow( rowCount );
            tRow.style.cursor="pointer";
            for( var i=0; i< cellCount ; i++ ) {
                var width=$(obj.rows[obj.rows.length - 2]).find("td").eq(i).find("textarea").width();
                var tCell = tRow.insertCell( i );
                var innerHTML='<textarea class="textarea_dynamicTable" style="width:'+width+'px;height:80px"></textarea>';
                if(i == 0){
                    innerHTML=rowCount;
                }
                tCell.innerHTML = innerHTML;
            }
        },
            deleteRow_addPolicyModel(e){
                var isSelected=false;
                $(e.target).parents(".dynamicTableWrapper").find(".dynamicTable tr").each(function () {
                    if($(this).hasClass("trIsSelected")){
                        isSelected=true;
                        $(this).remove();
                        return;
                    }
                })
                if(!isSelected){
                    Util.showTipModel("请先选中一行");
                    return;
                }else{
                    $(e.target).parents(".dynamicTableWrapper").find(".dynamicTable tr:not(:first-child)").each(function(index){
                        $(this).find("td").eq(0).html(index + 1);
                    })

                }
            },

        //增加列
        addColumn_addPolicyModel(e){
            var obj= $(e.currentTarget).parents(".dynamicTableWrapper").find(".dynamicTable")[0];
            var rowCount = obj.rows.length;
            var cellCount = obj.rows[0].cells.length;
            for( var i=0; i<rowCount; i++ )
            {
                var tRow = obj.rows[i];
                var height=$(tRow).find("textarea").height();
                var tCell = tRow.insertCell( cellCount-1 );
                var innerHTML='<textarea class="textarea_dynamicTable" style="width:calc(100% - 20px);height:'+height+'px"></textarea>';
                if(i == 0){
                    tCell.style.cursor="pointer";
                    tCell.className += 'deletableColumn';
                    innerHTML='<input style="cursor:pointer;text-align: center;border:none;width:120px" type="text">';
                }
                tCell.innerHTML = innerHTML;

            }
        },
            addColumn_addPolicyModel_calcLogic(e){
                var obj= $(e.currentTarget).parents(".dynamicTableWrapper").find(".dynamicTable")[0];
                var rowCount = obj.rows.length;
                var cellCount = obj.rows[0].cells.length;
                for( var i=0; i<rowCount; i++ )
                {
                    var tRow = obj.rows[i];
                    var height=$(tRow).find("textarea").height();
                    var tCell = tRow.insertCell( cellCount );
                    var innerHTML='<textarea class="textarea_dynamicTable" style="width:calc(100% - 20px);height:'+height+'px"></textarea>';
                    if(i == 0){
                        tCell.style.cursor="pointer";
                        tCell.className += 'deletableColumn';
                        innerHTML='<input style="cursor:pointer;text-align: center;border:none;width:120px" type="text">';
                    }
                    tCell.innerHTML = innerHTML;

                }
            },
            deleteColumn_addPolicyModel(e){
                var $dynamicTable=$(e.target).parents(".dynamicTableWrapper").find(".dynamicTable");
                if(!$dynamicTable.find(".tdIsSelected").length){
                    Util.showTipModel("请先选中一列");
                    return;
                }
                $dynamicTable.find(".tdIsSelected").remove();
            },
            tabClick_addPolicyModel(item){
                this.tabsValue_planScheme="businessLogic";
                this.obj_tabClick_addPolicyModel=item;
                this.obj_tabClick_planScheme_addPolicyModel="";
            },
            tabClick_planScheme_addPolicyModel(item){
                if(item.name == "calculateLogic" && (!this.obj_tabClick_planScheme_addPolicyModel || this.obj_tabClick_planScheme_addPolicyModel.name != item.name)){
                    var index=(this.obj_tabClick_addPolicyModel.index-1)*2;
                    var list=[];
                    $(".dynamicTable").eq(index).find("tr").each(function(index){
                        if(index != 0){
                            var val=$(this).find("td").eq(1).find("textarea").val();
                            list.push(val);
                        }
                    })
                    var $calcTable=$(".dynamicTable").eq(index+1);
                    if($calcTable.find("tr").length < list.length || $calcTable.find("tr").length == list.length){
                        for(var i=0;i< (list.length - $calcTable.find("tr").length +1);i++){
                            this.$nextTick(function () {
                                $calcTable.parents(".calcLogic").find(".addRow").trigger("click");
                            })
                        }
                    }
                    this.$nextTick(function () {
                        $calcTable.find("tr").each(function (index) {
                            if(index != 0){
                                $(this).find("td").eq(1).find("textarea").val(list[index - 1]);
                            }
                        })
                    })
                }
//                console.log(item);
//                alert($(".dynamicTable").length)
                this.obj_tabClick_planScheme_addPolicyModel=item;
            },
            addPlanScheme(){
                Util.resetObj(this.obj_planSchemeNameModel);
                this.boolean_show_planSchemeNameModel=true;
            },
            confirmBtn_planSchemeNameModel(data){
                for(var i=0;i<this.obj_addPolicyModel.length;i++){
                    if(this.obj_addPolicyModel[i].title == data.name){
                        Util.showTipModel("策划名字重复，请重新输入");
                        return;
                    }
                }
                this.obj_addPolicyModel.push({
                    title: data.name,
                    name: this.Util.uuid(),
                    planScheme:[
                        {
                            title: "业务逻辑",
                            name: "businessLogic",
                            content:{
                                msg: "业务逻辑"
                            }
                        },
                        {
                            title: "计算逻辑",
                            name: "calculateLogic",
                            content:{
                                msg: "计算逻辑"
                            }
                        }
                    ]
                });
                this.updatePs_addPlanSchemeBtn();
                this.boolean_show_planSchemeNameModel=false;
            },
            deletePlanScheme(){
                if(!this.obj_tabClick_addPolicyModel || this.obj_tabClick_addPolicyModel.name == "basicInfo"){
                    Util.showTipModel("不能删除基础信息标签");
                    return;
                }
                for(var i=0;i<this.obj_addPolicyModel.length;i++){
                    if(this.obj_addPolicyModel[i].name == this.obj_tabClick_addPolicyModel.name){
                        this.obj_addPolicyModel.splice(i,1);
                        break;
                    }
                }
                this.updatePs_addPlanSchemeBtn();
            },
            queryByCriteria(criteria = ""){
//                Util.makeWaiting();
//                $.ajax({
//                    type : "POST",
//                    url : Constant.ctx+"/policyCategory/queryByCriteria",
//                    data: {criteriaStr:""},
//                    success : function(result) {
//                        console.log(result);
//                        Util.removeWaiting();
//                        if(result.success){
//
//                        }else{
//                            Util.showTipModel(result.msg);
//                        }
//                    },
//                    error:function(XMLHttpRequest){
//                        Util.removeWaiting();
//                        if(XMLHttpRequest.status == 404){
//                            Util.showTipModel("请求资源不存在!");
//                        }
//                        if(XMLHttpRequest.status == 500){
//                            Util.showTipModel("服务器内部错误，无法加载数据!");
//                        }
//                        if((XMLHttpRequest.status != 404) && (XMLHttpRequest.status != 500)){
//                            Util.showTipModel("很抱歉，服务异常!");
//                        }
//                    }
//                });
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyPlotCategory/queryByCriteria.do",
                        {criteriaStr: JSON.stringify(criteria)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                     console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    if(criteria){
                        if(data.categoryList){
                            for(var i=0;i<data.categoryList.length;i++){
                                var obj_commonNode=this.obj_commonCategoryNode;
                                if(data.categoryList[i].isLeaf){
                                    obj_commonNode=this.obj_commonPolicyNode;
                                }
                                this.addChildNodeOfId({
                                    parentId:this.obj_clickedNode.id,
                                    childNode:data.categoryList[i],
                                    childNodeName:data.categoryList[i].plotCategoryName,
                                    childNodeId:data.categoryList[i].plotCategoryId,
                                    tree:this.array_tree,
                                    obj_commonNode:obj_commonNode,
                                });
                            }
                        }
//                        if(data.policyExplanList){
//                            for(var i=0;i<data.policyExplanList.length;i++){
//                                this.addChildNodeOfId({
//                                    parentId:this.obj_clickedNode.id,
//                                    childNode:data.policyExplanList[i],
//                                    childNodeName:data.policyExplanList[i].explainTitle,
//                                    childNodeId:data.policyExplanList[i].explainId,
//                                    tree:this.array_tree,
//                                    obj_commonNode:this.obj_commonPolicyNode,
//                                });
//                            }
//                        }
                    }else{
                        for(var i=0;i<data.categoryList.length;i++){
                            data.categoryList[i]=Object.assign({
                                "label": data.categoryList[i].plotCategoryName,
                                "id": data.categoryList[i].plotCategoryId,
                            },this.obj_commonCategoryNode,data.categoryList[i])
                        }
                        this.array_tree=data.categoryList;
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            addCategory(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyPlotCategory/add.do",
                        {addStr: JSON.stringify(param)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    if(this.obj_clickedNode){
                        var obj_commonNode=this.obj_commonCategoryNode;
                        if(data.isLeaf){
                            obj_commonNode=this.obj_commonPolicyNode;
                        }
                        this.addChildNodeOfId({
                            parentId:this.obj_clickedNode.id,
                            childNode:data,
                            childNodeName:data.plotCategoryName,
                            childNodeId:data.plotCategoryId,
                            tree:this.array_tree,
                            obj_commonNode:obj_commonNode,
                        });
                    }else{
                        this.array_tree.push(Object.assign({
                            "label": param.plotCategoryName,
                            "id": data.plotCategoryId,
                            "plotCategoryLevel": 1,
                        },this.obj_commonCategoryNode,data));
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            addPolicyDetail(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/add.do",
                        {addStr:JSON.stringify(param)}
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
                    this.queryPolicyExplain_pagination();
                }, response => {
                    Util.removeWaiting();
                });
            },
            updatePolicyDetail(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/edit.do",
                        {editStr:JSON.stringify(param)}
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
                    this.queryPolicyExplain_pagination();
                }, response => {
                    Util.removeWaiting();
                });
            },
            deletePolicyDetail(item){
                Util.showTipModel("确定删除该条数据",() => {
                    Util.makeWaiting();
                    this.$http.post(Constant.ctx+"/policyExplain/delete.do",
                            {explainCode:item.explainCode}
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
                        this.queryPolicyExplain_pagination();
                    }, response => {
                        Util.removeWaiting();
                    });
                })
            },
            updateCategory(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyPlotCategory/edit.do",
                        {editStr: JSON.stringify(param)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    this.obj_clickedNode=Object.assign(this.obj_clickedNode,param,{"label": param.plotCategoryName})
                }, response => {
                    Util.removeWaiting();
                });
            },
//            updatePolicyDetail(policyDetail,fileList=[]){
//                Util.makeWaiting();
//                this.$http.post(Constant.ctx+"/policyDetail/edit.do",
//                        {editStr:JSON.stringify({policyDetail: policyDetail,fileList: fileList})}
//                ).then(response => {
//                    Util.removeWaiting();
//                    var result = response.body;
//                    console.log(result);
//                    if(!result.success){
//                        Util.showTipModel(result.msg);
//                        return;
//                    }
//                    var data=result.data;
//                    this.obj_clickedNode=Object.assign(this.obj_clickedNode,policyDetail,{"label": policyDetail.policyTitle})
//                }, response => {
//                    Util.removeWaiting();
//                });
//            },
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
                        data[i].fileState=Constant.obj_fileStatus[data[i].fileState];
                    }
                    this.array_policyExplain=data;
                }, response => {
                    Util.removeWaiting();
                });
            },
            showUpdatePolicyExplainModel(){
                if(!this.obj_selectedPolicyExplainTableRow){
                    Util.showTipModel("请先选中政策解读表格中的一行");
                    return;
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/queryPlainByCode.do",
                        {explainCode:this.obj_selectedPolicyExplainTableRow.explainCode}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    this.title_addPolicyModel="修改税务政策解读信息";
                    this.operationType="update";
                    this.boolean_show_addPolicyModel=true;
                    this.tabsValue="basicInfo";
                    this.tabsValue_planScheme="businessLogic";
                    this.obj_tabClick_addPolicyModel="";
                    this.plotCategoryName_addPolicyModel=data.policyExplain.plotCategoryName;
                    var obj_addPolicyModel=[{
                        title: "基础信息",
                        name: "basicInfo",
                        basicInfo:{
                            explainTitle: data.policyExplain.explainTitle,
                            explainDesc: data.policyExplain.explainDesc,
                            explainScene: data.policyExplain.explainScene,
                            fileState: data.policyExplain.fileState,
                            explainCode: data.policyExplain.explainCode,
                            explainId: data.policyExplain.explainId,
                        }
                    }];
                    for(var i=0;i<data.policyExplainPlan.length;i++){
                        obj_addPolicyModel.push({
                            title: data.policyExplainPlan[i].planName,
                            name: this.Util.uuid(),
                            planScheme:[
                                {
                                    title: "业务逻辑",
                                    name: "businessLogic",
                                    content:{

                                    }
                                },
                                {
                                    title: "计算逻辑",
                                    name: "calculateLogic",
                                    content:{
                                    }
                                }
                            ]
                        })
                    };
                    this.obj_addPolicyModel=obj_addPolicyModel;
                    this.$nextTick(function () {
                        $(".addPolicyModel .busLogic").each(function(index){
                            $(this).find(".dynamicTable").empty();
                            $(this).find(".dynamicTable").append(data.policyExplainPlan[index].busLogic);
                        })
                        $(".addPolicyModel .calcLogic").each(function(index){
                            $(this).find(".dynamicTable").empty();
                            $(this).find(".dynamicTable").append(data.policyExplainPlan[index].computeLogic);
                        })
                    })
                    this.updatePs_addPlanSchemeBtn();
                }, response => {
                    Util.removeWaiting();
                });

            },
            showQueryPolicyExplainModel(scope){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/queryPlainByCode.do",
                        {explainCode:scope.row.explainCode}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    this.title_addPolicyModel="查看税务政策解读信息";
                    this.operationType="query";
                    this.boolean_show_queryPolicyModel=true;
                    this.tabsValue="basicInfo";
                    this.tabsValue_planScheme="businessLogic";
                    this.obj_tabClick_addPolicyModel="";
                    this.plotCategoryName_addPolicyModel=data.policyExplain.plotCategoryName;
                    var obj_addPolicyModel=[{
                        title: "基础信息",
                        name: "basicInfo",
                        basicInfo:{
                            explainTitle: data.policyExplain.explainTitle,
                            explainDesc: data.policyExplain.explainDesc,
                            explainScene: data.policyExplain.explainScene,
                            fileState: data.policyExplain.fileState,
                            explainCode: data.policyExplain.explainCode,
                            explainId: data.policyExplain.explainId,
                        }
                    }];
                    for(var i=0;i<data.policyExplainPlan.length;i++){
                        obj_addPolicyModel.push({
                            title: data.policyExplainPlan[i].planName,
                            name: this.Util.uuid(),
                            planScheme:[
                                {
                                    title: "业务逻辑",
                                    name: "businessLogic",
                                    content:{

                                    }
                                },
                                {
                                    title: "计算逻辑",
                                    name: "calculateLogic",
                                    content:{
                                    }
                                }
                            ]
                        })
                    };
                    this.obj_addPolicyModel=obj_addPolicyModel;
                    this.$nextTick(function () {
                        $(".addPolicyModel .busLogic").each(function(index){
                            $(this).find(".dynamicTable").empty();
                            $(this).find(".dynamicTable").append(data.policyExplainPlan[index].busLogic);
                        })
                        $(".addPolicyModel .calcLogic").each(function(index){
                            $(this).find(".dynamicTable").empty();
                            $(this).find(".dynamicTable").append(data.policyExplainPlan[index].computeLogic);
                        })
                        $(".queryPolicyModel").find("textarea").attr("disabled","disabled");

                    })
                    this.updatePs_addPlanSchemeBtn();
                }, response => {
                    Util.removeWaiting();
                });

            },
            showUpdateCategoryModel(){
                this.operationType="update";
                if(!this.obj_clickedNode){
                    this.Util.showTipModel("请先选中一个结点");
                    return;
                }
                this.boolean_showIsLeafRadio_addCategoryModel=false;
//                if(this.obj_clickedNode.isCategory){
                    this.title_addCategoryModel="修改税务筹划分类";
                    this.boolean_show_addCategoryModel=true;
                    this.obj_addCategoryModel=Object.assign({},this.obj_clickedNode);
//                }else{
//                    this.obj_tabClick_addPolicyModel="";
//                    this.title_addPolicyModel="修改税务政策信息";
//                    this.boolean_show_addPolicyModel=true;
//                    this.obj_addPolicyModel=Object.assign({},this.obj_addPolicyModel,this.obj_clickedNode);
//                }
            },
            showAddCategoryModel(){
                if(this.obj_clickedNode && !this.obj_clickedNode.isCategory){
                    Util.showTipModel("叶子结点下不能再创建子结点");
                    return;
                }
                if(!this.obj_clickedNode){
                    this.boolean_showIsLeafRadio_addCategoryModel=false;
                }else{
                    this.boolean_showIsLeafRadio_addCategoryModel=true;
                }
                this.title_addCategoryModel="新增税务筹划分类";
                this.operationType="add";
                this.boolean_show_addCategoryModel=true;
                Util.resetObj(this.obj_addCategoryModel,{
                    isLeaf:Constant.array_yesOrNo[0].value,
                    plotCategoryCode:Util.uuid()
                });
            },
            showAddPolicyModel(){
//                if(!this.obj_clickedNode || !this.obj_clickedNode.isCategory){
//                    this.Util.showTipModel("政策解读信息结点必须挂载在筹划分类结点上");
//                    return;
//                }
//                if(!this.obj_clickedNode.isLeaf){
//                    this.Util.showTipModel("请先选中叶子结点");
//                    return;
//                }
                this.title_addPolicyModel="新增税务政策解读信息";
                this.operationType="add";
                this.boolean_show_addPolicyModel=true;
                this.tabsValue="basicInfo";
                this.tabsValue_planScheme="businessLogic";
                this.obj_tabClick_addPolicyModel="";
                this.obj_addPolicyModel=$.extend([],true,this.obj_addPolicyModel_basic);
                this.plotCategoryName_addPolicyModel=this.obj_clickedNode.plotCategoryName;
                Util.resetObj(this.obj_addPolicyModel[0].basicInfo,{
                    fileState:Constant.array_fileStatus[0].value,
                });
                this.updatePs_addPlanSchemeBtn();
//                this.obj_addPolicyModel.categoryCode=this.obj_clickedNode.categoryCode;
            },
            updatePs_addPlanSchemeBtn(){
                this.$nextTick(function(){
                    var $addPolicyModel=$(this.$refs.root).find(".addPolicyModel");
                    var top;
                    var maxTop;
                    $addPolicyModel.find(".el-tabs__header").each(function () {
                        if($(this).hasClass("is-left")){
                            maxTop=$(this)[0].offsetTop+$(this)[0].offsetHeight
                        }
                    })

                    $addPolicyModel.find(".el-tabs__nav").each(function () {
                        if($(this).hasClass("is-left")){
                            top=$(this)[0].offsetTop+$(this)[0].offsetHeight
                        }
                    })
                    if(parseInt(top) > parseInt(maxTop)){
                        top=maxTop;
                    }
                    $addPolicyModel.find(".addPlanSchemeBtn").css("top",top+15);
                    $addPolicyModel.find(".deletePlanSchemeBtn").css("top",top+15);
                });
            },
            confirmBtn_addCategoryModel(data){
                this.boolean_show_addCategoryModel=false;
                if(this.operationType == "add"){
                    data.plotCategoryLevel=1;
                    data.plotCategoryPath=data.plotCategoryCode;
                    if(this.obj_clickedNode){
                        data.parentPlotCategoryId=this.obj_clickedNode.plotCategoryId;
                        data.parentPlotCategoryCode=this.obj_clickedNode.plotCategoryCode;
                        data.plotCategoryLevel=this.obj_clickedNode.plotCategoryLevel+1;
                        data.plotCategoryPath=this.obj_clickedNode.plotCategoryPath;
                    }
                    this.addCategory(data);
                }else{
                    data.plotCategoryId=this.obj_clickedNode.plotCategoryId;
                    this.updateCategory(data);
                }
            },
            confirmBtn_addPolicyModel(){
                if(this.obj_addPolicyModel.length < 2){
                    Util.showTipModel("至少要有一个策划方案");
                    return;
                }
                this.boolean_show_addPolicyModel=false;
                var policyExplainPlan=[];
                for(var i=0;i<this.obj_addPolicyModel.length;i++){
                    if(i > 0){
                        var busLogic=$(".addPolicyModel .busLogic").eq(i-1).find(".dynamicTable").html();
                        var computeLogic=$(".addPolicyModel .calcLogic").eq(i-1).find(".dynamicTable").html();
                        policyExplainPlan.push({
                            busLogic:busLogic,
                            computeLogic:computeLogic,
                            planName:this.obj_addPolicyModel[i].title,
                            planCode:Util.uuid()
                        })
                    }
                }
                var param={
                    policyExplain:{
                        explainDesc:this.obj_addPolicyModel[0].basicInfo.explainDesc,
                        explainScene:this.obj_addPolicyModel[0].basicInfo.explainScene,
                        explainTitle:this.obj_addPolicyModel[0].basicInfo.explainTitle,
                        fileState:this.obj_addPolicyModel[0].basicInfo.fileState,
                        plotCategoryCode:this.obj_clickedNode.plotCategoryCode,
                        plotCategoryId:this.obj_clickedNode.plotCategoryId,
                        plotCategoryPath:this.obj_clickedNode.plotCategoryPath,
                        plotCategoryName:this.obj_clickedNode.plotCategoryName,
                    },
                    policyExplainPlan:policyExplainPlan
                }
                if(this.operationType == "add"){
                    this.addPolicyDetail(param);
                }else{
                    param.policyExplain.explainCode=this.obj_addPolicyModel[0].basicInfo.explainCode;
                    param.policyExplain.explainId=this.obj_addPolicyModel[0].basicInfo.explainId;
                    this.updatePolicyDetail(param);
                }
            },
            searchPolicyExplain(value){
                this.obj_page.pageIndex=0;
                this.queryPolicyExplain_pagination();
            },
            selectPolicyCategory_search(item){
                console.log(item);
                this.array_tree.splice(1,1)
            },
            nodeIsClicked(item){
                if(item.isClicked){
                    if(this.obj_clickedNode){
                        this.obj_clickedNode.isClicked = false;
                    }
                }else{
                    this.obj_clickedNode="";
                    this.obj_page.pageIndex=0;
                    this.queryPolicyExplain_pagination();
                    return;
                }
                this.obj_clickedNode=item;
                this.obj_page.pageIndex=0;
                this.queryPolicyExplain_pagination();
                if(item.isCategory && !item.children){
                    this.queryByCriteria({parentPlotCategoryCode:item.plotCategoryCode,parentPlotCategoryId:item.plotCategoryId});
                }
            },
            deleteNode(){
                if(this.obj_clickedNode){
                    if(this.obj_clickedNode.children && this.obj_clickedNode.children.length){
                        Util.showTipModel("只能删除叶子结点");
                        return;
                    }
                    Util.showTipModel("确定删除该结点",() => {
                        var url=Constant.ctx+"/policyPlotCategory/delete.do";
                        var param={delstr: JSON.stringify({plotCategoryId:this.obj_clickedNode.id})};
                        Util.makeWaiting();
                        this.$http.post(url, param
                        ).then(response => {
                            Util.removeWaiting();
                            var result = response.body;
                            console.log(result);
                            if(!result.success){
                                Util.showTipModel(result.msg);
                                return;
                            }
                            var data=result.data;
                            this.deleteNodeById(this.obj_clickedNode.id,this.array_tree);
                            this.obj_clickedNode="";
                        }, response => {
                            Util.removeWaiting();
                        });
                    });
                }else{
                    Util.showTipModel("请先选中一个结点");
                }
            },
//            isClicked (data,clickedFlag) {
//                for(var i=0;i<data.length;i++){
//                    if(data[i].isClicked){
//                        clickedFlag=true;
//                    }
//                    if(data[i].children && data[i].children.length){
//                        this.isClicked(data[i].children,clickedFlag);
//                    }
//                }
//            },
            deleteNodeById (id,data) {
                for(var i=0;i<data.length;i++){
                    if(data[i].id == id){
                        data.splice(i,1);
                        return;
                    }
                    if(data[i].children && data[i].children.length){
                        this.deleteNodeById(id,data[i].children);
                    }
                }
            },
            addChildNodeOfId (param) {
                var {parentId,childNode,childNodeName,childNodeId,tree,obj_commonNode}=param;
                for(var i=0;i<tree.length;i++){
                    if(tree[i].id == parentId){
                        if(!tree[i].children){
                            this.$set(tree[i], 'children', []);
                        }
                        tree[i].children.push(Object.assign({
                            "label": childNodeName,
                            "id": childNodeId,
                        },obj_commonNode,childNode));
                        return;
                    }
                    if(tree[i].children && tree[i].children.length){
                        param.tree=tree[i].children
                        this.addChildNodeOfId(param);
                    }
                }
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
        margin-bottom:15px;
        color: #000;
        font-size: 16px;
    }
    .main  .body1{
        padding:15px;
        background: #fff;
        height:450px;
    }
    .main  .header11{
        margin-bottom:15px;
    }
    .main  .body11{
        border:1px #F2F2F2 solid;
        height:400px;
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
    .addPolicyModel{
        .addPlanSchemeBtn{
            position: absolute;
            left:25px
        }
        .deletePlanSchemeBtn{
            position: absolute;
            left:55px
        }
    }
    .tableWrapper{
        margin-bottom: 0px;
        height: 320px;
    }


</style>
