'use strict';

var path = require('path');
var each = require('async').each;
var includes = require('lodash.includes');
if (!Object.assign) Object.assign = require('object-assign');

function config(params) {
    var options = {
        extensions: [ '.json' ]
    };

    if ('object' == typeof params) Object.assign(options, params);

    return options;
}

function plugin(params) {
    var options = config(params);

    return function (files, metalsmith, done) {
        each(
            Object.keys(files),
            function (file, done) {
                var stats = path.parse(file);

                if (!includes(options.extensions, stats.ext)) return done();

                var source_file = path.join(stats.dir, stats.name + '.html');
                
                if (files[source_file]) {
                    Object.assign(files[source_file], JSON.parse(files[file].contents.toString()));

                    // use the most recent ctime for the source or data file
                    // to work with metalsmith-changed or similar plugins
                    if (files[file].stats.ctime > files[source_file].stats.ctime) {
                        files[source_file].stats.ctime = files[file].stats.ctime;
                    }

                    delete files[file];
                }

                done();
            },
            done
        );
    };
}

module.exports = plugin;
