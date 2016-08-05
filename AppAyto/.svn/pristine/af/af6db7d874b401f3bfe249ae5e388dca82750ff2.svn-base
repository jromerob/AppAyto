/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('starter.filters', [])
/**
 * Filtro para modificar en una cadena HTML los HREF por llamadas javascript para abrir el enlace en nueva ventana
 * @param {type} $sce
 * @param {type} $sanitize
 * @returns {Function}
 */
.filter('hrefToJS', function ($sce, $sanitize) {
    return function (text) {
        var regex = /href="([\S]+)"/g;
        //var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"");
        var newString = $sanitize(text).replace(regex, "onClick=\"window.open('$1' ,'_blank','location=yes,toolbar=yes,allowInlineMediaPlayback=yes')\"");
         
        return $sce.trustAsHtml(newString);
    }
});