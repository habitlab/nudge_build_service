
let fs = require('fs')
//var file_iterator = 0
//then once this all works, convert to webservice
 
let to_install = []

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

router.post('/', async function(ctx, next) {
  // ctx.router available
  //ctx.type = 'json'
    //file_iterator++
    let file_iterator = Math.floor(Math.random() * 99999999)
    let name = 'file_' + file_iterator
    let params = ctx.request.body
    console.log(ctx.request.body)
    fs.writeFileSync('./src/interventions/' + name + '-source.js', params.js, 'utf8')

    // check for required components and install them if not installed. yarn api will do this
    // https://github.com/jonschlinkert/yarn-api
 
    let list_requires_multi = require('list_requires_multi')
    requiredPackages = list_requires_multi(params.js)
    const isInstalled = require('is-installed')
    
    console.log(requiredPackages.require)
    const npmExists = isInstalled.sync('npm')
    console.log(npmExists)

    for (package of requiredPackages['require']) {
        console.log('is ' + package + ' installed?' + isInstalled.sync(package))
        console.log('does ' + package + ' exist: ' + fs.existsSync('./src_gen/' + package + '.js'))
        if(!isInstalled.sync(package) && !fs.existsSync('./src_gen/' + package + '.js')) {
            console.log('installing ' + package)
            console.log('\n')
            to_install.push(package)
         
         //yarn(['add', package], function(err) {
         //       if (err) throw err;
         //   });
        }
        else {
            console.log('yes')
        }
    }

    while (to_install.length > 0) {
        await sleep(100);
    }
    //if(to_install.length > 0) {
    //    await install()
    //}

    // webpack
    const webpack = require('webpack');
    require('livescript')
    let deepcopy = require('deepcopy')
    let webpack_config = deepcopy(require('./webpack_config_frontend.ls'))

    const path = require('path')
    webpack_config.entry = ['./src/interventions/' + name + '-source.js']
    webpack_config.output = {
        path: path.resolve(__dirname, "./src/interventions"),
        filename: name + ".js"
    }

    let compiler = webpack(webpack_config)
    let stats = await new Promise(function(resolve, reject) {
      compiler.run(function(err, stats2) {
        if (err) {
          reject(err)
        } else {
          resolve(stats2)
        }
      })
    })
    console.log('stats are')
    console.log(stats)
    console.log('finished packing')
    generated = fs.readFileSync('./src/interventions/' + name + '.js', 'utf8')
    //ctx.body = JSON.stringify(params.js)
    fs.unlinkSync('./src/interventions/' + name + '.js')
    fs.unlinkSync('./src/interventions/' + name + '-source.js')
    ctx.body = generated
    //ctx.body = JSON.stringify({response: 'ok'})
/*
    compiler.run((err, stats) => {
        // ...
        console.log('errros')
        console.log(err)
        console.log('stats')
        console.log(stats)
        // file has been generated

    

    });
*/


    // output should be identical to dist/interventions/generic/show_timer_banner/frontend.js


});

app
  .use(router.routes())
  .use(router.allowedMethods());

async function sleep(time) {
  return new Promise(function(callback) {
    setTimeout(callback, time);
  })
};

(async function() {
    while (true) {
        await install();
        await sleep(100);
    }
})();

if (!module.parent) app.listen(47914);



async function install() {
    var yarn = require('yarn-api');
    while(to_install.length > 0) {
        await new Promise(function(resolve, reject) {
            yarn(['add', to_install.shift()], function(err) {
                resolve()
            })
        })
    }
}
