module.exports = function (grunt) {

    var 

        buildTasks = [
                'sass:compile',
                //'less:compile',
                'csscomb:build'
            ],

        watchTasks = [
                'less:compile'
            ],

        config = {
            package: grunt.file.readJSON('package.json'),

            connect: {
                server: {
                    options: {
                        port: 8080,
                        base: './',
                        keepalive: true
                    }
                }
            },

            watch: {
                tasks: watchTasks
            },

            less: {
              compile: {
                options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'app.css.map',
                  sourceMapFilename: 'build/css/app.css.map'
                },
                files: {
                  'build/css/app.css': 'less/app.less'
                }
              }
            },

            sass: {                 
              compile: {                         
                options: {    
                  sourcemap: true
                },
                files: {
                  'build/css/app.css': 'sass/app.scss'
                }
              }
            },

            csscomb: {
              options: {
                config: 'less/.csscomb.json'
              },
              build: {
                files: {
                  'build/css/app.css': 'build/css/app.css'
                }
              }
            },

            minify: {
              options: {
                cleancss: true,
                report: 'min'
              },
              files: {
                'build/css/app.min.css': 'build/css/app.css'
              }
            }
        };

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.initConfig(config);

    grunt.registerTask('build', buildTasks);

}