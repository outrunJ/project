var acsLevels = {
  guest: 0,
  rememberMe: 1,
  auth: 2

};
var acsConf = module.exports = acsConf || {
    // with the highest priority
    mappings: {
      '/view/login': acsLevels.guest,
    },
    // the least important
    prefixesGroups: {
      '/view': acsLevels.auth,
    }
  };
acsConf.levels = acsLevels;

