(function($, O2) {
    O2.createObject('flute.view._instances.sideNav', [])
    O2.createClass("flute.view.material.SideNav", {
        $sideNavWrapper : null,
        $sideNav : null,
        __construct : function() {
            var that = this;
            flute.view._instances.sideNav.push(this);
            this.id = flute.view._instances.sideNav.length;
            this.$sideNavWrapper = $('<div>');
            this.$sideNav = $('<ul id="sideNav'+ this.id +'" class="side-nav">').appendTo(this.$sideNavWrapper);
            this.$hamburger = $('<a data-activates="sideNav'+ this.id +'" href="#" class="material-design-hamburger__icon btn waves-effect waves-light blue darken-1 right hide-on-small-only" ><span class="material-design-hamburger__layer material-design-hamburger__icon--to-arrow"></span></a>').appendTo(this.$sideNav);
            this.$hamburger.materialHamburger();
        }
    });
})(jQuery,O2);