/**
 * Created by jack on 10.07.2014.
 */
module.exports = function (grunt) {



    grunt.initConfig({
        nodewebkit: {
            options: {
                platforms: ['win'],
                buildDir: 'builds', // Where the build version of my node-webkit app is saved
                version: "0.10.2"
            },
            src: ['./src/**/*'] // Your node-webkit app

        },
    })

    grunt.loadNpmTasks('grunt-node-webkit-builder');
};