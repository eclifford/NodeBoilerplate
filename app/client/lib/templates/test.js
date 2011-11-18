window.templates || (window.templates = {});
window.templates['test'] = function(obj) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('test tes test testss');}return __p.join('');
};