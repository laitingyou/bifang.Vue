var gulp = require("gulp");
var GJSDuck = require("gulp-jsduck");
var gjsduck = new GJSDuck(["--out", "docs"]);

gulp.task("jsdusk", function()
{
    gulp.src("./doc.js")
        .pipe(gjsduck.doc());
});
gulp.task("default", function()
{
    gulp.watch("./doc.js",['jsdusk']);
});