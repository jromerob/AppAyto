// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngSanitize', 'ngMap', 'ngResource', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.servicesDB', 'starter.factories', 'starter.filters', 'starter.directives'])

        .constant("configHelper", configHelper)
        .constant('DB_CONFIG', configDB)

        .run(function ($ionicPlatform, $ionicPopup, $cordovaNetwork, DB, remoteConfigService) {

            $ionicPlatform.ready(function () {

                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                //llamada para inicializar el servicio de la bbdd local
                DB.init();
                remoteConfigService.init();
                document.addEventListener("deviceready", function () {
                    console.log(navigator.camera);
                    console.log($cordovaNetwork.getNetwork());
                    if ($cordovaNetwork.isOnline()) {
                        console.log('El dispositivo esta online !');
                    }
                    else if ($cordovaNetwork.isOffline()) {
                        console.error('El dispositivo NO esta online!');
                        $ionicPopup.confirm({
                            title: 'No se ha detectado conexión.',
                            content: 'Ups..., es necesario tener conexión para que la aplicación funcione. Por favor reconecte el terminal y pulse OK.'
                        }).then(function (result) {
                            if (!result) {
                                ionic.Platform.exitApp();
                            } else {
                                if ($cordovaNetwork.isOffline()) {
                                    $ionicPopup.alert({
                                        title: 'Sin conexión !',
                                        template: 'Lo sentimos, no se ha podido conectar. A continuación la aplicación se cerrará.'
                                    }).then(function(){ionic.Platform.exitApp()});
                                }
                            }
                        });
                    }
                    else {
                        console.error('Error al accedera a la red');
                    }
                }
                , false);
            });



        })

        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                    .state('intro', {
                        url: '/',
                        templateUrl: 'templates/intro.html',
                        controller: 'IntroCtrl'
                    })

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.mapa', {
                        url: '/mapa',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mapa.html',
                                controller: 'MapCtrl'
                            }
                        }
                    })

                    .state('app.comunicar', {
                        url: '/comunicar',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/comunicar.html',
                                controller: 'comunicarCtrl'
                            }
                        }
                    })

                    .state('app.dashboard', {
                        url: '/dashboard',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/dashboard.html'
                            }
                        }
                    })

                    .state('app.pruebasapp', {
                        url: '/pruebasapp',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/pruebasapp.html'
                            }
                        }
                    })
                    .state('app.scan', {
                        url: '/scan',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/scan.html',
                                controller: 'BarcodeCtrl'
                            }
                        }
                    })

                    .state('app.browse', {
                        url: '/browse',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/browse.html'
                            }
                        }
                    })
                    .state('app.playlists', {
                        url: '/playlists',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlists.html',
                                controller: 'PlaylistsCtrl'
                            }
                        }
                    })

                    .state('app.single', {
                        url: '/playlists/:playlistId',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/playlist.html',
                                controller: 'PlaylistCtrl'
                            }
                        }
                    })
                    .state('app.acercade', {
                        url: '/acercade',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/acercade.html',
                                controller: 'AcercaDeCtrl'
                            }
                        }
                    })
                    .state('app.inforest', {
                        url: '/inforest',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/infoRest.html',
                                controller: 'InfoRestCtrl'
                            }
                        }
                    })
                    .state('app.posts', {
                        url: '/posts',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/posts.html',
                                controller: 'PostsCtrl'
                            }
                        }
                    })
                    .state('app.comunicados', {
                        url: '/comunicados',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/postsComunicados.html'
                            }
                        }
                    })
                     .state('app.empleo', {
                        url: '/empleo',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/postsEmpleos.html'
                            }
                        }
                    })
                    .state('app.deportes', {
                        url: '/deportes',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/postsDeportes.html',
                                controller: 'PostCtrl'
                            }
                        }
                    })
                    .state('app.noticia', {
                        url: '/post/:postId',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/post.html',
                                controller: 'PostCtrl'
                            }
                        }
                    })
                    .state('app.jobs', {
                        url: '/jobs',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/jobs.html',
                                controller: 'jobOfferCtrl'
                            }
                        }
                    })
                    .state('app.config', {
                        url: '/config',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/configform.html',
                                controller: 'configCtrl'
                            }
                        }
                    })
                    .state('app.configModal', {
                        url: '/configModal',
                        views: {
                            'menuContent': {
                                //usamos el mismo TPL pero en una modal
                                templateUrl: 'templates/configformModal.html',
                                controller: 'configModalCtrl'
                            }
                        }
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/');

        });

