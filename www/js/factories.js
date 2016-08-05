
angular.module('starter.factories', [])

        //factoría que almacenará el post activo que se visualiza en detalle
        .factory("postActivoFactory", function () {

            var post;

            return {
                setPost: function (newPost) {
                    post = newPost;
                },
                getPost: function () {
                    return post;
                },
                getExcerpt: function () {
                    return post.excerpt.rendered;
                },
                getUrlFeatureImage: function () {
                    return post.url_featured_media;
                }
            }
        })
        .factory('cameraFactory', ['$q', function ($q, $cordovaCamera) {

                return {
                    takePicture: function () {
                        var options = {
                            quality: 75,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 300,
                            targetHeight: 300,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };

                        $cordovaCamera.getPicture(options).then(function (imageData) {
                            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
                            return "data:image/jpeg;base64," + imageData;
                        }, function (err) {
                            alert("Error al capturar imagen" + err);
                            return null;
                            // An error occured. Show a message to the user
                        });
                    },
                    getFromGallery: function () {
                        var options = {
                            quality: 75,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                            allowEdit: true,
                            encodingType: Camera.EncodingType.JPEG,
                            targetWidth: 300,
                            targetHeight: 300,
                            popoverOptions: CameraPopoverOptions,
                            saveToPhotoAlbum: false
                        };

                        $cordovaCamera.getPicture(options).then(function (imageData) {
                            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
                            return $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        }, function (err) {
                            // An error occured. Show a message to the user
                            alert("Error al capturar imagen");
                            return null;
                        });
                    }
                }
            }])
        ;