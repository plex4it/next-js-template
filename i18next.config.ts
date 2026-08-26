const config = {
  locales: ['en', 'pt'],
  extract: {
    input: ['app/**/*', 'components/**/*'],
    output: './lib/i18n/locales/{{language}}/{{namespace}}.json',
  },
};
export default config;
