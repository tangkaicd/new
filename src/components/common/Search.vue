<template>
  <span>
      <input :style="style_input" class="searchInput" type="text" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" @keyup.enter="search">
      <span :style="style_icon" class="search" @click="search"></span>
  </span>
</template>

<script>
export default {
    props: ['placeholder','value','style_input','style_icon'],

  data () {
    return {

    }
  },
    methods: {
        search(){
            this.$emit("search",this.value)
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .searchInput{
        width:230px;
        vertical-align: -1px;
    }

</style>
