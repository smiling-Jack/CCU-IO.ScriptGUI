angular.module('tutorialApp', [])
    .controller('GUICtrl', function ($scope, $compile) {
        $scope.setup = {
            lang: "ru"
        };
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
            console.info("Setup Watch ", DeepDiff(oldValue, newValue));
        }, true);

        $scope.$watch("mbs", function (newValue, oldValue) {
            console.info("MBS Watch ", DeepDiff(oldValue, newValue));
        }, true);

        $scope.$watch("fbs", function (newValue, oldValue) {
            console.info("FBS Watch ", DeepDiff(oldValue, newValue));
        }, true);

        $scope.$watch("con", function (newValue, oldValue) {
            console.info("CON Watch ", DeepDiff(oldValue, newValue));
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

    });


