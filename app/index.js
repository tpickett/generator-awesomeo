'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var AwesomeoGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
    this.awesomeo = {
      name: "",
      angular:{},
      express:{
        extra:[]
      }
    };
  },

  greeting: function(){
    var done = this.async();
    // Have Yeoman greet the user.
    // this.log(yosay(' A.W.E.S.O.M.-O, I thought you were programmed to do whatever I tell you. Yeah, that\'s pretty good. Get it up there good and deep.'));
    this.log('\r\n\':                                          \r\n'
+'                                          \',                                          \r\n'
+'                                          #                                           \r\n'
+'                                         ``                                           \r\n'
+'                                         +                                            \r\n'
+'                                   .`,`+#                                             \r\n'
+'                                  `#+`                                                \r\n'
+'                                  +\'+,                                                \r\n'
+'                         ``` ;    :\'+:                                                \r\n'
+'                        ,+++#     ,#+.                                                \r\n'
+'                    ;   ``.``  `  ;##:                                                \r\n'
+'                 ,,,+          `  +``+                                                \r\n'
+'                 #;;;;;;;;;;;;;;;;;;;;;;;\'\'\'\'\'\'\'\'\'\'+++++#############@                \r\n'
+'                 #;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:,,;;::;;;;;#                \r\n'
+'                 #;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\'\'\'\',,;:,,;;;;;#                \r\n'
+'             #;;;+;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\'\'\'\',,::,,;;;;;+                \r\n'
+'             +...+;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\'\'\';,,:,,,;;;;;;                \r\n'
+'             +...\';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:;;;;;\,                \r\n'
+'             +..,;;;;;;;;;;;;;;;;;;#@@@#;;;;;;\'@@@+;;;;;;;;;;;;;;;;;;`                \r\n'
+'             +..,;;;;;;;;;;;;;;;;+@@@@@@@;;;;@@@@@@@\';;;;;;;;;;;;;;;;                 \r\n'
+'             +..,;;;;;;;;;;;;;;;+@@@@@@@@@;;#@@@@@@@@+;;;;;;;;;;;;;;;                 \r\n'
+'             ####;;;;;;;;;;;;;;;@@@@@@@@@@+\'@@@@@@@@@@;;;;;;;;;;;;;;\'                 \r\n'
+'                ,;;;;;;;;;;;;;;@@@@@@@@@@@@@@@@@@@@@@@@;;;;;;;;;;;;;\'                 \r\n'
+'                :;;;;;;;;;;;;;;@@@@@@@@@@@@@@@@@@@@@@@@\';;;;;;;;;;;;\'                 \r\n'
+'                #;;;;;;;;;;;;;+@@@@@@@@@@@@@@@@@@@@@@@@@;;;;;;;;;;;;\',,#              \r\n'
+'                #;;;;;;;;;;;;;;@@@@@@@@@@@;;@@@@@@@@@@@+;;;;;;;;;;;;\',.\'              \r\n'
+'                #;;;;;;;;;;;;;;@@@@@@@@@@\';;;@@@@@@@@@@;;;;;;;;;;;;;\',@@#`            \r\n'
+'                #;;;;;;;;;;;;;;;@@@@@@@@#;;;;+@@@@@@@@#;;;;;;;;;;;;;\'.;;#+            \r\n'
+'                +;;;;;;;;;;;;;;;\'@@@@@@+;;;;;;+@@@@@@#;;;;;;;;;;;;;;\'..:@#;           \r\n'
+'                \';;;;;;;;;;;;;;;;;+##\';;;;;;;;;;+###;;;;;;;;;;;;;;;;\'..`@@+           \r\n'
+'                \';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\'..`..@           \r\n'
+'                ;;;;;;;;;;;;;;;;;;;;;;;;;+##\';;;;;;;;;;;;;;;;;;;;;;;\'..` \'#`          \r\n'
+'                ;;;;;;;;;;;;;;;;;;;;;;;\'@@@@#@;;;;;;;;;;;;;;;;;;;;;;;..`@@@           \r\n'
+'                ;;;;;;;;;;;;;;;;;;;;;;@\'@@@@#@#+;;;;;;;;;;;;;;;;;;;;;;;`@@#           \r\n'
+'                ;;;;;;;;;;;;;;;;;;;;;;@\'@@@@+@#@;;;;;;;;;;;;;;;;;;;;;   +;@           \r\n'
+'               `;;;;;;;;;;;;;;;;;;;;;;;\'#\'+#;#\'\';;;;;;;;;;;;;;;;;;;;;`   `#           \r\n'
+'               .;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;.  @:+           \r\n'
+'               ,####+++++++++\'\'\'\';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;.  ,  :          \r\n'
+'         .\',@+++++++#########@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#;\'\'\'\'.  ++#,\'         \r\n'
+'\r\n'
+'\r\n');

this.log('\r\n'+
'#  ██╗     █████╗███╗   ███╗     █████╗  ██╗    ██╗ ███████╗ ███████╗  ██████╗  ███╗   ███╗     ██████╗  \r\n'+
'#  ██║    ██╔══██████╗ ████║    ██╔══██╗ ██║    ██║ ██╔════╝ ██╔════╝ ██╔═══██╗ ████╗ ████║    ██╔═══██╗ \r\n'+
'#  ██║    █████████╔████╔██║    ███████║ ██║ █╗ ██║ █████╗   ███████╗ ██║   ██║ ██╔████╔█████████║   ██║ \r\n'+
'#  ██║    ██╔══████║╚██╔╝██║    ██╔══██║ ██║███╗██║ ██╔══╝   ╚════██║ ██║   ██║ ██║╚██╔╝██╚════██║   ██║ \r\n'+
'#  ██║    ██║  ████║ ╚═╝ ██║    ██║  ████╚███╔███╔████████████████████╚██████╔████║ ╚═╝ ██║    ╚██████╔╝ \r\n'+
'#  ╚═╝    ╚═╝  ╚═╚═╝     ╚═╝    ╚═╝  ╚═╚═╝╚══╝╚══╝╚═╚══════╚═╚══════╚═╝╚═════╝╚═╚═╝     ╚═╝     ╚═════╝  \r\n'+
'#');
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Name of your application:',
      default: this.appname //default to current folder
    }];

    this.prompt(prompts, function (props) {
      this.awesomeo.name = props.name;
      done();
    }.bind(this));
  },

  angularPrompts: function(){
    var done = this.async();
    var prompts = [{
      type: 'confirm',
      name: 'angularInstall',
      message: 'Would you like to install AngularJs?',
      default: true
    }];
    this.prompt(prompts, function (props) {
      if (props.angularInstall == true){
        this.awesomeo.angular.install = true;
      }else{
        this.awesomeo.angular.install = false;
      };
      done();
    }.bind(this));
  },

  expressPrompts: function(){
    var done = this.async();
    var prompts = [{
      type: 'confirm',
      name: 'expressInstall',
      message: 'Would you like to install Express Webserver for your application?',
      default: true
    },
    {
      when: function(resp){
        return resp.expressInstall;
      },
      type: 'checkbox',
      name: 'expressExtrasInstall',
      message: 'Please choose some awesome sauce to go along with Express if you\'d like...',
      choices:[{
        name: 'socketio',
        value: 'includeSocket',
        checked: true
      },{
        name: 'Redis',
        value: 'includeRedis',
        checked: false
      },{
        name: 'Mongoose',
        value: 'includeMongoose',
        checked: true
      },{
        name: 'Winston',
        value: 'includeWinston',
        checked: true
      },{
        name: 'Passport',
        value: 'includePassport',
        checked: true
      }]
    }];
    this.prompt(prompts, function (props) {
      this.awesomeo.express.install = props.expressInstall;
      for (var i = 0; i < props.expressExtrasInstall.length; i++) {
        this.awesomeo.express.extra[props.expressExtrasInstall[i]] = true;
      };
      done();
    }.bind(this));
  },

  // expressExtrasPrompts: function(){
  //     var done = this.async();
  //     var prompts = [{
  //       when: function(resp){
  //         if(self.awesomeo.express.install == true){
  //           return true;
  //         };
  //       },
  //       type: 'checkbox',
  //       name: 'expressExtrasInstall',
  //       message: 'Please choose some awesome sauce to go along with Express if you\'d like...',
  //       choices:[{
  //         name: 'socketio',
  //         value: 'includeSocket',
  //         checked: true
  //       },{
  //         name: 'Redis',
  //         value: 'includeRedis',
  //         checked: false
  //       },{
  //         name: 'Mongoose',
  //         value: 'includeMongoose',
  //         checked: false
  //       },{
  //         name: 'Winston',
  //         value: 'includeWinston',
  //         checked: true
  //       },{
  //         name: 'Passport',
  //         value: 'includePassport',
  //         checked: true
  //       }]
  //     }];
  //     this.prompt(prompts, function (props) {

  //       for (var i = 0; i < props.expressExtrasInstall.length; i++) {
  //         this.awesomeo.express.extra[props.expressExtrasInstall[i]] = true;
  //       };

  //       done();
  //     }.bind(this));
  // },

  // passportPrompts: function(){
  //   var done = this.async();
  //   var prompts = [{
  //     when: function(resp){
  //       for (var i = 0; i < resp.expressExtrasInstall.length; i++) {
  //         if(resp.expressExtrasInstall[i] == 'includePassport'){
  //           return true;
  //         };
  //       };
  //     },
  //     type: 'checkbox',
  //     name: 'passportAuthInstall',
  //     message: 'Passport.js: Gatekeepers to you application...',
  //     choices:[{
  //       name: 'local',
  //       value: 'includeLocal',
  //       checked: true
  //     },{
  //       name: 'Google',
  //       value: 'includeGoogle',
  //       checked: false
  //     },{
  //       name: 'Facebook',
  //       value: 'includeFacebook',
  //       checked: false
  //     },{
  //       name: 'Twitter',
  //       value: 'includeTwitter',
  //       checked: false
  //     }]
  //   }];
  //   this.prompt(prompts, function (props) {
  //     this.name = props.name;
  //     done();
  //   }.bind(this));
  // },

  // bbqPrompts: function(){
  //   var done = this.async();
  //   var prompts = [{
  //       when: function(resp){
  //         return resp.Redis;
  //       },
  //       type: 'confirm',
  //       name: 'bbqInstall',
  //       message: 'Would you like Task Based Queueing based on Barbeque?',
  //       default: true
  //     }];
  //     this.prompt(prompts, function (props) {
  //       this.name = props.name;
  //       done();
  //     }.bind(this));
  // },

  angular: function () {
    if (this.awesomeo.angular.install == true) {
      /*
      * Angular boilerplate
      */
      this.mkdir('app');
      this.mkdir('app/assets');
      this.mkdir('app/config');
      this.mkdir('app/states');
      this.mkdir('app/styles');
      this.mkdir('app/views');
      this.mkdir('test');
      this.copy('test/_protractor-e2e.conf.js', 'test/protractor-e2e.conf.js');
      this.copy('test/client/e2e/_test.js', 'test/client/e2e/test.js');
      this.copy('app/_app.js', 'app/app.js');
      this.copy('app/assets/less/_base.less', 'app/assets/less/base.less');
      this.copy('app/assets/less/theme/_flattly.less', 'app/assets/less/theme/flattly.less');
      this.copy('app/assets/less/partials/_product.less', 'app/assets/less/partials/product.less');
      this.copy('app/assets/images/AWESOM_O.png', 'app/assets/images/AWESOM_O.png');
    };
  },

  express: function () {
    if (this.awesomeo.express.install == true) {
      /*
      * Express boilerplate
      */
      this.mkdir('server');
      this.mkdir('server/config');
      this.mkdir('server/config/env');
      this.mkdir('server/lib')
      this.mkdir('server/models');
      this.mkdir('server/controllers');
      this.mkdir('server/views');
      this.copy('server/_server.js', 'server/server.js');
      this.copy('server/config/_config.js', 'server/config/config.js');
      this.copy('server/config/_express.js', 'server/config/express.js');
      this.copy('server/config/env/_all.js', 'server/config/env/all.js');
      this.copy('server/config/env/_development.js', 'server/config/env/development.js');
      this.copy('server/config/env/_production.js', 'server/config/env/production.js');
      this.copy('server/lib/_routes.js', 'server/lib/routes.js');  
      this.copy('server/controllers/_base.js', 'server/controllers/base.js');
      this.copy('server/views/_index.html', 'server/views/index.html');
    };
  },

  socketio: function(){
    /*
    * Socket.io Websockets boilerplate
    */
    if (this.awesomeo.express.extra['includeSocket'] == true ){
      this.mkdir('server/sockets');
      this.copy('server/lib/_sockets.js', 'server/lib/sockets.js');
    };
  },

  passport: function () {
    /*
    * Passport Logging boilerplate
    */
    if (this.awesomeo.express.extra['includePassport'] == true){
      this.copy('server/config/_passport.js', 'server/config/passport.js');
      this.copy('server/controllers/_auth.js', 'server/controllers/auth.js');
      this.copy('server/models/_user.js', 'server/models/user.js');
    };
  },

  redis: function () {
    /*
    * Redis boilerplate
    */
    if (this.awesomeo.express.extra['includeRedis'] == true){};
  },

  // bbq: function(){},

  awesomeo: function () {
    /*
    * Application boilerplate (runs no matter what options are chosen...)
    */
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_sublime-project', this.awesomeo.name+'.sublime-project');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_Dockerfile', 'Dockerfile');
    this.copy('_README', 'README.md');
  }
});

module.exports = AwesomeoGenerator;
