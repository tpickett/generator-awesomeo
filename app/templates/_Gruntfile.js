'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically, when needed
   require('load-grunt-config')(grunt, {
    jitGrunt: {
      express: 'grunt-express-server',
      useminPrepare: 'grunt-usemin',
      ngtemplates: 'grunt-angular-templates',
      cdnify: 'grunt-google-cdn',
      protractor: 'grunt-protractor-runner',
      injector: 'grunt-asset-injector'
    }
   });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      server: 'server',
      test: 'test'
    },
    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev: {
        options: {
          script: 'server/server.js',
          debug: true,
          livereload: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/server.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      js: {
        files:[
          '<%= yeoman.app%>/states/**/*.js'
        ],
        tasks: ['jshint'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      less: {
        files:[
          '<%= yeoman.app %>/assets/less/**/*.less'
        ],
        tasks: ['less'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      html: {
        files:[
          '<%= yeoman.app%>/{views, states}/**/*.html'
        ],
        tasks: [],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      express: {
        files: [
          'server/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= yeoman.app%>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [ '{server, app}/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      server: '.tmp',
      dist: '<%= yeoman.dist %>'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 3000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },
    wiredep: {
      target: {
        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: '<%= yeoman.server %>/views/index.html',
        // Optional:
        // ---------
        // cwd: '/',
        // dependencies: true,
        // devDependencies: false,
        // exclude: [/bootstrap-sass-official/, /bootstrap.js/, /bootstrap.css/, /font-awesome.css/]
        // fileTypes: {},
        ignorePath: '<%= yeoman.app %>/',
        // overrides: {}
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/public/js/{,*/}*.js',
            '<%= yeoman.dist %>/public/css/{,*/}*.css',
            '<%= yeoman.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/public/assets/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.server%>/views/index.html'],
      options: {
        dest: '<%= yeoman.dist %>/public'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/public/css/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/public/js/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>/public',
          '<%= yeoman.dist %>/public/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app%>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app%>/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: '<%= awesomeo.name %>',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'js/app.js'
      },
      main: {
        cwd: '<%= yeoman.app%>',
        src: ['{states}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{states}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app%>',
          dest: '<%= yeoman.dist %>/public/js',
          src: [
            '*.{ico,png,txt}',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp, png, jpg, jpeg}',
            'assets/fonts/**/*',
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/public/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= yeoman.dist %>',
          src: [
            'package.json',
            'server/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: './.tmp/css',
        dest: './app/styles',
        src: ['{app,components}/**/*.css']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'less',
        'copy:styles'
      ],
      test: [
        'less'
      ],
      dist: [
        'less',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    // karma: {
    //   unit: {
    //     configFile: 'karma.conf.js',
    //     singleRun: true
    //   }
    // },

    // mochaTest: {
    //   options: {
    //     reporter: 'spec'
    //   },
    //   src: ['server/**/*.spec.js']
    // },

    // protractor: {
    //   options: {
    //     configFile: 'protractor.conf.js'
    //   },
    //   chrome: {
    //     options: {
    //       args: {
    //         browser: 'chrome'
    //       }
    //     }
    //   }
    // },

    protractor_webdriver: {
      e2e: {
          options: {
              path: './node_modules/protractor/bin/',
              command: 'webdriver-manager start'
          }
      }
    },
    protractor: {  // grunt-protractor-runner
      options: {
        keepAlive: true,
        noColor: false
      },
      e2e: {
        configFile: '<%= yeoman.test%>/protractor-e2e.conf.js',
      }
    },
    less: {
      server: {
        options: {
          paths: ["<%= yeoman.app %>/assets/less"]
        },
        files: {
          '<%= yeoman.app%>/styles/main.css' : '<%= yeoman.app%>/assets/less/base.less'
        }
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.dist%>/server/views/index.html': [
              ['{.tmp,<%= yeoman.app%>}/{app,components}/**/*.js',
               '!{.tmp,<%= yeoman.app%>}/app.js',
               '!{.tmp,<%= yeoman.app%>}/states/**/*.spec.js',
              ]
            ]
        }
      },
      // Inject component less into app.less
      less: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('/app/assets/less/', '');
            filePath = filePath.replace('/app/states/', '');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= yeoman.app%>/assets/less/base.less': [
            '<%= yeoman.app%>/{app,states}/**/*.less',
            '!<%= yeoman.app%>/app/assets/less/base.less'
          ]
        }
      },
      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            filePath = filePath.replace('.tmp/', 'styles/');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= yeoman.server%>/views/index.html': [
            '<%= yeoman.app%>/{app,states,assets}/**/*.css'
          ]
        }
      }
    }
  });

// Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:prod', 'express:prod', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'wait',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'concurrent:dist',
    'copy:dist',
    'injector',
    'wiredep',
    'useminPrepare',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngmin',
    // 'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:server',
    'wiredep',
    'express:dev',
    'wait',
    'protractor_webdriver',
    'protractor'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};