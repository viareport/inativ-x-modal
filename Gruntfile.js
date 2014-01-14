module.exports = function(grunt) {

    grunt.initConfig({
        connect: {
            demo: {
                options:{
                    port: 3001,
                    keepalive: true,
                    hostname: '*'
                }
            }
        },
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
        },

        parallel: {
            demoWatch: {
                options: {
                    stream: true,
                    grunt: true
                },
                tasks: ['watchDemo', 'launchDemo']
            }
        }
    });

    grunt.loadNpmTasks('grunt-wctranspile');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-parallel');


    grunt.registerTask('launchDemo', function () {
        grunt.task.run('connect');
        grunt.log.writeln("----------");
        grunt.log.writeln(">>> demo ready, please visit http://localhost:3001/demo/");
        grunt.log.writeln("----------");
    });
    grunt.registerTask('build', ['wctranspile']);
    grunt.registerTask('watchDemo', ['build', 'watch']);
    grunt.registerTask('demo', 'parallel:demoWatch');
    grunt.registerTask('default', ['build', 'watch']);

};
