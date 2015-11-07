'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}', 'sass/partials/**/*.{scss,sass}'],
                tasks: ['sass:dist', 'postcss']
            },
            js: {
                files: ['js/src/**/*.js', 'bower_components/**/*.js'],
                tasks: ['bower_concat', 'uglify:dev']
            }
        },

        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'nested'
            },
            dist: {
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            },
            prod: {
                options: {
                  outputStyle: 'compressed'
                },
                files: {
                    'css/styles.css': 'sass/styles.scss'
                }
            }
        },

        postcss: {
            options: {
              map: true,
              processors: [
                require('autoprefixer')({browsers: 'last 3 versions'})
              ]
            },
            dist: {
              src: 'css/*.css'
            }
        },

        bower_concat: {
          vendors: {
            dest: 'js/src/vendors.js'
          }
        },

        uglify: {
          dev: {
            options: {
              mangle: false,
              compress: false,
              preserveComments: 'all',
              beautify: true
            },
            files: {
              'js/vendors.min.js': ['js/src/vendors.js'],
              'js/main.min.js': ['js/src/main.js']
            }
          },
          prod: {
            options: {
              mangle: true,
              sourceMap: true,
              compress: true
            },
            files: {
              'js/main.min.js': ['js/src/main.js']
            }
          }
        }
    });

    grunt.registerTask('default', ['bower_concat','uglify:dev', 'sass:dist', 'watch']);
    grunt.registerTask('prod', ['sass:prod', 'uglify:prod', 'postcss']);
};