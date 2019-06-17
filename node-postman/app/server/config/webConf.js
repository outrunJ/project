/**
 * Created by outrun on 10/21/15.
 */
var env = process.env.NODE_ENV;
module.exports = {
    PORT: 8001,
    HOST: 'http://localhost',
    CLIENT_DIR: '/app/client',
    API_ROOT: '/api',
    ICO_DIR: '/app/client/assets/imgs/favicon.ico',
    CLIENT_TYPE: 'web',
    APP_ID: 'www2',
    VERSION: '1.0',
    urls: {
        login: '/#/login'
    },
    request: {
        INT_SERVICE_REQ_TIMEOUT: 8000 * 1000,
        accessFlag: new Date().getTime() //随机标签
    },
    mongodb: {
        port: 27017,
        url: env == 'prod' ? 'mongodb://mongodb-1/meow' : 'mongodb://localhost/meow',
        secret: ''
    },
    mysql: {
        url: env == 'prod' ? 'mysql-1' : 'localhost',
        user: env == 'prod' ? 'Lucia' : 'admin',
        pwd: env == 'prod' ? 'asdf' : 'asdf',
        port: 3306,
        name: 'meow'
    }
};
