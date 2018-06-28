var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

let koaJsonp = require('koa-jsonp')
let koaBodyparser = require('koa-bodyparser')

app.use(koaJsonp())
//app.use(koa-logger())
app.use(koaBodyparser({jsonLimit: '20mb'}))

router.get('/', (ctx, next) => {
  // ctx.router available
  let params = ctx.request.query
  ctx.body = 'hello world. the parameters you sent are' + JSON.stringify(params)
});

router.post('/', (ctx, next) => {
  // ctx.router available
  //ctx.type = 'json'

  let params = ctx.request.body
  //ctx.body = JSON.stringify({response: 'this is a post request response. the parameters you sent are' + JSON.stringify(params)})
  ctx.body = 'lsakjdfkldsjaf'
});

app
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) app.listen(3000);
