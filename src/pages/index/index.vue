<template>
  <div>
    <button @click="go">去demo</button>
    <navigator url="/pages/index/demo" open-type="navigate"> demo </navigator>
  </div>
</template>

<script>
import {
  showModal,
  toast,
  showLoading,
  route
} from '../../caring-uni'
export default {
  created() {
  },
  methods: {
    go() {
      console.log('go')
      route('/pages/index/demo')
    }
  }
}
</script>

<style lang="scss" scoped></style>
