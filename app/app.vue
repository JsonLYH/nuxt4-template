<template>
  <div>
<!--通过指定布局name，覆盖默认的default布局-->
<!--<NuxtLayout name="layout-one">-->
<!--<NuxtPage />-->
<!--</NuxtLayout>-->
    <!-- 推荐使用NuxtLoadingIndicator组件+useLoadingIndicator -->
    <NuxtLoadingIndicator />
<!--Loading组件导致控制台会有告警不用理会，生产不会有，也不影响功能正常使用,但是SEO会受影响,因为是在客户端生命周期关闭的(不建议使用此方式，不需要可自行删掉)-->
<!--    <Loading :loading="loading" :enableLoading="enableLoading">-->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
<!--    </Loading>-->
  </div>
</template>
<script setup lang="ts">
// import { useLoadingStore } from '~/store/loading.js'
// import { storeToRefs } from 'pinia'
// const { loading,enableLoading } = storeToRefs(useLoadingStore())
</script>