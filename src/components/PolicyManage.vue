<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                政策基础库列表

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
                    <el-select
                            style="width:180px"
                            clearable
                            filterable
                            placeholder="请选择颁发单位省"
                            v-model="province_search"
                            @change="selectProvince_search">
                        <el-option
                                v-for="item1 in array_province"
                                :key="item1.value"
                                :label="item1.label"
                                :value="item1.value">
                        </el-option>
                    </el-select>
                    <el-select
                            style="width:180px;margin-left: 10px"
                            clearable
                            filterable
                            placeholder="请选择颁发单位市"
                            v-model="city_search"
                            @change="selectCity_search">
                        <el-option
                                v-for="item1 in array_city_search"
                                :key="item1.value"
                                :label="item1.label"
                                :value="item1.value">
                        </el-option>
                    </el-select>
                    <span style="margin-left:10px">颁布时间：</span>
                    <el-date-picker
                            style="width:154px"
                            v-model="dateFrom_search"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择开始日期">
                    </el-date-picker>
                    <span>至</span>
                    <el-date-picker
                            style="margin-right:10px;width:154px"
                            v-model="dateTo_search"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="请选择结束日期">
                    </el-date-picker>
                    <Search
                            style_input="width:210px"
                            placeholder="请输入关键字查询"
                            v-model="value_search"
                            @search="policyDetail_queryPageList_ByKey"
                    />
                    <div class="fr" style="margin-right: 20px;margin-top:10px;margin-bottom:10px">
                        <span class="addBtn_small" @click="showAddCategoryModel">
                            <span class="fa fa-plus"></span><span class="name">新增分类</span>
                        </span>
                        <span class="updateBtn_small"  @click="showUpdateCategoryModel" style="margin: 0px 10px;">
                            <span class="fa fa-edit"></span><span class="name">修改分类</span>
                        </span>
                        <span class="addBtn_small" @click="showAddLeafCategoryModel">
                            <span class="fa fa-plus"></span><span class="name">新增政策</span>
                        </span>
                        <span class="updateBtn_small"  @click="showUpdateLeafCategoryModel" style="margin:0 10px;">
                            <span class="fa fa-edit"></span><span class="name">修改政策</span>
                        </span>
                        <span class="deleteBtn_small" @click="deleteNode">
                            <span class="fa fa-trash-o"></span><span class="name">删除</span>
                        </span>
                    </div>
                </div>
                <div class="body11 cb">
                    <div class="leftWrapper">
                        <div class="body111">
                            <vue-tree
                                    :tree-data="array_tree"
                                    :options="obj_options_tree"
                                    @openNode="nodeIsOpened"
                                    @handle="nodeIsClicked">
                            </vue-tree>
                        </div>
                    </div>
                    <div class="rightWrapper">
                        <div class="header112">
                            <div class="fr">
                                <span class="addBtn_small" @click="showAddPolicyModel">
                                    <span class="fa fa-plus"></span><span class="name">新增发文</span>
                                </span>
                                <span class="updateBtn_small" @click="showUpdatePolicyModel" style="margin: 0px 10px;">
                                    <span class="fa fa-edit"></span><span class="name">修改发文</span>
                                </span>
                            </div>

                        </div>
                        <div class="body112">
                            <!--<div class="head1121 none">-->
                                <!--<span class="deleteBtn_small fr"><span class="fa fa-trash-o"></span><span class="name">删除</span></span>-->
                                <!--<span class="updateBtn_small fr"><span class="fa fa-edit"></span><span class="name">修改</span></span>-->
                                <!--<span class="addBtn_small fr"><span class="fa fa-plus"></span><span class="name">新增</span></span>-->
                            <!--</div>-->
                            <div class="body1121">
                                <el-table
                                        :data="array_policyDetail"
                                        height="300"
                                        class="nowrap-td-last"
                                        border
                                        highlight-current-row
                                        @current-change="selectPolicyDetailTableRow">
                                    <el-table-column
                                            prop="index"
                                            label="序号"
                                            width="50">
                                    </el-table-column>
                                    <el-table-column
                                            prop="policyTitle"
                                            label="发文标题">
                                    </el-table-column>
                                    <el-table-column
                                            prop="issueFileNo"
                                            label="发文文号">
                                    </el-table-column>
                                    <el-table-column
                                            prop="policyType"
                                            label="政策类别">
                                    </el-table-column>
                                    <el-table-column
                                            prop="issueTimeBegin"
                                            label="颁布时间">
                                    </el-table-column>
                                    <el-table-column
                                            prop="fileStatus"
                                            label="文件状态">
                                    </el-table-column>
                                    <el-table-column
                                            prop="listFile"
                                            label="文件">
                                        <template slot-scope="scope">
                                            <div v-for="item in scope.row.listFile">
                                                <span class="aBtn" @click="openFile(item)">{{item.fileName}}</span>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="操作">
                                        <template slot-scope="scope">
                                            <span style="margin-right:3px" class="btn_small" @click="showQueryPolicyModel(scope)">
                                                <span class="name">查看</span>
                                            </span>
                                            <span class="deleteBtn_small" @click="http_policyDetail_delete(scope.row)">
                                                <span class="fa fa-trash-o"></span><span class="name">删除</span>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                        v-if="boolean_show_pagination"
                                        style="margin-top:15px;text-align: right"
                                        @size-change="sizeChange_policyDetailTable"
                                        @current-change="currentChange_policyDetailTable"
                                        :page-sizes="Constant.array_pageSize"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total_policyDetailTable">
                                </el-pagination>
                            </div>
                            <!--<div class="each">-->
								<!--<span class="name">-->
									<!--标题：-->
								<!--</span>-->
                                <!--<input class="icon" v-model="rightWrapperData.label" type="text"/>-->
                                <!--<span class="name">-->
									<!--颁布时间：-->
								<!--</span>-->
                                <!--<input class="iconOpen" v-model="rightWrapperData.startDate" type="text"/>-->
                            <!--</div>-->
                            <!--<div class="each">-->
								<!--<span class="name vt">-->
									<!--发文内容：-->
								<!--</span>-->
                                <!--<textarea class="value description" v-model="rightWrapperData.content" ></textarea>-->
                            <!--</div>-->
                            <!--<div class="footer" style="text-align:center">-->
                                <!--<button class="cancel-btn">取消</button>-->
                                <!--<button class="confirm-btn" @click="saveRightWrapperData">保存</button>-->
                            <!--</div>-->
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
                    <!--label="税务分类编码"-->
                    <!--:disabled="true"-->
                    <!--name="categoryCode"-->
                    <!--:formObj="obj_addCategoryModel"/>-->
            <LabelAndValue
                    label="税务分类名称"
                    :isNotNull="true"
                    name="title"
                    :formObj="obj_addCategoryModel"/>
            <!--<LabelAndValue-->
                    <!--v-if="boolean_showIsLeafRadio_addCategoryModel"-->
                    <!--label="是否叶子结点"-->
                    <!--type="radio"-->
                    <!--:isNotNull="true"-->
                    <!--name="isLeaf"-->
                    <!--:radio="Constant.array_yesOrNo"-->
                    <!--:formObj="obj_addCategoryModel"/>-->
        </Model>

        <Model
                :title="title_addLeafCategoryModel"
                :formObj="obj_addLeafCategoryModel"
                v-if="boolean_show_addLeafCategoryModel"
                @hide="boolean_show_addLeafCategoryModel=false"
                @save="confirmBtn_addLeafCategoryModel">
            <!--<LabelAndValue-->
                    <!--label="税务政策编码"-->
                    <!--:disabled="true"-->
                    <!--name="categoryCode"-->
                    <!--:formObj="obj_addLeafCategoryModel"/>-->
            <LabelAndValue
                    label="税务政策名称"
                    :isNotNull="true"
                    name="title"
                    :formObj="obj_addLeafCategoryModel"/>
        </Model>

        <Model
                title="发文列表"
                style_model="z-index:2000"
                style_dialog="width:80%;min-width:900px"
                v-if="boolean_show_beReplacedPolicyTitleModel"
                @hide="boolean_show_beReplacedPolicyTitleModel=false"
                @save="confirmBtn_beReplacedPolicyTitleModel">
            <Search
                    placeholder="请输入关键字进行查询"
                    v-model="key_search_beReplacedPolicyTitleModel"
                    @search="searchByKey_beReplacedPolicyTitleModel"
            />
            <el-table
                    :data="array_beReplacedPolicyTitleModel"
                    height="360"
                    highlight-current-row
                    @current-change="selectRow_beReplacedPolicyTitleModel"
                    border
                    style="margin-top:10px;text-align: center">
                <el-table-column
                        prop="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="policyTitle"
                        label="发文标题">
                </el-table-column>
                <el-table-column
                        prop="issueFileNo"
                        label="发文文号">
                </el-table-column>
                <el-table-column
                        label="文件">
                    <template slot-scope="scope">
                        <div>
                            <span>{{scope.row.fileName}}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    v-if="boolean_show_pagination"
                    style="margin-top:15px;text-align: right"
                    @size-change="sizeChange_beReplacedPolicyTitleModel"
                    @current-change="currentChange_beReplacedPolicyTitleModel"
                    :page-sizes="Constant.array_pageSize"
                    :page-size="pageSize_beReplacedPolicyTitleModel"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total_beReplacedPolicyTitleModel">
            </el-pagination>
        </Model>

            <Model
                    style_dialog="width:100%;min-width:1100px"
                    style_body="padding:0px;max-height: inherit;"
                    :title="title_addPolicyModel"
                    :formObj="obj_addPolicyModel"
                    v-if="boolean_show_addPolicyModel"
                    @hide="boolean_show_addPolicyModel=false"
                    @save="confirmBtn_addPolicyModel">
                <el-tabs v-model="tabsValue"
                         @tab-click="tabClick_addPolicyModel"
                         style="margin-left:10px">
                    <el-tab-pane
                            label="基本信息"
                            name="basicInfo"
                            :style="'height:'+height_basicInfo_addPolicyModel+'px'"
                            style="padding-left:50px;overflow: auto;min-height:400px"
                    >
                        <LabelAndValue
                                label="发文标题"
                                placeholder="请输入政策名字，如车船使用牌 照税优惠政策"
                                type="textarea"
                                :isNotNull="true"
                                name="policyTitle"
                                width="260"
                                :formObj="obj_addPolicyModel"/>
                        <LabelAndValue
                                label="发文文号"
                                placeholder="输入格式国税【2006】93号"
                                :isNotNull="true"
                                name="issueFileNo"
                                width="280"
                                :formObj="obj_addPolicyModel"/>
                        <!--<LabelAndValue-->
                        <!--label="行业类型"-->
                        <!--type="select"-->
                        <!--:isNotNull="true"-->
                        <!--name="industry"-->
                        <!--:options='array_industry'-->
                        <!--width="280"-->
                        <!--:formObj="obj_addPolicyModel"/>-->
                        <div class="each">
                    <span class="name">
                        <!--<span class="notNull">*</span>-->
                        行业信息<span>：</span>
                    </span>
                            <el-select
                                    style="width:180px"
                                    filterable
                                    v-model="obj_addPolicyModel.industryCategory"
                                    @change="selectIndustryCategory_addPolicyModel">
                                <el-option
                                        v-for="item in array_industryCategory"
                                        :key="item.categoryCode"
                                        :label="item.categoryName"
                                        :value="item.categoryCode">
                                </el-option>
                            </el-select>
                            <el-select
                                    style="width:180px;margin-left: 10px"
                                    filterable
                                    v-model="obj_addPolicyModel.industryCategory1"
                                    @change="selectIndustryCategory1_addPolicyModel">
                                <el-option
                                        v-for="item in array_industryCategory1"
                                        :key="item.bigCategory"
                                        :label="item.categoryName"
                                        :value="item.bigCategory">
                                </el-option>
                            </el-select>
                            <el-select
                                    style="width:180px;margin-left: 10px"
                                    filterable
                                    v-model="obj_addPolicyModel.industryCategory2"
                                    @change="selectIndustryCategory2_addPolicyModel">
                                <el-option
                                        v-for="item in array_industryCategory2"
                                        :key="item.middleCategory"
                                        :label="item.categoryName"
                                        :value="item.middleCategory">
                                </el-option>
                            </el-select>
                            <el-select
                                    style="width:180px;margin-left: 10px"
                                    filterable
                                    v-model="obj_addPolicyModel.industryCategory3">
                                <el-option
                                        v-for="item in array_industryCategory3"
                                        :key="item.smallCategory"
                                        :label="item.categoryName"
                                        :value="item.smallCategory">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="each">
                            <span class="name">
                                <span class="notNull">*</span>
                                颁发单位<span>：</span>
                            </span>
                            <!--<el-select-->
                            <!--style="width:100px"-->
                            <!--v-model="obj_addPolicyModel.county">-->
                            <!--<el-option-->
                            <!--v-for="item1 in [{value:'中国',label:'中国'},{value:'美国',label:'美国'}]"-->
                            <!--:key="item1.value"-->
                            <!--:label="item1.label"-->
                            <!--:value="item1.value">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <el-select
                                    style="width:180px"
                                    filterable
                                    v-model="obj_addPolicyModel.province"
                                    @change="selectProvince_addPolicyModel">
                                <el-option
                                        v-for="item1 in array_province"
                                        :key="item1.value"
                                        :label="item1.label"
                                        :value="item1.value">
                                </el-option>
                            </el-select>
                            <el-select
                                    style="width:180px;margin-left: 10px"
                                    filterable
                                    v-model="obj_addPolicyModel.city">
                                <el-option
                                        v-for="item1 in array_city"
                                        :key="item1.value"
                                        :label="item1.label"
                                        :value="item1.value">
                                </el-option>
                            </el-select>
                        </div>
                        <LabelAndValue
                                label="政策类别"
                                type="radio"
                                :isNotNull="true"
                                name="policyType"
                                :radio="Constant.array_policyCategory"
                                :formObj="obj_addPolicyModel"/>
                        <!--<LabelAndValue-->
                                <!--label="政策关系"-->
                                <!--type="radio"-->
                                <!--:isNotNull="true"-->
                                <!--name="policyRelation"-->
                                <!--:radio="Constant.array_policyRelation"-->
                                <!--:formObj="obj_addPolicyModel"/>-->
                        <LabelAndValue
                                label="文件状态"
                                type="radio"
                                :isNotNull="true"
                                name="fileStatus"
                                :radio="Constant.array_fileStatus"
                                :formObj="obj_addPolicyModel"/>

                        <LabelAndValue
                                label="颁布时间"
                                type="date"
                                width="140"
                                :isNotNull="true"
                                :name="['issueTimeBegin']"
                                :placeholder="['选择颁布时间']"
                                :formObj="obj_addPolicyModel"/>

                        <LabelAndValue
                                label="生效时间"
                                type="date"
                                width="140"
                                :isNotNull="true"
                                :name="['beginTime']"
                                :placeholder="['选择生效时间']"
                                :formObj="obj_addPolicyModel"/>
                        <LabelAndValue
                                label="失效时间"
                                type="date"
                                width="140"
                                :isNotNull="true"
                                :name="['endTime']"
                                :placeholder="['选择失效时间']"
                                :formObj="obj_addPolicyModel"/>
                        <LabelAndValue
                                label="是否替换"
                                type="radio"
                                :isNotNull="true"
                                name="isReplaced"
                                :radio="Constant.array_yesOrNo"
                                :formObj="obj_addPolicyModel"/>
                        <div class="each" v-if="obj_addPolicyModel.isReplaced == 1">
                            <span class="name">
                                <span class="notNull">*</span>
                                替换文件<span>：</span>
                            </span>
                            <input type="text" disabled="disabled" v-model="obj_addPolicyModel.beReplacedPolicyTitle">
                            <span class="aBtn" @click="showModel_beReplacedPolicyTitle_addPolicyModel" style="margin-left: 5px;">请选择</span>
                        </div>
                        <div class="each">
                            <el-upload
                                    ref="upload_addPolicyModel"
                                    :multiple="true"
                                    name="tempFile"
                                    :data="{}"
                                    :action="Constant.ctx+'/policyDetail/uploadDetailFile.do'"
                                    :auto-upload="false"
                                    :file-list="array_file_addPolicyModel"
                                    :before-upload="beforeUpload"
                                    :on-success="uploadSuccess"
                                    :on-change="uploadChange"
                                    :on-remove="uploadRemove">
                                <button>上传附件</button>
                            </el-upload>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane
                            label="正文"
                            name="正文"
                            :style="'height:'+height_basicInfo_addPolicyModel+'px'"
                            style="padding-right:10px;overflow: auto;min-height:400px"
                    >
                        <UE :defaultMsg="obj_addPolicyModel.policyContent" :config=config_UE ref="ue"></UE>
                    </el-tab-pane>
                </el-tabs>
            </Model>

        <Model
                class="queryPolicyModel"
                :hideFooter="true"
                style_dialog="width:100%;min-width:1100px"
                style_body="padding:0px;max-height: inherit;"
                title="查看税务政策信息"
                :formObj="obj_addPolicyModel"
                v-if="boolean_show_queryPolicyModel"
                @hide="boolean_show_queryPolicyModel=false">
            <el-tabs v-model="tabsValue"
                     style="margin-left:10px">
                <el-tab-pane
                        label="基本信息"
                        name="basicInfo"
                        :style="'height:'+(height_basicInfo_addPolicyModel+70)+'px'"
                        style="padding-left:50px;min-height:400px;overflow: auto;"
                >
                    <LabelAndValue
                            label="发文标题"
                            type="label"
                            :value="obj_addPolicyModel.policyTitle"/>
                    <LabelAndValue
                            label="发文文号"
                            type="label"
                            :value="obj_addPolicyModel.issueFileNo"/>
                    <div class="each">
                        <span class="name">
                            行业信息<span>：</span>
                        </span>
                        <span>{{obj_addPolicyModel.industryName0}}</span>
                        <span style="margin:0px 15px">{{obj_addPolicyModel.industryName1}}</span>
                        <span>{{obj_addPolicyModel.industryName2}}</span>
                        <span style="margin-left:15px">{{obj_addPolicyModel.industryName3}}</span>
                    </div>
                    <div class="each">
                        <span class="name">
                            颁发单位<span>：</span>
                        </span>
                        <span>{{obj_addPolicyModel.provinceName}}</span>
                        <span style="margin-left:15px">{{obj_addPolicyModel.cityName}}</span>
                    </div>
                    <LabelAndValue
                            label="政策类别"
                            type="label"
                            :value="obj_addPolicyModel.policyType"/>
                    <LabelAndValue
                            label="政策关系"
                            type="label"
                            :value="obj_addPolicyModel.policyRelation"/>
                    <LabelAndValue
                            label="文件状态"
                            type="label"
                            :value="obj_addPolicyModel.fileStatus"/>

                    <LabelAndValue
                            label="颁布时间"
                            type="label"
                            :value="obj_addPolicyModel.issueTimeBegin"/>

                    <LabelAndValue
                            label="生效时间"
                            type="label"
                            :value="obj_addPolicyModel.beginTime"/>
                    <LabelAndValue
                            label="失效时间"
                            type="label"
                            :value="obj_addPolicyModel.endTime"/>
                    <LabelAndValue
                            label="是否替换"
                            type="label"
                            :value="Constant.obj_yesOrNo[obj_addPolicyModel.isReplaced]"/>
                    <LabelAndValue
                            label="替换文件"
                            type="label"
                            :value="obj_addPolicyModel.beReplacedPolicyTitle"/>
                    <div class="each">
                        <span class="name">
                            附件<span>：</span>
                        </span>
                        <span style="margin-right:15px" v-for="item in array_file_addPolicyModel">{{item.fileName}}</span>
                    </div>

                </el-tab-pane>
                <el-tab-pane
                        label="发文内容"
                        name="发文内容"
                        v-html="obj_addPolicyModel.policyContent"
                        :style="'height:'+(height_basicInfo_addPolicyModel+70)+'px'"
                        style="padding-right:20px;padding-left:10px;min-height:400px;overflow: auto;"
                >
                </el-tab-pane>
            </el-tabs>
        </Model>

    </div>
