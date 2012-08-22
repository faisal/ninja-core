module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: '<json:package.json>',
    banner: '/*!\n' +
      '<%= pkg.name %> <%= pkg.version %>\n' +
      '<%= pkg.homepage %>\n' +
      'Copyright 2008-<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
      'Licensed per the terms of the <%= pkg.licenses[0].type %>\n' +
      '<%= pkg.licenses[0].url %>\n' +
      '*/',
    jshint: {
      options: { // overrides: https://github.com/jshint/jshint/blob/master/jshint.js#L253
        asi: false, // automatic semicolon insertion not allowed
        boss: false, // advanced usage of assignments not allowed
        eqnull: false, // == null comparisons not allowed
        es5: true, // allow reserved words, such as `import` and `use`
        evil: false, // eval not allowed
        expr: false, // expression statements not allowed
        indent: 2, // two spaces for indenting required
        jquery: true, // jQuery globals allowed
        loopfunc: false, // functions within loops not allowed,
        node: true, // Node.js globals allowed,
        regexdash: false, // unescaped first/last dash (-) inside brackets not allowed
        shadow: false, // variable shadowing not allowed
        strict: true, // 'use strict'; in functions required
        supernew: false, // `new function () { ... };` and `new Object;` not allowed
        sub: false, // all forms of subscript not allowed
        trailing: true, // trailing whitespace not allowed
        white: true // Crockford's whitespace rules required
      }
    },
    lint: {
      gruntfile: {
        options: '<config:jshint>',
        src: 'gruntfile.js'
      },
      library: {
        options: '<config:jshint>',
        src: 'library/**/*.js'
      },
      tasks: {
        options: '<config:jshint>',
        src: ['tasks/*.js', 'tasks/public/socket.js']
      },
      test: {
        options: {
          options: '<config:jshint.options>',
          globals: { // QUnit globals allowed
            module: false,
            ok: false,
            setup: false,
            strictEqual: false,
            test: false
          }
        },
        src: 'test/**/*.js'
      }
    },
    stylus: {
      ninja: {
        src: 'library/**/ninja-*.styl',
        dest: 'distribution/<%= pkg.name %>.css'
      }
    },
    qunit: {
      ninja: 'http://localhost:3000/test'
    },
    dox: {
      ninja: {
        src: 'library/<%= pkg.name %>.js',
        dest: 'documentation/<%= pkg.name %>.json'
      }
    },
    concat: {
      options: {
        banner: '<config:banner>'
      },
      ninja: {
        src: '<file_strip_banner:library/<%= pkg.name %>.js>',
        dest: 'distribution/<%= pkg.name %>.js'
      }
    },
    version: {
      options: {
        placeholder: '0.0.0development'
      },
      ninja: {
        src: '<config:concat.ninja.dest>'
      }
    },
    min: {
      options: {
        banner: '<config:banner>'
      },
      ninja: {
        src: '<config:concat.ninja.dest>',
        dest: 'distribution/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<config:lint.gruntfile.src>',
        tasks: ['lint:gruntfile']
      },
      examples: {
        files: 'examples/**/*.html',
        tasks: ['reload']
      },
      library: {
        files: '<config:lint.library.src>',
        tasks: ['lint:library', 'qunit', 'reload']
      },
      stylus: {
        files: 'library/**/*.styl',
        tasks: ['stylus', 'restyle']
      },
      test: {
        files: ['<config:lint.test.src>', 'test/**/*.html'],
        tasks: ['lint:test', 'qunit', 'reload']
      }
    },
    server: {
      port: 3000
    }
  });

  grunt.registerTask('reload', function () {});

  grunt.registerTask('restyle', function () {});

  grunt.unregisterTasks('init');
};
