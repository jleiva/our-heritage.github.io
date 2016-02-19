'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}','sass/partials/**/*.{scss,sass}'],
                tasks: ['sass:dist', 'postcss']
            },
            js: {
                files: ['js/src/**/*.js'],
                tasks: ['concat', 'uglify:dev']
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
                require('autoprefixer')({browsers: ['last 3 version']})
              ]
            },
            dist: {
              src: 'css/*.css'
            }
        },

        concat: {
          options: {
            stripBanners: true,
            separator: ';\n',
          },
          dist: {
            src: ['js/src/jquery-2.1.4.js','js/src/enquire.js', 'js/src/imageMapResizer.min.js', 'js/src/jquery.waypoints.js', 'js/src/jquery.touchSwipe.js'],
            dest: 'js/build/vendors.js',
          },
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
              'js/main.min.js': ['js/src/main.js'],
              'js/vendors.min.js': ['js/build/vendors.js']
            }
          },
          prod: {
            options: {
              mangle: true,
              sourceMap: true,
              compress: true
            },
            files: {
              'js/main.min.js': ['js/src/main.js'],
              'js/vendors.min.js': ['js/build/vendors.js']
            }
          }
        }
    });

    grunt.registerTask('default', [
      'sass:dist', 
      'watch', 
      'concat', 
      'uglify:dev'
    ]);

    grunt.registerTask('prod', [
      'sass:prod', 
      'concat',
      'postcss',
      'uglify:prod'
      ]);
};