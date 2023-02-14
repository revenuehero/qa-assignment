const config = {
  paths: ['tests/*.feature'],
  requireModule: ['@esbuild-kit/cjs-loader'],
  require: ['tests/**/*.ts'],
  format: ['summary', 'progress-bar', '@cucumber/pretty-formatter'],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};

export default config;
