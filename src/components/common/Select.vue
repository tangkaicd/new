<template>
  <span>
      <span v-if="label">{{label}}：</span>
      <span class="dropdown-wrapper" @click="toggleDropdown">
		<input readonly type="text" :key="key" :value="value"/>
		<div class="dropdown" :class="{none:!dropdownShow}">
			<div v-for="item in options"  data-key="item.key" @click="select(item)">{{item.value}}</div>
		</div>
      </span>
  </span>
</template>

<script>
export default {
    props: ['label','options'],

  data () {
    return {
        key: '',
        value:"",
        dropdownShow:false
    }
  },
    methods: {
        toggleDropdown(){
            this.dropdownShow = !this.dropdownShow;
        },
        select(item){
            this.key = item.key;
            this.value = item.value;
            this.$emit("select",item)
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
