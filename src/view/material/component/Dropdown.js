(function($, O2) {
    O2.createObject('flute.view._instances.dropdown', [])
    O2.extendClass("flute.view.material.component.Dropdown", "flute.view.material.component.Button", {

        $dropdown : null,

        init : function() {
            flute.view._instances.dropdown.push(this);
            this.id = flute.view._instances.dropdown.length;
            this.$dropdown = $('<ul id="dropdown'+ this.id +'" class="dropdown-content">');
            this.$button
                .attr('data-activates','dropdown'+ this.id)
                .addClass('dropdown-button');
        },
        addOption : function(options) {
            options = options || {};
            var $option = $('<a href="#">'+ options.label +'</a>');
            this.$dropdown.append($('<li>').append($option));
            if (options.callback) {
                for (var cb in options.callback) {
                    $option.on(cb, options.callback[cb]);
                }
            }
            return $option;
        },
        addCollapsible : function(options) {
            this.$dropdown.addClass('collapsible');
            var oCollapsible = new flute.view.material.component.Collapsible(options);
            return oCollapsible;
        }
    });
})(jQuery,O2);