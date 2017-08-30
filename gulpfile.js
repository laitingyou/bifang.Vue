var gulp = require("gulp");
var GJSDuck = require("gulp-jsduck");
var gjsduck = new GJSDuck(["--out", "docs"]);

gulp.task("jsdusk", function()
{
    gulp.src("./src/index.js")
        .pipe(gjsduck.doc());
});
gulp.task("default", function()
{
    gulp.watch('./src/**.js',['jsdusk']);
});