window.templates || (window.templates = {});
window.templates['image'] = function(obj) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="front">\n\t<img src=\'', images.thumbnail.url ,'\' />\n</div>\n<div class="back" style=\'background-position: -', xpos ,'px -', ypos ,'px\'>\n</div>\n');}return __p.join('');
};