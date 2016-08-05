angular.module('starter.controllers', [])

        /*.controller('BarcodeCtrl', function ($scope, $cordovaBarcodeScanner) {
         
         document.addEventListener("deviceready", function () {
         
         $cordovaBarcodeScanner
         .scan()
         .then(function (barcodeData) {
         $scope.barcode=barcodeData;
         alert(barcodeData);
         }, function (error) {
         console.log(error);
         });
         
         
         // NOTE: encoding not functioning yet
         $cordovaBarcodeScanner
         .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
         .then(function (success) {
         // Success!
         }, function (error) {
         // An error occurred
         });
         
         }, false);
         })*/

        .controller('IntroCtrl', function ($scope, $state) {

            // Called to navigate to the main app
            var startApp = function () {
                $state.go('app.posts');
                // Set a flag that we finished the tutorial
                window.localStorage['didTutorial'] = true;
            };
            //No this is silly
            // Check if the user already did the tutorial and skip it if so
            /*if (window.localStorage['didTutorial'] === "true") {
             console.log('Skip intro');
             startApp();
             }
             else {
             setTimeout(function () {
             navigator.splashscreen.hide();
             }, 750);
             }*/


            // Move to the next slide
            $scope.next = function () {
                $scope.$broadcast('slideBox.nextSlide');
            };
            // Our initial right buttons
            var rightButtons = [
                {
                    content: 'Next',
                    type: 'button-positive button-clear',
                    tap: function (e) {
                        // Go to the next slide on tap
                        $scope.next();
                    }
                }
            ];
            // Our initial left buttons
            var leftButtons = [
                {
                    content: 'Skip',
                    type: 'button-positive button-clear',
                    tap: function (e) {
                        // Start the app on tap
                        startApp();
                    }
                }
            ];
            // Bind the left and right buttons to the scope
            $scope.leftButtons = leftButtons;
            $scope.rightButtons = rightButtons;
            $scope.startApp = startApp;
            // Called each time the slide changes
            $scope.slideChanged = function (index) {

                // Check if we should update the left buttons
                if (index > 0) {
                    // If this is not the first slide, give it a back button
                    $scope.leftButtons = [
                        {
                            content: 'Back',
                            type: 'button-positive button-clear',
                            tap: function (e) {
                                // Move to the previous slide
                                $scope.$broadcast('slideBox.prevSlide');
                            }
                        }
                    ];
                } else {
                    // This is the first slide, use the default left buttons
                    $scope.leftButtons = leftButtons;
                }

                // If this is the last slide, set the right button to
                // move to the app
                if (index == 2) {
                    $scope.rightButtons = [
                        {
                            content: 'Start using MyApp',
                            type: 'button-positive button-clear',
                            tap: function (e) {
                                startApp();
                            }
                        }
                    ];
                } else {
                    // Otherwise, use the default buttons
                    $scope.rightButtons = rightButtons;
                }
            };
        })


        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};
            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };
            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);
                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
        })

        .controller('PlaylistsCtrl', function ($scope) {
            $scope.playlists = [
                {title: 'Reggae', id: 1},
                {title: 'Chill', id: 2},
                {title: 'Dubstep', id: 3},
                {title: 'Indie', id: 4},
                {title: 'Rap', id: 5},
                {title: 'Cowbell', id: 6}
            ];
        })

        .controller('PlaylistCtrl', function ($scope, $stateParams) {
            $scope.params = $stateParams;
        })

        .controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {
            // Triggered on a button click, or some other target
            $scope.showPopup = function () {
                $scope.data = {};
                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<input type="password" ng-model="data.wifi">',
                    title: 'Introduzca la clave en 10 seg',
                    subTitle: 'Please use normal things',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancelar',
                            onTap: function (e) {
                                $scope.data.wifi = "";
                                return $scope.data.wifi;
                            }
                        },
                        {text: '<b>Salvar</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!$scope.data.wifi) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    return $scope.data.wifi;
                                }
                            }
                        }
                    ]
                });
                myPopup.then(function (res) {
                    console.log('Tapped!', res);
                    $scope.clave = res;
                });
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 10000);
            };
            // A confirm dialog
            $scope.showConfirm = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Consume Ice Cream',
                    template: 'Are you sure you want to eat this ice cream?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        console.log('You are sure');
                    } else {
                        console.log('You are not sure');
                    }
                });
            };
            // An alert dialog
            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Don\'t eat that!',
                    template: 'It might taste good'
                });
                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };
        })

        .controller('SettingsController2', ['$scope', function SettingsController2($scope) {
                $scope.name = "John Smith";
                $scope.contacts = [
                    {type: 'phone', value: '408 555 1212'},
                    {type: 'email', value: 'john.smith@example.org'}
                ];
                $scope.greet = function () {
                    alert($scope.name);
                };
                $scope.addContact = function () {
                    $scope.contacts.push({type: 'email', value: 'yourname@example.org'});
                };
                $scope.removeContact = function (contactToRemove) {
                    var index = $scope.contacts.indexOf(contactToRemove);
                    $scope.contacts.splice(index, 1);
                };
                $scope.clearContact = function (contact) {
                    contact.type = 'phone';
                    contact.value = '';
                };
            }
        ])
        .controller('AcercaDeCtrl', function SettingsController2($scope) {
            $scope.info = ionic.Platform;
            //$scope.infoCordova = device.cordova;
        })

        .controller('PostsCtrl', function Posts($scope, postService, imageService, postActivoFactory) {

            $scope.loading = true;
            $scope.currentPage = 1;
            $scope.postCategoryId = $scope.idCategory;
            $scope.posts = [];
            $scope.endOfPosts = false;
            $scope.loadMoreText = "Cargar mas...";
            //llamamos al servicio para obtener los posts de la página pasada por parámetro ( este devuelve una promesa por página)
            //cuando esta promesa se resuelve, se llama al servicio para obtener las imágenes que devuelve una promesa
            //que cuando se resuelve tenemos los post con la url de su imagen asociada.
            $scope.morePosts = function (page) {
                postService.getCategoryPagedPosts($scope.postCategoryId, page).then(
                        function (response) {
                            var newPosts = response.data;
                            imageService.populateImagePosts(newPosts).then(
                                    function () {
                                        if (newPosts.length < 1) {
                                            //si no hay mas posts disponibles activamos el flag
                                            $scope.loadMoreText = "";
                                            $scope.endOfPosts = true;

                                        }
                                        $scope.posts = $scope.posts.concat(newPosts);
                                        $scope.loading = false;
                                        $scope.currentPage++;
                                        //emitimos el evento de finalización del scroll                                
                                        $scope.$broadcast('scroll.infiniteScrollComplete');
                                    }
                            ).catch(
                                    function () {
                                        $scope.loading = false;
                                        $scope.posts = $scope.posts.concat(newPosts);
                                        $scope.currentPage++;
                                    }
                            );
                        }).catch(
                        function () {
                            $scope.loading = false;
                            $scope.posts = $scope.posts.concat(newPosts);
                            $scope.currentPage++;
                        }
                );
            };
            //al activar el scroll infinito no es necesario llamar para recuperar los post la primera vez
            // $scope.morePosts($scope.page);

            $scope.morePostsAvailable = function () {
                return  $scope.endOfPosts == true;
            };
            $scope.setPostActivo = function (post) {
                postActivoFactory.setPost(post);
            };
        })

        .controller('PostCtrl', function ($scope, $stateParams, postActivoFactory) {
            $scope.params = $stateParams;
            $scope.post = postActivoFactory.getPost()

        })
        .controller('pagepostCtrl', function ($scope, $stateParams, postActivoFactory) {
            //$scope.params = $stateParams;
            //$scope.post = postActivoFactory.getPost()
        })
        .controller('InfoRestCtrl', function InfoRestController($scope,  remoteConfigService) {
            //$scope.loading = true;
            $scope.info = ionic.Platform;
            $scope.remoteConfig=remoteConfigService.getConfig();
            /*$http({
                method: 'GET',
                // url: config.url+config.entrypoint
                url: configHelper.getRootURL()
            }).then(
                    function successCallback(response) {
                        $scope.inforest = response.data;
                        $scope.loading = false;
                    },
                    function errorCallback(response) {
                        console.log("error");
                        $scope.loading = false;
                        $scope.inforest ={};
                    });*/
        })

        .controller('configCtrl', function ($scope, configDAO) {
            $scope.configNombre = "";
            $scope.configApellidos = "";
            $scope.configEmail = "";
            // Get one document, example with id = 2

            $scope.save = function () {
                configDAO.setKey("nombre", this.configNombre).then(function () {
                    console.log("Guardado Nombre");
                });
                configDAO.setKey("apellidos", this.configApellidos).then(function () {
                    console.log("Guardado Apellidos");
                });
                configDAO.setKey("email", this.configEmail).then(function () {
                    console.log("Guardado email");
                })

            };

            /**
             * Se autoejecuta al inicializar el controller
             */
            $scope.load = function () {
                configDAO.getByKey("nombre").then(function (result) {
                    $scope.configNombre = result;
                });
                configDAO.getByKey("apellidos").then(function (result) {
                    $scope.configApellidos = result;
                });
                configDAO.getByKey("email").then(function (result) {
                    $scope.configEmail = result;
                });
            }();

        })


        .controller('configController', function ($scope) {
            $scope.name = "John Smith";
            $scope.contacts = [
                {type: 'phone', value: '408 555 1212'},
                {type: 'email', value: 'john.smith@example.org'}
            ];
            $scope.greet = function () {
                alert($scope.name);
            };
            $scope.addContact = function () {
                $scope.contacts.push({type: 'email', value: 'yourname@example.org'});
            };
            $scope.removeContact = function (contactToRemove) {
                var index = $scope.contacts.indexOf(contactToRemove);
                $scope.contacts.splice(index, 1);
            };
            $scope.clearContact = function (contact) {
                contact.type = 'phone';
                contact.value = '';
            };
        }
        )


        ;