</template>

<script>
//    import Tree from '@/json/tree.json';

    export default {
        components: {

        },
          data () {
            return {
                config_UE: {
                    initialFrameWidth: null,
                    initialFrameHeight: $(window).height() - 155 - 85,
                },
                pageSize:Constant.array_pageSize[0],
                pageSize_beReplacedPolicyTitleModel:Constant.array_pageSize[0],
                total_policyDetailTable:0,
                total_beReplacedPolicyTitleModel:0,
                operationType:"",
                title_addCategoryModel:"",
                title_addLeafCategoryModel:"",
                title_addPolicyModel:"",
                value_search:"",
                needUploadFileCount:0,
                tabsValue:"",
                province_search:"",
                city_search:"",
                dateFrom_search:"",
                dateTo_search:"",
                key_search_beReplacedPolicyTitleModel:"",
                height_basicInfo_addPolicyModel:$(window).height() - 155,

                boolean_show_pagination:true,
                boolean_show_addCategoryModel:false,
                boolean_show_addLeafCategoryModel:false,
                boolean_show_addPolicyModel:false,
                boolean_show_queryPolicyModel:false,
                boolean_show_beReplacedPolicyTitleModel:false,
//                boolean_showIsLeafRadio_addCategoryModel:true,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_page_basic:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_page_beReplacedPolicyTitleModel:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_selectedPolicyDetailTableRow:"",
                obj_selectedRow_beReplacedPolicyTitleModel:"",
                obj_clickedNode:"",
                obj_options_tree: {
                    checkbox: false,
                    show_labelIcon: true,
                    //            depthOpen: 100
                },
                obj_addCategoryModel:{
                    categoryCode:"",
                    title:"",
                },
                obj_addLeafCategoryModel:{
                    categoryCode:"",
                    title:"",
                },
                obj_addPolicyModel:{
                    categoryCode:"",
                    policyTitle:"",
                    issueFileNo:"",
                    industry:"",
                    county:"",
                    province:"",
                    city:"",
                    policyType:"",
                    policyRelation:"",
                    isReplaced:"",
                    fileStatus:"",
                    issueTimeBegin:"",
                    issueTimeEnd:"",
                    beginTime:"",
                    endTime:"",
                    industryCategory:"",
                    industryCategory1:"",
                    industryCategory2:"",
                    industryCategory3:"",
                    policyContent:"",
                },
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

                array_industry:[],
                array_province:[],
                array_city:[],
                array_city_search:[],
                array_policyDetail:[],
                array_beReplacedPolicyTitleModel:[],
                array_tree: [],
                array_file_param:[],
                array_file_param_before:[],
                array_file_addPolicyModel:[],
                array_industryCategory:[],
                array_industryCategory1:[],
                array_industryCategory2:[],
                array_industryCategory3:[],
//                array_file_addPolicyModel: [{
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
//            issueTime_policyDetail: function () {
//                return `从${this.obj_policyDetail.issueTimeBegin}到${this.obj_policyDetail.issueTimeEnd}`;
//            },
//            issueDepartment_policyDetail: function () {
//                return `${this.obj_policyDetail.county}>${this.obj_policyDetail.province}>${this.obj_policyDetail.city}`;
//            },
        },
        mounted () {
            var $root=$(this.$refs.root);
            var _this=this;
            this.$nextTick(function () {
                this.http_policyCategory_queryByCriteria();
                this.http_PolicyDetail_queryPageList(this.obj_page);
                this.http_province_list();
                this.http_dicEntry_getDictText_by_dictCode("INDUSTRY");
                this.getIndustryCategoryList({categoryLevel:0},0);
            })
            $root.on("click",".queryPolicyModel a",function(){
//                if($(this).hasClass("queryPolicy")){
//                    var classList=$(this).attr("class").split(" ");
//                    var policyCode=classList[0] == "queryPolicy"?classList[1]:classList[0];
//                    Util.makeWaiting();
//                    _this.$http.post(Constant.ctx+"/policyDetail/queryByCode.do",
//                            {policyCode:policyCode}
//                    ).then(response => {
//                        Util.removeWaiting();
//                        var result = response.body;
//                        if(!result.success){
//                            Util.showTipModel(result.msg);
//                            return;
//                        }
//                        console.log(result);
//                        var data=result.data;
//                        $.cookie('policyContent', '1111');
//                    }, response => {
//                        Util.removeWaiting();
//                    });
//                }
            })
        },
        methods: {
            confirmBtn_beReplacedPolicyTitleModel(){
                if(!this.obj_selectedRow_beReplacedPolicyTitleModel){
                    Util.showTipModel("请先选择一条数据");
                    return;
                }
                this.obj_addPolicyModel.beReplacedPolicyTitle=this.obj_selectedRow_beReplacedPolicyTitleModel.policyTitle;
                this.obj_addPolicyModel.beReplacedPolicyId=this.obj_selectedRow_beReplacedPolicyTitleModel.policyId;
                this.boolean_show_beReplacedPolicyTitleModel=false;
            },
            showModel_beReplacedPolicyTitle_addPolicyModel(){
                this.key_search_beReplacedPolicyTitleModel="";
                this.obj_page_beReplacedPolicyTitleModel={...this.obj_page_basic};
                this.pageSize_beReplacedPolicyTitleModel=Constant.array_pageSize[0];
                this.pagination_getList_beReplacedPolicyTitleModel();
            },
            tabClick_addPolicyModel(item){

            },
            selectProvince_addPolicyModel(item){
                this.obj_addPolicyModel.city="";
                this.http_city_list_by_parentId(item);
            },
            selectProvince_search(item){
                this.city_search="";
                this.obj_page.pageIndex=0;
                this.pagination_policyDetail_queryPageList();
                if(Util.isNull(item)){
                    this.array_city_search=[];
                }else{
                    this.http_city_list_by_parentId(item,this.array_city_search);
                }
            },
            selectCity_search(item){
                this.obj_page.pageIndex=0;
                this.pagination_policyDetail_queryPageList();
            },
            selectIndustryCategory_addPolicyModel(item){
                this.obj_addPolicyModel.industryCategory1="";
                this.obj_addPolicyModel.industryCategory2="";
                this.obj_addPolicyModel.industryCategory3="";
                this.array_industryCategory2=[];
                this.array_industryCategory3=[];
                this.getIndustryCategoryList({parentCode:item,categoryLevel:1},1);
            },
            selectIndustryCategory1_addPolicyModel(item){
                this.obj_addPolicyModel.industryCategory2="";
                this.obj_addPolicyModel.industryCategory3="";
                this.array_industryCategory3=[];
                this.getIndustryCategoryList({parentCode:item,categoryLevel:2},2);
            },
            selectIndustryCategory2_addPolicyModel(item){
                this.obj_addPolicyModel.industryCategory3="";
                this.getIndustryCategoryList({parentCode:item,categoryLevel:3},3);
            },

            http_dicEntry_getDictText_by_dictCode(dictCode){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/dicEntry/getDictText.do",
                        {dictCode:dictCode}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    for(var i=0;i<data.length;i++){
                        data[i].value=data[i].dicCode;
                        data[i].label=data[i].dicName;
                    }
                    this.array_industry=data;
                }, response => {
                    Util.removeWaiting();
                });
            },
            http_city_list_by_parentId(parentId,cityList){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/provinceCities/list.do",
                        {parentId:parentId}
                ).then(response => {
                    Util.removeWaiting();
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
                    if(cityList){
                        this.array_city_search=data;
                    }else{
                        this.array_city=data;
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            http_province_list(){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/province/list.do",
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
                    for(var i=0;i<data.length;i++){
                        data[i].value=data[i].id;
                        data[i].label=data[i].name;
                    }
                    this.array_province=data;
                }, response => {
                    Util.removeWaiting();
                });
            },
            getIndustryCategoryList(param={},type_industryCategory){
                this.$http.post(Constant.ctx+"/industryCategory/queryByCondition.do",
                        {criteriaStr:JSON.stringify(param)}
                ).then(response => {
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    if(type_industryCategory == 0){
                        this.array_industryCategory=data;
                    }
                    if(type_industryCategory == 1){
                        this.array_industryCategory1=data;
                    }
                    if(type_industryCategory == 2){
                        this.array_industryCategory2=data;
                    }
                    if(type_industryCategory == 3){
                        this.array_industryCategory3=data;
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            pagination_policyDetail_queryPageList(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                    });
                }
                var param={
                    province:this.province_search,
                    city:this.city_search,
                    queryIssueTimeBegin:this.dateFrom_search,
                    queryIssueTimeEnd:this.dateTo_search,
                    queryLikeVal:this.value_search,
                    categoryPath:this.obj_clickedNode?this.obj_clickedNode.categoryCode:""
                };
                this.http_PolicyDetail_queryPageList(Object.assign({},param,this.obj_page));
            },
            sizeChange_policyDetailTable(val){
                this.pageSize=val;
                this.obj_page.pageSize=val;
                this.obj_page.pageIndex=0;
                this.pagination_policyDetail_queryPageList();
            },
            currentChange_policyDetailTable(val){
                this.obj_page.pageIndex=val - 1;
                this.pagination_policyDetail_queryPageList();
            },
            selectRow_beReplacedPolicyTitleModel(val){
                this.obj_selectedRow_beReplacedPolicyTitleModel=val;
            },
            pagination_getList_beReplacedPolicyTitleModel(){
                if(this.obj_page_beReplacedPolicyTitleModel.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                    });
                }
                var param={
                    queryLikeVal:this.key_search_beReplacedPolicyTitleModel,
                };
                this.getList_beReplacedPolicyTitleModel(Object.assign({},param,this.obj_page_beReplacedPolicyTitleModel));
            },
            sizeChange_beReplacedPolicyTitleModel(val){
                this.pageSize_beReplacedPolicyTitleModel=val;
                this.obj_page_beReplacedPolicyTitleModel.pageSize=val;
                this.obj_page_beReplacedPolicyTitleModel.pageIndex=0;
                this.pagination_getList_beReplacedPolicyTitleModel();
            },
            currentChange_beReplacedPolicyTitleModel(val){
                this.obj_page_beReplacedPolicyTitleModel.pageIndex=val - 1;
                this.pagination_getList_beReplacedPolicyTitleModel();
            },
            searchByKey_beReplacedPolicyTitleModel(){
                this.obj_page_beReplacedPolicyTitleModel.pageIndex=0;
                this.pagination_getList_beReplacedPolicyTitleModel();
            },
            getList_beReplacedPolicyTitleModel(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/queryPageList.do",
                        param
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.boolean_show_beReplacedPolicyTitleModel=true;
                this.total_beReplacedPolicyTitleModel=result.total;
                var data=result.data;
                for(var i=0;i<data.length;i++){
                    data[i].index=(i+1)+this.obj_page_beReplacedPolicyTitleModel.pageIndex*this.obj_page_beReplacedPolicyTitleModel.pageSize
                }
                this.array_beReplacedPolicyTitleModel=data;
            }, response => {
                    Util.removeWaiting();
                });
            },
            openFile(item){
                window.open(item.fileUrl);
            },
            showUpdatePolicyModel(){
                this.tabsValue="basicInfo";
                if(!this.obj_selectedPolicyDetailTableRow){
                    Util.showTipModel("请先选中发文表格中的一行");
                    return;
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/queryByCode.do",
                        {policyCode:this.obj_selectedPolicyDetailTableRow.policyCode}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    console.log(data);
                    this.title_addPolicyModel="修改税务政策信息";
                    this.operationType="update";
                    this.boolean_show_addPolicyModel=true;
//                    this.boolean_show_upload=false;
                    for(var i=0;i<data.fileList.length;i++){
                        data.fileList[i].name=data.fileList[i].fileName;
                        data.fileList[i].url=data.fileList[i].fileUrl;
                    }
                    this.http_city_list_by_parentId(data.policyDetail.province);
                    data.policyDetail.industryCategory=data.policyDetail.industry0;
                    if(!Util.isNull(data.policyDetail.industryCategory)){
                        this.selectIndustryCategory_addPolicyModel(data.policyDetail.industryCategory);
                    }
                    data.policyDetail.industryCategory1=data.policyDetail.industry1;
                    if(!Util.isNull(data.policyDetail.industryCategory1)){
                        this.selectIndustryCategory1_addPolicyModel(data.policyDetail.industryCategory1);
                    }
                    data.policyDetail.industryCategory2=data.policyDetail.industry2;
                    if(!Util.isNull(data.policyDetail.industryCategory2)){
                        this.selectIndustryCategory2_addPolicyModel(data.policyDetail.industryCategory2);
                    }
                    data.policyDetail.industryCategory3=data.policyDetail.industry3;
                    if(!data.policyDetail.isReplaced){
                        data.policyDetail.isReplaced=0;
                    }
                    this.array_file_addPolicyModel=data.fileList;
                    this.array_file_param_before=data.fileList;
                    this.obj_addPolicyModel=data.policyDetail;
//                for(var i=0;i<data.fileList.length;i++){
//                    this.fileList_updatePolicyModel.push({
//                        name:data.fileList[i].fileName
//                    })
//                }
                }, response => {
                    Util.removeWaiting();
                });
            },
            showQueryPolicyModel(scope){
                this.tabsValue="basicInfo";
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/queryByCode.do",
                        {policyCode:scope.row.policyCode}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    console.log(data);
                    this.boolean_show_queryPolicyModel=true;
                    data.policyDetail.industryCategory=data.policyDetail.industry0;
                    data.policyDetail.industryCategory1=data.policyDetail.industry1;
                    data.policyDetail.industryCategory2=data.policyDetail.industry2;
                    data.policyDetail.industryCategory3=data.policyDetail.industry3;
                    data.policyDetail.policyType=Constant.obj_policyCategory[data.policyDetail.policyType];
                    data.policyDetail.policyRelation=Constant.obj_policyRelation[data.policyDetail.policyRelation];
                    data.policyDetail.fileStatus=Constant.obj_fileStatus[data.policyDetail.fileStatus];
                    if(data.policyDetail.issueTimeBegin.split(" ").length == 2){
                        data.policyDetail.issueTimeBegin=data.policyDetail.issueTimeBegin.split(" ")[0];
                    }
                    if(data.policyDetail.beginTime.split(" ").length == 2){
                        data.policyDetail.beginTime=data.policyDetail.beginTime.split(" ")[0];
                    }
                    this.array_file_addPolicyModel=data.fileList;
                    this.obj_addPolicyModel=data.policyDetail;
                }, response => {
                    Util.removeWaiting();
                });
            },
            policyDetail_queryPageList_ByKey(value){
                this.obj_page.pageIndex=0;
                this.pagination_policyDetail_queryPageList();
            },
            http_PolicyDetail_queryPageList(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/queryPageList.do",
                        param
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    this.total_policyDetailTable=result.total;
                    var data=result.data;
                    for(var i=0;i<data.length;i++){
                        data[i].fileStatus=Constant.obj_fileStatus[data[i].fileStatus];
                        data[i].policyType=Constant.obj_policyCategory[data[i].policyType];
                        if(data[i].issueTimeBegin.split(" ").length == 2){
                            data[i].issueTimeBegin=data[i].issueTimeBegin.split(" ")[0];
                        }
                        data[i].index=(i+1)+this.obj_page.pageIndex*this.obj_page.pageSize
                    }
                    this.array_policyDetail=data;
                }, response => {
                    Util.removeWaiting();
                });
            },
            selectPolicyDetailTableRow(val){
                console.log(val);
                this.obj_selectedPolicyDetailTableRow=val;
            },
            beforeUpload(file){

            },
            uploadChange(file,fileList){
                var list=[];
                for(var i=0;i<fileList.length;i++){
                    if(fileList[i].fileId){
                        list.push(fileList[i]);
                        continue;
                    }
                    var type=fileList[i].name.substring(fileList[i].name.lastIndexOf(".")+1);
                    var isWord = type === "doc" || type === "docx";
                    var isLt2M = fileList[i].size / 1024 / 1024 < 2;
                    if (!isWord) {
//                        Util.showTipModel('只能上传word文档!');
//                        continue;
                    }
                    if (!isLt2M) {
                        Util.showTipModel('上传文件大小不能超过 2MB!');
                        continue;
                    }
                    list.push(fileList[i]);
                }
                for(var i=0;i<list.length-1;i++){
                    for(var j=i+1;j<list.length;j++){
                        if(list[i].name == list[j].name){
                            list.splice(i,1);
                            break;
                        }
                    }
                }
                this.array_file_addPolicyModel=list;
            },
            uploadRemove(file,fileList){
                this.array_file_addPolicyModel=fileList;
            },
            uploadSuccess(res,file){
                console.log(res);
                this.array_file_param.push({
                    fileName:res.data.fileName,
                    fileUrl:res.data.fileUrl,
                })
                if(this.array_file_param.length == this.needUploadFileCount){
                    var policyContent=this.$refs.ue.getUEContent();
                    this.obj_addPolicyModel.policyContent=policyContent;
                    var industryList=[];
                    for(var i=0;i<this.array_industryCategory.length;i++){
                        var obj=this.array_industryCategory[i];
                        if(obj.categoryCode == this.obj_addPolicyModel.industryCategory){
                            industryList.push({
                                categoryId:obj.categoryId,
                                categoryLevel:obj.categoryLevel,
                                categoryName:obj.categoryName,
                            })
                        }
                    }
                    for(var i=0;i<this.array_industryCategory1.length;i++){
                        var obj=this.array_industryCategory1[i];
                        if(obj.bigCategory == this.obj_addPolicyModel.industryCategory1){
                            industryList.push({
                                categoryId:obj.categoryId,
                                categoryLevel:obj.categoryLevel,
                                categoryName:obj.categoryName,
                            })
                        }
                    }
                    for(var i=0;i<this.array_industryCategory2.length;i++){
                        var obj=this.array_industryCategory2[i];
                        if(obj.middleCategory == this.obj_addPolicyModel.industryCategory2){
                            industryList.push({
                                categoryId:obj.categoryId,
                                categoryLevel:obj.categoryLevel,
                                categoryName:obj.categoryName,
                            })
                        }
                    }
                    for(var i=0;i<this.array_industryCategory3.length;i++){
                        var obj=this.array_industryCategory3[i];
                        if(obj.smallCategory == this.obj_addPolicyModel.industryCategory3){
                            industryList.push({
                                categoryId:obj.categoryId,
                                categoryLevel:obj.categoryLevel,
                                categoryName:obj.categoryName,
                            })
                        }
                    }
                    if(this.operationType == "add"){
                        this.obj_addPolicyModel.categoryId=this.obj_clickedNode.id;
                        this.obj_addPolicyModel.categoryPath=this.obj_clickedNode.categoryPath;
                        var policyCode=Util.uuid();
                        for(var i=0;i<this.array_file_param.length;i++){
                            this.array_file_param[i].policyCode=policyCode;
                        }
                        this.obj_addPolicyModel.policyCode=policyCode;
                        this.http_policyDetail_add(this.obj_addPolicyModel,this.array_file_param,industryList);
                    }else{
//                        this.obj_addPolicyModel.policyId=this.obj_clickedNode.id;
                        for(var i=0;i<this.array_file_addPolicyModel.length;i++){
                            if(!this.array_file_addPolicyModel[i].fileId){
                                for(var j=0;j<this.array_file_param.length;j++){
                                    if(this.array_file_addPolicyModel[i].name == this.array_file_param[j].fileName){
                                        this.array_file_addPolicyModel[i].fileName=this.array_file_param[j].fileName;
                                        this.array_file_addPolicyModel[i].fileUrl=this.array_file_param[j].fileUrl;
                                    }
                                }
                            }
                        }
                        for(var i=0;i<this.array_file_addPolicyModel.length;i++){
                            delete this.array_file_addPolicyModel[i].status;
                        }
                        for(var i=0;i<this.array_file_param_before.length;i++){
                            delete this.array_file_param_before[i].status;
                        }
                        this.http_policyDetail_edit(this.obj_addPolicyModel,this.array_file_param_before,this.array_file_addPolicyModel,industryList);
                    }
                }
            },
            http_policyCategory_queryByCriteria(criteria = "",id){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyCategory/queryByCriteria.do",
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
                                    parentId:id?id:this.obj_clickedNode.id,
                                    childNode:data.categoryList[i],
                                    childNodeName:data.categoryList[i].title,
                                    childNodeId:data.categoryList[i].categoryId,
                                    tree:this.array_tree,
                                    obj_commonNode:obj_commonNode,
                                });
                            }
                        }
