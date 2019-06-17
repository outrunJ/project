/**
 * Created by outrun on 10/28/15.
 */

module.exports = function (app) {
  app.use(require('./acFilter')());
  app.use(require('./accessFilter')());
};