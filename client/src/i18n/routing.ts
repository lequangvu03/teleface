import { defineRouting } from 'next-intl/routing'
import { DEFAULT_LOCALE, LOCALES } from '~/constants/locales'

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE
})
