(function($, O2) {
    O2.createClass("flute.view.material.component.SearchBar", {
        $inputWrapper: null,
        $input : null,

        __construct : function() {
            this.$inputWrapper = $('<div class="input-field col s10 m6 l10">');
            this.$input = $('<input id="search" type="search" class="blue darken-2" required placeholder="De quoi avez-vous besoin ?">').appendTo(this.$inputWrapper);
            $('<label for="search"><i class="material-icons">search</i></label>').appendTo(this.$inputWrapper);
            $('<i class="material-icons">close</i>').appendTo(this.$inputWrapper);
        }
    });
})(jQuery,O2);