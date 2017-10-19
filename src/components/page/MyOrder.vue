<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-aegis-order_fill"></i> 我的订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    }
  }
</script>

<style scoped>


  span.el-breadcrumb__item:not(:first-child) {
    margin-top: 10px;
  }
</style>
