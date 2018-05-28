module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            css: {
                files: ['sass/*.scss', '*.scss'],
                tasks: ['compass', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['includes/js/*.js', '!includes/js/*.min.js'],
                tasks: ['concat', 'uglify']
            }
        },
        compass: {
            bootstrap: {
                options: {
                    sourcemap: true,
                    sassDir: '',
                    cssDir: '',
                    specify: 'bootstrap.scss'
                }
            },
            fontawesome: {
                options: {
                    sourcemap: true,
                    sassDir: '',
                    cssDir: '',
                    specify: 'sass/font-awesome.scss'
                }
            },
            style: {
                options: {
                    sourcemap: true,
                    sassDir: '',
                    cssDir: '',
                    specify: 'style.scss'
                }
            }
        },
        cssmin: {
            style: {
                files: {
                    'style.min.css': ['bootstrap.css', 'style.css', 'includes/css/print.css']
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            js: {
                src: [
                    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
                    'includes/js/bootstrap-wp.js',
                    'includes/js/skip-link-focus-fix.js',
                    'includes/js/keyboard-image-navigation.js',
                    'includes/js/scripts.js'
                ],
                dest: 'includes/js/built.js',
            },
        },
        uglify: {
            js: {
                files: {
                    'includes/js/built.min.js': ['includes/js/built.js']
                }
            },
        },
        fontAwesomeVars: {
            main: {
                variablesScssPath: 'bower_components/font-awesome/scss/_variables.scss',
                fontPath: 'bower_components/font-awesome/fonts'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-font-awesome-vars');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compass', 'fontAwesomeVars', 'cssmin', 'concat', 'uglify']);
};


