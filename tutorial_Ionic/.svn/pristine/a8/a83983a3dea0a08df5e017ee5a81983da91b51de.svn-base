/* servicios de Bases de datos 
 * DB - Servicio de acceso a la base de datos e inicialización de tablas
 *          The method creates a new SQL Lite Database and returns a Database object that allows manipulation of the data.
 *          Supported Platforms
 *              Android
 *              BlackBerry WebWorks (OS 6.0 and higher)
 *              iOS
 *              Tizen
 * 
 * DAO's        
 * Objetos de acceso a datos
 * 
 * configDAO - Accede a datos de la configuración.
 * 
 * 
 * */

angular.module('starter.servicesDB', [])

        /**
         * Servicio para el acceso a BBDD
         * 
         * @param {type} $q
         * @param {type} DB_CONFIG
         * @returns {servicesDB_L23}
         */
        .service('DB', function ($q, DB_CONFIG) {

            // definimos self en una var local, para tener acceso dentro de las 
            // funciones
            var self = this;
            self.db = null;

            /**
             * Inicializa la base de datos segun la configuracion de 
             * 
             * @returns {undefined}
             */
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
                    console.log('Tabla ' + table.name + ' inicilizada.');
                });
            };

            self.query = function (query, bindings) {
                bindings = typeof bindings !== 'undefined' ? bindings : [];
                var deferred = $q.defer();

                self.db.transaction(function (transaction) {
                    transaction.executeSql(query, bindings, function (transaction, result) {
                        deferred.resolve(result);
                    }, function (transaction, error) {
                        console.log(error);
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
/**
 * DAO para el acceso a parámetros de configuración
 * @param {type} DB
 * @returns {servicesDB_L81}
 */
        // Resource service example
        .service('configDAO', function (DB) {
            var self = this;

            self.getAll = function () {
                return DB.query('SELECT * FROM config')
                        .then(function (result) {
                            return DB.fetchAll(result);
                        });
            };

            self.getByKey = function (key) {
                return DB.query('SELECT configValue FROM config WHERE configKey = ?', [key])
                        .then(function (result) {
                            if (result.rows.length > 0) {
                                return result.rows.item(0).configValue;
                            } else {
                                return "";
                            }
                        });
            };
            self.setKey = function (key,value) {
                
                //return DB.query('UPDATE config SET configValue= ?  WHERE configKey = ?', [value,key])
                return DB.query('INSERT OR REPLACE INTO config ( configKey, configValue) VALUES (?,?)', [key,value])
                        .then(function (result) {
                                return result;
                        });
            };
            return self;
        });


;