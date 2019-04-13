<template>
    <div class="each root" :style="style_whiteSpace">
        <span class="name" :style="style_labelWidth">
            <span v-if="isNotNull" class="notNull">*</span>
            {{label}}
            <span v-if="label">：</span>
        </span>
        <span v-if="type == 'label'" class="value" :style="style_input">{{value}}</span>
        <input v-if="type == 'input' || !type" :style="style_input" :placeholder="placeholder" :class="{disabled:disabled}" :disabled="disabled" type="text" v-model="formObj[name]">
        <textarea class="vt" :style="style_input" :placeholder="placeholder" v-if="type == 'textarea'" :disabled="disabled" v-model="formObj[name]">
        </textarea>
        <el-select
                v-if="type == 'select'"
                :placeholder="placeholder"
                :style="style_input"
                v-model="formObj[name]">
            <el-option
                    v-for="item1 in options"
                    :key="item1.value"
                    :label="item1.label"
                    :value="item1.value">
            </el-option>
        </el-select>
        <RadioGroup
                v-if="type == 'radio'"
                @change="change"
                :name="name"
                :formObj="formObj"
                :radio="radio"
        />
        <span
                v-if="type == 'date'"
                v-for="(item,index) in name">
            <span
                    v-if="dateDesc"
                    style="margin-right:3px"
                    :class="index != 0 ? 'class_dateDesc':''">
                    {{dateDesc[index]}}
            </span>
            <el-date-picker
                    v-model="formObj[name[index]]"
                    type="date"
                    :style="style_input"
                    :key="index"
                    :placeholder="placeholder[index]"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
            </el-date-picker>
        </span>

    </div>
</template>

<script>
export default {
    props: ['dateDesc','placeholder','width','height','labelWidth','formObj','isNotNull','label','type','disabled','name','options','radio','value'],
    computed: {
        style_labelWidth: function () {
            var style=`width:${this.labelWidth}px`;
            if(this.type == "label"){
                style+=";vertical-align: top";
            }
            return style;
        },
        style_input: function () {
            var style="";
            if(this.type == "textarea"){
                style=`width:${this.width}px;height:${this.height}px`
            }else{
                style=`width:${this.width}px`
            }
            return style;
        },
        style_whiteSpace: function () {
            var style="";
            if(this.type == "label"){
                style="white-space:normal!important";
            }
            return style;
        }
    },
    methods: {
        change(){
            this.$emit("change");
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="less">
    .class_dateDesc{
        margin-left:20px;
    }
</style>
