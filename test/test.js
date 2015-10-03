'use strict';

var assert = require('assert');
var dir_equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var render = require('metalsmith-in-place');
var extMeta = require('../src');
var join = require('path').join;
var read = require('fs').readFileSync;
var buffer_equal = require('buffer-equal');
var utf8 = require('is-utf8');

function assertDirsEqual(src, done) {
    return function (err) {
        if (err) return done(err);
        dir_equal(join(src, 'expected'), join(src, 'build'));
        done();
    };
}

function assertFilesEqual(src, file, done) {
    return function (err) {
        var file_a = read(join(src, 'expected', file));
        var file_b = read(join(src, 'build', file));

        if (utf8(file_a) && utf8(file_b)) {
            assert.equal(file_a.toString(), file_b.toString());
        } else {
            assert(buffer_equal(file_a, file_b));
        }

        done();
    };
}

describe('metalsmith-external-metadata', function () {
    it('should read JSON into metadata', function (done) {
        var src = 'test/fixtures/json';

        Metalsmith(src)
            .use(extMeta())
            .use(render({
                engine: 'swig'
            }))
            .build(assertDirsEqual(src, done));
    });
});