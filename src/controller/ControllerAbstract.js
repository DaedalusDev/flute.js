(function($, O2) {
    var $contentWrapper = $('#contentWrapper');
    O2.createClass("flute.controller.ControllerAbstract", {
        __appConfig : null,
        __construct : function(appConfig) {
            this.__appConfig = appConfig;
            this.$contentWrapper = $contentWrapper;
            this.init();
        },
        init : function() {},
        getAction : function(action,args) {
            if (this[action+'Action']) {
                return this[action+'Action'].apply(this, args);
            }
            throw "Le controlleur ne dispose pas d'une action "+ action;
        }
    });
    O2.mixin(flute.controller.ControllerAbstract, O876.Mixin.Events)
})(jQuery,O2);
