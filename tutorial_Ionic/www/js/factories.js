
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
        
        
        
;