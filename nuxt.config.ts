// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    // 不配置isr、swr，默认前端每次请求，都是走后端接口进行获取最新数据
    '/': { isr: 60,swr:60 },
  },
  modules: [
    '@element-plus/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],
  site:{
    url: 'https://example.com',
    name: 'My Awesome Website'
  },
  elementPlus:{
    icon:"ElIcon"
  },
  i18n:{
    defaultLocale: 'cn',
    baseUrl: 'http://airsat.aseann.net',
    locales: [
      {
        code: 'cn',
        name: '中文',
        file: 'cn.json',
        language:'zh-CN'
      },
      {
        code: 'vn',
        name: '越南语',
        file: 'vn.json',
        language:'vi-VN'
      },
      {
        code: 'en',
        name: 'EN',
        file: 'en.json',
        language: 'en-US'
      }
    ],
  },
  /**
   * @/assets/styles/index.scss
   * @use引入的sass变量，只在局部有作用
   * @use引入的css变量，在全局有作用
   */
  // 更新4.3.1版本后，无法使用包名进行引用，不过目前官方已修复了
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