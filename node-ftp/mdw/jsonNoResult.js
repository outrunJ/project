module.exports = async(ctx, next)=> {
  if (ctx.body == undefined) {
    ctx.body = {
      code: '0001',
      msg: 'no results'
    }
  }
  await next()
}