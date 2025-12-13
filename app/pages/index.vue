<script setup lang="ts">
const { data } = await useFetch("http://10.10.10.100:9777/api/v1/article/test")
console.log("index.vue",data)
</script>

<template>
  <h1 class="text-center mt-100">
    <el-tag type="warning" size="large">Nuxt4-template</el-tag>
    <p>{{ data }}</p>
  </h1>
</template>

<style scoped>

</style>