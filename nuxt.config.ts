import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const packageJson = require('./package.json')
const lastArg = process.argv[process.argv.length - 1]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/styles/variables.scss', '@/assets/styles/reset.scss'],
  runtimeConfig: {
    public: {
      version: packageJson.version,
      isDemo: lastArg === '--demo',
    },
  },
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(
              __dirname,
              './node_modules/svgedit/dist/editor/images/*.svg'
            ),
            dest: path.resolve(__dirname, './public/images'),
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/mixins.scss";',
        },
      },
    },
  },
})
