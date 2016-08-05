

angular.module('starter.services', [])
        .service('imageService', function ($http, $q) {
            /**
             * 
             * @param {type} id
             * @returns {String}
             */
            this.getLargeURL = function (id) {
                if (id > 0) {
                    return ($http.get(configHelper.getImagesURL() + "/" + id, {ignoreLoadingBar: true})
                            .then(
                                    function successCallback(response) {
                                        var dataImage = response.data.media_details.sizes;
                                        return dataImage["large"].source_url
                                    },
                                    function errorCallback(response) {
                                        if (!angular.isObject(response.data) || !response.data.message) {
                                            return("Error desconocido.");
                                        }
                                        return(response.data.message);
                                    }
                            )
                            );
                } else {
                    return "";
                }
            };
            /**
             * 
             * @param {type} id
             * @returns {String}
             */
            this.getThumbnailURL = function (id) {

                if (id > 0) {
                    return ($http.get(configHelper.getImagesURL() + "/" + id, {ignoreLoadingBar: true})
                            .then(
                                    function successCallback(response) {
                                        var dataImage = response.data.media_details.sizes;
                                        return dataImage["thumbnail"].source_url
                                    },
                                    function errorCallback(response) {
                                        if (!angular.isObject(response.data) || !response.data.message) {
                                            return("An unknown error occurred.");
                                        }
                                        return(response.data.message);
                                    }
                            )
                            );
                } else {
                    return "";
                }
            };
            /**
             * Recibe un array de posts de wp y rellena cada post con la url de su featured image
             */
            this.populateImagePosts = function (arrayPosts) {

                var defered = $q.defer();
                var promise = defered.promise;
                var arrayPromesas = [];
                var claveMediaJson = configHelper.getJsonMediaKey();


                arrayPosts.forEach(function (post) {
                    //añadimos las promesas al array para despues verificar su finalizacion
                    if (post[claveMediaJson] > 1) {
                        var promesa = $http.get(configHelper.getImagesURL() + "/" + post[claveMediaJson], {ignoreLoadingBar: true})
                                .then(function (response) {
                                    //asignamos los diferentes tamaños si existen
                                    post.url_featured_media_thumbnail = (response.data.media_details.sizes.hasOwnProperty('thumbnail') ? response.data.media_details.sizes["thumbnail"].source_url : "");
                                    post.url_featured_media_medium = (response.data.media_details.sizes.hasOwnProperty('medium') ? response.data.media_details.sizes["medium"].source_url : "");
                                    post.url_featured_media_large = (response.data.media_details.sizes.hasOwnProperty('large') ? response.data.media_details.sizes["large"].source_url : "");
                                });
                        arrayPromesas.push(promesa);
                    } else {
                        post.url_featured_media = "";
                    }

                });

                //cuando todas las promesas han finalizado, resolvemos la promesa de la funcion
                $q.all(arrayPromesas).then(
                        function successCallback(response) {
                            defered.resolve(response);
                        },
                        function errorCallback(response) {
                            defered.reject(response.data.message)
                        }
                );

                return promise;
            }
        })
        .service('postService', function ($http, $q, configHelper) {
            /**
             * Obtiene la página de posts correspondiente al parametro recibido
             * @param {type} page
             * @returns {defered.promise}
             */
            this.getPagedPosts = function (page) {
                var defered = $q.defer();
                var promise = defered.promise;
                page = (page == undefined) ? 1 : page;


                $http({
                    method: 'GET',
                    url: configHelper.getPostsURL() + "?page=" + page
                }).then(
                        function successCallback(response) {
                            defered.resolve(response);
                        },
                        function errorCallback(response) {
                            if (response.status == 0) {
                                defered.reject("No se ha recibido respuesta de " + response.config.url)
                            } else {
                                defered.reject(response.statusText)
                            }

                        }
                );
                return promise;
            };

            this.getCategoryPagedPosts = function (categoryId, page) {
                var defered = $q.defer();
                var promise = defered.promise;
                page = (page == undefined) ? 1 : page;

                $http({
                    method: 'GET',
                    url: configHelper.getPostsURL() + "?page=" + page + "&categories=" + categoryId
                }).then(
                        function successCallback(response) {
                            defered.resolve(response);
                        },
                        function errorCallback(response) {
                            if (response.status == 0) {
                                defered.reject("No se ha recibido respuesta de " + response.config.url)
                            } else {
                                defered.reject(response.statusText)
                            }

                        }
                );
                return promise;
            };
        })

        // DB wrapper
        .service('DB', function ($q, DB_CONFIG) {

            // definimos self en una var local, para tener acceso dentro de las 
            // funciones
            var self = this;
            self.db = null;

            self.init = function () {
                // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
                self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

                angular.forEach(DB_CONFIG.tables, function (table) {
                    var columns = [];

                    angular.forEach(table.columns, function (column) {
                        columns.push(column.name + ' ' + column.type);
                    });

                    var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                    self.query(query);
                    console.log('Table ' + table.name + ' initialized');
                });
            };

            self.query = function (query, bindings) {
                bindings = typeof bindings !== 'undefined' ? bindings : [];
                var deferred = $q.defer();

                self.db.transaction(function (transaction) {
                    transaction.executeSql(query, bindings, function (transaction, result) {
                        deferred.resolve(result);
                    }, function (transaction, error) {
                        deferred.reject(error);
                    });
                });

                return deferred.promise;
            };

            self.fetchAll = function (result) {
                var output = [];

                for (var i = 0; i < result.rows.length; i++) {
                    output.push(result.rows.item(i));
                }

                return output;
            };

            self.fetch = function (result) {
                return result.rows.item(0);
            };

            return self;
        })

        // Resource service example
        .service('configDAO', function (DB) {
            var self = this;

            self.getAll = function () {
                return DB.query('SELECT * FROM documents')
                        .then(function (result) {
                            return DB.fetchAll(result);
                        });
            };

            self.getKey = function (key) {
                return DB.query('SELECT * FROM config WHERE key = ?', [key])
                        .then(function (result) {
                            return DB.fetch(result);
                        });
            };
            return self;
        })

        .service("remoteConfigService", function ($http) {

            var self = this;
            self.config=null;

            self.init = function () {
                $http.get('http://localhost:8384/tutorial_Ionic/www/config/remoteConfig.json').success(function (data) {
                    //Convert data to array.
                    //datos lo tenemos disponible en la vista gracias a $scope
                    self.config= data;
                });
            };
            
            self.getConfig=function(){
                return self.config
            }

            return self;
        });
;