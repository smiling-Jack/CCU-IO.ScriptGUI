

angular.module('tutorialApp', [])
    .controller('GUICtrl', function ($scope, $compile) {
        $scope.mbs = {};
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
        console.info(DeepDiff(oldValue,newValue));

        },true);
    });


