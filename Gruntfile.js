module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            components: {
                files: ['src/*.html'],
                tasks: ['wctranspile']
            }
        },

        wctranspile: {
            test: {
                src: ['src/*.html'],
                css: 'dist/stylesheets/webcomponents.css',
                js:  'dist/js/webcomponents.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-wctranspile');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['wctranspile']);
    grunt.registerTask('default', ['build', 'watch']);

};
