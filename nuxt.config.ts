// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config"
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    // '@prisma/nuxt',
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error because vuetify said so
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  experimental: {
    componentIslands: true,
  },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: { transpile: ['vuetify'] },
  vite: { 
    define: { 'process.env.DEBUG': false },
    vue: {
      template: {
        transformAssetUrls: true,
      }
    },
    // resolve: {
    //   alias: {
    //     '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js'
    //   }
    // }
  },
})