/**
 * Created by jack on 10.07.2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-node-webkit-builder');

    grunt.registerTask('test', function ()  {
      console.log("hallo Welt")     ;
    });

    grunt.registerTask('build', function ()  {
        grunt.initConfig({
            nodewebkit: {
                options: {
                    platforms: ['win'],
                    buildDir: 'webkitbuilds', // Where the build version of my node-webkit app is saved
                },
                src: ['src'] // Your node-webkit app
            },
        })
    })
};