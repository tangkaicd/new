<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                数据源列表
            </div>
            <div class="body1" :style="style_body1">
                <div class="header11">

                </div>
                <div class="body11" :style="style_body11">
                    <div class="leftWrapper" :style="style_leftWrapper">
                        <div class="body111">
                            <vue-tree
                                    :tree-data="array_tree"
                                    :options="obj_options_tree"
                                    @openNode="nodeIsOpened"
                                    @handle="nodeIsClicked">
                            </vue-tree>
                        </div>
                    </div>
                    <div class="rightWrapper" :style="style_rightWrapper">
                        <div class="header112">
                            <Search
                                    placeholder="请输入数据源名称或者描述查询"
                                    v-model="key_search_datasourceTable"
                                    @search="searchByKey_datasourceTable"
                            />
                            <!--<div class="fr" style="margin-top: 5px;margin-right: 10px;">-->
                                <!--<span class="addBtn" style="margin-right:10px" @click="showMappingDataExportModel">-->
                                    <!--<span class="name">映射数据导出</span>-->
                                <!--</span>-->
                            <!--</div>-->

                        </div>
                        <div class="body112">
                            <div class="body1121">
                                <el-table
                                        :data="array_datasourceTable"
                                        :height="height_datasourceTable"
                                        highlight-current-row
                                        @current-change="selectDatasourceTableRow"
                                        border
                                        style="width: 100%;text-align: center">
                                    <el-table-column
                                            prop="index"
                                            label="序号"
                                            width="50">
                                    </el-table-column>
                                    <el-table-column
                                            prop="explainTitle"
                                            label="政策解读名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="datasourceName"
                                            label="数据源名称">
                                    </el-table-column>
                                    <el-table-column
                                            prop="datasourceTypeView"
                                            label="数据源类型">
                                    </el-table-column>
                                    <el-table-column
                                            prop="datasourceDesc"
                                            label="数据源描述">
                                    </el-table-column>
                                    <el-table-column
                                            prop="state"
                                            label="状态">
                                    </el-table-column>
                                    <el-table-column
                                            label="操作"
                                            width="160">
                                        <template slot-scope="scope">
                                            <span class="aBtn" @click="uploadBtn_datasourceTable(scope)">
                                                上传
                                            </span>
                                            <!--<span class="aBtn" @click="runBtn_datasourceTable(scope)">-->
                                            <!--运行-->
                                            <!--</span>-->
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                        v-if="boolean_show_pagination"
                                        style="margin-top:15px;text-align: right"
                                        @size-change="sizeChange_datasourceTable"
                                        @current-change="currentChange_datasourceTable"
                                        :page-sizes="Constant.array_pageSize"
                                        :page-size="pageSize_datasourceTable"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total_datasourceTable">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Model
                :title="title_addDatasourceModel"
                :formObj="obj_addDatasourceModel"
                v-if="boolean_show_addDatasourceModel"
                @hide="boolean_show_addDatasourceModel=false"
                @save="confirmBtn_addDatasourceModel">
            <div style="width:900px">
                <LabelAndValue
                        class="fl"
                        label="数据源名称"
                        :isNotNull="true"
                        name="datasourceName"
                        :formObj="obj_addDatasourceModel"/>
                <LabelAndValue
                        class="fr"
                        label="数据源类型"
                        type="select"
                        :isNotNull="true"
                        name="datasourceType"
                        :options='Constant.array_datasourceType'
                        :formObj="obj_addDatasourceModel"/>
            </div>
            <LabelAndValue
                    class="cb"
                    label="数据源描述"
                    placeholder="请输入数据源描述"
                    type="textarea"
                    :isNotNull="true"
                    name="datasourceDesc"
                    width="780"
                    height="30"
                    :formObj="obj_addDatasourceModel"/>
            <div v-show="boolean_show_upload_addDatasourceModel" class="each">
                <el-upload
                        ref="upload_addDatasourceModel"
                        name="tempFile"
                        :data="{}"
                        :action="Constant.ctx1+'/datasourceConfig/parseConfigFile.do'"
                        :file-list="array_file_addDatasourceModel"
                        :on-success="uploadSuccess_addDatasourceModel"
                        :on-change="uploadChange_addDatasourceModel"
                        :on-remove="uploadRemove_addDatasourceModel">
                    <button>映射文档上传</button>
                </el-upload>
            </div>
            <div style="margin-bottom: 5px">字段映射配置</div>
            <el-table
                    :data="array_excelData_addDatasourceModel"
                    border
                    style="text-align: center">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="importEleCode"
                        label="导入元素编码">
                    <template slot-scope="scope">
                        <input type="text" v-model="scope.row.importEleCode" style="width:170px">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="importEleName"
                        label="导入元素名称">
                    <template slot-scope="scope">
                        <input type="text" v-model="scope.row.importEleName" style="width:170px">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sysEleCode"
                        label="系统元素编码">
                    <template slot-scope="scope">
                        <el-select
                                style="width:170px"
                                filterable
                                v-model="scope.row.sysEleCode"
                                @change="selectSysEleCode_addDatasourceModel(scope)">
                            <el-option
                                    v-for="item in array_sysElement"
                                    :key="item.sysEleCode"
                                    :label="item.sysEleCode"
                                    :value="item.sysEleCode">
                                <span class="fl">{{ item.sysEleCode }}</span>
                                <span class="fr" style="margin-left:20px">{{ item.sysEleName }}</span>
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="sysEleName"
                        label="系统元素名称">
                    <template slot-scope="scope">
                        <input type="text" v-model="scope.row.sysEleName" class="disabled" disabled style="width:170px">
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.$index == array_excelData_addDatasourceModel.length - 1" class="aBtn" @click="addTr_addDatasourceModel(scope)">
                            增加
                        </span>
                        <span class="aBtn" @click="deleteTr_addDatasourceModel(scope)">
                            删除
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </Model>

        <Model
                title="数据导入"
                style_dialog="width:100%;min-width:1100px"
                :style_body="'max-height:inherit;min-height:500px;height:'+height_model+'px'"
                :formObj="obj_dataImportModel"
                :hideFooter="true"
                v-if="boolean_show_dataImportModel"
                @hide="boolean_show_dataImportModel=false">
            <button style="margin-right: 20px;vertical-align: top;" @click="downloadTemp_dataImportModel">模板下载</button>
            <el-upload
                    style="width:600px;display: inline-block"
                    ref="upload_dataImportModel"
                    name="tempFile"
                    :data="{explainId:obj_selectedRow_datasourceTable.explainId}"
                    :auto-upload="false"
                    :action="Constant.ctx+'/restWeb/simulationRun.do'"
                    :file-list="array_file_dataImportModel"
                    :on-success="uploadSuccess_dataImportModel"
                    :on-error="uploadError_dataImportModel"
                    :on-change="uploadChange_dataImportModel"
                    :on-remove="uploadRemove_dataImportModel">
                <button>业务数据导入</button>
            </el-upload>
            <button class="runBtn_dataImportModel" @click="run_dataImportModel">运行</button>
            <button class="saveCompanyDataBtn_dataImportModel" @click="saveCompanyData_dataImportModel">保存</button>
            <el-table
                    style="margin-top:15px;margin-bottom:15px;width:1000px"
                    :data="array_runResult_dataImportModel"
                    height="150"
                    highlight-current-row
                    @current-change="selectRow_runResult_dataImportModel"
                    border>
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="planName"
                        label="方案名称">
                    <template slot-scope="scope">
                        <span class="aBtn">{{scope.row.planName}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--label="操作">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span @click="detail_dataImportModel(scope)" class="aBtn">详情</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-table
                    v-show="boolean_show_simulationRunModel"
                    :data="obj_simulationRunResult.data1"
                    height="250"
                    border
                    @selection-change="selectionChange_companyData"
                    style="width:100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="incomeTime"
                        label="所得期间">
                </el-table-column>
                <el-table-column
                        prop="companyCode"
                        label="公司代码">
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
                        prop="totalPayroll"
                        label="总发放工资">
                </el-table-column>
                <el-table-column
                        prop="totalChouHuaQianYjse"
                        label="筹划前应缴税额">
                </el-table-column>
                <el-table-column
                        prop="totalChouHuaHouYjse"
                        label="筹划后应缴税额">
                </el-table-column>
                <el-table-column
                        prop="totalShiJiJieShui"
                        label="实际节税">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <span  class="aBtn" @click="showModel1_simulationRun(scope)">
                            详情
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </Model>

        <Model
                title="运行结果"
                style_dialog="width:98%"
                :hideFooter="true"
                v-if="false"
                @hide="boolean_show_simulationRunModel=false">
            <el-table
                    v-show="boolean_show_simulationRunModel"
                    :data="obj_simulationRunResult.data1"
                    height="450"
                    border
                    style="width: 98%;text-align: center;margin:0px auto">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="incomeTime"
                        label="所得期间">
                </el-table-column>
                <el-table-column
                        prop="companyCode"
                        label="公司代码">
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
                        prop="totalPayroll"
                        label="总发放工资">
                </el-table-column>
                <el-table-column
                        prop="totalChouHuaQianYjse"
                        label="筹划前应缴税额">
                </el-table-column>
                <el-table-column
                        prop="totalChouHuaHouYjse"
                        label="筹划后应缴税额">
                </el-table-column>
                <el-table-column
                        prop="totalShiJiJieShui"
                        label="实际节税">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <span  class="aBtn" @click="showModel1_simulationRun(scope)">
                            详情
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </Model>

        <Model
                title="运行结果"
                style_dialog="width:100%;min-width:1100px"
                :style_body="'padding:10px;max-height:inherit;min-height:500px;height:'+(height_model + 15)+'px'"
                :hideFooter="true"
                v-show="boolean_show_simulationRunModel1"
                @hide="boolean_show_simulationRunModel1=false">
            <el-table
                    ref="simulationRunModel1"
                    :data="array_simulationRunModel1"
                    border
                    height="100"
                    tooltip-effect="light"
                    class="table_noPadding"
                    highlight-current-row
                    @current-change="selectRow_simulationRunModel1"
                    style="width: 100%;text-align: center">
                <el-table-column
                        type="index"
                        label="序号"
                        fixed
                        width="30">
                </el-table-column>
                <el-table-column
                        prop="incomeTime"
                        label="所得期间">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名">
                </el-table-column>
                <!--<el-table-column-->
                        <!--prop="idType"-->
                        <!--label="证件类型">-->
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
                <!--<el-table-column-->
                        <!--fixed="right"-->
                        <!--label="操作"-->
                        <!--width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span  class="aBtn">-->
                            <!--详情-->
                        <!--</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>

            <div style="margin-top:10px;border-top: 1px solid gray;padding-top: 10px;" v-if="boolean_show_simulationRunModel2">
                <button style="margin-bottom:10px;padding:5px 25px;font-size: 11px;-webkit-transform: scale(0.9);" @click="run_simulationRunModel2">运行</button>
                <button style="margin-left:15px;padding:5px 25px;font-size: 11px;-webkit-transform: scale(0.9);" @click="savePersonData">保存</button>
                <el-table
                        height="80"
                        class="table_noPadding"
                        v-show="boolean_show_runResult_simulationRunModel2"
                        :data="array_runResult_simulationRunModel2"
                        border
                        style="width: 100%;text-align: center;margin-bottom:10px">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="incomeTime"
                            label="所得期间">
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
                            prop="totalChouHuaQianYjse"
                            label="筹划前应缴税额">
                    </el-table-column>
                    <el-table-column
                            prop="totalChouHuaHouYjse"
                            label="筹划后应缴税额">
                    </el-table-column>
                    <el-table-column
                            prop="totalShiJiJieShui"
                            label="实际节税">
                    </el-table-column>
                </el-table>
                <el-table
                        height="300"
                        class="table_noPadding"
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
                            label="项目金额(修改后)">
                        <template slot-scope="scope">
                            <input style="width:130px" v-model="scope.row.projectAmountAfter">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label='要素解读'>
                        <template slot-scope="scope">
                            <span class="aBtn" @click="openFile(scope.row.eleFileUrl0)">{{scope.row.eleFileName0}}</span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--label='涉税凭据'>-->
                        <!--<template slot-scope="scope">-->
                            <!--<span class="aBtn" @click="openFile(scope.row.eleFileUrl1)">{{scope.row.eleFileName1}}</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                </el-table>
            </div>
        </Model>

        <Model
                title="运行结果"
                style_dialog="width:98%"
                :hideFooter="true"
                v-if="false"
                @hide="boolean_show_simulationRunModel2=false">
            <button style="margin-bottom:10px" @click="run_simulationRunModel2">运行</button>
            <el-table
                    v-show="boolean_show_runResult_simulationRunModel2"
                    :data="array_runResult_simulationRunModel2"
                    border
                    style="width: 100%;text-align: center;margin-bottom:10px">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="incomeTime"
                        label="所得期间">
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
                        label="身份证件号码">
                </el-table-column>
                <el-table-column
                        prop="totalPayroll"
                        label="总发放工资">
                </el-table-column>
                <el-table-column
                        prop="totalChouHuaQianYjse"
                        label="筹划前应缴税额">
                </el-table-column>
                <el-table-column
                        prop="totalChouHuaHouYjse"
                        label="筹划后应缴税额">
                </el-table-column>
                <el-table-column
                        prop="totalShiJiJieShui"
                        label="实际节税">
                </el-table-column>
            </el-table>
            <el-table
                    :data="array_simulationRunModel2"
                    height="450"
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
                        label="项目金额(修改后)">
                    <template slot-scope="scope">
                        <input style="width:130px" v-model="scope.row.projectAmountAfter">
                    </template>
                </el-table-column>
                <el-table-column
                        label='要素解读'>
                    <template slot-scope="scope">
                        <span class="aBtn" @click="openFile(scope.row.eleFileUrl0)">{{scope.row.eleFileName0}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--label='涉税凭据'>-->
                    <!--<template slot-scope="scope">-->
                        <!--<span class="aBtn" @click="openFile(scope.row.eleFileUrl1)">{{scope.row.eleFileName1}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
        </Model>

        <Model
                title="模板下载"
                :hideFooter="true"
                v-if="boolean_show_downloadTempModel"
                @hide="boolean_show_downloadTempModel=false">
            <div style="margin:30px 0px">
                <span class="aBtn" @click="downloadTemp('导入元素模板.xlsx')">导入元素模板</span>
            </div>
            <div style="margin:30px 0px">
                <span class="aBtn" @click="downloadTemp('记账凭证数据.xlsx')">记账凭证数据</span>
            </div>

            </el-upload>
        </Model>

        <Model
                title="日志"
                :hideFooter="true"
                style_dialog="width:95%;min-width:1000px"
                style_body="padding:0px;padding-left:5px;padding-bottom:20px;max-height:inherit"
                v-if="boolean_show_logModel"
                @hide="boolean_show_logModel=false">
            <el-tabs v-model="tabsValue_logModel"
                     @tab-click="tabClick_logModel">
                <el-tab-pane
                        label="上传日志"
                        name="uploadLog"
                        style="padding-left: 20px;padding-top:10px;padding-right: 25px"
                >
                    <div style="margin-bottom:10px">
                        <Search
                                placeholder="请输入日志内容进行查询"
                                v-model="key_search_uploadLogTable_logModel"
                                @search="searchByKey_uploadLogTable_logModel"
                        />
                    </div>
                    <el-table
                            :data="array_uploadLogTable_logModel"
                            border
                            height="350"
                            style="width: 100%;text-align: center">
                        <el-table-column
                                prop="index"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceId"
                                label="数据源ID">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceName"
                                label="数据源名称">
                        </el-table-column>
                        <el-table-column
                                prop="explainCode"
                                label="政策解读编码">
                        </el-table-column>
                        <el-table-column
                                prop="explainTitle"
                                label="政策解读标题">
                        </el-table-column>
                        <el-table-column
                                prop="fileUrl"
                                label="源文件地址">
                        </el-table-column>
                        <el-table-column
                                prop="logTypeDesc"
                                label="导入类型">
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="创建时间">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            v-if="boolean_show_pagination"
                            style="margin-top:15px;text-align: right"
                            @size-change="sizeChange_uploadLogTable_logModel"
                            @current-change="currentChange_uploadLogTable_logModel"
                            :page-sizes="Constant.array_pageSize"
                            :page-size="pageSize_uploadLogTable_logModel"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total_uploadLogTable_logModel">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane
                        label="运行日志"
                        name="runLog"
                        style="padding-left: 20px;padding-top:10px;padding-right: 25px"
                >
                    <div style="margin-bottom:10px">
                        <Search
                                placeholder="请输入日志内容进行查询"
                                v-model="key_search_runLogTable_logModel"
                                @search="searchByKey_runLogTable_logModel"
                        />
                    </div>
                    <el-table
                            :data="array_runLogTable_logModel"
                            border
                            height="350"
                            style="width: 100%;text-align: center">
                        <el-table-column
                                prop="index"
                                label="序号"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceId"
                                label="数据源ID">
                        </el-table-column>
                        <el-table-column
                                prop="datasourceName"
                                label="数据源名称">
                        </el-table-column>
                        <el-table-column
                                prop="explainCode"
                                label="政策解读编码">
                        </el-table-column>
                        <el-table-column
                                prop="explainTitle"
                                label="政策解读标题">
                        </el-table-column>
                        <el-table-column
                                prop="planCode"
                                label="方案编码">
                        </el-table-column>
                        <el-table-column
                                prop="planName"
                                label="方案名称">
                        </el-table-column>
                        <el-table-column
                                prop="logRunResult"
                                label="运行结果">
                        </el-table-column>
                        <el-table-column
                                prop="logTypeDesc"
                                label="日志类型">
                        </el-table-column>
                        <el-table-column
                                prop="createDate"
                                label="创建时间">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            v-if="boolean_show_pagination"
                            style="margin-top:15px;text-align: right"
                            @size-change="sizeChange_runLogTable_logModel"
                            @current-change="currentChange_runLogTable_logModel"
                            :page-sizes="Constant.array_pageSize"
                            :page-size="pageSize_runLogTable_logModel"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total_runLogTable_logModel">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </Model>

        <Model
                style_dialog="width:90%"
                title="映射数据导出"
                text_saveBtn="导出"
                v-if="boolean_show_mappingDataExportModel"
                @hide="boolean_show_mappingDataExportModel=false"
                @save="confirmBtn_mappingDataExportModel">
            <el-table
                    :data="array_mappingDataExportModel"
                    border
                    :height="450"
                    style="text-align: center"
                    @selection-change="selectionChange_mappingDataExportModel">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="importEleCode"
                        label="导入元素编码">
                </el-table-column>
                <el-table-column
                        prop="importEleName"
                        label="导入元素名称">
                </el-table-column>
                <el-table-column
                        prop="sysEleCode"
                        label="系统元素编码">
                </el-table-column>
                <el-table-column
                        prop="sysEleName"
                        label="系统元素名称">
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
                height_model:$(window).height()-66,
                pageSize_datasourceTable:Constant.array_pageSize[0],
                pageSize_uploadLogTable_logModel:Constant.array_pageSize[0],
                pageSize_runLogTable_logModel:Constant.array_pageSize[0],
                total_datasourceTable:0,
                total_uploadLogTable_logModel:0,
                total_runLogTable_logModel:0,
                tabsValue_logModel:"uploadLog",
                operationType:"",
                title_addDatasourceModel:"",
                key_search_datasourceTable:"",
                key_search_uploadLogTable_logModel:"",
                key_search_runLogTable_logModel:"",
                style_body1:"",
                style_body11:"",
                style_leftWrapper:"",
                style_rightWrapper:"",
                height_datasourceTable:0,

                boolean_show_pagination:true,
                boolean_show_dataImportModel:false,
                boolean_show_logModel:false,
                boolean_show_addDatasourceModel:false,
                boolean_show_upload_addDatasourceModel:false,
                boolean_show_downloadTempModel:false,
                boolean_show_mappingDataExportModel:false,

                obj_selectedRow_datasourceTable:"",
                obj_page_basic:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_page_logModel:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_dataImportModel:{},
                obj_clickedNode:"",
                obj_selectedRow_datasourceTable:"",
                obj_options_tree: {
                    checkbox: false,
                    show_labelIcon: true,
                    //            depthOpen: 100
                },
                obj_addDatasourceModel:{
                    datasourceName:"",
                    datasourceType:"",
                    datasourceDesc:""
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

                array_excelData_addDatasourceModel:[],
                array_tree: [],
                array_file_addDatasourceModel:[],
                array_file_dataImportModel:[],
                array_datasourceTable:[],
                array_uploadLogTable_logModel:[],
                array_runLogTable_logModel:[],
                array_sysElement:[],
                array_mappingDataExportModel:[],
                array_multipleSelection_mappingDataExportModel:[],

                boolean_show_simulationRunModel:false,
                array_runResult_dataImportModel:[],
                array_simulationRunModel:[],
                multipleSelection_companyData:[],

                boolean_show_simulationRunModel1:"",
                array_simulationRunModel1:[],
                boolean_show_simulationRunModel2:"",
                array_simulationRunModel2:[],
                array_rowspan:[],
                obj_simulationRunResult:"",
                idCard:"",

                boolean_show_runResult_simulationRunModel2:false,
                obj_selectedRow_simulationRunModel1:"",
                array_runResult_simulationRunModel2:[],
            }
        },
        computed: {
            issueDepartment_policyDetail: function () {

            },
        },
        mounted () {
            var _this=this;
            this.$nextTick(function () {
                this.getPolicyCategoryList();
                this.getSysElementList();
                this.getDatasourceList(this.obj_page);
                this.resizeStyle();
            })
            window.onresize=()=>{
                this.resizeStyle();
            }
        },
        destroyed(){
            window.onresize=()=>{

            }
        },
        methods: {
            selectRow_simulationRunModel1(val){
                this.array_runResult_simulationRunModel2=[];
                this.boolean_show_runResult_simulationRunModel2=false;
                this.obj_selectedRow_simulationRunModel1=val;
                var idCard=val.idCard;
                this.idCard=idCard;
                var list=[];
                var totalProjectNameList=[];
                for(var i=0;i<this.obj_simulationRunResult.data3.length;i++){
                    var obj=this.obj_simulationRunResult.data3[i];
                    if(obj.idCard == idCard){
                        list.push(obj);
                        totalProjectNameList.push(obj.totalProjectName);
                    }
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
                this.boolean_show_simulationRunModel2=true;
                console.log(this.array_rowspan);
            },
            selectRow_runResult_dataImportModel(val){
                this.obj_simulationRunResult=val;
                this.boolean_show_simulationRunModel=true;
            },
            savePersonData(){
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/runResult/savePersonData.do",
                        {
                            maprAll:JSON.stringify(this.array_runResult_dataImportModel),
                            idCard:this.obj_selectedRow_simulationRunModel1.idCard,
                            listDetail:JSON.stringify(this.array_simulationRunModel2),
                            listr:JSON.stringify(this.array_runResult_simulationRunModel2),
                            planId:this.obj_simulationRunResult.planId,
                            planName:this.obj_simulationRunResult.planName,
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
                Util.showTipModel(result.msg);
            }, response => {
                    Util.removeWaiting();
                });
            },
            selectionChange_companyData(val){
                this.multipleSelection_companyData = val;
            },
            saveCompanyData_dataImportModel(){
                if(!this.multipleSelection_companyData.length){
                    Util.showTipModel("请至少选择一条公司数据");
                    return;
                }
                var unifiedCreditCodes="";
                for(var i=0;i<this.multipleSelection_companyData.length;i++){
                    unifiedCreditCodes+=this.multipleSelection_companyData[i].unifiedCreditCode;
                    if(i != this.multipleSelection_companyData.length - 1){
                        unifiedCreditCodes+=",";
                    }
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/runResult/saveCompanyData.do",
                        {
                            maprAll:JSON.stringify(this.array_runResult_dataImportModel),
                            unifiedCreditCodes:unifiedCreditCodes,
                            planId:this.obj_simulationRunResult.planId,
                            planName:this.obj_simulationRunResult.planName,
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
                Util.showTipModel(result.msg);
            }, response => {
                    Util.removeWaiting();
                });
            },
            openFile(fileUrl){
                window.open(fileUrl);
            },
            downloadTemp_dataImportModel(){
                location.href=Constant.ctx+"/fileDownload/downloadTemp.do?tempFileName="+"个税.xlsx";
            },
            cellStyle_simulationRunModel2({row, column, rowIndex, columnIndex}){
                if(row.projectAmount == 0 && column.property == "projectAmount"){
                    return {color:"red"};
                }
            },
            detail_dataImportModel(scope){
                this.obj_simulationRunResult=scope.row;
                this.boolean_show_simulationRunModel=true;
            },
            showModel1_simulationRun(scope){
                this.boolean_show_simulationRunModel2=false;
                var unifiedCreditCode=scope.row.unifiedCreditCode;
                var list=[];
                for(var i=0;i<this.obj_simulationRunResult.data2.length;i++){
                    var obj=this.obj_simulationRunResult.data2[i];
                    if(obj.unifiedCreditCode == unifiedCreditCode){
                        list.push(obj);
                    }
                }
                this.array_simulationRunModel1=list;
                this.boolean_show_simulationRunModel1=true;
                this.$refs.simulationRunModel1.setCurrentRow({});
                if(list.length){
                    this.$refs.simulationRunModel1.setCurrentRow(list[0]);
                }
            },
            showModel2_simulationRun(scope){
                this.array_runResult_simulationRunModel2=[];
                this.boolean_show_runResult_simulationRunModel2=false;
                this.obj_selectedRow_simulationRunModel1=scope.row;
                var idCard=scope.row.idCard;
                this.idCard=idCard;
                var list=[];
                var totalProjectNameList=[];
                for(var i=0;i<this.obj_simulationRunResult.data3.length;i++){
                    var obj=this.obj_simulationRunResult.data3[i];
                    if(obj.idCard == idCard){
                        list.push(obj);
                        totalProjectNameList.push(obj.totalProjectName);
                    }
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
                this.boolean_show_simulationRunModel2=true;
                console.log(this.array_rowspan);
            },
            run_simulationRunModel2(){
                for(var i=0;i<this.array_simulationRunModel2.length;i++){
                    if(Util.isNull(this.array_simulationRunModel2[i].projectAmountAfter)){
                        Util.showTipModel("项目金额(修改后)不能为空");
                        return;
                    }
                    var re = /^\d+$/ ;
                    var re1 = /^\d+(\.\d+)?$/ ;
                    if(!re.test(this.array_simulationRunModel2[i].projectAmountAfter) && !re1.test(this.array_simulationRunModel2[i].projectAmountAfter)){
                        Util.showTipModel("项目金额(修改后)只能为非负数");
                        return;
                    }
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx+"/restWeb/editSimulationRun.do",
                        {
                            bodyList:JSON.stringify(this.obj_simulationRunResult.bodyList),
                            headList:JSON.stringify(this.obj_simulationRunResult.headList),
                            jisuanmonth:JSON.stringify(this.obj_simulationRunResult.jisuanmonth),
                            planId:this.obj_simulationRunResult.planId,
                            categoryCode:this.obj_simulationRunResult.categoryCode,
                            map2:JSON.stringify(this.obj_selectedRow_simulationRunModel1),
                            list3:JSON.stringify(this.array_simulationRunModel2),
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
                this.boolean_show_runResult_simulationRunModel2=true;
                this.array_runResult_simulationRunModel2=data;
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
            selectionChange_mappingDataExportModel(val){
                this.array_multipleSelection_mappingDataExportModel=val;
            },
            confirmBtn_mappingDataExportModel(){
                if(this.array_multipleSelection_mappingDataExportModel.length == 0){
                    Util.showTipModel("请至少选中表格中的一行");
                    return;
                }
                var str="";
                for(var i=0;i<this.array_multipleSelection_mappingDataExportModel.length;i++){
                    var obj=this.array_multipleSelection_mappingDataExportModel[i];
                    str+=`"importEleCode"="${obj.importEleCode}","importEleName"="${obj.importEleName}"`;
                    if(i != this.array_multipleSelection_mappingDataExportModel.length - 1){
                        str+=";";
                    }
                }
                location.href=Constant.ctx1+"/datasourceMapConfig/exportMapConfigData.do?dataListStr="+str;
//                Util.makeWaiting();
//                this.$http.post(Constant.ctx1+"/datasourceMapConfig/exportMapConfigData.do",
//                        {dataListStr:JSON.stringify(this.array_multipleSelection_mappingDataExportModel)}
//                ).then(response => {
//                    Util.removeWaiting();
//                    var result = response.body;
//                    console.log(result);
//                    if(!result.success){
//                        Util.showTipModel(result.msg);
//                        return;
//                    }
//                    var data=result.data;
//                    this.boolean_show_mappingDataExportModel=false;
//                }, response => {
//                    Util.removeWaiting();
//                });
            },
            selectDatasourceTableRow(val){
                this.obj_selectedRow_datasourceTable=val;
            },
            showMappingDataExportModel(){
                if(!this.obj_selectedRow_datasourceTable){
                    Util.showTipModel("请先选中数据源表格中的一行");
                    return;
                }
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/queryByEdit.do",
                        {datasourceId:this.obj_selectedRow_datasourceTable.datasourceId}
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                this.array_multipleSelection_mappingDataExportModel=[];
                this.boolean_show_mappingDataExportModel=true;
                this.array_mappingDataExportModel=data.mapDataList;
            }, response => {
                    Util.removeWaiting();
                });
            },
            downloadTemp(tempFileName){
                location.href=Constant.ctx1+"/fileDownload/downloadTemp.do?tempFileName="+tempFileName;
            },
            showDownloadTempModel(){
                this.boolean_show_downloadTempModel=true;
            },
            run_dataImportModel(){
                if(!this.array_file_dataImportModel.length){
                    Util.showTipModel("请先导入凭证数据");
                    return;
                }
                this.$refs.upload_dataImportModel.submit();
                Util.makeWaiting();
            },
            selectSysEleCode_addDatasourceModel(scope){
                var sysEleName;
                for(var i=0;i<this.array_sysElement.length;i++){
                    if(this.array_sysElement[i].sysEleCode == scope.row.sysEleCode){
                        sysEleName=this.array_sysElement[i].sysEleName;
                    }
                }
                this.array_excelData_addDatasourceModel[scope.$index].sysEleName=sysEleName;
            },
            getDatasourceList(param){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/list.do",
                        param
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.total_datasourceTable=result.total;
                var data=result.data;
                for(var i=0;i<data.length;i++){
                    data[i].datasourceTypeView=Constant.obj_datasourceType[data[i].datasourceType];
                    data[i].index=(i+1)+this.obj_page.pageIndex*this.obj_page.pageSize
                }
                this.array_datasourceTable=data;
            }, response => {
                    Util.removeWaiting();
                });
            },
            getUploadLogList(obj_page,param=""){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceImportLog/queryByCriteria.do",
                        {...obj_page,criteriaStr:JSON.stringify(param)}
            ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.total_uploadLogTable_logModel=result.total;
                var data=result.data;
                for(var i=0;i<data.length;i++){
                    data[i].dataType=Constant.obj_datasourceType_logModel[data[i].dataType];
                    data[i].index=(i+1)+this.obj_page_logModel.pageIndex*this.obj_page_logModel.pageSize
                }
                this.array_uploadLogTable_logModel=data;
            }, response => {
                    Util.removeWaiting();
                });
            },
            getRunLogList(obj_page,param=""){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceRunLog/queryByCriteria.do",
                        {...obj_page,criteriaStr:JSON.stringify(param)}
            ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                this.total_runLogTable_logModel=result.total;
                var data=result.data;
                for(var i=0;i<data.length;i++){
                    data[i].logType=Constant.logTypeMap[data[i].logType];
                    data[i].index=(i+1)+this.obj_page_logModel.pageIndex*this.obj_page_logModel.pageSize
                }
                this.array_runLogTable_logModel=data;
            }, response => {
                    Util.removeWaiting();
                });
            },
            getSysElementList(){
                this.$http.post(Constant.ctx1+"/sysElement/getAllList.do",
                        {}
                ).then(response => {
                    var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                this.array_sysElement=data;
            }, response => {
                    Util.removeWaiting();
                });
            },
            uploadSuccess_addDatasourceModel(result){
                this.array_excelData_addDatasourceModel=result.data.excelDataList;
            },
            uploadChange_addDatasourceModel(file,fileList){
                this.array_file_addDatasourceModel=[{...file}];
            },
            uploadRemove_addDatasourceModel(file,fileList){
                this.array_file_addDatasourceModel=[{...file}];
            },
            uploadSuccess_dataImportModel(result){
                console.log(result)
                Util.removeWaiting();
                if(result.success){
                    this.array_runResult_dataImportModel=result.data;
                }

            },
            uploadError_dataImportModel(){
                Util.removeWaiting();
                Util.showTipModel("运行失败，请检查上传的凭证数据文件是否正确");
            },
            uploadChange_dataImportModel(file,fileList){
                this.array_file_dataImportModel=[{...file}];
            },
            uploadRemove_dataImportModel(file,fileList){
                this.array_file_dataImportModel=[{...file}];
            },
            showAddDatasourceModel(){
                if(!this.obj_clickedNode || this.obj_clickedNode.isCategory){
                    Util.showTipModel("请先选中叶子结点");
                    return;
                }
                this.title_addDatasourceModel="新增数据源";
                this.operationType="add";
                this.boolean_show_upload_addDatasourceModel=true;
                this.boolean_show_addDatasourceModel=true;
                this.array_excelData_addDatasourceModel=[];
                this.array_file_addDatasourceModel=[];
                Util.resetObj(this.obj_addDatasourceModel,{
                    datasourceType:Constant.array_datasourceType[0].value
                });
            },
            editBtn_datasourceTable(scope){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/queryByEdit.do",
                        {datasourceId:scope.row.datasourceId}
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                this.title_addDatasourceModel="修改数据源";
                this.operationType="update";
                this.boolean_show_upload_addDatasourceModel=false;
                this.boolean_show_addDatasourceModel=true;
                this.obj_addDatasourceModel=data.datasource;
                this.array_excelData_addDatasourceModel=data.mapDataList;
            }, response => {
                    Util.removeWaiting();
                });
            },
            logBtn_datasourceTable(){
                this.tabsValue_logModel="uploadLog";
                this.boolean_show_logModel=true;
                this.key_search_uploadLogTable_logModel="";
                this.obj_page_logModel={...this.obj_page_basic};
                this.getUploadLogList(this.obj_page_logModel);
            },
            tabClick_logModel(item){
                this.obj_page_logModel={...this.obj_page_basic};
                if(item.name == "uploadLog"){
                    this.key_search_uploadLogTable_logModel="";
                    this.getUploadLogList(this.obj_page_logModel);
                }else{
                    this.key_search_runLogTable_logModel="";
                    this.getRunLogList(this.obj_page_logModel);
                }
            },
            nodeIsOpened(item){
                if(item.isLeaf){
                    if(!item.children){
                        this.getPolicyExplainList(item.plotCategoryId,item.plotCategoryCode,item.id);
                    }
                }else{
                    if(!item.children){
                        this.getPolicyCategoryList({parentPlotCategoryCode:item.plotCategoryCode,parentPlotCategoryId:item.plotCategoryId},item.id);
                    }
                }
            },
            nodeIsClicked(item){
                if(item.isClicked){
                    if(this.obj_clickedNode){
                        this.obj_clickedNode.isClicked = false;
                    }
                }else{
                    this.obj_clickedNode="";
                    return;
                }
                this.obj_clickedNode=item;
                this.obj_page.pageIndex=0;
                this.getDatasourceList_pagination();
                if(item.isLeaf){
                    if(!item.children){
                        this.getPolicyExplainList(item.plotCategoryId,item.plotCategoryCode);
                    }
                }else{
                    if(!item.children){
                        this.getPolicyCategoryList({parentPlotCategoryCode:item.plotCategoryCode,parentPlotCategoryId:item.plotCategoryId});
                    }
                }
            },
            getPolicyExplainList(plotCategoryId,plotCategoryCode,id){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/policyExplain/queryPageList.do",
                        {plotCategoryId:plotCategoryId,plotCategoryCode:plotCategoryCode}
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                var data=result.data;
                if(data){
                    for(var i=0;i<data.length;i++){
                        this.addChildNodeOfId({
                            parentId:id?id:this.obj_clickedNode.id,
                            childNode:data[i],
                            childNodeName:data[i].explainTitle,
                            childNodeId:data[i].explainId,
                            tree:this.array_tree,
                            obj_commonNode:this.obj_commonPolicyNode,
                        });
                    }
                }
            }, response => {
                    Util.removeWaiting();
                });
            },
            getPolicyCategoryList(criteria = "",id){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/policyPlotCategory/queryByCriteria.do",
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
                            this.addChildNodeOfId({
                                parentId:id?id:this.obj_clickedNode.id,
                                childNode:data.categoryList[i],
                                childNodeName:data.categoryList[i].plotCategoryName,
                                childNodeId:data.categoryList[i].plotCategoryId,
                                tree:this.array_tree,
                                obj_commonNode:this.obj_commonCategoryNode,
                            });
                        }
                    }
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
            runBtn_datasourceTable(scope){
                Util.showTipModel("是否创建任务？",() => {
                    Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/addRunTask.do",
                        {
                            explainCode:scope.row.explainCode,
                            explainId:scope.row.explainId,
                            datasourceId:scope.row.datasourceId,
                            plotCategoryId:scope.row.plotCategoryId,
                            plotCategoryCode:scope.row.plotCategoryCode,
                        }
                ).then(response => {
                    Util.removeWaiting();
                var result = response.body;
                console.log(result);
                if(!result.success){
                    Util.showTipModel(result.msg);
                    return;
                }
                Util.showTipModel("创建任务成功");
            }, response => {
                    Util.removeWaiting();
                });
            })
            },
            uploadBtn_datasourceTable(scope){
                this.boolean_show_simulationRunModel=false;
                this.multipleSelection_companyData=[];
                this.obj_selectedRow_datasourceTable=scope.row;
                this.obj_selectedRow_datasourceTable.moduleType=1;
                this.array_file_dataImportModel=[];
                this.boolean_show_dataImportModel=true;
                this.array_runResult_dataImportModel=[];
            },
            addTr_addDatasourceModel(scope){
                console.log(scope);
                this.array_excelData_addDatasourceModel.push({});
            },
            deleteTr_addDatasourceModel(scope){
                if(this.array_excelData_addDatasourceModel.length == 1){
                    Util.showTipModel("至少要保留一条数据");
                    return;
                }
                this.array_excelData_addDatasourceModel.splice(scope.$index,1);
            },
            resizeStyle(){
                this.resizeBody1();
                this.resizeLeftWrapper();
                this.resizeRightWrapper();
                this.resizePolicyExplainTable();
            },
            resizeBody1: function () {
                var $root=$(this.$refs.root);
                var height=$(window).height()-$root.find(".body1")[0].offsetTop-50;
//                this.style_body1=`height:${height}px`;
                this.style_body11=`height:${height}px`;
            },
            resizeLeftWrapper: function () {
                var $root=$(this.$refs.root);
                var height=$(window).height()-$root.find(".main  .body11 > .leftWrapper")[0].offsetTop-35;
                this.style_leftWrapper=`height:${height}px`;
            },
            resizeRightWrapper: function () {
                var $root=$(this.$refs.root);
                var height=$(window).height()-$root.find(".main  .body11 > .rightWrapper")[0].offsetTop-35;
                this.style_rightWrapper=`height:${height}px`;
            },
            resizePolicyExplainTable: function () {
                var $root=$(this.$refs.root);
                var height=$(window).height()-$root.find(".main .body1121")[0].offsetTop-35-70;
                this.height_datasourceTable=height;
            },
            getDatasourceList_pagination(){
                if(this.obj_page.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
//                    datasourceName:this.key_search_datasourceTable,
                    plotCategoryPath:this.obj_clickedNode?this.obj_clickedNode.plotCategoryPath:""
                };
                this.getDatasourceList(Object.assign({},param,this.obj_page));
            },
            getUploadLogList_pagination(){
                if(this.obj_page_logModel.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
//                    queryLikeName:this.key_search_datasourceTable,
//                    plotCategoryPath:this.obj_clickedNode?this.obj_clickedNode.plotCategoryCode:""
                };
                this.getUploadLogList(this.obj_page_logModel,param);
            },
            getRunLogList_pagination(){
                if(this.obj_page_logModel.pageIndex==0){
                    this.boolean_show_pagination = false;
                    this.$nextTick(() => {
                        this.boolean_show_pagination = true;
                });
                }
                var param={
//                    queryLikeName:this.key_search_datasourceTable,
//                    plotCategoryPath:this.obj_clickedNode?this.obj_clickedNode.plotCategoryCode:""
                };
                this.getRunLogList(Object.assign(this.obj_page_logModel,param));
            },
            sizeChange_datasourceTable(val){
                this.pageSize_datasourceTable=val;
                this.obj_page.pageSize=val;
                this.obj_page.pageIndex=0;
                this.getDatasourceList_pagination();
            },
            currentChange_datasourceTable(val){
                this.obj_page.pageIndex=val - 1;
                this.getDatasourceList_pagination();
            },
            sizeChange_uploadLogTable_logModel(val){
                this.pageSize_uploadLogTable_logModel=val;
                this.obj_page_logModel.pageSize=val;
                this.obj_page_logModel.pageIndex=0;
                this.getUploadLogList_pagination();
            },
            currentChange_uploadLogTable_logModel(val){
                this.obj_page_logModel.pageIndex=val - 1;
                this.getUploadLogList_pagination();
            },
            sizeChange_runLogTable_logModel(val){
                this.pageSize_runLogTable_logModel=val;
                this.obj_page_logModel.pageSize=val;
                this.obj_page_logModel.pageIndex=0;
                this.getRunLogList_pagination();
            },
            currentChange_runLogTable_logModel(val){
                this.obj_page_logModel.pageIndex=val - 1;
                this.getRunLogList_pagination();
            },

            addDatasource(addStr,dataMapList,policyExplainStr){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/add.do",
                        {
                            addStr: JSON.stringify(addStr),
                            dataMapList: JSON.stringify(dataMapList),
                            policyExplainStr: JSON.stringify(policyExplainStr),
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
                this.boolean_show_addDatasourceModel=false;
                this.obj_page.pageIndex=0;
                this.getDatasourceList_pagination();
            }, response => {
                    Util.removeWaiting();
                });
            },
            updateDatasource(editStr,mapConfigListStr){
                Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/edit.do",
                        {
                            editStr: JSON.stringify(editStr),
                            mapConfigListStr: JSON.stringify(mapConfigListStr),
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
                this.boolean_show_addDatasourceModel=false;
                this.obj_page.pageIndex=0;
                this.getDatasourceList_pagination();
            }, response => {
                    Util.removeWaiting();
                });
            },
            deleteBtn_datasourceTable(scope){
                Util.showTipModel("确定删除该条数据",() => {
                    Util.makeWaiting();
                this.$http.post(Constant.ctx1+"/datasourceConfig/delete.do",
                        {datasourceId:scope.row.datasourceId}
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
                this.getDatasourceList_pagination();
            }, response => {
                    Util.removeWaiting();
                });
            })
            },

            confirmBtn_addDatasourceModel(data){
//                this.boolean_show_addDatasourceModel=false;
                if(this.operationType == "add"){
                    if(!this.array_file_addDatasourceModel.length){
                        this.Util.showTipModel("请先上传文件");
                        return;
                    }
                    if(!this.array_excelData_addDatasourceModel.length){
                        this.Util.showTipModel("字段映射配置表格至少会映射出一条数据，请重新上传格式正确的文件");
                        return;
                    }
                }
                for(var i=0;i<this.array_excelData_addDatasourceModel.length;i++){
                    var obj=this.array_excelData_addDatasourceModel[i];
                    if(Util.isNull(obj.importEleCode)){
                        this.Util.showTipModel("导入元素编码不能为空");
                        return;
                    }
                    if(Util.isNull(obj.importEleName)){
                        this.Util.showTipModel("导入元素名称不能为空");
                        return;
                    }
                    if(Util.isNull(obj.sysEleCode)){
                        this.Util.showTipModel("系统元素编码不能为空");
                        return;
                    }
                    if(Util.isNull(obj.sysEleName)){
                        this.Util.showTipModel("系统元素名称不能为空");
                        return;
                    }
                }
                if(this.operationType == "add"){
                    this.addDatasource(this.obj_addDatasourceModel,this.array_excelData_addDatasourceModel,this.obj_clickedNode);
                }else{
                    this.updateDatasource(this.obj_addDatasourceModel,this.array_excelData_addDatasourceModel);
                }
            },
            searchByKey_datasourceTable(){
                this.obj_page.pageIndex=0;
                this.getDatasourceList_pagination();
            },
            searchByKey_uploadLogTable_logModel(){
                this.obj_page_logModel.pageIndex=0;
                this.getUploadLogList_pagination();
            },
            searchByKey_runLogTable_logModel(){
                this.obj_page_logModel.pageIndex=0;
                this.getRunLogList_pagination();
            },

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
    }
    .main  .header11{

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
    //border-bottom:1px #F2F2F2 solid;
        padding-left: 10px;
        padding-top: 15px;
        padding-bottom: 5px;
    }
    .main .head1121{
        margin-top:5px;
    }
    .main .body1121{
        padding:10px;
        position: relative;
    }

    .runBtn_dataImportModel{
        position: absolute;
        left: 320px;
        top: 25px;
    }
    .saveCompanyDataBtn_dataImportModel{
        position: absolute;
        left: 420px;
        top: 25px;
    }
    button{
        font-size:12px;
    }
</style>
