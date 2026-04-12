// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app/',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/supabase'],
  css: ['~/assets/css/main.css'],
  image: {
    format: ['webp'],
    domains: ['osbdzlmfqrmubnkbkasf.supabase.co']
  },
  supabase: {
    redirect: false // Usually good to disable redirect for a simple portfolio
  }
})
