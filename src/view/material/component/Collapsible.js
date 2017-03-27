(function($, O2) {
    O2.extendClass("flute.view.material.component.Collapsible", "flute.view.material.component.Button", {

        $header : null,
        $body : null,

        init : function(options) {
            this.$header = $('<div class="collapsible-header">').append('<i>&#xE315;</i>'+ (options.label || "???"));
            this.$body = $('<div class="collapsible-body">');
        }
    });
})(jQuery,O2);