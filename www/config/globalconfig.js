/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */






var configHelper = {
    configData: {
        url:"http://www.trujillo.es",
        //url: "http://demo.wp-api.org",
        Entrypoint: "/wp-json",
        v2RestApi: "/wp/v2",
        routes: {
            root: "/",
            posts: "/posts",
            pages: "/pages",
            images: "/media"
        },
        //nombre de la clave de la imagen destacada en el json devuelto por la api, esxisten plugins que devuelven en featured_image y otros en featured_media
        jsonMediaKey: "featured_media",
        icons:{
            save: "ion-android-done"
        }
    },
    getRootURL: function () {
        return this.configData.url + this.configData.routes.root;
    },
    getEntrypointURL: function () {
        return this.configData.url + this.configData.Entrypoint;
    },
    getV2RestApiURL: function () {
        return this.getEntrypointURL() + this.configData.v2RestApi;
    },
    getPostsURL: function () {
        return this.getV2RestApiURL() + this.configData.routes.posts;
    },
    getImagesURL: function () {
        return this.getV2RestApiURL() + this.configData.routes.images;
    },
    getPagesURL: function () {
        return this.getV2RestApiURL() + this.configData.routes.pages;
    },
    getJsonMediaKey: function () {
        return this.configData.jsonMediaKey;
    },
    getIconClass: function (key) {
        return this.configData.icons[key];
    }
    

}
