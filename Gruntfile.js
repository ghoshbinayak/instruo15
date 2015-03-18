module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        css: {
           src: [
                 'main/static/main/css/lock-page.css', 'main/static/main/css/landing-page.css',
                 'main/static/main/css/main.css',
                 'main/static/main/css/auth.css', 'main/static/main/css/hint.css'
                ],
            dest: 'main/static/main/css/<%= pkg.name %>.css'
        },
        jscore : {
            src : [
                'main/static/main/js/core.js',
                'main/static/main/js/loading.js', 
            ],
            dest : 'main/static/main/js/<%= pkg.name %>_core.js'
        },
        jsmain : {
          src : [
            'main/static/main/js/sidebar.js',
            'main/static/main/js/landing.js',
            'main/static/main/js/main.js',
            'main/static/main/js/maps.js'
            ],
          dest : 'main/static/main/js/<%= pkg.name %>.js',
        }
    },
   cssmin : {
        css:{
            src: 'main/static/main/css/<%= pkg.name %>.css',
            dest: 'main/static/main/css/<%= pkg.name %>.min.css'
        }
    },
   uglify : {
      options: {
        compress: {
          drop_console: true
        }
      },
      js: {
          files: {
              'main/static/main/js/<%= pkg.name %>_core.min.js' : [ 'main/static/main/js/<%= pkg.name %>_core.js' ],
              'main/static/main/js/<%= pkg.name %>.min.js' : [ 'main/static/main/js/<%= pkg.name %>.js' ]              
          }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', [ 'concat:css', 'cssmin:css', 'concat:jscore', 'concat:jsmain', 'uglify:js'])
  // Default task(s).

};