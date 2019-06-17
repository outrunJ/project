module.exports = async(ctx, next) => {
  if (ctx.body != undefined) {
    ctx.body = {
      code: '0000',
      data: ctx.body,
    }
  }
  await next()
}