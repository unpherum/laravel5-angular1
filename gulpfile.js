var elixir = require('laravel-elixir');
elixir.config.sourcemaps = false;

var build = [];
build.path = "resources/assets/css";
build.location = "/build/";

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function (mix) {
    mix
        .styles([
            "bootstrap.css",
            "bootstrap-datetimepicker.css",
            "bootstrap-switch.css",
            "bootstrap-datatables.css",
            "../../../node_modules/font-awesome/css/font-awesome.css"
        ], "resources/assets/css/build/libs.css")
        .sass([
            "app.scss"
            ], build.path + build.location + "app.css")
        .styles([
            build.location + "libs.css",
            build.location + "app.css" /*Keep at last position*/
        ], "public/css/camsian.css")
        .version("/css/camsian.css")
        .copy("node_modules/font-awesome/fonts/**", "public/fonts");

});

elixir(function (mix) {

    mix.scripts([
        "libs/jquery.min.js",
        "libs/bootstrap.min.js",
        "libs/bootstrap-switch.min.js",
        "libs/bootstrap-datatables.min.js",
        "libs/jquery.datatables.min.js",
        "libs/moment.min.js"
    ], "public/js/camsian-libs.js");

    /* Local Scripts */
    //mix.scripts([
    //    "ajax-dashboard.js",
    //], "public/js/xero.js");
});
