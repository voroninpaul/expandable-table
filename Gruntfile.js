/* jshint globalstrict: false */

module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
                    './src/module.js',
                    './src/*.js'
                ],
                dest: './build/expandable-table.js'
            },
            vendor:{
                src: [
                    './vendor/angular/angular.js',
                    './vendor/lodash/dist/lodash.js'
                ],
                dest: './build/expandable-table-vendor.js'
            }
        },
        html2js: {
            options: {
                base: '',
                module: 'expandableTable.templates'
            },
            app: {
                src: ['./src/**/*.html'],
                dest: './build/templates.js'
            }
        },
        watch: {
            frontend: {
                files: [
                    './src/*.js'
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
