

angular.module('tutorialApp', [])
    .controller('GUICtrl', function ($scope, $compile) {
        $scope.mbs = {};
        $scope.fbs = {};
        $scope.con = {};
        $scope.test = "test";

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

        $scope.$watch("mbs", function(newValue,oldValue){
        console.info("MBS Watch ",DeepDiff(oldValue,newValue));
        },true);

        $scope.$watch("fbs", function(newValue,oldValue){
            console.info("FBS Watch ",DeepDiff(oldValue,newValue));
        },true);

        $scope.$watch("con", function(newValue,oldValue){
            console.info("CON Watch ",DeepDiff(oldValue,newValue));
        },true);
    });


