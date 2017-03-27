(function($, O2) {
    O2.createClass("flute.view.material.component.DoubleDropdown", {

        clickDropdown : null,
        hoverDropdown : null,

        __construct : function(options) {
            this.clickDropdown = new flute.view.material.component.Dropdown();
            this.hoverDropdown = new flute.view.material.component.Dropdown(options);
            this.clickDropdown.$button.addClass('hide');
        },
        appendTo : function(el) {
            var self = this;
            $(el)
                .append(this.clickDropdown.$button)
                .append(this.hoverDropdown.$button)

                .append(this.clickDropdown.$dropdown)
                .append(this.hoverDropdown.$dropdown);

            this.clickDropdown.$button.dropdown({
                "constrain_width": false
            });
            this.hoverDropdown.$button.dropdown({
                "hover" : true,
                "gutter" : 235,
                "constrain_width": false
            });

            this.hoverDropdown.$button.on("click", function(e) {
                self.clickDropdown.$button.click();
                self.clickDropdown.$dropdown.css({
                    'top': (self.clickDropdown.$dropdown.find('li').length > 8 ? -64 * 4 : 64 ) +'px',
                    'left' : '56px'
                });
                e.preventDefault();
                e.stopPropagation();
            });
            return this;
        }
    });
})(jQuery,O2);