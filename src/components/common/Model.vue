<template>
    <div class="model" ref="root" :style="style_model">
        <div class="dialog":style="style_dialog">
            <div class="header">
                <span class="circle"></span>
                <span class="title">{{title}}</span>
                <span class="close" @click="closeModel"></span>
            </div>
            <div class="body" :style="style_body">
                <slot>
                    <!--<LabelAndValue v-for="(item,index) in props" :props="item" :key="index"/>-->
                </slot>
                <!--<div class="each" v-for="item in data">-->
				    <!--<span class="name">-->
					    <!--<span v-if="item.isNotNull" class="notNull">*</span>-->
                        <!--{{item.label}}-->
                        <!--<span v-if="item.label">：</span>-->
                    <!--</span>-->
                    <!--<input v-if="item.type == 'input' || !item.type" :class="{disabled:item.disabled}" :disabled="item.disabled" type="text" v-model="item.value">-->
                    <!--<el-select-->
                            <!--v-if="item.type == 'select'"-->
                            <!--v-model="item.value">-->
                        <!--<el-option-->
                                <!--v-for="item1 in item.props"-->
                                <!--:key="item1.value"-->
                                <!--:label="item1.label"-->
                                <!--:value="item1.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</div>-->

                <!--<div class="each">-->
									<!--<span class="name vt">-->
										<!--<form class="fileUploadForm" enctype="multipart/form-data" method="post">-->
								          	<!--<button>选择文件</button>-->
								          	<!--<input class="none" type="file" name="tempFile" multiple="multiple"/>-->
								        <!--</form>-->
									<!--</span>-->
                    <!--<span class="image-wrapper dib" style="border:1px solid #E6E6E6"></span>-->
                <!--</div>-->

            </div>
            <div v-if="!hideFooter" class="footer" :style="style_header">
                <button class="cancel-btn" @click="cancel">{{text_cancelBtn || "取消"}}</button>
                <button class="confirm-btn" @click="save">{{text_saveBtn || "保存"}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title','formObj','style_body','text_saveBtn','text_cancelBtn','hideFooter','style_model','style_header','style_dialog'],

  data () {
    return {
        value:"",
    }
  },
    mounted () {
        var _this=this;
        var maxWidth=0;
        var $root=$(this.$refs.root);
        $root.find(".each .name").each(function(){
            var width=$(this).width();
            if(maxWidth < width){
                maxWidth = width;
            }
        })
        $root.find(".each .name").each(function(){
            $(this).width(maxWidth);
        })
    },
    methods: {
        closeModel(){
            this.$emit("hide");
        },
        cancel(){
            if(this.text_cancelBtn){
                this.$emit("cancel");
            }else{
                this.closeModel();
            }
        },
        save(){
            var $root=$(this.$refs.root);
            this.$nextTick(function () {
                if(this.Util.validate_isNotNull($root)){
                    this.$emit("save",this.formObj);
                }
            })
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">
    .model{
        position: fixed;
        top:0px;
        right:0px;
        bottom: 0px;
        left:0px;
        z-index: 1000;
        background: rgba(0,0,0,0.5);
    }
    .model .dialog{
        border: 1px solid #2b323b;
        box-shadow: 0px 0px 10px #000000,0px 3px 2px -3px rgba(255,255,255,0.38) inset;
        -moz-box-shadow: 0px 0px 10px #000000,0px 3px 2px -3px rgba(255,255,255,0.38) inset;
        -webkit-box-shadow: 0px 0px 10px #000000,0px 3px 2px -3px rgba(255,255,255,0.38) inset;
        border-radius: 0.2px;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        background: #fff;
    }
    .model .dialog .header{
        height:30px;
        line-height: 30px;
        background:@blue;
        color: #E1F8FD;
    }
    .model .dialog .header .circle{
        display: inline-block;
        width:10px;
        height:10px;
        background: url(../../assets/image/circle.png)  center no-repeat;
        background-size: 100%;
        margin:0 6px;
    }
    .model .dialog .header .close{
        display: inline-block;
        width:12px;
        height:12px;
        background: url(../../assets/image/close.png)  center no-repeat;
        background-size: 100%;
        margin-top: 10px;
        margin-right: 10px;
        cursor: pointer;
        float:right;
    }
    .model .dialog .body{
        padding:25px 50px 10px;
        max-height: 450px;
        overflow: auto;
        font-size:14px;
        position: relative;
        min-width: 300px;
    }
    .model .dialog .footer{
        text-align: center;
        padding:20px 0px;
    }
</style>
