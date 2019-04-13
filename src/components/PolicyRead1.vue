<template>
    <div class="root" ref="root">
        <div class="main">
            <div class="header1">
                政策策划库列表
            </div>
            <div class="body1">
                <div class="header11">
                    <span>政策分类：</span>
                    <el-select
                            v-model="policyCategory_search"
                            placeholder="请选择"
                            @change="selectPolicyCategory_search">
                        <el-option
                                v-for="item in array_options_policyCategory"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                            class="cm-lr"
                            v-model="date_search"
                            type="date"
                            placeholder="请选择发布时间">
                    </el-date-picker>
                    <Search
                            placeholder="请输入正文内容关键字说明查询"
                            @search="search"
                    />
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
                            <span class="deleteBtn_small fr" style="margin-left:10px;"  @click="deleteNode">
                                <span class="fa fa-trash-o"></span><span class="name">删除</span>
                            </span>
                            <span class="updateBtn_small fr"  @click="showUpdatePolicyModel">
                                <span class="fa fa-edit"></span><span class="name">修改</span>
                            </span>
                            <span class="addBtn_small fr" style="margin: 0px 10px;" @click="showAddPolicyModel">
                                <span class="fa fa-plus"></span><span class="name">新增政策</span>
                            </span>
                            <span class="addBtn_small fr" @click="showAddCategoryModel">
                                <span class="fa fa-plus"></span><span class="name">新增分类</span>
                            </span>
                            <!--<span class="addRootNodeBtn aBtn" @click="addRootNode">新增根结点</span>-->
                            <!--<span class="addChildNodeBtn aBtn">新增子结点</span>-->
                            <!--<span class="deleteNodeBtn aBtn" @click="deleteNode">删除</span>-->
                        </div>
                        <div class="body112" :class="{none:!boolean_show_policyDetail}">
                            <!--<div class="head1121 none">-->
                            <!--<span class="deleteBtn_small fr"><span class="fa fa-trash-o"></span><span class="name">删除</span></span>-->
                            <!--<span class="updateBtn_small fr"><span class="fa fa-edit"></span><span class="name">修改</span></span>-->
                            <!--<span class="addBtn_small fr"><span class="fa fa-plus"></span><span class="name">新增</span></span>-->
                            <!--</div>-->
                            <div class="body1121">
                                <el-tabs v-model="tabsValue">
                                    <el-tab-pane
                                            :key="item.name"
                                            v-for="(item, index) in obj_policyDetail"
                                            :label="item.title"
                                            :name="item.name"
                                    >
                                        <div v-if="item.name == 'basicInfo'">
                                            <LabelAndValue
                                                    label="解读分类"
                                                    type="label"
                                                    :labelWidth="labelWidth_policyDetail"
                                                    width="600"
                                                    name="jdfl"
                                                    :formObj="item.basicInfo"/>
                                            <LabelAndValue
                                                    label="解读编码"
                                                    type="label"
                                                    :labelWidth="labelWidth_policyDetail"
                                                    width="600"
                                                    name="zcbt"
                                                    :formObj="item.basicInfo"/>
                                            <LabelAndValue
                                                    label="策划标题"
                                                    type="label"
                                                    :labelWidth="labelWidth_policyDetail"
                                                    width="600"
                                                    name="jdbt"
                                                    :formObj="item.basicInfo"/>
                                            <LabelAndValue
                                                    label="使用场景"
                                                    type="label"
                                                    :labelWidth="labelWidth_policyDetail"
                                                    width="600"
                                                    name="zcbt"
                                                    :formObj="item.basicInfo"/>
                                            <div>
                                                <LabelAndValue
                                                        class="fl"
                                                        label="创建人"
                                                        type="label"
                                                        :labelWidth="labelWidth_policyDetail"
                                                        name="zcbt"
                                                        :formObj="item.basicInfo"/>
                                                <LabelAndValue
                                                        class="fl"
                                                        label="创建时间"
                                                        type="label"
                                                        :labelWidth="labelWidth_policyDetail"
                                                        name="zcbt"
                                                        :formObj="item.basicInfo"/>
                                            </div>
                                            <div class="cb">
                                                <LabelAndValue
                                                        class="fl"
                                                        label="审核人"
                                                        type="label"
                                                        :labelWidth="labelWidth_policyDetail"
                                                        name="zcbt"
                                                        :formObj="item.basicInfo"/>
                                                <LabelAndValue
                                                        class="fl"
                                                        label="审核时间"
                                                        type="label"
                                                        :labelWidth="labelWidth_policyDetail"
                                                        name="zcbt"
                                                        :formObj="item.basicInfo"/>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <el-tabs tab-position="left" v-model="tabsValue_planScheme" style="height: 300px;">
                                                <el-tab-pane
                                                        :key="item_planScheme.name"
                                                        v-for="(item_planScheme, index) in item.planScheme"
                                                        :label="item_planScheme.title"
                                                        :name="item_planScheme.name"
                                                >
                                                    <div v-if="item_planScheme.name == 'businessLogic'">
                                                        业务逻辑:{{item_planScheme.content.msg}}
                                                    </div>
                                                    <div v-else>
                                                        计算逻辑:{{item_planScheme.content.msg}}
                                                    </div>
                                                </el-tab-pane>
                                            </el-tabs>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Model
                class="addCategoryModel"
                :title="title_addCategoryModel"
                :formObj="obj_addCategoryModel"
                v-if="boolean_show_addCategoryModel"
                @hide="boolean_show_addCategoryModel=false"
                @save="confirmBtn_addCategoryModel">
            <LabelAndValue
                    label="税务分类编码"
                    :disabled="true"
                    name="swflbm"
                    :formObj="obj_addCategoryModel"/>
            <LabelAndValue
                    label="税务分类名称"
                    :isNotNull="true"
                    name="swflmc"
                    :formObj="obj_addCategoryModel"/>
        </Model>

        <Model
                class="addPolicyModel"
                style_body="padding-left:0px;padding-top:0px"
                :title="title_addPolicyModel"
                :formObj="obj_addPolicyModel"
                v-if="boolean_show_addPolicyModel"
                @hide="boolean_show_addPolicyModel=false"
                @save="confirmBtn_addPolicyModel">
            <el-tabs v-model="tabsValue"
                     tab-position="left"
                     @tab-remove="removeTab"
                     style="height: 430px;width:750px">
                <el-tab-pane
                        :key="item.name"
                        v-for="(item, index) in obj_addPolicyModel"
                        :label="item.title"
                        :name="item.name"
                >
                    <div v-if="item.name == 'basicInfo'">
                        <LabelAndValue
                                style="margin-top:15px"
                                label="解读标题"
                                type="textarea"
                                :isNotNull="true"
                                width="500"
                                name="jdbt"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="解读描述"
                                type="textarea"
                                :isNotNull="true"
                                width="500"
                                name="jdbt"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="使用场景"
                                type="textarea"
                                :isNotNull="true"
                                width="500"
                                name="jdbt"
                                :formObj="item.basicInfo"/>
                        <LabelAndValue
                                label="文件状态"
                                type="radio"
                                :isNotNull="true"
                                name="wjzt"
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
                                <div v-if="item_planScheme.name == 'businessLogic'">
                                    业务逻辑:{{item_planScheme.content.msg}}
                                </div>
                                <div v-else>
                                    计算逻辑:{{item_planScheme.content.msg}}
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <span class="btn_small addPlanSchemeBtn" @click="addPlanScheme">
                <span class="fa fa-plus"></span><span class="name">新增</span>
            </span>
        </Model>
        <!--<LabelAndValue
                label="上一层结点"
                :isNotNull="true"
                :options='[{value:1,label:"房产税"},{value:2,label:"个人所得税"}]'
                type="select"
                name="parentNodeName"
                :formObj="obj_addCategoryModel"/>-->
    </div>
