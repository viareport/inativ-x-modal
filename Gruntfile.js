
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      dist: ['dist'],
    },

    wctranspile: {
      components: {
        src: ['src/*.html'],
        css: 'dist/vr-components.css',
        js:  'dist/vr-components.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    watch: {
      source: {
        files: ['src/*.html'],
        tasks: ['clean', 'wctranspile']
      }
    },

    connect: {
      demo: {
        options: {
          port: 8020,
          base: '.',
          hostname: '*'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wctranspile');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['clean', 'wctranspile', 'connect', 'watch']);

  grunt.registerTask('test', ['clean', 'wctranspile', 'karma']);

};
