<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Camsian</title>
        <link rel="stylesheet" type="text/css" href="css/app.css">
        <link rel="stylesheet" type="text/css" href="css/camsian.css">
    </head>
    <body ng-app="camsian.app">

        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand">Camsian</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav" ng-if="userDetails">
     
                        <li ui-sref-active="active">
                            <a href ui-sref="home">Home</a>
                        </li>
                        <li ui-sref-active="active">
                            <a href ui-sref="settings">Settings</a>
                        </li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right" ng-if="userDetails">
                        <li class="menu-item dropdown">
                            <a href class="dropdown-toggle ng-cloak" data-toggle="dropdown">@{{userDetails.name}}<span ng-if="userDetails.type==='admin'"> (Admin) </span><b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li class="menu-item dropdown dropdown-submenu">
                                    <a href="./#/logout" class="dropdown-toggle">Log out</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div><!--/.nav-collapse -->
            </div>
        </nav>
        <!--<div class="alert alert-warning" >Our dev team will update the integration platform from 2016/11/03 2pm to 2016/11/03 4pm. Sorry for the inconvenience</div>-->

        <div class="customcontainer" ui-view ng-if="!stateIsLoading">
        </div>
        <div ng-include src=" './scripts/common/loading.html' " ng-if="stateIsLoading">
        </div>

        <!-- libraries inclusion -->
        <script src="./scripts/lib/jquery.js"></script>
        <script src="./scripts/lib/moment.min.js"></script>
        <script src="./scripts/lib/angular/angular.js"></script>
        <script src="./scripts/lib/angular/angular-animate.js"></script>
        <script src="./scripts/lib/angular/angular-touch.js"></script>
        <script src="./scripts/lib/angular/angular-modules.js"></script>
        <script src="./scripts/lib/angular/angular-sanitize.js"></script>

        <script src="./scripts/lib/ui/angular-ui-router.js"></script>

        <script src="./scripts/lib/ui/bootstrap.js"></script>
        <script src="./scripts/lib/ui/ui-bootstrap-tpls-1.2.5.js"></script>

        <script src="./scripts/lib/ui/bootstrap-switch.js"></script>
        <script src="./scripts/lib/ui/angular-bootstrap-switch.min.js"></script>

        <script src="./scripts/lib/ui/jquery.dataTables.min.js"></script>
        <script src="./scripts/lib/ui/angular-datatables.min.js"></script>

        <script src="./scripts/lib/localforage.js"></script>
        <script src="./scripts/lib/angular-localForage.js"></script>

        <script src="./scripts/lib/aes.js"></script>
        <script src="./scripts/lib/mdo-angular-cryptography.js"></script>

        <script src="./scripts/lib/ui/datetime-picker.min.js"></script>

        <script src="./scripts/lib/ui/angular-ui-notification.min.js"></script>
        <script src="./scripts/lib/angular/angular-utils-pagination/dirPagination.js"></script>
        <!-- angular application -->
        <script src="./scripts/app.js"></script>
        <script src="./Config-domain.js"></script>

        <!-- angular controllers -->
        <script src="./scripts/auth/login.controller.js"></script>
        <script src="./scripts/auth/logout.controller.js"></script>
        <script src="./scripts/home/home.controller.js"></script>
        <script src="./scripts/settings/settings.controller.js"></script>


        <!-- angular services -->
        <script src="./scripts/auth/http_interceptor.service.js"></script>
        <script src="./scripts/auth/auth.service.js"></script>
        <script src="./scripts/home/home.service.js"></script>
        <script src="./scripts/settings/settings.service.js"></script>
        

        <!-- New batch of scripts -->
  


        <!-- angular directives -->
        <script src="./scripts/common/show_sync_status.directive.js"></script>
        <script src="./scripts/common/custom_input.directive.js"></script>
        <script src="./scripts/common/no_dirty.directive.js"></script>
    </body>
</html>
