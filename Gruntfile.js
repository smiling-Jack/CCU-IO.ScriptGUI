/**
 * Created by jack on 10.07.2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-node-webkit-builder');

    // Project configuration.
    grunt.initConfig({
        nodewebkit: {
            options: {
                buildDir: './build',
                version: 'v0.10.2',
                winIco:  './src/img/icon/favicon.png',
                macIcns:  './src/img/icon/favicon.png',

            },
            src: './src/**/*'
        }
    });

    // Actually load this plugin's task(s)1
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['nodewebkit']);
};