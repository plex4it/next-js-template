import type { I18nConfig } from 'next-i18next/proxy';

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'pt'],
  fallbackLng: 'en',
  ns: ['common', 'users', 'roles', 'home', 'fields', 'validation', 'errors', 'session'],
  defaultNS: 'common',
  localeInPath: false,
  resourceLoader: (language, namespace) =>
    import(`./lib/i18n/locales/${language}/${namespace}.json`),
};

export default i18nConfig;
