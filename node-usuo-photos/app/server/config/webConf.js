/**
 * Created by outrun on 2/26/16.
 */

var MONGOOSE_DB_NAME = 'usuoPhoto',
  MONGO_PORT = 27017;

module.exports = {
  MONGO_URL: 'mongodb://localhost/' + MONGOOSE_DB_NAME,
  PORT: 8100,
  CLIENT_DIR: '/app/pub',
  VIEW_DIR: '/app/view',
  ICO_DIR: '/app/pub/bluemoon/img/favicon.ico',
  API_ROOT: '/api',
  VIEW_ROOT: '/view',
  HOST: 'http://localhost',
  urls: {
    login: '/bluemoon/login.html'
  }
};