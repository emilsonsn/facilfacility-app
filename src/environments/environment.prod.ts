declare const require: any;

export const environment = {
  production: false,
  appName: 'Facil Facility App',
  home: '/painel',
  api: 'https://facilfacility.com:3001/api',
  // api: 'http://127.0.0.1:8000/api',
  version: require('../../package.json').version
};
