<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                待办列表
            </div>
            <div class="body1">
                <div class="header11">
                    <span>状态：</span>
                    <el-select
                            clearable
                            v-model="state_search"
                            placeholder="请选择"
                            @change="selectState_search">
                        <el-option
                                v-for="item in Constant.array_auditState"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<Search-->
                            <!--style="margin-left:15px"-->
                            <!--placeholder="请输入正文内容关键字说明查询"-->
                            <!--@search="search"-->
                    <!--/>-->
                    <button class="fr" @click="showAuditModel">审核</button>
                </div>
                <div class="body11">
                    <el-table
                            border
                            :data="array_policyExplain"
                            height="400"
                            highlight-current-row
                            @current-change="selectTableRow_policyExplain">
                        <!--<el-table-column-->
                                <!--type="selection"-->
                                <!--width="55">-->
                        <!--</el-table-column>-->
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
                title="是否审批通过"
                :formObj="obj_auditModel"
                v-if="boolean_show_auditModel"
                @hide="boolean_show_auditModel=false"
                @save="confirmBtn_auditModel">
            <LabelAndValue
                    label="审批说明"
                    type="textarea"
                    width="400"
                    height="150"
                    name="auditView"
                    :formObj="obj_auditModel"/>
            <LabelAndValue
                    label="是否通过"
                    type="radio"
                    :isNotNull="true"
                    name="auditState"
                    :radio="Constant.array_isPass"
                    :formObj="obj_auditModel"/>
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
                class="addPolicyModel queryPolicyModel"
                :hideFooter="true"
                style_dialog="width:100%;min-width:1100px"
                :style_body="'padding-left:0px;padding-top:0px;padding-right:0px;min-height:440px;max-height: inherit;height: '+(style_addPolicyModel + 73)+'px'"
                title="查看税务政策解读信息"
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
                style_addPolicyModel:"",
                tabsValue:"basicInfo",
                plotCategoryName_addPolicyModel:"",
                decreaseZoom:0.9,
                increaseZoom:1.1,
                zoomRange:10,
                diagram:"",

                boolean_show_pagination:true,
                boolean_show_queryPolicyModel:false,
                boolean_show_zoomBtnWrapper_addPolicyModel:false,
                boolean_show_fileModel_addPolicyModel:false,

                obj_page:{
                    pageIndex:0,
                    pageSize:Constant.array_pageSize[0],
                },
                obj_tabClick_addPolicyModel:"",
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

                array_file_fileModel_addPolicyModel:[],
                array_policyExplain:[],
                obj_auditModel:{
                    auditView:""
                },
                boolean_show_auditModel:false,
                labelWidth_policyDetail:140,
                state_search:"",
                obj_selectedPolicyExplainTableRow:""
            }
        },
        computed: {

        },
        mounted () {
            this.$nextTick(function () {
                this.getPolicyExplainList(this.obj_page);
                this.resizeStyle();
            })
        },
        methods: {
            openFile(fileUrl){
                window.open(fileUrl);
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
            tabClick_addPolicyModel(item){
                console.log(item)
                this.obj_tabClick_addPolicyModel=item;
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
                                                    if(item.name!="preCondition"){
                                                        var str="是否执行前置条件：否";
                                                        if(_this.obj_addPolicyModel[item.index].needCondition == 1){
                                                            str="是否执行前置条件：是";
                                                        }
                                                        Util.showTipModel(str);
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
                    function showFileModel(e,obj){
//                        _this.obj_addPolicyModel_current=_this.obj_addPolicyModel[item.index];
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
            resizeStyle(){
                this.resizeAddPolicyModel();
            },
            resizeAddPolicyModel: function () {
                var $root=$(this.$refs.root);
                var height=$(window).height()-107;
                this.style_addPolicyModel=height;
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
                        $(".queryPolicyModel").find("textarea").attr("disabled","disabled");
                    })
                }, response => {
                    Util.removeWaiting();
                });
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
            selectState_search(){
                this.obj_page.pageIndex=0;
                this.getPolicyExplainList_pagination();
            },
            search(value){
                this.obj_page.pageIndex=0;
                this.getPolicyExplainList_pagination();
            },
            showAuditModel(){
                if(!this.obj_selectedPolicyExplainTableRow){
                    Util.showTipModel("请至少选择一条数据");
                    return;
                }
                if(this.obj_selectedPolicyExplainTableRow.auditState != 1){
                    Util.showTipModel("只能对审核状态为审核中的数据进行审核");
                    return;
                }
                Util.resetObj(this.obj_auditModel);
                this.boolean_show_auditModel=true;
            },
            audit_no(){
                var param={
                    auditView:this.obj_auditModel.auditView,
                    explainId:this.obj_selectedPolicyExplainTableRow.explainId,
                    auditState:"2"
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
                    this.selectState_search();
                    this.boolean_show_auditModel=false;
                }, response => {
                    Util.removeWaiting();
                });
            },
            confirmBtn_auditModel(data){
                var param={
                    auditView:this.obj_auditModel.auditView,
                    explainId:this.obj_selectedPolicyExplainTableRow.explainId,
                    auditState:data.auditState
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
                    var data=result.data;
                    this.selectState_search();
                    this.boolean_show_auditModel=false;
                }, response => {
                    Util.removeWaiting();
                });
            },
            selectTableRow_policyExplain(val){
                console.log(val);
                this.obj_selectedPolicyExplainTableRow=val;
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
        .planScheme{
            min-height:430px;
        }
    }

</style>
