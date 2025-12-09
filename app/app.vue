<template>
  <div>
<!--通过指定布局name，覆盖默认的default布局-->
<!--<NuxtLayout name="layout-one">-->
<!--<NuxtPage />-->
<!--</NuxtLayout>-->
<!--Loading组件导致控制台会有告警不用理会，生产不会有，也不影响功能正常使用,但是SEO会受影响-->
    <Loading :loading="loading" :enableLoading="enableLoading">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Loading>

  </div>
</template>
<script setup lang="ts">
import { useLoadingStore } from '~/store/loading.js'
import { storeToRefs } from 'pinia'
const { loading,enableLoading } = storeToRefs(useLoadingStore())
</script>