<template>
  <div>
    demo
  </div>
</template>

<script>
import { query } from '../../caring-uni'
  export default {
    onLoad(options) {
      const q = query(options)
      console.log(q)
    }
  }
</script>

<style lang="scss" scoped>

</style>