</template>

<script>
    import Tree from '@/json/tree1.json';
    export default {
        components: {

        },
        data () {
            return {
                tabsValue:"basicInfo",
                tabsValue_planScheme:"businessLogic",
                labelWidth_policyDetail:140,
                operationType:"",
                date_search:"",
                key_search:"",
                policyCategory_search:"",
                title_addCategoryModel:"",
                title_addPolicyModel:"",

                boolean_show_policyDetail: false,
                boolean_show_addCategoryModel:false,
                boolean_show_addPolicyModel:false,

                obj_clickedNode:"",
                obj_options_tree: {
                    checkbox: false,
                    show_labelIcon: true,
                    //            depthOpen: 100
                },
                obj_policyDetail:[],
                obj_addCategoryModel:{},
                obj_addPolicyModel:[{
                    title: "基础信息",
                    name: "basicInfo",
                    basicInfo:{
                        wjzt: 1
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

                array_options_policyCategory:[{value:1,label:"房产税"},{value:2,label:"个人所得税"}],
                array_tree: Tree.data,

                fileList3:[],
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
//            reversedMessage: function () {
//                // `this` 指向 vm 实例
//                return this.message.split('').reverse().join('')
//            }
        },
        methods: {
            addPlanScheme(){
                this.obj_addPolicyModel.push({
                    title: `策划方案${this.obj_addPolicyModel.length}`,
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
            },
            removeTab(targetName) {
                let tabs = this.obj_addPolicyModel;
                let activeName = this.tabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.tabsValue = activeName;
                this.obj_addPolicyModel = tabs.filter(tab => tab.name !== targetName);
            },
            showUpdatePolicyModel(){
                this.operationType="update";
                if(!this.obj_clickedNode){
                    this.Util.showTipModel("请先选中一个结点");
                    return;
                }
                if(this.obj_clickedNode.isCategory){
                    this.title_addCategoryModel="修改税务筹划分类";
                    this.boolean_show_addCategoryModel=true;
                    this.obj_addCategoryModel=Object.assign({},this.obj_addCategoryModel,this.obj_clickedNode);
                }else{
                    this.title_addPolicyModel="修改税务政策解读信息";
                    this.boolean_show_addPolicyModel=true;
                    this.obj_addPolicyModel=Object.assign({},this.obj_addPolicyModel,this.obj_clickedNode);
                }
            },
            showAddCategoryModel(){
                if(this.obj_clickedNode && !this.obj_clickedNode.isCategory){
                    this.Util.showTipModel("政策信息结点已是最外层结点，不能再挂载其它结点");
                    return;
                }
                this.title_addCategoryModel="新增税务筹划分类";
                this.operationType="add";
                this.boolean_show_addCategoryModel=true;
                this.obj_addCategoryModel={};
                this.obj_addCategoryModel.swflbm=this.Util.uuid();
            },
            showAddPolicyModel(){
                if(this.obj_clickedNode && !this.obj_clickedNode.isCategory){
                    this.Util.showTipModel("政策信息结点已是最外层结点，不能再挂载其它结点");
                    return;
                }
                this.title_addPolicyModel="新增税务政策解读信息";
                this.operationType="add";
                this.boolean_show_addPolicyModel=true;
                this.tabsValue="basicInfo",
                this.tabsValue_planScheme="businessLogic",
                this.obj_addPolicyModel.zcbt="";
                this.obj_addPolicyModel.swflbm=this.Util.uuid();
                this.updatePs_addPlanSchemeBtn();

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
                });
            },
            confirmBtn_addCategoryModel(data){
                this.boolean_show_addCategoryModel=false;
                if(this.operationType == "add"){
                    if(this.obj_clickedNode){
                        this.addChildNodeOfId({
                            parentId:this.obj_clickedNode.id,
                            childNode:data,
                            childNodeName:data.swflmc,
                            childNodeId:data.swflbm,
                            tree:this.array_tree,
                            obj_commonNode:this.obj_commonCategoryNode,
                        });
                    }else{
                        this.array_tree.push(Object.assign({
                            "label": data.swflmc,
                            "id": data.swflbm,
                        },this.obj_commonCategoryNode,data));
                    }
                }else{
                    this.obj_clickedNode=Object.assign(this.obj_clickedNode,data,{"label": data.swflmc});
                }
            },
            confirmBtn_addPolicyModel(data){
                this.boolean_show_addPolicyModel=false;
                this.$refs.upload_addPolicyModel.submit();
                if(this.operationType == "add"){
                    if(this.obj_clickedNode){
                        this.addChildNodeOfId({
                            parentId:this.obj_clickedNode.id,
                            childNode:data,
                            childNodeName:data.zcbt,
                            childNodeId:data.swflbm,
                            tree:this.array_tree,
                            obj_commonNode:this.obj_commonPolicyNode,
                        });
                    }else{
                        this.array_tree.push(Object.assign({
                            "label": data.zcbt,
                            "id": data.swflbm,
                        },this.obj_commonPolicyNode,data));
                    }
                }else{
                    this.obj_clickedNode=Object.assign(this.obj_clickedNode,data,{"label": data.zcbt});
                }
            },
            search(value){
                alert(value);
                this.array_tree.splice(1,1)
            },
            selectPolicyCategory_search(item){
                console.log(item);
                this.array_tree.splice(1,1)
            },
            nodeIsClicked(item){
                this.obj_clickedNode=item;
                if(!item.isCategory){
                    this.tabsValue="basicInfo",
                    this.tabsValue_planScheme="businessLogic",
                    this.boolean_show_policyDetail=true;
                    this.obj_policyDetail=item.data;
                }
            },
            deleteNode(){
                if(this.obj_clickedNode){
                    this.deleteNodeById(this.obj_clickedNode.id,this.array_tree);
                    this.obj_clickedNode="";
                }else{
                    this.Util.showTipModel("请先选中一个结点");
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
        color: #909BA0;
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
    .addPolicyModel{
        .addPlanSchemeBtn{
            position: absolute;
            left:15px
        }
    }
</style>
