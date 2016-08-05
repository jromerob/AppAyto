angular.module('starter.directives', [])

        .directive('loading', function ($) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="loading"><img src="img/loading.gif" /></div>',
                link: function (scope, element, attr) {
                    scope.$watch('loading', function (val) {
                        if (val)
                            $(element).show();
                        else
                            $(element).hide("easeOut");
                    });
                }
            }
        })


        .directive('getMedia', function getMediaDataForId(id) {
            return ($http.get(configHelper.getImagesURL() + "/" + id, {ignoreLoadingBar: true})
                    .then(
                            function successCallback(response) {
                                return response.data;
                            },
                            function errorCallback(response) {
                                if (!angular.isObject(response.data) || !response.data.message) {
                                    return("An unknown error occurred.");
                                }
                                return(response.data.message);
                            }
                    )
                    );
        })

        .directive('featureImage', function featureImage(imageService) {

            var retorno = {
                restrict: 'E',
                scope: {
                    idmedia: '@'
                },
                template: '<img class="full-image" src="{{idmedia}}">'
            };

            return retorno;
        })

        .directive('posts', function() {

            return {
                restrict: 'E',
                scope: {
                    idCategory: "="
                },
                templateUrl: 'templates/posts.html',
                controller: 'PostsCtrl'
            };

        });