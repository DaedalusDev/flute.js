// Karma configuration
// Generated on Fri Dec 30 2016 11:44:23 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	  
	  // lib
	  'lib/o2.custom.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
	  // src
	  'src/jqueryAddons.js',
      'src/**/*.js',
      // Specs
      'tests/fixture/**/*.js',
      'tests/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
	  'src/**/*.js' : ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots','coverage'],
	
	coverageReporter : {
		reporters : [
			{
				type : 'html',
				dir : 'coverage/'
			},
			{
				type : 'clover',
				dir : 'clover/'
			},
		]
	},

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
