/* jshint globalstrict: false */

module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
                    './src/*.js'
                ],
                dest: './build/directive.js'
            }
        },
        html2js: {
            options: {
                base: '',
                module: 'accordion.table.templates'
            },
            app: {
                src: ['./src/**/*.html'],
                dest: './build/templates.js'
            }
        },
        watch: {
            frontend: {
                files: [
                    'src/*.js'
                ],
                tasks: ['concat']
            },
            templates: {
                files: [
                    'src/**/*.html'
                ],
                tasks: ['html2js']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('test', ['karma']);

    grunt.registerTask('up', ['concat', 'html2js', 'watch']);
};
