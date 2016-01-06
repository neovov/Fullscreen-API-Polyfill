/*global module:false*/
module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			dist: {
				options: {
					curly:   true,
					eqeqeq:  true,
					immed:   true,
					latedef: true,
					newcap:  true,
					noarg:   true,
					sub:     true,
					undef:   true,
					boss:    true,
					eqnull:  true,
					browser: true
				},
				src: ["fullscreen-api-polyfill.js"]
			}
		},
		uglify: {
			dist: {
				files: {
					"fullscreen-api-polyfill.min.js": ["fullscreen-api-polyfill.js"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask("default", ["jshint", "uglify"]);
};