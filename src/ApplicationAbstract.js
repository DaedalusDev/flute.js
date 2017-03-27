(function($, O2) {
	var namespace = "flute";
    O2.createClass("flute.ApplicationAbstract", {
        __controllers : null,
        __appConfig : null,
        __construct : function() {
            this.__controllers = {};
            this.init();
        },
        init : function() {},
        _getController : function(controllerName) {
            var that = this;
            var controllerName = controllerName + "Controller";
            var oController;
            var oControllerLocation = O2.loadObject(namespace+".controller");
            if (this.__controllers[controllerName]) {
                oController = this.__controllers[controllerName];
            } else if (oControllerLocation[controllerName]) {
                oController = this.__controllers[controllerName] = new oControllerLocation[controllerName](this.__appConfig);
                oController.on('flute:globalEvent', function(d) {
                    for (var ctrl in that.__controllers) {
                        that.__controllers[ctrl].trigger('flute:triggeredEvent',d);
                    }
                });
            } else {
                throw "Le controlleur " + controllerName + " est introuvable";
            }
            return oController;
        } 
    });
})(jQuery,O2);
