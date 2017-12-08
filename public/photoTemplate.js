(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['photoTemplate'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"photo-container\">\r\n          <div class=\"photo-contents\">\r\n		  <div class=\"photo-title\"> "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div> <!-- end of photo-title-->\r\n            <div class=\"photo-image-container\">\r\n              <img src=\""
    + alias4(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "\" alt=\"Dog\">\r\n            </div>\r\n            <div class=\"love-button-container\">\r\n                <button class=\"love-button\" value=\"0\"><i class=\"fa fa-heart fa-lg\" aria-hidden=\"true\"></i></button>\r\n                <span class=\"love-count\" data-state=\"off\">"
    + alias4(((helper = (helper = helpers.loveCount || (depth0 != null ? depth0.loveCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loveCount","hash":{},"data":data}) : helper)))
    + "</span>\r\n            </div>\r\n          </div>\r\n        </div>";
},"useData":true});
})();