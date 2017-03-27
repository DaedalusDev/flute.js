(function($, O2) {

    /**
     * Methode supplémentaire pour la classe String.
     * @return String : la chaine avec la première lettre en minuscule
     */
    String.prototype.lowFirst = function() {
        return this.charAt(0).toLowerCase() + this.slice(1);
    }

    /**
     * Methode supplémentaire pour la classe String.
     * @return String : la chaine avec la première lettre en majuscule
     */
    String.prototype.ucFirst = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    /**
     * Function serializeObject
     * @return Object : Le résultat de la serialization d'un formulaire sous format d'objet key => value
     */
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };

    $.fn.replaceHtml = function(html) {
        this.children().detach();
        this.append(html);
        return this;
    };
})(jQuery);