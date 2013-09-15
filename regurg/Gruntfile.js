module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint', 'browserify:regurg'],
        options: { spawn: false, },
      },
    },
    browserify: {
      libs: {
        options: {
          shim: {
            jquery: {
              path: './libs/jquery.js',
              exports: '$'
            },
            underscore: {
              path: './libs/underscore.js',
              exports: '_'
            },
            d3: {
              path: './libs/d3.v3.min.js',
              exports: 'd3'
            },
            topojson: {
              path: './libs/topojson.min.js',
              exports: 'topojson'
            }
          }
        },
        src: ['./libs/*.js'],
        dest: 'deploy/libs.js'
      },
      regurg: {
        options: {
          alias: [
            './libs/jquery.js:jquery',
            './libs/underscore.js:underscore',
            './libs/d3.v3.min.js:d3',
            './libs/topojson.min.js:topojson',
          ],
          external: [
            './libs/jquery.js',
            './libs/underscore.js',
            './libs/d3.v3.min.js',
            './libs/topojson.min.js'
          ]
        },
        src: ['js/main.js'],
        dest: 'deploy/main.js'
      }
    },
    jshint: {
      all: ['js/**/*.js'],
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['browserify:regurg']);

};
