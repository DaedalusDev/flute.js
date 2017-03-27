module.exports = function(grunt) {
  var srcDir = [
    'src/jqueryAddons',
    'src/**/**.js'
  ];
  var testsDir = [
	'tests/**/*Spec.js'
  ];
  grunt.initConfig({

    //  Jasmine
    jasmine: {
      components: {
        src: srcDir,
        options: {
          vendor: [
			'lib/o2.custom.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
          ],
          specs: 'tests/**/*Spec.js',
          keepRunner : true
        }
      }
    },

    //  Concat
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: srcDir,
        // the location of the resulting JS file
        dest: 'dist/js/flute.js'
      }
    },

    //  Uglify
    uglify: {
      options: {
        // Use these options when debugging
        // mangle: false,
        // compress: false,
        // beautify: true
      },
      dist: {
        files: {
          'dist/js/flute.min.js': ['dist/js/flute.js']
        }
      }
    },
    //  Watch Files
    watch: {
      dev: {
        files: srcDir.concat(testsDir),
        tasks: ['tests'],
        options: {
          interrupt: false,
          spawn: false
        },
      }
    }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  // define the tasks
  grunt.registerTask(
    'release',[
      'concat:dist',
      'uglify:dist'
    ]
  );
  grunt.registerTask('dev', ["watch:dev"]);
  grunt.registerTask('tests', ['jasmine']);
};
