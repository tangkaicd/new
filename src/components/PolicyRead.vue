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
                                    @openNode="nodeIsOpened"
                                    @handle="nodeIsClicked">
                            </vue-tree>
                        </div>
                    </div>
                    <div class="rightWrapper">
                        <div class="header112">
                            <div class="fr">
                                <!--<span style="margin:0px 10px" class="btn_small" @click="showModel_eleRead(1)">-->
                                    <!--<span class="name">涉税凭证</span>-->
                                <!--</span>-->
                                <span class="addBtn_small" style="margin: 0px 10px;" @click="showAddPolicyModel">
                                    <span class="fa fa-plus"></span><span class="name">新增解读</span>
                                </span>
                                <span class="addBtn_small" @click="showUpdatePolicyExplainModel">
                                    <span class="fa fa-edit"></span><span class="name">修改解读</span>
                                </span>
                                <span style="margin:10px" class="btn_small" @click="auditPolicyExplain">
                                    <span class="name">提交审核</span>
                                </span>
                                <span class="deleteBtn_small" @click="showModel_eleRead(0)">
                                    <span class="name">要素解读</span>
                                </span>
                            </div>
                        </div>
                        <div class="body112">
                            <div class="body1121">
                                <el-table
                                        :data="array_policyExplain"
                                        class="nowrap-td-last"
                                        height="300"
                                        border
                                        highlight-current-row
                                        @current-change="selectPolicyExplainTableRow"
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
                                            prop="fileStateView"
                                            label="文件状态">
                                    </el-table-column>
                                    <el-table-column
                                            prop="auditStateView"
                                            label="审核状态">
                                    </el-table-column>
                                    <el-table-column
                                            label="操作">
                                        <template slot-scope="scope">
                                            <span style="margin-right:3px" class="btn_small" @click="showQueryPolicyExplainModel(scope)">
                                                <span class="name">查看</span>
                                            </span>
                                            <span class="deleteBtn_small" @click="deletePolicyDetail(scope.row)">
                                                <span class="fa fa-trash-o"></span><span class="name">删除</span>
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
                :title="title_planSchemeNameModel"
                :formObj="obj_planSchemeNameModel"
                v-if="boolean_show_planSchemeNameModel"
                @hide="boolean_show_planSchemeNameModel=false"
                @save="confirmBtn_planSchemeNameModel">
            <LabelAndValue
                    label="筹划方案名称"
                    :isNotNull="true"
                    width="300"
                    name="name"
                    :formObj="obj_planSchemeNameModel"/>
            <LabelAndValue
                    label="是否执行前置条件"
                    type="radio"
                    :isNotNull="true"
                    name="needCondition"
                    :radio="Constant.array_yesOrNo"
                    :formObj="obj_planSchemeNameModel"/>
        </Model>

        <Model
                style_model="z-index:2000"
                title="输出结果选择"
                :formObj="obj_outputResultModel_addPolicyModel"
                v-if="boolean_show_outputResultModel_addPolicyModel"
                @hide="boolean_show_outputResultModel_addPolicyModel=false"
                @save="confirmBtn_outputResultModel_addPolicyModel">
            <LabelAndValue
                    label="是否输出结果"
                    type="radio"
                    :isNotNull="true"
                    name="isOutputResult"
                    :radio="Constant.array_yesOrNo"
                    :formObj="obj_outputResultModel_addPolicyModel"/>
        </Model>

        <Model
                style_model="z-index:2000"
                style_dialog="width:95%;min-width:1000px"
                title="参考政策列表"
                v-if="boolean_show_policyTableModel_addPolicyModel"
                @hide="boolean_show_policyTableModel_addPolicyModel=false"
                @save="confirmBtn_policyTableModel_addPolicyModel">
            <div class="fl" style="width:50%">
                <Search
                        placeholder="请输入关键字查询"
                        v-model="value_search_policyTableModel_addPolicyModel"
                        @search="search_policyTableModel_addPolicyModel"
                />
                <el-table
                        style="margin-top:15px;"
                        :data="array_policyTableModel_addPolicyModel"
                        ref="policyTableModel_addPolicyModel"
                        height="350"
                        border
                        row-key="id"
                        @selection-change="handleSelectionChange_policyTableModel_addPolicyModel">
                    <el-table-column
                            type="selection"
                            :reserve-selection="true"
                            width="55">
                    </el-table-column>
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
                            prop="listFile"
                            label="文件">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.listFile">
                                <span class="aBtn" @click="openFile(item.fileUrl)">{{item.fileName}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        v-if="boolean_show_pagination"
                        style="margin-top:15px;text-align: right"
                        @size-change="sizeChange_policyTableModel_addPolicyModel"
                        @current-change="currentChange_policyTableModel_addPolicyModel"
                        :page-sizes="Constant.array_pageSize"
                        :page-size="pageSize_policyTableModel_addPolicyModel"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total_policyTableModel_addPolicyModel">
                </el-pagination>
            </div>
            <div class="fr" style="width:calc(50% - 20px);margin-top: 47px;">
                <el-table
                        :data="array_rightTable_policyTableModel_addPolicyModel"
                        height="350"
                        border>
                    <el-table-column
                            type="index"
                            width="50"
                            label="序号">
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
                            prop="listFile"
                            label="文件">
                        <template slot-scope="scope">
                            <div v-for="item in scope.row.listFile">
                                <span class="aBtn" @click="openFile(item.fileUrl)">{{item.fileName}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </Model>

        <Model
                style_model="z-index:2000"
                title="附件上传"
                v-if="boolean_show_uploadModel_addPolicyModel"
                @hide="boolean_show_uploadModel_addPolicyModel=false"
                @save="confirmBtn_uploadModel_addPolicyModel">
            <el-upload
                    ref="upload_uploadModel_addPolicyModel"
                    :multiple="true"
                    name="tempFile"
                    :data="{}"
                    :action="Constant.ctx+'/policyDetail/uploadDetailFile.do'"
                    :auto-upload="false"
                    :file-list="array_file_uploadModel_addPolicyModel"
                    :on-success="uploadSuccess"
                    :on-change="uploadChange"
                    :on-remove="uploadRemove">
                <button>上传附件</button>
            </el-upload>
        </Model>

        <Model
                style_model="z-index:2000"
                title="附件详情"
                :hideFooter="true"
                style_body="min-height: 200px"
                v-if="boolean_show_fileModel_addPolicyModel"
                @hide="boolean_show_fileModel_addPolicyModel=false">
                <div style="margin-bottom:15px" v-for="item in array_file_fileModel_addPolicyModel">
                    <a :href="item.url" target="_blank">{{item.name}}</a>
                </div>
        </Model>

        <Model
                class="addPolicyModel"
                style_dialog="width:100%;min-width:1100px"
                :style_body="'padding-left:0px;padding-top:0px;padding-right:0px;min-height:440px;max-height: inherit;height: '+style_addPolicyModel+'px'"
                :title="title_addPolicyModel"
                :formObj="obj_addPolicyModel"
                v-if="boolean_show_addPolicyModel"
                @hide="boolean_show_addPolicyModel=false"
                @save="confirmBtn_addPolicyModel">
            <el-tabs v-model="tabsValue"
                     tab-position="left"
                     @tab-click="tabClick_addPolicyModel"
                     :style="'min-height:430px;width:100%;min-width:1100px;height:'+style_addPolicyModel+'px'">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in obj_addPolicyModel"
                        :label="item.title"
                        :name="item.name"
                >
                    <div v-if="item.name == 'basicInfo'">
                        <div style="margin:0px auto">
                            <LabelAndValue
                                    style="margin-top:15px"
                                    label="解读分类"
                                    type="label"
                                    :labelWidth="140"
                                    :value="plotCategoryName_addPolicyModel"/>
                            <LabelAndValue
                                    style="margin-top:15px"
                                    label="解读标题"
                                    :isNotNull="true"
                                    width="767"
                                    name="explainTitle"
                                    :formObj="item.basicInfo"/>
                            <LabelAndValue
                                    label="解读描述"
                                    type="textarea"
                                    :isNotNull="true"
                                    width="745"
                                    name="explainDesc"
                                    :formObj="item.basicInfo"/>
                            <LabelAndValue
                                    label="使用场景"
                                    type="textarea"
                                    :isNotNull="true"
                                    width="745"
                                    name="explainScene"
                                    :formObj="item.basicInfo"/>
                            <!--<LabelAndValue-->
                                    <!--label="修改概要"-->
                                    <!--type="textarea"-->
                                    <!--width="745"-->
                                    <!--name="explainScene"-->
                                    <!--:formObj="item.basicInfo"/>-->
                            <LabelAndValue
                                    label="文件状态"
                                    type="radio"
                                    :isNotNull="true"
                                    name="fileState"
                                    :radio="Constant.array_fileStatus"
                                    :formObj="item.basicInfo"/>
                            <div class="each">
                            <span class="name">
                                <!--<span class="notNull">*</span>-->
                                行政区域<span>：</span>
                            </span>
                                <el-select
                                        filterable
                                        multiple
                                        placeholder="请选择省"
                                        v-model="item.basicInfo.province"
                                        @change="selectProvince_addPolicyModel">
                                    <el-option
                                            v-for="item1 in array_province_addPolicyModel"
                                            :key="item1.provinceCode"
                                            :label="item1.divisionName"
                                            :value="item1.provinceCode">
                                    </el-option>
                                </el-select>
                                <!--<span class="cp" style="margin: 0 5px;font-size: 20px" @click="selectProvince_addPolicyModel">></span>-->
                                <el-select
                                        style="margin:0px 10px"
                                        filterable
                                        multiple
                                        placeholder="请选择市"
                                        v-model="item.basicInfo.city"
                                        @change="selectCity_addPolicyModel">
                                    <el-option
                                            v-for="item1 in array_city_addPolicyModel"
                                            :key="item1.cityCode"
                                            :label="item1.divisionName"
                                            :value="item1.cityCode">
                                    </el-option>
                                </el-select>
                                <!--<span class="cp" style="margin: 0 5px;font-size: 20px" @click="selectCity_addPolicyModel">></span>-->
                                <el-select
                                        filterable
                                        multiple
                                        placeholder="请选择县"
                                        @change="selectArea_addPolicyModel"
                                        v-model="item.basicInfo.area">
                                    <el-option
                                            v-for="item1 in array_area_addPolicyModel"
                                            :key="item1.areasCode"
                                            :label="item1.divisionName"
                                            :value="item1.areasCode">
                                    </el-option>
                                </el-select>
                            </div>

                            <div class="each">
                            <span class="name">
                                <!--<span class="notNull">*</span>-->
                                纳税人<span>：</span>
                            </span>
                                <el-select
                                        style="margin-right:10px"
                                        filterable
                                        placeholder="请选择"
                                        v-model="item.basicInfo.taxpayerCategory"
                                        @change="selectTaxpayerCategory_addPolicyModel">
                                    <el-option
                                            v-for="item1 in array_taxpayerCategory_addPolicyModel"
                                            :key="item1.categoryCode"
                                            :label="item1.categoryName"
                                            :value="item1.categoryCode">
                                    </el-option>
                                </el-select>
                                <el-select
                                        filterable
                                        multiple
                                        placeholder="请选择"
                                        @change="selectTaxpayerCategory1_addPolicyModel"
                                        v-model="item.basicInfo.taxpayerCategory1">
                                    <el-option
                                            v-for="item1 in array_taxpayerCategory1_addPolicyModel"
                                            :key="item1.smallCategory"
                                            :label="item1.categoryName"
                                            :value="item1.smallCategory">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <el-upload
                                style="margin-left:145px;margin-right:10px"
                                ref="upload_basicInfo_addPolicyModel"
                                :multiple="true"
                                name="tempFile"
                                :data="{}"
                                :action="Constant.ctx+'/policyExplain/uploadAccFile2Server.do'"
                                :file-list="array_file_basicInfo_addPolicyModel"
                                :on-success="uploadSuccess_basicInfo_addPolicyModel"
                                :on-change="uploadChange_basicInfo_addPolicyModel"
                                :on-remove="uploadRemove_basicInfo_addPolicyModel">
                            <button>上传附件</button>
                        </el-upload>

                    </div>
                    <div v-else :style="'height:'+style_addPolicyModel+'px'" class="planScheme" :id="'planScheme'+index">

                    </div>
                </el-tab-pane>
            </el-tabs>
            <span class="btn_small addPlanSchemeBtn" @click="addPlanScheme">
                <span class="fa fa-plus"></span>
            </span>
            <span class="deleteBtn_small deletePlanSchemeBtn" @click="deletePlanScheme">
                <span class="fa fa-trash-o"></span>
            </span>
            <span v-if="boolean_show_zoomBtnWrapper_addPolicyModel" class="zoomBtnWrapper">
                <span style="margin-right:5px;font-size: 12px">{{zoomRange*10}}%</span>
                <span class="fa fa-search-minus cp" @click="zoomIn_addPolicyModel"></span>
                <span style="margin-left:5px" class="fa fa-search-plus cp" @click="zoomOut_addPolicyModel"></span>
                <span style="margin-left:5px" class="fa fa-refresh cp" @click="resetChart_addPolicyModel"></span>
            </span>

        </Model>

        <Model
                class="addPolicyModel queryPolicyModel"
                :hideFooter="true"
                style_dialog="width:100%;min-width:1100px"
                :style_body="'padding-left:0px;padding-top:0px;padding-right:0px;min-height:440px;max-height: inherit;height: '+(style_addPolicyModel + 73)+'px'"
                :title="title_addPolicyModel"
                :formObj="obj_addPolicyModel"
                v-if="boolean_show_queryPolicyModel"
                @hide="boolean_show_queryPolicyModel=false">
            <el-tabs v-model="tabsValue"
                     tab-position="left"
                     @tab-click="tabClick_addPolicyModel"
                     :style="'min-height:430px;width:100%;min-width:1100px;height:'+(style_addPolicyModel + 73)+'px'">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in obj_addPolicyModel"
                        :label="item.title"
                        :name="item.name"
                >
                    <div v-if="item.name == 'basicInfo'" style="padding-bottom:30px">
                        <LabelAndValue
                                style="margin-top:15px"
                                :disabled="true"
                                label="解读分类"
                                type="label"
                                :labelWidth="140"
                                :value="plotCategoryName_addPolicyModel"/>
                        <LabelAndValue
                                style="margin-top:15px"
                                :labelWidth="140"
                                :disabled="true"
                                label="解读标题"
                                :isNotNull="true"
                                width="767"
                                name="explainTitle"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="解读描述"
                                :labelWidth="140"
                                :disabled="true"
                                type="textarea"
                                :isNotNull="true"
                                width="745"
                                name="explainDesc"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="使用场景"
                                :labelWidth="140"
                                :disabled="true"
                                type="textarea"
                                :isNotNull="true"
                                width="745"
                                name="explainScene"
                                :formObj="item.basicInfo"/>
                        <!--<LabelAndValue-->
                                <!--label="修改概要"-->
                                <!--:labelWidth="140"-->
                                <!--:disabled="true"-->
                                <!--type="textarea"-->
                                <!--:isNotNull="true"-->
                                <!--width="745"-->
                                <!--name="explainScene"-->
                                <!--:formObj="item.basicInfo"/>-->
                        <LabelAndValue
                                label="文件状态"
                                :labelWidth="140"
                                :disabled="true"
                                type="radio"
                                :isNotNull="true"
                                name="fileState"
                                :radio="Constant.array_fileStatus"
                                :formObj="item.basicInfo"/>
                        <div class="each">
                            <span class="name fl" style="width:140px">
                                <!--<span class="notNull">*</span>-->
                                行政区域<span>：</span>
                            </span>
                            <div style="min-height:20px;white-space: normal;margin-bottom: 20px;padding: 0px 5px;margin-right: 20px;border:1px #F2F2F2 solid;width:220px;float:left">
                                {{item.basicInfo.areasCode0}}
                            </div>
                            <div style="min-height:20px;white-space: normal;padding: 0px 5px;margin-right: 20px;border:1px #F2F2F2 solid;width:220px;float:left">
                                {{item.basicInfo.areasCode1}}
                            </div>
                            <div style="min-height:20px;white-space: normal;padding: 0px 5px;border:1px #F2F2F2 solid;width:220px;float:left">
                                {{item.basicInfo.areasCode2}}
                            </div>
                         </div>
                        <div class="each cb">
                            <span class="name fl" style="width:140px">
                                <!--<span class="notNull">*</span>-->
                                纳税人<span>：</span>
                            </span>
                            <div style="min-height:20px;white-space: normal;padding: 0px 5px;margin-right: 20px;border:1px #F2F2F2 solid;width:220px;float:left">
                                {{item.basicInfo.tax0}}
                            </div>
                            <div style="min-height:20px;white-space: normal;padding: 0px 5px;border:1px #F2F2F2 solid;width:220px;float:left">
                                {{item.basicInfo.tax1}}
                            </div>
                        </div>
                        <div class="each cb" style="margin-top: 40px;">
                            <span class="name" style="width:140px">
                                附件<span>：</span>
                            </span>
                            <span v-for="item1 in item.basicInfo.accList" style="margin-right:20px" class="aBtn" @click="openFile(item1.fileUrl)">{{item1.sourceFileName}}</span>
                        </div>

                    </div>
                    <div v-else :style="'height:'+(style_addPolicyModel + 73)+'px'" class="planScheme" :id="'planScheme'+index">

                    </div>
                </el-tab-pane>
            </el-tabs>
            <span v-if="boolean_show_zoomBtnWrapper_addPolicyModel" class="zoomBtnWrapper">
                <span style="margin-right:5px;font-size: 12px">{{zoomRange*10}}%</span>
                <span class="fa fa-search-minus cp" @click="zoomIn_addPolicyModel"></span>
                <span style="margin-left:5px" class="fa fa-search-plus cp" @click="zoomOut_addPolicyModel"></span>
                <span style="margin-left:5px" class="fa fa-refresh cp" @click="resetChart_addPolicyModel"></span>
            </span>
        </Model>

        <Model
                :title="title_eleReadModel"
                style_dialog="width:80%;min-width:900px"
                v-if="boolean_show_eleReadModel"
                @hide="boolean_show_eleReadModel=false"
                @save="confirmBtn_eleReadModel">
            <div class="fr" style="margin-bottom: 20px;">
                <span class="addBtn" @click="showModel_fileUpload_eleReadModel">
                    <span class="name">上传文件</span>
                </span>
                <span style="margin-left:10px;" class="addBtn" @click="addTr_eleReadModel">
                    增加
                </span>
            </div>
            <el-table
                    :data="array_eleReadModel"
                    height="360"
                    highlight-current-row
                    @current-change="selectRow_eleReadModel"
                    border
                    style="margin-top:10px;text-align: center">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="项目总名称">
                    <template slot-scope="scope">
                        <el-select
                                @change="(value) => selectTotalSysEleName(value, scope)"
                                filterable
                                placeholder="请选择项目总名称"
                                v-model="scope.row.bak3">
                            <el-option
                                    v-for="item1 in array_totalSysEleName"
                                    :key="item1.value"
                                    :label="item1.label"
                                    :value="item1.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="项目名称">
                    <template slot-scope="scope">
                        <el-select
                                filterable
                                placeholder="请选择项目名称"
                                v-model="scope.row.eleCode">
                            <el-option
                                    v-for="item1 in scope.row.array_sysEleName"
                                    :key="item1.value"
                                    :label="item1.label"
                                    :value="item1.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="文件">
                    <template slot-scope="scope">
                        <div>
                            <span class="aBtn" @click="openFile(scope.row.fileData?scope.row.fileData.split('|')[1]:'')">{{scope.row.fileData?scope.row.fileData.split('|')[0]:''}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="80">
                    <template slot-scope="scope">
                        <span class="aBtn" @click="deleteTr_eleReadModel(scope)">
                            删除
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </Model>

        <Model
                title="文件上传"
                v-if="boolean_show_fileUploadModel_eleReadModel"
                @hide="boolean_show_fileUploadModel_eleReadModel=false"
                @save="confirmBtn_fileUploadModel_eleReadModel">
            <el-upload
                    ref="fileUploadModel_eleReadModel"
                    name="tempFile"
                    :data="{}"
                    :auto-upload="false"
                    :action="Constant.ctx+'/policyDetail/uploadDetailFile.do'"
                    :file-list="array_file_fileUploadModel_eleReadModel"
                    :on-success="uploadSuccess_fileUploadModel_eleReadModel"
                    :on-change="uploadChange_fileUploadModel_eleReadModel"
                    :on-remove="uploadRemove_fileUploadModel_eleReadModel">
                <button>选择文件</button>
            </el-upload>
        </Model>
    </div>
</template>

<script>
    import Tree from '@/json/tree.json';
    export default {
        components: {

        },
          data () {
            return {
                init:false,
                total_policyExplain:0,
                tabsValue:"basicInfo",
                tabsValue_planScheme:"businessLogic",
                labelWidth_policyDetail:140,
                operationType:"",
                operation_planSchemeNameModel:"",
                date_search:"",
                key_search:"",
                policyCategory_search:"",
                title_addCategoryModel:"",
                title_addPolicyModel:"",
                title_planSchemeNameModel:"",
                value_search:"",
                plotCategoryName_addPolicyModel:"",
                province_addPolicyModel:"",
                city_addPolicyModel:"",
                area_addPolicyModel:"",
                taxpayerCategory_addPolicyModel:"",
                taxpayerCategory1_addPolicyModel:"",
                pageSize:Constant.array_pageSize[0],
                decreaseZoom:0.9,
                increaseZoom:1.1,
                zoomRange:10,
                array_file_param:[],
                needUploadFileCount:0,
                pageSize_policyTableModel_addPolicyModel:Constant.array_pageSize[0],
                total_policyTableModel_addPolicyModel:0,
                value_search_policyTableModel_addPolicyModel:"",
                type_eleRead:"",

                boolean_show_pagination:true,
                boolean_show_addCategoryModel:false,
                boolean_show_addPolicyModel:false,
                boolean_showIsLeafRadio_addCategoryModel:true,
                boolean_show_queryPolicyModel:false,
                boolean_show_planSchemeNameModel:false,
                boolean_show_zoomBtnWrapper_addPolicyModel:false,
                boolean_show_outputResultModel_addPolicyModel:false,
                boolean_show_uploadModel_addPolicyModel:false,
                boolean_show_fileModel_addPolicyModel:false,
                boolean_show_policyTableModel_addPolicyModel:false,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_page_basic:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_page_policyTableModel_addPolicyModel:{
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
                    name:"",
                    needCondition:""
                },
                obj_outputResultModel_addPolicyModel:{
                    isOutputResult:"",
                },
                obj_addPolicyModel_basic:[{
                    title: "基础信息",
                    name: "basicInfo",
                    basicInfo:{
                        explainTitle: "",
                        explainDesc: "",
                        explainScene: "",
                        fileState: Constant.array_fileStatus[0].value,
                        province:[],
                        city:[],
                        area:[],
                        taxpayerCategory:"",
                        taxpayerCategory1:[],
                    }
                },{
                    title: "前置条件",
                    planContent: "",
                    planType:0,
                    name: "preCondition",
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
                }],
                obj_addPolicyModel:[{
                    title: "基础信息",
                    name: "basicInfo",
                    basicInfo:{
                        explainTitle: "",
                        explainDesc: "",
                        explainScene: "",
                        fileState: Constant.array_fileStatus[0].value,
                        province:[],
                        city:[],
                        area:[],
                        taxpayerCategory:"",
                        taxpayerCategory1:[],
                    }
                }, {
                    title: "筹划方案1",
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
                obj_addPolicyModel_current:"",
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
                diagram:"",

                array_options_policyCategory:[{value:1,label:"房产税"},{value:2,label:"个人所得税"}],
                array_tree: [],
                array_file_uploadModel_addPolicyModel:[],
                array_policyExplain:[],
                array_province_addPolicyModel:[],
                array_city_addPolicyModel:[],
                array_area_addPolicyModel:[],
                array_taxpayerCategory_addPolicyModel:[],
                array_taxpayerCategory1_addPolicyModel:[],
                array_file_fileModel_addPolicyModel:[],
                array_policyTableModel_addPolicyModel:[],
                array_rightTable_policyTableModel_addPolicyModel:[],

                $clickedSelectPolicyBtn_addPolicyModel:"",
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

                title_eleReadModel:"",
                boolean_show_eleReadModel:false,
                obj_selectedRow_eleReadModel:"",
                array_eleReadModel:[],
                array_totalSysEleName:[],

                boolean_show_fileUploadModel_eleReadModel:false,
                array_file_fileUploadModel_eleReadModel:[],

                array_file_basicInfo_addPolicyModel:[],
                array_file_param_basicInfo_addPolicyModel:[],
                needUploadFileCount_basicInfo_addPolicyModel:0,
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
            this.$nextTick(function () {
                this.queryByCriteria();
                this.resizeStyle();
            })
            this.queryPolicyExplain(this.obj_page);
            this.getProvinceCityAreasDivisionList({divisionLevel:1},1);
            this.getTaxpayerCategoryList({categoryLevel:0},0);
            this.getSysEleNameList(0);
        },
        methods: {
            uploadChange_basicInfo_addPolicyModel(file,fileList){
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
//                        Util.showTipModel('上传文件大小不能超过 2MB!');
//                        continue;
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
                this.array_file_basicInfo_addPolicyModel=list;
            },
            uploadRemove_basicInfo_addPolicyModel(file,fileList){
                this.array_file_basicInfo_addPolicyModel=fileList;
            },
            uploadSuccess_basicInfo_addPolicyModel(res,file){
                this.array_file_param_basicInfo_addPolicyModel.push(res.data[0]);
            },
            selectTotalSysEleName(value,scope){
                scope.row.eleCode="";
                this.getSysEleNameList(1,value,scope.$index);
            },
            /*fileUploadModel_eleReadModel*/
            showModel_fileUpload_eleReadModel(){
                if(!this.obj_selectedRow_eleReadModel){
                    Util.showTipModel("请先选中表格中的一行");
                    return;
                }
                this.array_file_fileUploadModel_eleReadModel=[];
                this.boolean_show_fileUploadModel_eleReadModel=true;
            },
            confirmBtn_fileUploadModel_eleReadModel(){
                if(!this.array_file_fileUploadModel_eleReadModel.length){
                    Util.showTipModel("请先选择文件");
                    return;
                }
                this.$refs.fileUploadModel_eleReadModel.submit();
                Util.makeWaiting();
            },
            uploadSuccess_fileUploadModel_eleReadModel(result){
                Util.removeWaiting();
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.boolean_show_fileUploadModel_eleReadModel=false;
                this.$set(this.obj_selectedRow_eleReadModel,"fileData",result.data.fileName+"|"+result.data.fileUrl);
            },
            uploadChange_fileUploadModel_eleReadModel(file,fileList){
                this.array_file_fileUploadModel_eleReadModel=[{...file}];
            },
            uploadRemove_fileUploadModel_eleReadModel(file,fileList){
                this.array_file_fileUploadModel_eleReadModel=[{...file}];
            },

            /*eleReadModel*/
            confirmBtn_eleReadModel(scope){
                if(this.array_eleReadModel.length < 1){
                    Util.showTipModel("至少要保存一条数据");
                    return;
                }
                for(var i=0;i<this.array_eleReadModel.length;i++){
                    var obj=this.array_eleReadModel[i];
                    if(Util.isNull(obj.bak3)){
                        Util.showTipModel("项目总名称不能为空");
                        return;
                    }
                    if(Util.isNull(obj.eleCode)){
                        Util.showTipModel("项目名称不能为空");
                        return;
                    }
                    if(Util.isNull(obj.fileData)){
                        Util.showTipModel("文件不能为空，请先上传文件");
                        return;
                    }
                }
                for(var i=0;i<this.array_eleReadModel.length;i++){
                    this.array_eleReadModel[i].explainId=this.obj_selectedPolicyExplainTableRow.explainId;
                    this.array_eleReadModel[i].explainCode=this.obj_selectedPolicyExplainTableRow.explainCode;
                    this.array_eleReadModel[i].type=this.type_eleRead;
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/eleTaxProof/add.do",
                        {listStr:JSON.stringify(this.array_eleReadModel)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    Util.showTipModel("保存成功");
                    var data=result.data;
                    this.boolean_show_eleReadModel=false;
                }, response => {
                    Util.removeWaiting();
                });
            },
            addTr_eleReadModel(){
                this.array_eleReadModel.push({
                    eleCode:"",
                    array_sysEleName:[],
                    bak3:"",
                    fileData:"",
                });
            },
            deleteTr_eleReadModel(scope){
                if(this.array_eleReadModel.length == 1){
                    Util.showTipModel("至少要保留一条数据");
                    return;
                }
                this.array_eleReadModel.splice(scope.$index,1);
            },
            selectRow_eleReadModel(val){
                this.obj_selectedRow_eleReadModel=val;
            },
            getSysEleNameList(type,parentCode="",index){
                this.$http.post(Constant.ctx+"/sysElement/getAllList.do",
                        {type:type,parentCode:parentCode}
                ).then(response => {
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    for(var i=0;i<data.length;i++){
                        data[i].value=data[i].sysEleCode;
                        data[i].label=data[i].sysEleName;
                    }
                    console.log(type);
                    if(type == 0){
                        this.array_totalSysEleName=data;
                        console.log(this.array_totalSysEleName)
                    }else{
                        this.array_eleReadModel[index].array_sysEleName=data;
                        console.log(index)
                        console.log(this.array_eleReadModel)
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            showModel_eleRead(type){
                if(!this.obj_selectedPolicyExplainTableRow){
                    Util.showTipModel("请先选中政策解读表格中的一行");
                    return;
                }
                this.type_eleRead=type;
                var param={
                    explainId:this.obj_selectedPolicyExplainTableRow.explainId,
                    type:type
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/eleTaxProof/list.do",
                        param
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
                        data[i].array_sysEleName=[];
                    }
                    this.array_eleReadModel=data;
                    for(var i=0;i<data.length;i++){
                        this.getSysEleNameList(1,data[i].sysEleCode,i);
                    }
                    this.obj_selectedRow_eleReadModel="";
                    if(type == 1){
                        this.title_eleReadModel="涉税凭证";
                    }else{
                        this.title_eleReadModel="要素解读";
                    }
                    this.boolean_show_eleReadModel=true;
                }, response => {
                    Util.removeWaiting();
                });
            },
            confirmBtn_policyTableModel_addPolicyModel(){
                if(!this.array_rightTable_policyTableModel_addPolicyModel.length){
                    Util.showTipModel("请先选择一条数据");
                    return;
                }
                var policyTitle="";
                for(var i=0;i<this.array_rightTable_policyTableModel_addPolicyModel.length;i++){
                    var obj=this.array_rightTable_policyTableModel_addPolicyModel[i];
                    policyTitle+=(i+1)+'.'+obj.policyTitle+'   '
                }
                policyTitle=policyTitle.slice(0,policyTitle.length-1);
                this.diagram.startTransaction("edit");
                this.diagram.model.setDataProperty(this.diagram.selection.first().data, "text", policyTitle);
                this.diagram.commitTransaction("edit");
                this.boolean_show_policyTableModel_addPolicyModel=false;
            },
            handleSelectionChange_policyTableModel_addPolicyModel(val){
                this.array_rightTable_policyTableModel_addPolicyModel=val;
            },
            pagination_policyTableModel_addPolicyModel(){
                if(this.obj_page_policyTableModel_addPolicyModel.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
                    queryLikeVal:this.key_search_policyTableModel_addPolicyModel,
                };
                this.getList_policyTableModel_addPolicyModel(Object.assign({},param,this.obj_page_policyTableModel_addPolicyModel));
            },
            sizeChange_policyTableModel_addPolicyModel(val){
                this.pageSize_policyTableModel_addPolicyModel=val;
                this.obj_page_policyTableModel_addPolicyModel.pageSize=val;
                this.obj_page_policyTableModel_addPolicyModel.pageIndex=0;
                this.pagination_policyTableModel_addPolicyModel();
            },
            currentChange_policyTableModel_addPolicyModel(val){
                this.obj_page_policyTableModel_addPolicyModel.pageIndex=val - 1;
                this.pagination_policyTableModel_addPolicyModel();
            },
            search_policyTableModel_addPolicyModel(){
                this.obj_page_policyTableModel_addPolicyModel.pageIndex=0;
                this.pagination_policyTableModel_addPolicyModel();
            },
            getList_policyTableModel_addPolicyModel(param){
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
                this.boolean_show_policyTableModel_addPolicyModel=true;
                this.total_policyTableModel_addPolicyModel=result.total;
                var data=result.data;
                for(var i=0;i<data.length;i++){
                    data[i].index=(i+1)+this.obj_page_policyTableModel_addPolicyModel.pageIndex*this.obj_page_policyTableModel_addPolicyModel.pageSize
                }
                this.array_policyTableModel_addPolicyModel=data;
//                this.array_rightTable_policyTableModel_addPolicyModel=[...this.diagram.selection.first().data.policyList];
//                this.diagram.selection.first().data.policyList.forEach(row => {
//                    this.$refs.policyTableModel_addPolicyModel.toggleRowSelection(row);
//                });
            }, response => {
                    Util.removeWaiting();
                });
            },
            openFile(fileUrl){
                window.open(fileUrl);
            },
            confirmBtn_uploadModel_addPolicyModel(data){
                this.array_file_param=[];
                this.needUploadFileCount=0;
//                if (!this.array_file_uploadModel_addPolicyModel.length) {
//                    Util.showTipModel('请至少选择一个文件进行上传');
//                    return;
//                }
                for(var i=0;i<this.array_file_uploadModel_addPolicyModel.length;i++){
                    if(!this.array_file_uploadModel_addPolicyModel[i].fileName){
                        this.needUploadFileCount++;
                    }
                }
                for(var i=0;i<this.array_file_uploadModel_addPolicyModel.length;i++){
                    if(!this.array_file_uploadModel_addPolicyModel[i].fileName){
                        this.$refs.upload_uploadModel_addPolicyModel.submit();
                        return;
                    }
                }
                var fileText="";
                var fileUrl="";
                for(var i=0;i<this.array_file_uploadModel_addPolicyModel.length;i++){
                    fileText+=this.array_file_uploadModel_addPolicyModel[i].name;
                    fileUrl+=this.array_file_uploadModel_addPolicyModel[i].url;
                    if(i != this.array_file_uploadModel_addPolicyModel.length - 1){
                        fileText+=",";
                        fileUrl+=",";
                    }
                }
                this.obj_addPolicyModel_current.diagram.startTransaction("edit");
                this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileText", fileText);
                this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileUrl", fileUrl);
                this.obj_addPolicyModel_current.diagram.commitTransaction("edit");
                this.boolean_show_uploadModel_addPolicyModel=false;
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
                this.array_file_uploadModel_addPolicyModel=list;
            },
            uploadRemove(file,fileList){
                this.array_file_uploadModel_addPolicyModel=fileList;
            },
            uploadSuccess(res,file){
                console.log(res);
                this.array_file_param.push({
                    name:res.data.fileName,
                    url:res.data.fileUrl,
                })
                if(this.array_file_param.length == this.needUploadFileCount){
                    for(var i=0;i<this.array_file_uploadModel_addPolicyModel.length;i++){
                        for(var j=0;j<this.array_file_param.length;j++){
                            if(this.array_file_uploadModel_addPolicyModel[i].name == this.array_file_param[j].name){
                                this.array_file_uploadModel_addPolicyModel[i].url = this.array_file_param[j].url
                            }
                        }
                    }
                    var fileText="";
                    var fileUrl="";
                    for(var i=0;i<this.array_file_uploadModel_addPolicyModel.length;i++){
                        fileText+=this.array_file_uploadModel_addPolicyModel[i].name;
                        fileUrl+=this.array_file_uploadModel_addPolicyModel[i].url;
                        if(i != this.array_file_uploadModel_addPolicyModel.length - 1){
                            fileText+=",";
                            fileUrl+=",";
                        }
                    }
                    this.obj_addPolicyModel_current.diagram.startTransaction("edit");
                    this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileText", fileText);
                    this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "fileUrl", fileUrl);
                    this.obj_addPolicyModel_current.diagram.commitTransaction("edit");
                    this.boolean_show_uploadModel_addPolicyModel=false;
                }
            },
            auditPolicyExplain(){
                if(!this.obj_selectedPolicyExplainTableRow){
                    Util.showTipModel("请先选中政策解读表格中的一行");
                    return;
                }
                if(this.obj_selectedPolicyExplainTableRow.fileState == 0){
                    Util.showTipModel("当文件状态无效时不能进行审核");
                    return;
                }
                if(this.obj_selectedPolicyExplainTableRow.auditState == 1 || this.obj_selectedPolicyExplainTableRow.auditState == 3){
                    Util.showTipModel("当审核状态为审核中或审核通过时不能进行审核");
                    return;
                }
                var param={
                    explainId:this.obj_selectedPolicyExplainTableRow.explainId,
                    auditState:"1"
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/explainAudit.do",
                        param
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    Util.showTipModel(result.msg);
                    var data=result.data;
                    this.queryPolicyExplain_pagination();
                }, response => {
                    Util.removeWaiting();
                });
            },
            resetChart_addPolicyModel(){
                this.diagram.commandHandler.resetZoom();
                this.zoomRange=10;
            },
            zoomOut_addPolicyModel(){
                this.diagram.commandHandler.increaseZoom(this.increaseZoom);
                this.zoomRange++;
            },
            zoomIn_addPolicyModel(){
                if(this.zoomRange != 1){
                    this.diagram.commandHandler.decreaseZoom(this.decreaseZoom);
                    this.zoomRange--;
                }
            },
            resizeStyle(){
                this.resizeAddPolicyModel();
            },
            resizeAddPolicyModel: function () {
                var $root=$(this.$refs.root);
                var height=$(window).height()-107;
                this.style_addPolicyModel=height;
            },
            selectProvince_addPolicyModel(){
//                if(this.obj_addPolicyModel[0].basicInfo.province.length == 0){
//                    Util.showTipModel("请先至少选择一个省进行查询");
//                    return;
//                }
                console.log(this.obj_addPolicyModel[0].basicInfo.province);
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.province.length;i++){
                    if(this.obj_addPolicyModel[0].basicInfo.province[i] == "0" && i == this.obj_addPolicyModel[0].basicInfo.province.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.province=["0"];
                        break;
                    }
                    if(this.obj_addPolicyModel[0].basicInfo.province[i] == "0" && i < this.obj_addPolicyModel[0].basicInfo.province.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.province=this.obj_addPolicyModel[0].basicInfo.province.filter((item)=>item != "0");
                        break;
                    }
                }
                this.obj_addPolicyModel[0].basicInfo.city=[];
                this.obj_addPolicyModel[0].basicInfo.area=[];
                this.array_city_addPolicyModel=[];
                this.array_area_addPolicyModel=[];
                if(this.obj_addPolicyModel[0].basicInfo.province.length == 0){
                    return;
                }
                this.getProvinceCityAreasDivisionList({parentCodeList:this.obj_addPolicyModel[0].basicInfo.province.join(","),divisionLevel:2},2);
            },
            selectCity_addPolicyModel(){
//                if(this.obj_addPolicyModel[0].basicInfo.city.length == 0){
//                    Util.showTipModel("请先至少选择一个市进行查询");
//                    return;
//                }
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.city.length;i++){
                    if(this.obj_addPolicyModel[0].basicInfo.city[i] == "0" && i == this.obj_addPolicyModel[0].basicInfo.city.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.city=["0"];
                        break;
                    }
                    if(this.obj_addPolicyModel[0].basicInfo.city[i] == "0" && i < this.obj_addPolicyModel[0].basicInfo.city.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.city=this.obj_addPolicyModel[0].basicInfo.city.filter((item)=>item != "0");
                        break;
                    }
                }
                this.obj_addPolicyModel[0].basicInfo.area=[];
                this.array_area_addPolicyModel=[];
                if(this.obj_addPolicyModel[0].basicInfo.city.length == 0){
                    return;
                }
                this.getProvinceCityAreasDivisionList({parentCodeList:this.obj_addPolicyModel[0].basicInfo.city.join(","),divisionLevel:3},3);
            },
            selectArea_addPolicyModel(){
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.area.length;i++){
                    if(this.obj_addPolicyModel[0].basicInfo.area[i] == "0" && i == this.obj_addPolicyModel[0].basicInfo.area.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.area=["0"];
                        break;
                    }
                    if(this.obj_addPolicyModel[0].basicInfo.area[i] == "0" && i < this.obj_addPolicyModel[0].basicInfo.area.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.area=this.obj_addPolicyModel[0].basicInfo.area.filter((item)=>item != "0");
                        break;
                    }
                }
            },
            selectTaxpayerCategory_addPolicyModel(){
//                if(Util.isNull(this.obj_addPolicyModel[0].basicInfo.taxpayerCategory)){
//                    Util.showTipModel("请先至少选择一个进行查询");
//                    return;
//                }
                this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1=[];
                this.array_taxpayerCategory1_addPolicyModel=[];
                if(Util.isNull(this.obj_addPolicyModel[0].basicInfo.taxpayerCategory)){
                    return;
                }
                this.getTaxpayerCategoryList({parentCode:this.obj_addPolicyModel[0].basicInfo.taxpayerCategory,categoryLevel:1},1);
            },
            selectTaxpayerCategory1_addPolicyModel(){
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1.length;i++){
                    if(this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1[i] == "0" && i == this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1=["0"];
                        break;
                    }
                    if(this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1[i] == "0" && i < this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1.length - 1){
                        this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1=this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1.filter((item)=>item != "0");
                        break;
                    }
                }
            },
            getProvinceCityAreasDivisionList(param={},type){
                this.$http.post(Constant.ctx+"/provinceCityAreasDivision/queryByLevel.do",
                        {criteriaStr:JSON.stringify(param)}
                ).then(response => {
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    if(type == 1){
                        this.array_province_addPolicyModel=data;
                        for(var i=0;i<data.length;i++){
                            if(data[i].isChecked){
                                this.obj_addPolicyModel[0].basicInfo.province.push(data[i].provinceCode);
                            }
                        }
                    }
                    if(type == 2){
                        this.array_city_addPolicyModel=data;
                        for(var i=0;i<data.length;i++){
                            if(data[i].isChecked){
                                this.obj_addPolicyModel[0].basicInfo.city.push(data[i].cityCode);
                            }
                        }
                    }
                    if(type == 3){
                        this.array_area_addPolicyModel=data;
                        for(var i=0;i<data.length;i++){
                            if(data[i].isChecked){
                                this.obj_addPolicyModel[0].basicInfo.area.push(data[i].areasCode);
                            }
                        }
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            getTaxpayerCategoryList(param={},type){
                this.$http.post(Constant.ctx+"/taxpayerCategory/queryByLevel.do",
                        {taxpayerCategoryStr:JSON.stringify(param)}
                ).then(response => {
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    var data=result.data;
                    if(type == 0){
                        this.array_taxpayerCategory_addPolicyModel=data;
                    }
                    if(type == 1){
                        this.array_taxpayerCategory1_addPolicyModel=data;
                    }
                }, response => {
                    Util.removeWaiting();
                });
            },
            queryPolicyExplain_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                    });
                }
                var param={
                    queryLikeName:this.value_search,
                    plotCategoryPath:this.obj_clickedNode?this.obj_clickedNode.plotCategoryCode:""
                };
                this.queryPolicyExplain(Object.assign({},param,this.obj_page));
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
            selectPolicyExplainTableRow(val){
                this.obj_selectedPolicyExplainTableRow=val;
            },
            tabClick_addPolicyModel(item){
                console.log(item)
                this.tabsValue_planScheme="businessLogic";
                this.obj_tabClick_addPolicyModel=item;
                this.obj_tabClick_planScheme_addPolicyModel="";
                if(item.index == 0){
                    this.boolean_show_zoomBtnWrapper_addPolicyModel=false;
                    return;
                }
                this.boolean_show_zoomBtnWrapper_addPolicyModel=true;
                this.$nextTick(function () {
                    var GO = go.GraphObject.make;
                    function PoolLayout() {
                        go.GridLayout.call(this);
                        this.cellSize = new go.Size(1, 1);
                        this.wrappingColumn = Infinity;
                        this.wrappingWidth = Infinity;
                        this.isRealtime = false; // don't continuously layout while dragging
                        this.alignment = go.GridLayout.Position;
                        // This sorts based on the location of each Group.
                        // This is useful when Groups can be moved up and down in order to change their order.
                        this.comparer = function(a, b) {
                            var ax = a.location.x;
                            var bx = b.location.x;
                            if (isNaN(ax) || isNaN(bx)) return 0;
                            if (ax < bx) return -1;
                            if (ax > bx) return 1;
                            return 0;
                        };
                    }
                    go.Diagram.inherit(PoolLayout, go.GridLayout);
                    PoolLayout.prototype.doLayout = function(coll) {
                        var diagram = this.diagram;
                        if (diagram === null) return;
                        diagram.startTransaction("PoolLayout");
                        go.GridLayout.prototype.doLayout.call(this, coll);
                        diagram.commitTransaction("PoolLayout");
                    }

                    function PoolLayout_y() {
                        go.GridLayout.call(this);
                        this.cellSize = new go.Size(1, 1);
                        this.wrappingColumn = Infinity;
                        this.wrappingWidth = Infinity;
                        this.isRealtime = false; // don't continuously layout while dragging
                        this.alignment = go.GridLayout.Position;
                        // This sorts based on the location of each Group.
                        // This is useful when Groups can be moved up and down in order to change their order.
                        this.comparer = function(a, b) {
                            var ax = a.location.y;
                            var bx = b.location.y;
                            if (isNaN(ax) || isNaN(bx)) return 0;
                            if (ax < bx) return -1;
                            if (ax > bx) return 1;
                            return 0;
                        };
                    }
                    go.Diagram.inherit(PoolLayout_y, go.GridLayout);
                    PoolLayout_y.prototype.doLayout = function(coll) {
                        var diagram = this.diagram;
                        if (diagram === null) return;
                        diagram.startTransaction("PoolLayout_y");
                        go.GridLayout.prototype.doLayout.call(this, coll);
                        diagram.commitTransaction("PoolLayout_y");
                    }

                    function relayoutDiagram() {

                        diagram.layout.invalidateLayout();
                        diagram.findTopLevelGroups().each(
                                function(g) {
                                    //if (g.category === "assignmentGroupTemplate_inner") g.layout.invalidateLayout();
                                    g.layout.invalidateLayout();
                                    g.memberParts.each(
                                            function(m){
                                                //if (m.category === "assignmentGroupTemplate_inner") m.layout.invalidateLayout()
                                                if(m instanceof go.Group)
                                                {
                                                    m.layout.invalidateLayout()
                                                }
                                            })
                                }
                        );
                        diagram.layoutDiagram();

                    }

                    function groupStyle() { // common settings for both Lane and Pool Groups
                        return [{
                            layerName: "Background", // all pools and lanes are always behind all nodes and links
                            background: "transparent", // can grab anywhere in bounds
                            movable: false, // allows users to re-order by dragging
                            copyable: false, // can't copy lanes or pools
                            avoidable: false // don't impede AvoidsNodes routed Links

                        },
                            new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
                        ];
                    };

                    function finishDrop(e, grp) {
                        if((diagram.selection.first() instanceof go.Group) && (diagram.selection.first().data.category != "udfFunGroupTemplate")){
                            return;
                        }
                        var ok = (grp !== null ?
                                grp.addMembers(grp.diagram.selection, true) :
                                e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
                        if (!ok) e.diagram.currentTool.doCancel();

                    }

                    function cancelDrop(e) {
                        e.diagram.currentTool.doCancel();
                    }

                    function makePort(name, align, spot, output, input) {
                        var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
                        // the port is basically just a transparent rectangle that stretches along the side of the node,
                        // and becomes colored when the mouse passes over it
                        return GO(go.Shape,
                                {
                                    fill: "rgba(255,0,255,0.5)",  // changed to a color in the mouseEnter event handler
                                    strokeWidth: 0,  // no stroke
                                    width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
                                    height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
                                    alignment: align,  // align the port on the main Shape
                                    stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
                                    portId: name,  // declare this object to be a "port"
                                    fromSpot: spot,  // declare where links may connect at this port
                                    fromLinkable: output,  // declare whether the user may draw links from here
                                    toSpot: spot,  // declare where links may connect at this port
                                    toLinkable: input,  // declare whether the user may draw links to here
                                    cursor: "pointer",  // show a different cursor to indicate potential link point
                                    mouseEnter: function(e, port) {  // the PORT argument will be this Shape
//                                        if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
                                    },
                                    mouseLeave: function(e, port) {
//                                        port.fill = "transparent";
                                    }
                                });
                    }
                    var _this=this;
                    var planSchemeId="planScheme"+item.index;
                    var diagram;
                    if(this.obj_addPolicyModel[item.index].diagram){
                        diagram=this.obj_addPolicyModel[item.index].diagram;
                    }else{
                        diagram =
                                GO(go.Diagram, planSchemeId,
                                        {
                                            initialContentAlignment: go.Spot.Top, // center Diagram contents
                                            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
                                            layout: GO(go.TreeLayout, // specify a Diagram.layout that arranges trees
                                                    { angle: 90, layerSpacing: 50 }),
                                            allowDrop: true,
                                            mouseDragOver: function(e) {
                                                if (!e.diagram.selection.all(function(n) { return n instanceof go.Group; })) {
                                                    e.diagram.currentCursor = 'not-allowed';
                                                }
                                            },
                                            mouseDrop: function(e) {
                                                //if (!e.diagram.selection.all(function(n) { return n instanceof go.Group; })) {
                                                diagram.currentTool.doCancel();
                                                //}
                                            },

                                        });

                        this.obj_addPolicyModel[item.index].diagram=diagram;
                        var nodeDataArray;
                        var linkDataArray;
                        if(this.obj_addPolicyModel[item.index].planContent){
                            var structShape=JSON.parse(this.obj_addPolicyModel[item.index].planContent);
                            nodeDataArray=structShape.nodeDataArray;
                            linkDataArray=structShape.linkDataArray;
                        }else{
                            nodeDataArray = [
                                { key: Util.uuid(), category:"startTemplate", text: item.label,fill:"white"},
                            ];
                            linkDataArray = [
                                //{ from: "1", to: "2", arrowText: "要素单据内" }  // added information for link label
                            ];
                        }

                        diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

                    }
                    this.diagram=diagram;
                    var assignmentGroupTemplate_outer =
                            GO(go.Group, groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                                        //layout: GO(PoolLayout, { spacing: new go.Size(5, 0) }),
                                        layout: GO(PoolLayout_y, { wrappingColumn: 1,spacing: new go.Size(5, 0) }),
                                        //layout:GO(go.GridLayout, { wrappingColumn: 1, alignment: go.GridLayout.Position }),
                                        computesBoundsAfterDrag:true,
                                        mouseDrop: function(e) { cancelDrop(e)},
                                    },
                                    GO(go.Panel, "Horizontal",
                                            GO(go.Panel, "Auto",
                                                    {stretch: go.GraphObject.Vertical},
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "#D6D8E0",stroke:"#CCCCCC"}),
                                                    GO(go.TextBlock,"",
                                                            {
                                                                font:"8pt sans-serif",
                                                                margin: 3,
                                                                textAlign: "center"
                                                            },
                                                    ),
//
                                            ),
                                            GO(go.Panel, "Auto",
                                                    {
                                                        click: function(e, obj) {
                                                            if(!_this.boolean_show_queryPolicyModel){
                                                                showOperationModel_outer(e,obj);
                                                            }
                                                        },
                                                    },
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "white",stroke:"#CCCCCC" }),
                                                    GO(go.Panel, "Vertical",
                                                            GO(go.Placeholder,{ margin: new go.Margin(8,16,8,16)})
                                                    ),
                                            ),

                                    ),
                                    makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
                                    makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
                                    makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
                                    makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, true)
                            );
                    diagram.groupTemplateMap.add("assignmentGroupTemplate_outer", assignmentGroupTemplate_outer);
                    var assignmentGroupTemplate_inner =
                            GO(go.Group, groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                                        layout: GO(PoolLayout, { spacing: new go.Size(5, 0) }), //
                                        mouseDrop: finishDrop,
                                        computesBoundsAfterDrag:true,
                                        movable:true,
                                    },
                                    // GO(go.Panel, "Auto",
                                    // 	{margin: new go.Margin(4,0,4,0)},
                                    // 	GO(go.Shape, "Rectangle",
                                    // 		{ fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                    // 	GO(go.Placeholder,{ margin: new go.Margin(0,50,0,50) })
                                    // ),
                                    GO(go.Panel, "Horizontal",
                                            GO(go.Panel, "Auto",
                                                    {stretch: go.GraphObject.Vertical},
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "#2B7CB6",stroke:"#538BB0"}),
                                                    GO(go.TextBlock,"业务逻辑",
                                                            {
                                                                font:"8pt sans-serif",
                                                                stroke:"#fff",
                                                                textAlign: "center"
                                                            },
                                                    ),

                                            ),
                                            GO(go.Panel, "Auto",
                                                    {margin: new go.Margin(4,0,4,0),

                                                        click: function(e, obj) {
                                                            if(!_this.boolean_show_queryPolicyModel){
                                                                editExplainModel(e,obj);
                                                            }
                                                        },
                                                    },
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                                    GO(go.TextBlock,
                                                            {
                                                                margin: new go.Margin(6 ,10 ,6,10),
                                                                width:325,
                                                                overflow: go.TextBlock.OverflowClip
                                                            },
                                                            new go.Binding("text", "text"),
                                                    ),
//                                                    GO(go.Picture, require("@/assets/image/help.png"),
//                                                            { alignment: new go.Spot(0, 0, -1, -1),
//                                                                width: 12,
//                                                                height: 12,
//                                                                mouseOver: function(e, obj) {
//                                                                    var leftToWindow=$accountFlowChart[0].offsetLeft;
//                                                                    var topToWindow=$accountFlowChart[0].offsetTop;
//                                                                    var loc = obj.getDocumentPoint(go.Spot.TopCenter);
//                                                                    var pos = diagram.transformDocToView(loc);
//                                                                    var left=e.event.clientX;
//                                                                    var top=e.event.clientY;
//                                                                    var content="业务逻辑";
//                                                                    Util.makeTooltip(content, left, top);
//                                                                },
//                                                                mouseLeave: function(e, obj) {
//                                                                    $("#tooltip").hide();
//                                                                },
//                                                            },
//                                                    ),
                                            ),
                                    )
                            );
                    diagram.groupTemplateMap.add("assignmentGroupTemplate_inner", assignmentGroupTemplate_inner);

                    var assignmentGroupTemplate_calc =
                            GO(go.Group, groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                                        layout: GO(PoolLayout, { spacing: new go.Size(5, 0) }), //
                                        mouseDrop: finishDrop,
                                        computesBoundsAfterDrag:true,
                                        movable:true,
                                    },
                                    GO(go.Panel, "Horizontal",
                                            GO(go.Panel, "Auto",
                                                    {stretch: go.GraphObject.Vertical},
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "#48BAB0",stroke:"#6CBAB5"}),
                                                    GO(go.TextBlock,"计算逻辑",
                                                            {
                                                                font:"8pt sans-serif",
                                                                stroke:"#fff",
                                                                textAlign: "center"
                                                            },
                                                    ),

                                            ),
                                            GO(go.Panel, "Vertical",
                                                    GO(go.Panel, "Auto",
                                                            {margin: new go.Margin(4,0,4,0),
                                                                click: function(e, obj) {
                                                                    if(!_this.boolean_show_queryPolicyModel){
                                                                        editExplainModel(e,obj);
                                                                    }
                                                                },
                                                            },
                                                            GO(go.Shape, "Rectangle",
                                                                    { fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                                            GO(go.TextBlock,
                                                                    {
                                                                        margin: new go.Margin(6 ,10 ,6,10),
                                                                        width:325,
                                                                        overflow: go.TextBlock.OverflowClip
                                                                    },
                                                                    new go.Binding("text", "text"),
                                                            ),
                                                    ),
                                                    GO(go.Panel, "Auto",
                                                            {margin: new go.Margin(4,0,4,0),
                                                                click: function(e, obj) {
                                                                    if(!_this.boolean_show_queryPolicyModel){
                                                                        showUploadModel(e,obj);
                                                                    }else{
                                                                        showFileModel(e,obj);
                                                                    }
                                                                },
                                                            },
                                                            GO(go.Shape, "Rectangle",
                                                                    { fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                                            GO(go.TextBlock,
                                                                    {
                                                                        margin: new go.Margin(6 ,10 ,6,10),
                                                                        width:325,
                                                                        overflow: go.TextBlock.OverflowClip
                                                                    },
                                                                    new go.Binding("text", "fileText"),
                                                                    new go.Binding("fileUrl", "fileUrl"),
                                                            ),
                                                    )
                                            ),
                                    ),
                            );
                    diagram.groupTemplateMap.add("assignmentGroupTemplate_calc", assignmentGroupTemplate_calc);

                    var assignmentGroupTemplate_zmcl =
                            GO(go.Group, groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                                        layout: GO(PoolLayout, { spacing: new go.Size(5, 0) }), //
                                        mouseDrop: finishDrop,
                                        computesBoundsAfterDrag:true,
                                        movable:true,
                                    },
                                    // GO(go.Panel, "Auto",
                                    // 	{margin: new go.Margin(4,0,4,0)},
                                    // 	GO(go.Shape, "Rectangle",
                                    // 		{ fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                    // 	GO(go.Placeholder,{ margin: new go.Margin(0,50,0,50) })
                                    // ),
                                    GO(go.Panel, "Horizontal",
                                            GO(go.Panel, "Auto",
                                                    {stretch: go.GraphObject.Vertical},
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "#2EB740",stroke:"#2EB740"}),
                                                    GO(go.TextBlock,"证明材料",
                                                            {
                                                                font:"8pt sans-serif",
                                                                stroke:"#fff",
                                                                textAlign: "center"
                                                            },
                                                    ),

                                            ),
                                            GO(go.Panel, "Auto",
                                                    {margin: new go.Margin(4,0,4,0),
                                                        click: function(e, obj) {
                                                            if(!_this.boolean_show_queryPolicyModel){
                                                                editExplainModel(e,obj);
                                                            }
                                                        },
                                                    },
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                                    GO(go.TextBlock,
                                                            {
                                                                margin: new go.Margin(6 ,10 ,6,10),
                                                                width:325,
                                                                overflow: go.TextBlock.OverflowClip
                                                            },
                                                            new go.Binding("text", "text"),
                                                    ),
                                            )
                                    ),
                            );
                    diagram.groupTemplateMap.add("assignmentGroupTemplate_zmcl", assignmentGroupTemplate_zmcl);

                    var assignmentGroupTemplate_outputResult =
                            GO(go.Group, groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                                        layout: GO(PoolLayout, { spacing: new go.Size(5, 0) }), //
                                        mouseDrop: finishDrop,
                                        computesBoundsAfterDrag:true,
                                        movable:true,
                                    },
                                    // GO(go.Panel, "Auto",
                                    // 	{margin: new go.Margin(4,0,4,0)},
                                    // 	GO(go.Shape, "Rectangle",
                                    // 		{ fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                    // 	GO(go.Placeholder,{ margin: new go.Margin(0,50,0,50) })
                                    // ),
                                    GO(go.Panel, "Horizontal",
                                            GO(go.Panel, "Auto",
                                                    {stretch: go.GraphObject.Vertical},
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "#B7AD31",stroke:"#B7AD31"}),
                                                    GO(go.TextBlock,"输出结果",
                                                            {
                                                                font:"8pt sans-serif",
                                                                stroke:"#fff",
                                                                textAlign: "center"
                                                            },
                                                    ),

                                            ),
                                            GO(go.Panel, "Auto",
                                                    {margin: new go.Margin(4,0,4,0),
                                                        click: function(e, obj) {
                                                            if(!_this.boolean_show_queryPolicyModel){
                                                                showOutputResultModel(e,obj);
                                                            }
                                                        },
                                                    },
                                                    GO(go.Shape, "Rectangle",
                                                            { fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                                    GO(go.TextBlock,
                                                            {
                                                                margin: new go.Margin(6 ,10 ,6,10),
                                                                width:325,
                                                                overflow: go.TextBlock.OverflowClip
                                                            },
                                                            new go.Binding("text", "text"),
                                                    ),
                                            )
                                    ),
                            );
                    diagram.groupTemplateMap.add("assignmentGroupTemplate_outputResult", assignmentGroupTemplate_outputResult);

                    var assignmentGroupTemplate_select =
                            GO(go.Group, groupStyle(), { // use a simple layout that ignores links to stack the "lane" Groups next to each other
                                        layout: GO(PoolLayout, { spacing: new go.Size(5, 0) }), //
                                        mouseDrop: finishDrop,
                                        computesBoundsAfterDrag:true,
                                        movable:true,
                                    },
                                    GO(go.Panel, "Horizontal",
                                        GO(go.Panel, "Auto",
                                            {stretch: go.GraphObject.Vertical},
                                            GO(go.Shape, "Rectangle",
                                                { fill: "#FA696D",stroke:"#E78087"}),
                                            GO(go.TextBlock,"政策解读",
                                                {
                                                    font:"8pt sans-serif",
                                                    stroke:"#fff",
                                                    textAlign: "center"
                                                },
                                            ),
                                        ),
                                        GO(go.Panel, "Auto",
                                            {margin: new go.Margin(4,0,4,0),
                                            click: function(e, obj) {
                                                if(!_this.boolean_show_queryPolicyModel){
                                                    editExplainModel_select(e,obj);
                                                }
                                            },
                                            },
                                            GO(go.Shape, "Rectangle",
                                                { fill: "white",stroke:"#CCCCCC",minSize: new go.Size(120, 31) }),
                                            GO(go.TextBlock,
                                                {
                                                margin: new go.Margin(6 ,10 ,6,10),
                                                width:325,
                                                overflow: go.TextBlock.OverflowClip
                                                },
                                                new go.Binding("text", "text"),
                                            ),

                                        )
					            )
                            );
                    diagram.groupTemplateMap.add("assignmentGroupTemplate_select", assignmentGroupTemplate_select);
                    var startTemplate=
                            GO(go.Node, "Horizontal",
                                    GO(go.Panel, "Auto",
                                            {
                                                click: function(e, obj) {
                                                    if(!_this.boolean_show_queryPolicyModel){
                                                        showOperationModel(e,obj,item.name=="preCondition"?false:true);
                                                    }else{
                                                        if(item.name!="preCondition"){
                                                            var str="是否执行前置条件：否";
                                                            if(_this.obj_addPolicyModel[item.index].needCondition == 1){
                                                                str="是否执行前置条件：是";
                                                            }
                                                            Util.showTipModel(str);
                                                        }
                                                    }
                                                },
                                                mouseDrop: function(e) {
                                                    diagram.currentTool.doCancel();
                                                }
                                            },
                                            GO(go.Shape, "Rectangle",
                                                    { fill: "white",stroke:"#CCCCCC" },
                                                    new go.Binding("fill", "fill"),
                                            ),
                                            GO(go.TextBlock,
                                                    {margin: new go.Margin(6 ,40 ,6,40)},
                                                    new go.Binding("text", "text"),
                                            ),

                                    ),
                                    //GO(go.Panel, "Auto",
                                    //	GO(go.Shape, "Rectangle",
                                    //		{ fill: "white",stroke:"#CCCCCC" }),
                                    //	GO(go.Picture, "src/image/explain.png",
                                    //		{margin: 6},
                                    //	)
                                    //)
                            );
                    diagram.nodeTemplateMap.add("startTemplate", startTemplate);
                    diagram.linkTemplate =
                            GO(go.Link,
                                    {
                                        mouseDrop: function(e) {
                                            diagram.currentTool.doCancel();
                                        }
                                    },
                                    GO(go.Shape,new go.Binding("stroke", "arrowColor")),
                                    GO(go.Shape, { toArrow: "Standard" },
                                            new go.Binding("stroke", "arrowColor"),
                                            new go.Binding("fill", "arrowColor")
                                    ),

                            );

                    var $accountFlowChart=$("#"+planSchemeId);

                    var stopShowOperationModelFlag=false;
                    function showOperationModel(e,obj,editable){
                        var class_edit="vh";
                        if(editable){
                            class_edit="";
                        }
                        if(stopShowOperationModelFlag){
                            stopShowOperationModelFlag=false;
                            return;
                        }
                        var $operationModel=$accountFlowChart.find(".operationModel");
                        var leftToWindow=$accountFlowChart[0].offsetLeft;
                        var topToWindow=$accountFlowChart[0].offsetTop;
                        var loc = obj.getDocumentPoint(go.Spot.TopCenter);
                        var pos = diagram.transformDocToView(loc);
//                        var left=pos.x+leftToWindow-70+100;
//                        var top=pos.y+topToWindow-60+30;
                        console.log(e.event.clientX);
                        console.log(e.event.clientY);
                        var left=e.event.clientX-75;
                        var top=e.event.clientY-30;
                        if($operationModel.length){
                            $operationModel.find(".dialog").css("left",left);
                            $operationModel.find(".dialog").css("top",top);
                            $operationModel.show();
                        }else{
                            var htmlStr='<div class="operationModel">'
                                    +'<div class="dialog" style="left:'+left+'px;top:'+top+'px">'
                                    +'<div>'
                                    +'<span style="margin-left: -30px;line-height: 50px" class="'+class_edit+' circle update">修改</span>'
                                    +'<span style="margin-right: -30px;" class="circle fr assignment">节点(是/和)</span>'
                                    +'</div>'
                                    +'</div>'
                                    +'</div>'
                            var $operationModel=$(htmlStr).appendTo($accountFlowChart);
                            $operationModel.click(function(){
                                $(this).hide();
                            });

                            $operationModel.find(".assignment").click(function(){
                                var selnode = diagram.selection.first();
                                diagram.startTransaction("add node and link");
                                var key_outer=Util.uuid();
                                var newnode = { key: key_outer ,isGroup: true,category:"assignmentGroupTemplate_outer"};
                                diagram.model.addNodeData(newnode);
                                var newlink = { from: selnode.data.key, to: newnode.key};
                                diagram.model.addLinkData(newlink);
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_select",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_inner",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_calc",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_zmcl",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_outputResult",group:key_outer,text:"否"});
                                diagram.commitTransaction("add node and link");
                            });

                            $operationModel.find(".update").click(function(){
                                _this.title_planSchemeNameModel="修改筹划方案";
                                _this.operation_planSchemeNameModel="edit";
                                _this.obj_addPolicyModel_current=_this.obj_addPolicyModel[item.index];
                                _this.obj_planSchemeNameModel={
                                    name:_this.obj_addPolicyModel[item.index].title,
                                    needCondition:_this.obj_addPolicyModel[item.index].needCondition,
                                };
                                _this.boolean_show_planSchemeNameModel=true;
                            });
                    }
                }

                    function showOperationModel_outer(e,obj){
                        if(stopShowOperationModelFlag){
                            stopShowOperationModelFlag=false;
                            return;
                        }
                        var $operationModel=$accountFlowChart.find(".operationModel_outer");
                        var leftToWindow=$accountFlowChart[0].offsetLeft;
                        var topToWindow=$accountFlowChart[0].offsetTop;
                        var loc = obj.getDocumentPoint(go.Spot.TopCenter);
                        var pos = diagram.transformDocToView(loc);
//                        var left=pos.x+leftToWindow-70+100;
//                        var top=pos.y+topToWindow-60+30;
                        console.log(e.event.clientX);
                        console.log(e.event.clientY);
                        var left=e.event.clientX-75;
                        var top=e.event.clientY-30;
                        if($operationModel.length){
                            $operationModel.find(".dialog").css("left",left);
                            $operationModel.find(".dialog").css("top",top);
                            $operationModel.show();
                        }else{
                            var htmlStr='<div class="operationModel_outer">'
                                    +'<div class="dialog" style="left:'+left+'px;top:'+top+'px">'
                                    +'<div>'
                                    +'<span style="margin-left: -30px;line-height: 50px" class="circle delete">删除</span>'
                                    +'<span style="margin-right: -30px;" class="circle fr assignment">节点(是/和)</span>'
                                    +'</div>'
                                    +'</div>'
                                    +'</div>'
                            var $operationModel=$(htmlStr).appendTo($accountFlowChart);
                            $operationModel.click(function(){
                                $(this).hide();
                            });

                            $operationModel.find(".assignment").click(function(){
                                var selnode = diagram.selection.first();
                                diagram.startTransaction("add node and link");
                                var key_outer=Util.uuid();
                                var newnode = { key: key_outer ,isGroup: true,category:"assignmentGroupTemplate_outer"};
                                diagram.model.addNodeData(newnode);
                                var newlink = { from: selnode.data.key, to: newnode.key};
                                diagram.model.addLinkData(newlink);
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_select",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_inner",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_calc",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_zmcl",group:key_outer});
                                diagram.model.addNodeData({ key: Util.uuid() ,isGroup: true,category:"assignmentGroupTemplate_outputResult",group:key_outer,text:"否"});
                                diagram.commitTransaction("add node and link");
                            });

                            $operationModel.find(".delete").click(function(){
                                var selnode = diagram.selection.first();
                                diagram.commandHandler.deleteSelection();
//                                Util.deleteSelectedNodeAndRelation(diagram);
                            });
                        }
                    }

                    function editExplainModel(e,obj){
                        var explain=diagram.selection.first().data.text;
                        var stopShowOperationModelFlag=true;
                        var $model=$accountFlowChart.find(".editExplainModel");
                        var leftToWindow=$accountFlowChart[0].offsetLeft;
                        var topToWindow=$accountFlowChart[0].offsetTop;
                        var loc = obj.getDocumentPoint(go.Spot.BottomRight);
                        var pos = diagram.transformDocToView(loc);
                        var left=$(window).width()/2-423;
                        var top=$(window).height()/2-266.5;

                        if($model.length){
                            $model.find(".dialog").css("left",left);
                            $model.find(".dialog").css("top",top);
                            $model.find("textarea").val(explain || "");
                            $model.show();
                        }else{
                            var htmlStr='<div class="editExplainModel model">'
                                    +'<div class="dialog" style="left:'+left+'px;top:'+top+'px">'
                                    +'<textarea style="width:800px;height:450px" rows="40" cols="80"></textarea>'
                                    +'<div class="footer">'
                                    +'<button class="cancel-btn">取消</button>'
                                    +'<button class="confirm-btn">保存</button>'
                                    +'</div>'
                                    +'</div>'
                                    +'</div>'
                            var $model=$(htmlStr).appendTo($accountFlowChart);
                            $model.find("textarea").val(explain || "");
                            $model.find(".cancel-btn").click(function(){
                                //$model.hide();
                            })
                            $model.find(".confirm-btn").click(function(){
                                var ruleName=$model.find("textarea").val();
                                $model.hide();
                                diagram.startTransaction("edit ruleName");
                                diagram.model.setDataProperty(diagram.selection.first().data, "text", ruleName);
                                diagram.commitTransaction("edit ruleName");
                            })
                        }
                    }

                    var _this=this;

                    function editExplainModel_select(e,obj){
//                        stopShowOperationModelFlag=true;
//                        _this.updateTable_selectPolicyModel(window.global.pageIndex,window.global.pageSize);
                        _this.key_search_policyTableModel_addPolicyModel="";
                        _this.obj_page_policyTableModel_addPolicyModel={..._this.obj_page_basic};
                        _this.pageSize_policyTableModel_addPolicyModel=Constant.array_pageSize[0];
                        _this.array_rightTable_policyTableModel_addPolicyModel=[];
                        _this.pagination_policyTableModel_addPolicyModel();
                    }

                    function showOutputResultModel(e,obj){
                        _this.obj_addPolicyModel_current=_this.obj_addPolicyModel[item.index];
                        _this.obj_outputResultModel_addPolicyModel={
                            isOutputResult:diagram.selection.first().data.text=="否"?0:1,
                        };
                        _this.boolean_show_outputResultModel_addPolicyModel=true;
                    }

                    function showUploadModel(e,obj){
                        _this.obj_addPolicyModel_current=_this.obj_addPolicyModel[item.index];
                        var fileText=diagram.selection.first().data.fileText;
                        var fileUrl=diagram.selection.first().data.fileUrl;
                        var nameList=fileText?fileText.split(","):[];
                        var urlList=fileUrl?fileUrl.split(","):[];
                        _this.array_file_uploadModel_addPolicyModel=[];
                        for(var i=0;i<nameList.length;i++){
                            _this.array_file_uploadModel_addPolicyModel.push({
                                name:nameList[i],
                                url:urlList[i],
                                fileName:nameList[i],
                                fileUrl:urlList[i],
                            })
                        }
                        _this.boolean_show_uploadModel_addPolicyModel=true;
                    }

                    function showFileModel(e,obj){
                        _this.obj_addPolicyModel_current=_this.obj_addPolicyModel[item.index];
                        var fileText=diagram.selection.first().data.fileText;
                        var fileUrl=diagram.selection.first().data.fileUrl;
                        var nameList=fileText?fileText.split(","):[];
                        var urlList=fileUrl?fileUrl.split(","):[];
                        _this.array_file_fileModel_addPolicyModel=[];
                        for(var i=0;i<nameList.length;i++){
                            _this.array_file_fileModel_addPolicyModel.push({
                                name:nameList[i],
                                url:urlList[i],
                                fileName:nameList[i],
                                fileUrl:urlList[i],
                            })
                        }
                        _this.boolean_show_fileModel_addPolicyModel=true;
                    }

                })
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
                this.title_planSchemeNameModel="新增筹划方案";
                this.operation_planSchemeNameModel="add";
            },
            confirmBtn_outputResultModel_addPolicyModel(data){
                this.obj_addPolicyModel_current.diagram.startTransaction("edit");
                this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "text", data.isOutputResult == 0?"否":"是");
                this.obj_addPolicyModel_current.diagram.commitTransaction("edit");
                this.boolean_show_outputResultModel_addPolicyModel=false;
            },
            confirmBtn_planSchemeNameModel(data){
                if(this.operation_planSchemeNameModel == "add"){
                    for(var i=0;i<this.obj_addPolicyModel.length;i++){
                        if(this.obj_addPolicyModel[i].title == data.name){
                            Util.showTipModel("策划名字重复，请重新输入");
                            return;
                        }
                    }
                    this.obj_addPolicyModel.push({
                        title: data.name,
                        needCondition: data.needCondition,
                        planType:1,
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
                }else{
                    for(var i=0;i<this.obj_addPolicyModel.length;i++){
                        if(this.obj_addPolicyModel[i].title == data.name &&
                           this.obj_addPolicyModel_current.title != data.name){
                            Util.showTipModel("策划名字重复，请重新输入");
                            return;
                        }
                    }
                    this.obj_addPolicyModel_current.title=data.name;
                    this.obj_addPolicyModel_current.needCondition=data.needCondition;
                    this.obj_addPolicyModel_current.diagram.startTransaction("edit");
                    this.obj_addPolicyModel_current.diagram.model.setDataProperty(this.diagram.selection.first().data, "text", data.name);
                    this.obj_addPolicyModel_current.diagram.commitTransaction("edit");
                    this.boolean_show_planSchemeNameModel=false;
                }
            },
            deletePlanScheme(){
                if(!this.obj_tabClick_addPolicyModel ||
                   this.obj_tabClick_addPolicyModel.name == "basicInfo" ||
                   this.obj_tabClick_addPolicyModel.name == "preCondition"){
                    Util.showTipModel("不能删除基础信息或前置条件");
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
            queryByCriteria(criteria = "",id){
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
                                    parentId:id?id:this.obj_clickedNode.id,
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
            addPolicyDetail(param,areasList,taxpayerList,accFileList){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/add.do",
                        {addStr:JSON.stringify(param),areasListStr:JSON.stringify(areasList),taxpayerListStr:JSON.stringify(taxpayerList),accFileListStr:JSON.stringify(accFileList)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    this.boolean_show_addPolicyModel=false;
                    var data=result.data;
                    this.obj_page.pageIndex=0;
                    this.queryPolicyExplain_pagination();
                }, response => {
                    Util.removeWaiting();
                });
            },
            updatePolicyDetail(param,areasList,taxpayerList,accFileList=[]){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/policyExplain/edit.do",
                        {editStr:JSON.stringify(param),areasListStr:JSON.stringify(areasList),taxpayerListStr:JSON.stringify(taxpayerList),accFileListStr:JSON.stringify(accFileList)}
                ).then(response => {
                    Util.removeWaiting();
                    var result = response.body;
                    console.log(result);
                    if(!result.success){
                        Util.showTipModel(result.msg);
                        return;
                    }
                    this.boolean_show_addPolicyModel=false;
                    var data=result.data;
                    this.obj_page.pageIndex=0;
                    this.queryPolicyExplain_pagination();
                }, response => {
                    Util.removeWaiting();
                });
            },
            deletePolicyDetail(item){
                if(item.auditState == 1 || item.auditState == 3){
                    Util.showTipModel("当审核状态为审核中或审核通过时不能进行删除");
                    return;
                }
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
                        data[i].fileStateView=Constant.obj_fileStatus[data[i].fileState];
                        data[i].auditStateView=Constant.obj_auditState[data[i].auditState];
                        data[i].index=(i+1)+this.obj_page.pageIndex*this.obj_page.pageSize
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
                if(this.obj_selectedPolicyExplainTableRow.auditState == 1){
                    Util.showTipModel("当审核状态为审核中时不能进行修改");
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
                    this.zoomRange=10;
                    this.title_addPolicyModel="修改税务政策解读信息";
                    this.operationType="update";
                    this.boolean_show_addPolicyModel=true;
                    this.boolean_show_zoomBtnWrapper_addPolicyModel=false;
                    this.tabsValue="basicInfo";
                    this.tabsValue_planScheme="businessLogic";
                    this.obj_tabClick_addPolicyModel="";
                    this.plotCategoryName_addPolicyModel=data.policyExplain.plotCategoryName;
                    var explainId=data.policyExplain.explainId;
                    var param={explainId:data.policyExplain.explainId,divisionLevel:1};
                    this.$http.post(Constant.ctx+"/provinceCityAreasDivision/queryByLevel.do",
                            {criteriaStr:JSON.stringify(param)}
                    ).then(response => {
                        var result = response.body;
                        console.log(result);
                        if(!result.success){
                            Util.showTipModel(result.msg);
                            return;
                        }
                        var data=result.data;
//                        if(type == 1){
                            this.array_province_addPolicyModel=data;
                            this.obj_addPolicyModel[0].basicInfo.province=[];
                            for(var i=0;i<data.length;i++){
                                if(data[i].isChecked){
                                    this.obj_addPolicyModel[0].basicInfo.province.push(data[i].provinceCode);
                                }
                            }
                            if(this.obj_addPolicyModel[0].basicInfo.province.length){
                                var param={explainId:explainId,parentCodeList:this.obj_addPolicyModel[0].basicInfo.province.join(","),divisionLevel:2};
//                            var type=2;
                                this.$http.post(Constant.ctx+"/provinceCityAreasDivision/queryByLevel.do",
                                        {criteriaStr:JSON.stringify(param)}
                                ).then(response => {
                                    var result = response.body;
                                    console.log(result);
                                    if(!result.success){
                                        Util.showTipModel(result.msg);
                                        return;
                                    }
                                    var data=result.data;
//                                if(type == 2){
                                    this.array_city_addPolicyModel=data;
                                    this.obj_addPolicyModel[0].basicInfo.city=[];
                                    for(var i=0;i<data.length;i++){
                                        if(data[i].isChecked){
                                            this.obj_addPolicyModel[0].basicInfo.city.push(data[i].cityCode);
                                        }
                                    }
                                    if(this.obj_addPolicyModel[0].basicInfo.city.length){
                                        var param={explainId:explainId,parentCodeList:this.obj_addPolicyModel[0].basicInfo.city.join(","),divisionLevel:3};
//                                    var type=3;
                                        this.$http.post(Constant.ctx+"/provinceCityAreasDivision/queryByLevel.do",
                                                {criteriaStr:JSON.stringify(param)}
                                        ).then(response => {
                                            var result = response.body;
                                            console.log(result);
                                            if(!result.success){
                                                Util.showTipModel(result.msg);
                                                return;
                                            }
                                            var data=result.data;
//                                        if(type == 3){
                                            this.array_area_addPolicyModel=data;
                                            this.obj_addPolicyModel[0].basicInfo.area=[];
                                            for(var i=0;i<data.length;i++){
                                                if(data[i].isChecked){
                                                    this.obj_addPolicyModel[0].basicInfo.area.push(data[i].areasCode);
                                                }
                                            }
//                                        }
                                        }, response => {
                                            Util.removeWaiting();
                                        });
                                    }
//                                }
                                }, response => {
                                    Util.removeWaiting();
                                });
                            }

//                        }
                    }, response => {
                        Util.removeWaiting();
                    });
                    var param={explainId:explainId,categoryLevel:0};
                    this.$http.post(Constant.ctx+"/taxpayerCategory/queryByLevel.do",
                            {taxpayerCategoryStr:JSON.stringify(param)}
                    ).then(response => {
                        var result = response.body;
                        console.log(result);
                        if(!result.success){
                            Util.showTipModel(result.msg);
                            return;
                        }
                        var data=result.data;
//                        if(type == 0){
                            this.array_taxpayerCategory_addPolicyModel=data;
                            for(var i=0;i<data.length;i++){
                                if(data[i].isChecked){
                                    this.obj_addPolicyModel[0].basicInfo.taxpayerCategory=data[i].categoryCode;
                                }
                            }
//                        }
                        if(this.obj_addPolicyModel[0].basicInfo.taxpayerCategory){
                            var param={explainId:explainId,parentCode:this.obj_addPolicyModel[0].basicInfo.taxpayerCategory,categoryLevel:1};
                            this.$http.post(Constant.ctx+"/taxpayerCategory/queryByLevel.do",
                                    {taxpayerCategoryStr:JSON.stringify(param)}
                            ).then(response => {
                                var result = response.body;
                                console.log(result);
                                if(!result.success){
                                    Util.showTipModel(result.msg);
                                    return;
                                }
                                var data=result.data;
//                            if(type == 1){
                                this.array_taxpayerCategory1_addPolicyModel=data;
                                this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1=[];
                                console.log(data);
                                for(var i=0;i<data.length;i++){
                                    if(data[i].isChecked){
                                        this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1.push(data[i].smallCategory);
                                    }
                                }
//                            }
                            }, response => {
                                Util.removeWaiting();
                            });
                        }

                    }, response => {
                        Util.removeWaiting();
                    });
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
                            province:[],
                            city:[],
                            area:[],
                        }
                    }];
                for(var i=0;i<data.accList.length;i++){
                    data.accList[i].name=data.accList[i].sourceFileName;
                    data.accList[i].url=data.accList[i].fileUrl;
                }
                this.array_file_basicInfo_addPolicyModel=data.accList;
                this.array_file_param_basicInfo_addPolicyModel=[];
                    for(var i=0;i<data.policyExplainPlan.length;i++){
                        obj_addPolicyModel.push({
                            title: data.policyExplainPlan[i].planName,
                            needCondition: data.policyExplainPlan[i].needCondition,
                            planId: data.policyExplainPlan[i].planId,
                            planContent: data.policyExplainPlan[i].planContent,
                            name: (data.policyExplainPlan[i].planType == 0)?"preCondition":this.Util.uuid(),
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
                this.$http.post(Constant.ctx+"/policyExplain/queryPlainViewByCode.do",
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
                    this.zoomRange=10;
                    this.title_addPolicyModel="查看税务政策解读信息";
                    this.operationType="query";
                    this.boolean_show_queryPolicyModel=true;
                    this.boolean_show_zoomBtnWrapper_addPolicyModel=false;
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
                            areasCode0: data.policyExplain.areasCode0,
                            areasCode1: data.policyExplain.areasCode1,
                            areasCode2: data.policyExplain.areasCode2,
                            tax0: data.policyExplain.tax0,
                            tax1: data.policyExplain.tax1,
                            accList:data.accList
                        }
                    }];
                    for(var i=0;i<data.policyExplainPlan.length;i++){
                        obj_addPolicyModel.push({
                            title: data.policyExplainPlan[i].planName,
                            needCondition: data.policyExplainPlan[i].needCondition,
                            planId: data.policyExplainPlan[i].planId,
                            planContent: data.policyExplainPlan[i].planContent,
                            name: (data.policyExplainPlan[i].planType == 0)?"preCondition":this.Util.uuid(),
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
                this.boolean_show_zoomBtnWrapper_addPolicyModel=false;
                this.array_file_basicInfo_addPolicyModel=[];
                this.array_file_param_basicInfo_addPolicyModel=[];
                this.tabsValue="basicInfo";
                this.tabsValue_planScheme="businessLogic";
                this.obj_tabClick_addPolicyModel="";
                this.array_city_addPolicyModel=[];
                this.array_area_addPolicyModel=[];
                this.array_taxpayerCategory1_addPolicyModel=[];
                this.obj_addPolicyModel=$.extend([],true,this.obj_addPolicyModel_basic);
                this.plotCategoryName_addPolicyModel=this.obj_clickedNode.plotCategoryName;
                Util.resetObj(this.obj_addPolicyModel[0].basicInfo,{
                    fileState:Constant.array_fileStatus[0].value,
                    province:[],
                    city:[],
                    area:[],
                    taxpayerCategory1:[],
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
            confirmBtn_addPolicyModel(data){
                if(this.obj_addPolicyModel.length < 2){
                    Util.showTipModel("至少要有一个筹划方案");
                    return;
                }
                var policyExplainPlan=[];
                for(var i=0;i<this.obj_addPolicyModel.length;i++){
                    if(i > 0){
                        policyExplainPlan.push({
                            planContent:this.obj_addPolicyModel[i].diagram?this.obj_addPolicyModel[i].diagram.model.toJson():"",
                            planName:this.obj_addPolicyModel[i].title,
                            planId:this.obj_addPolicyModel[i].planId,
//                            planCode:Util.uuid(),
                            planType:this.obj_addPolicyModel[i].planType,
                            needCondition:this.obj_addPolicyModel[i].needCondition
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
                var areasList=[];
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.province.length;i++){
                    for(var j=0;j<this.array_province_addPolicyModel.length;j++){
                        var obj=this.array_province_addPolicyModel[j];
                        if(obj.provinceCode == this.obj_addPolicyModel[0].basicInfo.province[i]){
                            areasList.push({
                                divisionId:obj.divisionId,
                                divisionName:obj.divisionName,
                                divisionLevel:1,
                            })
                            break;
                        }
                    }
                }
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.city.length;i++){
                    for(var j=0;j<this.array_city_addPolicyModel.length;j++){
                        var obj=this.array_city_addPolicyModel[j];
                        if(obj.cityCode == this.obj_addPolicyModel[0].basicInfo.city[i]){
                            areasList.push({
                                divisionId:obj.divisionId,
                                divisionName:obj.divisionName,
                                divisionLevel:2,
                            })
                            break;
                        }
                    }
                }
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.area.length;i++){
                    for(var j=0;j<this.array_area_addPolicyModel.length;j++){
                        var obj=this.array_area_addPolicyModel[j];
                        if(obj.areasCode == this.obj_addPolicyModel[0].basicInfo.area[i]){
                            areasList.push({
                                divisionId:obj.divisionId,
                                divisionName:obj.divisionName,
                                divisionLevel:3,
                            })
                            break;
                        }
                    }
                }

                var taxpayerList=[];
                for(var j=0;j<this.array_taxpayerCategory_addPolicyModel.length;j++){
                    var obj=this.array_taxpayerCategory_addPolicyModel[j];
                    if(obj.categoryCode == this.obj_addPolicyModel[0].basicInfo.taxpayerCategory){
                        taxpayerList.push({
                            categoryId:obj.categoryId,
                            categoryLevel:0,
                            categoryName:obj.categoryName,
                        })
                        break;
                    }
                }
                for(var i=0;i<this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1.length;i++){
                    for(var j=0;j<this.array_taxpayerCategory1_addPolicyModel.length;j++){
                        var obj=this.array_taxpayerCategory1_addPolicyModel[j];
                        if(obj.smallCategory == this.obj_addPolicyModel[0].basicInfo.taxpayerCategory1[i]){
                            taxpayerList.push({
                                categoryId:obj.categoryId,
                                categoryLevel:1,
                                categoryName:obj.categoryName,
                            })
                            break;
                        }
                    }
                }
                var accFileList=[];
                console.log(this.array_file_basicInfo_addPolicyModel);
                for(var i=0;i<this.array_file_basicInfo_addPolicyModel.length;i++){
                    if(this.array_file_basicInfo_addPolicyModel[i].response){
                        accFileList.push(this.array_file_basicInfo_addPolicyModel[i].response.data[0]);
                    }else{
                        accFileList.push({
                            sourceFileName:this.array_file_basicInfo_addPolicyModel[i].sourceFileName,
                            fileName:this.array_file_basicInfo_addPolicyModel[i].fileName,
                            fileUrl:this.array_file_basicInfo_addPolicyModel[i].fileUrl,
                        });
                    }
                }
console.log(accFileList)
                if(this.operationType == "add"){
                    this.addPolicyDetail(param,areasList,taxpayerList,accFileList);
                }else{
                    param.policyExplain.explainCode=this.obj_addPolicyModel[0].basicInfo.explainCode;
                    param.policyExplain.explainId=this.obj_addPolicyModel[0].basicInfo.explainId;
                    this.updatePolicyDetail(param,areasList,taxpayerList,accFileList);
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
            nodeIsOpened(item){
                if(item.isCategory && !item.children){
                    this.queryByCriteria({parentPlotCategoryCode:item.plotCategoryCode,parentPlotCategoryId:item.plotCategoryId},item.id);
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
    .addPolicyModel,.queryPolicyModel{
        .addPlanSchemeBtn{
            position: absolute;
            left:25px
        }
        .deletePlanSchemeBtn{
            position: absolute;
            left:55px
        }
        .zoomBtnWrapper{
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 10000;
            color:#2B77C5;
            user-select:none;
        }
    }
    .tableWrapper{
        margin-bottom: 0px;
        height: 320px;
    }
    .planScheme{
        min-height:430px;
    }

</style>
