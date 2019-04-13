<template>
  <div id="app">
      <div id="tooltip"> </div>
      <Header/>
      <router-view/>
  </div>
</template>

<script>
    import Header from '@/components/Header'
    export default {
        components: { Header },
    }
</script>

<style scoped lang="scss">
#app {

}
</style>
