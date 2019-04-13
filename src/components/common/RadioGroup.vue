<template>
    <span class="root">
        <span class="radio-wrapper" :class="{'radio-wrapper-abled':!item.disabled}" v-for="item in radio" @click="select(item)">
            <span class="radio" :class="item.disabled?'radioDisabled':formObj[name] == item.value?'checked':''"></span>
            <span class="label">{{item.label}}</span>
        </span>
    </span>
</template>

<script>
export default {
    props: ['radio','formObj','name',],

  data () {
    return {
    }
  },
    computed:{

    },
    methods: {
        select(item){
            if(!item.disabled){
                this.$set(this.formObj,this.name,item.value)
            }
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .radio{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: -3px;
        margin-right: 5px;
        background-size: 100%;
        background-image: url(../../assets/image/checkBox.png);
    }
    .radio-wrapper{
        cursor: pointer;
    }
    .radio-wrapper-abled:hover{
        color:@blue;
    }
    .checked{
        background-image: url(../../assets/image/checkBox_s.png) !important;
    }
    .radioDisabled{
        background-image: url(../../assets/image/checkBox_d.png) !important;
    }
    .radio-wrapper:not(:first-child){
        margin-left: 20px;
    }
</style>
