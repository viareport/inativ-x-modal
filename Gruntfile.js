
'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: {
      dist: ['dist'],
    },

    wctranspile: {
      components: {
        src: ['src/vr-overlay.html', 'src/vr-dialog.html'],
        css: 'dist/vr-components.css',
        js:  'dist/vr-components.js'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    connect: {
      demo: {
        options: {
          port: 8020,
          base: '.',
          hostname: '*',
          keepalive: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wctranspile');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['clean', 'wctranspile', 'connect']);

};
