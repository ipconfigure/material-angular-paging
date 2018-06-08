/**
 *
 * The MIT License (MIT)
 * Copyright (c) 2016 Crawlink
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */


(function () {
    'use strict';

    var app = angular.module("cl.paging", []);

    app.directive('clPaging', ClPagingDirective);

    ClPagingDirective.$inject = [];
    function ClPagingDirective() {
        return {
            restrict: 'EA',
            scope: {
                clPages: '=',
                clAlignModel: '=',
                clPageChanged: '&',
                clSteps: '=',
                clCurrentPage: '='
            },
            controller: ClPagingController,
            controllerAs: 'vm',
            template: [
                '<md-button class="md-icon-button" aria-label="First" ng-click="vm.gotoFirst()">',
                '<svg width="1792" height="1792" viewBox="149 0 1792 1550" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; margin-top: 2px; transform: scale(-0.8, 0.8);">',
                '<path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>',
                '<rect x="1400" y="32" width="300" height="1602" style="fill:rgb(0,0,0);stroke-width:3;stroke:rgb(0,0,0)"></rect>',
                '</svg>',
                '</md-button>',
                '<md-button class="md-icon-button" aria-label="Previous" ng-click="vm.gotoPrev()" ng-show="vm.index - 1 >= 0" style="font-size: 16px; font-weight: bold">&#8230;</md-button>',
                '<md-button class="md-icon-button" aria-label="Go to page {{i+1}}" ng-repeat="i in vm.stepInfo"',
                ' ng-click="vm.goto(vm.index + i)" ng-show="vm.page[vm.index + i]" ',
                ' ng-class="{\'md-primary md-raised\': vm.page[vm.index + i] == clCurrentPage}">',
                ' {{ vm.page[vm.index + i] }}',
                '</md-button>',
                '<md-button class="md-icon-button" aria-label="Next" ng-click="vm.gotoNext()" ng-show="vm.index + vm.clSteps < clPages" style="font-size: 16px; font-weight: bold">&#8230;</md-button>',
                '<md-button class="md-icon-button" aria-label="Last" ng-click="vm.gotoLast()">',
                '<svg width="1792" height="1792" viewBox="149 0 1792 1550" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; margin-top: 2px; transform: scale(0.8, 0.8);">',
                '<path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>',
                '<rect x="1400" y="32" width="300" height="1602" style="fill:rgb(0,0,0);stroke-width:3;stroke:rgb(0,0,0)"></rect>',
                '</svg>',
                '</md-button>',
            ].join('')
        };
    }

    ClPagingController.$inject = ['$scope'];
    function ClPagingController($scope) {
        var vm = this;

        vm.first = '<<';
        vm.last = '>>';

        vm.index = 0;

        vm.clSteps = $scope.clSteps;

        vm.goto = function (index) {
            $scope.clCurrentPage = vm.page[index];
        };

        vm.gotoPrev = function () {
            $scope.clCurrentPage = vm.index;
            vm.index -= vm.clSteps;
        };

        vm.gotoNext = function () {
            vm.index += vm.clSteps;
            $scope.clCurrentPage = vm.index + 1;
        };

        vm.gotoFirst = function () {
            vm.index = 0;
            $scope.clCurrentPage = 1;
        };

        vm.gotoLast = function () {
            vm.index = parseInt($scope.clPages / vm.clSteps) * vm.clSteps;
            vm.index === $scope.clPages ? vm.index = vm.index - vm.clSteps : '';
            $scope.clCurrentPage = $scope.clPages;
        };

        $scope.$watch('clCurrentPage', function (value) {
            vm.index = parseInt((value - 1) / vm.clSteps) * vm.clSteps;
            $scope.clPageChanged();
        });

        $scope.$watch('clPages', function () {
            vm.init();
        });

        vm.init = function () {
            vm.stepInfo = (function () {
                var result = [];
                for (var i = 0; i < vm.clSteps; i++) {
                    result.push(i)
                }
                return result;
            })();

            vm.page = (function () {
                var result = [];
                for (var i = 1; i <= $scope.clPages; i++) {
                    result.push(i);
                }
                return result;
            })();

        };
    };


})();