// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  elementPlus:{
    icon:"ElIcon"
  },
  /**
   * @/assets/styles/index.scss
   * @use引入的sass变量，只在局部有作用
   * @use引入的css变量，在全局有作用
   */
  css:['@unocss/reset/tailwind.css',"@/assets/styles/index.scss"],
  build: {
    transpile: [],
  },
  vite:{
    css: {
      preprocessorOptions: {
        scss: {
          // 全局引入scss变量(全局都可使用其sass变量)
          additionalData: '@use "~/assets/styles/_variables.scss" as *;',
        },
      },
    }
  },
  app: {
    head: {
      title: '卫星',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'description',
          content: '卫星',
        },
        {
          name: 'keywords',
          content: '卫星, 科技, 地图, 航天',
        },
        {
          name: 'robots',
          content: 'index, follow',
        },
        {
          name: 'googlebot',
          content: 'index, follow',
        },
      ],
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
  },
  colorMode:{
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode',
  },
  devServer:{
    port: 3205,
  }
})