//                        if(data.policyDetailList){
//                            for(var i=0;i<data.policyDetailList.length;i++){
//                                this.addChildNodeOfId({
//                                    parentId:this.obj_clickedNode.id,
//                                    childNode:data.policyDetailList[i],
//                                    childNodeName:data.policyDetailList[i].policyTitle,
//                                    childNodeId:data.policyDetailList[i].policyId,
//                                    tree:this.array_tree,
//                                    obj_commonNode:this.obj_commonPolicyNode,
//                                });
//                            }
//                        }
                    }else{
                        for(var i=0;i<data.categoryList.length;i++){
                            data.categoryList[i]=Object.assign({
                                "label": data.categoryList[i].title,
                                "id": data.categoryList[i].categoryId,
                            },this.obj_commonCategoryNode,data.categoryList[i])
                        }
                        this.array_tree=data.categoryList;
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            http_policyCategory_add(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyCategory/add.do",
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
                            childNodeName:data.title,
                            childNodeId:data.categoryId,
                            tree:this.array_tree,
                            obj_commonNode:obj_commonNode,
                        });
                    }else{
                        this.array_tree.push(Object.assign({
                            "label": param.title,
                            "id": data.categoryId,
                            "categoryLevel": 1,
                        },this.obj_commonCategoryNode,data));
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            http_policyDetail_delete(item){
                Util.showTipModel("确定删除该条数据",() => {
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
                        this.pagination_policyDetail_queryPageList();
                    }, response => {
                        Util.removeWaiting();
                    });
                })
            },
            http_policyDetail_add(policyDetail,fileList=[],industryList){
                console.log(policyDetail);
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/add.do",
                        {addStr:JSON.stringify({policyDetail: policyDetail,fileList: fileList}),industryListStr:JSON.stringify(industryList)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    this.boolean_show_addPolicyModel=false;
                    this.obj_page.pageIndex=0;
                    this.pagination_policyDetail_queryPageList();
                }, response => {
                    Util.removeWaiting();
                });
            },
            http_policyCategory_edit(param){
                console.log(param)
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyCategory/edit.do",
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
                    this.obj_clickedNode=Object.assign(this.obj_clickedNode,param,{"label": param.title})
                }, response => {
                    Util.removeWaiting();
                });
            },
            http_policyDetail_edit(policyDetail,beforeFileList=[],afterFileList=[],industryList){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyDetail/edit.do",
                        {editStr:JSON.stringify({policyDetail: policyDetail,beforeFileList: beforeFileList,afterFileList: afterFileList}),industryListStr:JSON.stringify(industryList)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    this.boolean_show_addPolicyModel=false;
                    this.obj_page.pageIndex=0;
                    this.pagination_policyDetail_queryPageList();
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
                if(!this.obj_clickedNode.isCategory){
                    this.Util.showTipModel("请先选中分类结点");
                    return;
                }
                this.title_addCategoryModel="修改税务政策分类";
                this.boolean_show_addCategoryModel=true;
                this.obj_addCategoryModel=Object.assign({},this.obj_clickedNode);
            },
            showUpdateLeafCategoryModel(){
                this.operationType="update";
                if(!this.obj_clickedNode){
                    this.Util.showTipModel("请先选中一个结点");
                    return;
                }
                if(this.obj_clickedNode.isCategory){
                    this.Util.showTipModel("请先选中政策结点");
                    return;
                }
                this.title_addCategoryModel="修改税务政策";
                this.boolean_show_addLeafCategoryModel=true;
                this.obj_addLeafCategoryModel=Object.assign({},this.obj_clickedNode);
            },
            showAddCategoryModel(){
                if(this.obj_clickedNode && !this.obj_clickedNode.isCategory){
                    Util.showTipModel("叶子结点下不能再创建子结点");
                    return;
                }
                this.title_addCategoryModel="新增税务政策分类";
                this.operationType="add";
                this.boolean_show_addCategoryModel=true;
                Util.resetObj(this.obj_addCategoryModel,{
                    isLeaf:Constant.array_yesOrNo[0].value,
                    categoryCode:Util.uuid()
                });
            },
            showAddLeafCategoryModel(){
                if(!this.obj_clickedNode){
                    Util.showTipModel("请先选中一个分类结点");
                    return;
                }
                if(this.obj_clickedNode && !this.obj_clickedNode.isCategory){
                    Util.showTipModel("叶子结点下不能再创建子结点");
                    return;
                }
                this.title_addLeafCategoryModel="新增税务政策";
                this.operationType="add";
                this.boolean_show_addLeafCategoryModel=true;
                Util.resetObj(this.obj_addLeafCategoryModel,{
                    isLeaf:Constant.array_yesOrNo[0].value,
                    categoryCode:Util.uuid()
                });
            },
            showAddPolicyModel(){
                this.tabsValue="basicInfo";
                if(!this.obj_clickedNode.isLeaf){
                    this.Util.showTipModel("请先选中叶子结点");
                    return;
                }
                this.title_addPolicyModel="新增税务政策信息";
                this.operationType="add";
                this.boolean_show_addPolicyModel=true;
                this.array_file_addPolicyModel=[];
                this.array_city=[];
                this.array_industryCategory1=[];
                this.array_industryCategory2=[];
                this.array_industryCategory3=[];
                Util.resetObj(this.obj_addPolicyModel,{
                    policyType:Constant.array_policyCategory[0].value,
                    policyRelation:Constant.array_policyRelation[0].value,
                    fileStatus:Constant.array_fileStatus[0].value,
                    isReplaced:Constant.array_yesOrNo[0].value,
                    categoryCode:this.obj_clickedNode.categoryCode
                });
            },
            confirmBtn_addCategoryModel(data){
                this.boolean_show_addCategoryModel=false;
                if(this.operationType == "add"){
                    data.isLeaf=0;
                    data.categoryLevel=1;
                    data.categoryPath=data.categoryCode;
                    if(this.obj_clickedNode){
                        data.parentCategoryId=this.obj_clickedNode.categoryId;
                        data.parentCategoryCode=this.obj_clickedNode.categoryCode;
                        data.categoryLevel=this.obj_clickedNode.categoryLevel+1;
                        data.categoryPath=this.obj_clickedNode.categoryPath;
                    }
                    this.http_policyCategory_add(data);
                }else{
                    data.categoryId=this.obj_clickedNode.categoryId;
                    this.http_policyCategory_edit(data);
                }
            },
            confirmBtn_addLeafCategoryModel(data){
                this.boolean_show_addLeafCategoryModel=false;
                if(this.operationType == "add"){
                    data.isLeaf=1;
                    data.categoryLevel=1;
                    data.categoryPath=data.categoryCode;
                    if(this.obj_clickedNode){
                        data.parentCategoryId=this.obj_clickedNode.categoryId;
                        data.parentCategoryCode=this.obj_clickedNode.categoryCode;
                        data.categoryLevel=this.obj_clickedNode.categoryLevel+1;
                        data.categoryPath=this.obj_clickedNode.categoryPath;
                    }
                    this.http_policyCategory_add(data);
                }else{
                    data.categoryId=this.obj_clickedNode.categoryId;
                    this.http_policyCategory_edit(data);
                }
            },
            confirmBtn_addPolicyModel(data){
                var policyContent=this.$refs.ue.getUEContent();
                if(!policyContent){
                    Util.showTipModel("正文不能为空");
                    return;
                }
                if(data.isReplaced == 0){
                    data.beReplacedPolicyTitle="";
                    data.beReplacedPolicyId="";
                }
                this.array_file_param=[];
                this.needUploadFileCount=0;
                for(var i=0;i<this.array_file_addPolicyModel.length;i++){
                    if(!this.array_file_addPolicyModel[i].fileId){
                        this.needUploadFileCount++;
                    }
                }
                for(var i=0;i<this.array_file_addPolicyModel.length;i++){
                    if(!this.array_file_addPolicyModel[i].fileId){
                        this.$refs.upload_addPolicyModel.submit();
                        return;
                    }
                }
                data.policyContent=policyContent;
                console.log(policyContent);
                var industryList=[];
                for(var i=0;i<this.array_industryCategory.length;i++){
                    var obj=this.array_industryCategory[i];
                    if(obj.categoryCode == data.industryCategory){
                        industryList.push({
                            categoryId:obj.categoryId,
                            categoryLevel:obj.categoryLevel,
                            categoryName:obj.categoryName,
                        })
                    }
                }
                for(var i=0;i<this.array_industryCategory1.length;i++){
                    var obj=this.array_industryCategory1[i];
                    if(obj.bigCategory == data.industryCategory1){
                        industryList.push({
                            categoryId:obj.categoryId,
                            categoryLevel:obj.categoryLevel,
                            categoryName:obj.categoryName,
                        })
                    }
                }
                for(var i=0;i<this.array_industryCategory2.length;i++){
                    var obj=this.array_industryCategory2[i];
                    if(obj.middleCategory == data.industryCategory2){
                        industryList.push({
                            categoryId:obj.categoryId,
                            categoryLevel:obj.categoryLevel,
                            categoryName:obj.categoryName,
                        })
                    }
                }
                for(var i=0;i<this.array_industryCategory3.length;i++){
                    var obj=this.array_industryCategory3[i];
                    if(obj.smallCategory == data.industryCategory3){
                        industryList.push({
                            categoryId:obj.categoryId,
                            categoryLevel:obj.categoryLevel,
                            categoryName:obj.categoryName,
                        })
                    }
                }
                if(this.operationType == "add"){
                    data.categoryId=this.obj_clickedNode.id;
                    data.categoryPath=this.obj_clickedNode.categoryPath;
                    data.policyCode=Util.uuid();
                    this.http_policyDetail_add(data,null,industryList);
                }else{
//                    data.policyId=this.obj_addPolicyModel.policyId;
                    for(var i=0;i<this.array_file_addPolicyModel.length;i++){
                        delete this.array_file_addPolicyModel[i].status;
                    }
                    for(var i=0;i<this.array_file_param_before.length;i++){
                        delete this.array_file_param_before[i].status;
                    }
                    this.http_policyDetail_edit(data,this.array_file_param_before,this.array_file_addPolicyModel,industryList);
                }
            },
            nodeIsOpened(item){
                if(item.isCategory && !item.children){
                    this.http_policyCategory_queryByCriteria({parentCategoryCode:item.categoryCode,parentCategoryId:item.categoryId},item.id);
                }
            },
            nodeIsClicked(item){
                if(item.isClicked){
                    if(this.obj_clickedNode){
                        this.obj_clickedNode.isClicked = false;
                    }
                }else{
                    this.obj_clickedNode="";
                    this.obj_page.pageIndex=0;
                    this.pagination_policyDetail_queryPageList();
                    return
                }
                this.obj_clickedNode=item;
                this.obj_page.pageIndex=0;
                this.pagination_policyDetail_queryPageList();
                if(item.isCategory && !item.children){
                    this.http_policyCategory_queryByCriteria({parentCategoryCode:item.categoryCode,parentCategoryId:item.categoryId});
                }
            },
            deleteNode(){
                if(this.obj_clickedNode){
                    if(this.obj_clickedNode.children && this.obj_clickedNode.children.length){
                        Util.showTipModel("只能删除叶子结点");
                        return;
                    }
                    Util.showTipModel("确定删除该结点",() => {
                        var url=Constant.ctx+"/policyCategory/delete.do";
                        var param={delstr: JSON.stringify({categoryId:this.obj_clickedNode.id})};
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
                    })
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
        padding-bottom:15px;
        background: #fff;
        height:495px;
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
        overflow: auto;
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
