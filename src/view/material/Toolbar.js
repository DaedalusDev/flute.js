(function($, O2) {
    O2.createClass("flute.view.material.Toolbar", {
        $toolbar    : null,
        $navWrapper : null,

        $left   : null,
        $middle : null,
        $right  : null,

        buttons : null,
        dropdowns : null,

        __construct : function() {
            this.$toolbar = $('<div class="navbar-fixed">');
            var $nav = $('<nav class="blue darken-3" role="navigation">').appendTo(this.$toolbar);
            this.$navWrapper = $('<div class="nav-wrapper">').appendTo($nav);

            var $left = $('<div class="left">').appendTo(this.$navWrapper);
            this.$left = $('<ul class="right hide-on-small-only">').appendTo($left);

            var $right = $('<div class="right">').appendTo(this.$navWrapper);
            this.$right = $('<ul class="right hide-on-small-only">').appendTo($right);

            var $middle = $('<div class="container">').appendTo(this.$navWrapper);
            var $row = $('<div class="row">').appendTo($middle);
            this.$middle = $('<div class="col s12">').appendTo($row);

            this.buttons = [];
            this.dropdowns = [];
        },
        _create$Li : function(placement) {
            var $li = $('<li>').appendTo(this['$'+ placement]);
            return $li;
        },
        createButton : function(placement, options) {
            var $li = this._create$Li(placement);
            var button = new flute.view.material.component.Button(options);
            this.buttons.push(button);
            button.$button.appendTo($li);
            return button;
        },
        createDropdown : function(placement, options) {
            var $li = this._create$Li(placement);
            var dropdown = new flute.view.material.component.Dropdown(options);
            dropdown.$button.appendTo($li);
            this.dropdowns.push(dropdown);
            dropdown.$dropdown.appendTo(this['$'+ placement]);
            dropdown.$button.dropdown($.extend({},{
                gutter: 0,
                belowOrigin: true,
                constrain_width: false
            },options));
            return dropdown;
        }
    });
})(jQuery,O2);