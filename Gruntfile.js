module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        css: {
           src: [
                 'main/static/main/css/auth.css', 'main/static/main/css/lock_page.css',
                 'main/static/main/css/hint.css', 'main/static/main/css/main.css'
                ],
            dest: 'main/static/main/css/<%= pkg.name %>.css'
        },
        js : {
            src : [
                'main/static/main/js/core.js',
                'main/static/main/js/loading.js', 
            ],
            dest : 'main/static/main/js/<%= pkg.name %>_core.js'
        }
    },
   cssmin : {
        css:{
            src: 'main/static/main/css/<%= pkg.name %>.css',
            dest: 'main/static/main/css/<%= pkg.name %>.min.css'
        }
    },
   uglify : {
      js: {
          files: {
              'main/static/main/js/<%= pkg.name %>_core.min.js' : [ 'main/static/main/js/<%= pkg.name %>_core.js' ]
          }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', [ 'concat:css', 'cssmin:css', 'concat:js', 'uglify:js' ])
  // Default task(s).

};