import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import materialTheme from '@/themes/material-theme.json'

// Optional: customize theme, defaults, etc.
const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
  theme: {
    defaultTheme: 'lightHighContrast',
    themes: {
      appDefault: {
        colors: {
          primary: '#436833',
          'surface-tint': '#436833',
          'on-primary': '#ffffff',
          'primary-container': '#c4efac',
          'on-primary-container': '#2c4f1d',
          secondary: '#55624c',
          'on-secondary': '#ffffff',
          'secondary-container': '#d8e7cb',
          'on-secondary-container': '#3d4b36',
          tertiary: '#386667',
          'on-tertiary': '#ffffff',
          'tertiary-container': '#bbeaec',
          'on-tertiary-container': '#1e4e4f',
          error: '#ba1a1a',
          'on-error': '#ffffff',
          'error-container': '#ffdad6',
          'on-error-container': '#93000a',
          background: '#f8faf0',
          'on-background': '#191d17',
          surface: '#f8faf0',
          'on-surface': '#191d17',
          'surface-variant': '#dfe4d7',
          'on-surface-variant': '#43483f',
          outline: '#73796e',
          'outline-variant': '#c3c8bb',
          shadow: '#000000',
          scrim: '#000000',
          'inverse-surface': '#2e312b',
          'inverse-on-surface': '#eff2e8',
          'inverse-primary': '#a8d292',
          'primary-fixed': '#c4efac',
          'on-primary-fixed': '#052100',
          'primary-fixed-dim': '#a8d292',
          'on-primary-fixed-variant': '#2c4f1d',
          'secondary-fixed': '#d8e7cb',
          'on-secondary-fixed': '#131f0d',
          'secondary-fixed-dim': '#bccbb0',
          'on-secondary-fixed-variant': '#3d4b36',
          'tertiary-fixed': '#bbeaec',
          'on-tertiary-fixed': '#002021',
          'tertiary-fixed-dim': '#a0cfd0',
          'on-tertiary-fixed-variant': '#1e4e4f',
          'surface-dim': '#d8dbd1',
          'surface-bright': '#f8faf0',
          'surface-container-lowest': '#ffffff',
          'surface-container-low': '#f2f5ea',
          'surface-container': '#ede9e5',
          'surface-container-high': '#e7e9df',
          'surface-container-highest': '#e1e4d9',
        }
      },
      light: {
        colors: normalize( materialTheme.schemes.light )
      },
      lightHighContrast: {
        dark: false,
        colors: normalize( materialTheme.schemes['light-high-contrast'] )
      },
      dark: {
        colors: normalize( materialTheme.schemes.dark )
      },
      darkHighContrast: {
        colors: normalize( materialTheme.schemes['dark-high-contrast'])
      }
    }
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify)
})

function normalize(obj: Record<string, string>) {
  const result: Record<string,string> = {}
  for (const [k, v] of Object.entries(obj)) {
    result[k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())] = v
  }
  return result
}