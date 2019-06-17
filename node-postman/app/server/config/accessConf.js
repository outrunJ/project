var acsLevels = {
    guest: 0,
    rememberMe: 1,
    auth: 2

};
var acsConf = module.exports = acsConf || {
        // with the highest priority
        mappings: {
            '/member/': acsLevels.rememberMe
        },
        // the least important
        prefixesGroups:{
            '/member': acsLevels.rememberMe
        }
    };
acsConf.levels = acsLevels;

