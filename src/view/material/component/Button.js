(function($, O2) {
    var OPTIONS = {
        icon : ''
    };
    O2.createClass("flute.view.material.component.Button", {
        $button : null,
        $icon : null,
        $label : null,

        __construct : function(options) {
            options = $.extend(true, {}, OPTIONS, options);
            this.$button = $('<a>');
            this.$icon = $('<i class="material-icons">').appendTo(this.$button);
            if (options.icon) {
                this.$icon.html(options.icon);
            }
            if (options.label) {
                this.$icon.addClass('left');
                this.$button.append(options.label);
            }
            if(options.tooltip) {
                this.$button
                    .attr('data-tooltip',options.tooltip);
                this.$button.tooltip();
            }
            this.init(options);
        },
        init : function(options) {

        }
    });
})(jQuery,O2);