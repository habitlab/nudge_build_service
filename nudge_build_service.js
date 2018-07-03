
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
    console.log('writing js')
    fs.writeFileSync('./src/interventions/' + name + '-source.js', params.js, 'utf8')
    console.log('wrote js')
    // check for required components and install them if not installed. yarn api will do this
    // https://github.com/jonschlinkert/yarn-api
 
   
    //if(to_install.length > 0) {
    //    await install()
    //}

    // webpack
    const webpack = require('webpack');
    require('livescript')
    let deepcopy = require('deepcopy')
    let webpack_config = deepcopy(require('./webpack_config_frontend.ls'))

    const path = require('path')

    let list_requires_multi = require('list_requires_multi')
    requiredPackages = list_requires_multi(params.js)
    const isInstalled = require('is-installed')

    let intervention_info = {};
    intervention_info.styles = [];
    let required_styles = list_requires_multi(params.js, ['require_style'])
    for (style of required_styles['require_style']) {
        intervention_info.styles.push(style)
    }

    intervention_info.css_files = [];
    let required_css = list_requires_multi(params.js, ['require_css'])
    for (file of required_css['require_css']) {
        intervention_info.css_paths.push(css_paths)
    }
    
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

    webpack_config.entry = ['./src/interventions/' + name + '-source.js']
    webpack_config.output = {
        path: path.resolve(__dirname, "./src/interventions"),
        filename: name + ".js"
    }
    console.log('compiling js')
    compiler = webpack(webpack_config)
    stats = await new Promise(function(resolve, reject) {
      compiler.run(function(err, stats2) {
        if (err) {
          reject(err)
        } else {
          resolve(stats2)
        }
      })
    })
    //console.log('stats are')
    //console.log(stats)
    console.log('finished packing')
    intervention_info.generated = fs.readFileSync('./src/interventions/' + name + '.js', 'utf8')
    //ctx.body = JSON.stringify(params.js)

/*
    fs.unlinkSync('./src/interventions/' + name + '.js')
    fs.unlinkSync('./src/interventions/' + name + '-source.js')
    fs.unlinkSync('./src/interventions/' + name + '.jsx')
    fs.unlinkSync('./src/interventions/' + name + '-source.jsx')
*/


    ctx.body = intervention_info
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
