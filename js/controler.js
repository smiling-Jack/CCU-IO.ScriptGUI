angular.module('tutorialApp', [])
    .controller('GUICtrl', function ($scope, $compile) {
        $scope.setup = {"lang": "de", "theme": "dark-hive", "snap_grid": "", "tooltip": "","LT_open":false};


        $scope.mbs = {};
        $scope.fbs = {};
        $scope.con = {
            mbs: {},
            fbs: {}
        };


        $scope.add_mbs = function (id, data) {

            $scope.mbs[id] = data;
            $scope.$apply();
            console.log($scope)

        };

        $scope.append = function (wo, was) {
            var data = $compile(was);
            angular.element(wo).append(data($scope));
            $scope.$apply();
        };
        $scope.$watch("setup", function (newValue, oldValue) {
            console.log("change con")
        }, true);
        $scope.$watch("mbs", function (newValue, oldValue) {
            console.log("change mbs")
//            console.info("MBS Watch ", deep(oldValue, newValue));
        }, true);

        $scope.$watch("fbs", function (newValue, oldValue) {
            console.log("change fbs")
//            console.info("FBS Watch ", deep(oldValue, newValue));
        }, true);

        $scope.$watch("con", function (newValue, oldValue) {
            console.log("change con")
//            console.info("CON Watch ", deep(oldValue, newValue));
        }, true);


//SETUP WATCHER ------------------------------------------------------------------------------------
         $scope.$watch("setup.snap_grid", function (newValue) {
         if (newValue) {
         $("#img_set_grid_on").addClass("ui-state-focus")
         } else {
         $("#img_set_grid_on").removeClass("ui-state-focus")
         }
         });
//-------------------------------------------------------------------------------------------------
         $scope.$watch("setup.tooltip", function (newValue) {
         if (newValue) {
         $("#img_set_tooltip_on").addClass("ui-state-focus");
         console.log("an")
         $(document).tooltip("enable");

         } else {
         $("#img_set_tooltip_on").removeClass("ui-state-focus");
         var collection = $("[title]");
         $(document).tooltip("disable");
         collection.attr("title", "");
         }
         });
//-------------------------------------------------------------------------------------------------
        $scope.$watch("setup.theme", function (newValue) {
            var theme =    $scope.setup.theme;
            if (theme == undefined) {
                theme = "dark-hive"
            }
            $("#theme_css").remove();
            $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui.min.css"/>');
        });
//-------------------------------------------------------------------------------------------------

    });


