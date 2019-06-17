let appDirName = 'app'

var opt = {
  resDir: '/ftp',
  rejectDirNames: ['app'],
  appDirName: appDirName,
  appDir: `/ftp/${appDirName}`,
  host: '45.55.222.5:3000',
  version: {
    app: 2.0
  }
}
module.exports = opt
