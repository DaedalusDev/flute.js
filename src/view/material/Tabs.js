(function($, O2) {
    O2.createObject('flute.view._instances.tabs', [])
    O2.createClass("flute.view.material.Tabs", {
        $tabsWrapper : null,
        $tabs : null,

        tabs : null,

        __construct : function() {
            flute.view._instances.tabs.push(this);
            this.id = flute.view._instances.tabs.length;

            this.$tabsWrapper = $('<div class="row">');
            var $col = $('<div class="col s12">').appendTo(this.$tabsWrapper);
            this.$tabs = $('<ul class="tabs">').appendTo($col);
            this.tabs = [];
        },
        addTab : function(options) {
            var oTab = {};
            var tabId = this.tabs.length;
            oTab.$li = $('<li class="tab col s3">')
                .append($('<a href="#tabs'+ this.id +'-tab'+tabId+'">').append(options.label))
                .appendTo(this.$tabs);

            oTab.$content = $('<div id="tabs'+ this.id +'-tab'+tabId+'" class="col s12">');
            this.$tabs.after(oTab.$content);

            this.tabs.push(oTab);
            return oTab;
        }

    });
})(jQuery,O2);