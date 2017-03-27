(function($, O2) {
    O2.createClass("flute.ApplicationAbstract", {
        __controllers : null,
        __appConfig : null,
        __construct : function() {
            this.__controllers = {};
            this.init();
        },
        init : function() {},
        _getController : function(controllerName) {
            var that = this;
            var controllerName = controllerName + "Controller";
            var oController;
            if (this.__controllers[controllerName]) {
                oController = this.__controllers[controllerName];
            } else if (lrp4.controller[controllerName]) {
                oController = this.__controllers[controllerName] = new lrp4.controller[controllerName](this.__appConfig);
                oController.on('flute:globalEvent', function(d) {
                    for (var ctrl in that.__controllers) {
                        that.__controllers[ctrl].trigger('flute:triggeredEvent',d);
                    }
                });
            } else {
                throw "Le controlleur " + controllerName + " est introuvable";
            }
            return oController;
        } 
    });
})(jQuery,O2);
;(function($, O2) {
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
        },
        _getFactory : function(factoryName) {

        }
    });
    O2.mixin(flute.controller.ControllerAbstract, O876.Mixin.Events)
})(jQuery,O2);;(function($, O2) {
    O2.createObject("flute.factory.formFactory", {
        applatirTableau : function applatirTableau(xTableau, oResult, sRoot) {
            if (oResult === undefined) {
                oResult = {};
            }
            if (sRoot === undefined) {
                sRoot = '';
            }
            var sType = typeof xTableau;
            if (xTableau === null) {
                sType = 'null';
            }

            switch (sType) {
                case 'object':
                    for (var iKey in xTableau) {
                        applatirTableau(
                            xTableau[iKey],
                            oResult,
                            sRoot + (sRoot ? '[' : '') + iKey + (sRoot ? ']' : '')
                        );
                    }
                    break;

                default:
                    oResult[sRoot] = xTableau;
            }
            return oResult;
        },
        /**
         * Fonction générique de génératio de formulaire
         * @param Object oModel : Génère un formulaire à partir du model donné
         * @param Object [oForm] : Bind éventuellement les valeurs données
         * @return jQuery <form> : Le formulaire complet
         */
        createForm : function(oModel, oForm) {
            var $form = $('<form class="row">');
            oForm = oForm || {};
            var sortedModel = {};
            for (var field in oModel) {
                if (oModel[field].position) {
                    sortedModel[oModel[field].position] = oModel[field];
                } else if(oModel[field].position != 0) {
                    sortedModel[field] = oModel[field];
                }
            }
            oForm = this.applatirTableau(oForm);
            $.each(sortedModel, function(key, value) {
                var $input;
                value.nom = value.nom || key;
                if (!value.hide && value.label) {
                    var $wrapper = $('<div class="input-field col s'+ (value.taille || 6) +' '+ (value.offset ? 'offset-s'+ value.offset : '') +'">');
                    var $label = $('<label data-error="Ce champs est invalide" for="' + value.nom + '">' + (value.label || '') + '</label>');
                    value.type = value.typeIhm || value.type;
                    switch(value.type) {
                        case 'title' :
                            var $element = $('<h4>'+ value.label +'</h4>');
                            break;
                        case 'select' :
                            $input = $('<select id="' + value.nom + '" name="'+ value.nom +'">');
                            $input.append('<option selected value=""></option>');
                            $.each(value.options, function(indexV, optionV) {
                                $input.append('<option value="' + indexV + '">' + optionV + '</option>');
                            });
                            break;
                        case 'Coche' :
                        case 'checkbox' :
                        case 'BOOLEEN' :
                            $input = $('<input id="' + value.nom + '" ' + (value.disabled ? 'disabled' : '') + ' name="' + value.nom + '" value="" type="checkbox" class="validate">');
                            break;
                        case 'hidden' :
                            $wrapper.addClass('hidden');
                        default :
                            $input = $('<input id="' + value.nom + '" ' + (value.disabled ? 'disabled' : '') + ' name="' + value.nom + '" value="" type="text" class="validate">');
                    }
                    if ($input) {
                        $wrapper.append($input).append($label);
                        if (value.attr) {
                            for(var at in value.attr) {
                                $input.attr(at, value.attr[at]);
                            }
                        }
                        if (value.val) {
                            $input.val(value.val);
                        }
                        if (oForm[value.nom]) {
                            $input.val(oForm[value.nom]);
                        }
                        if ($input.val() && value.type != "select") {
                            $label.addClass('active');
                        }
                        if (value.prefix) {
                            $wrapper.prepend('<i class="material-icons prefix">'+ value.prefix +'</i>');
                        }
                        // if (value.mappingSystemes) {
                        //     var errors = {};
                        //     var $state = $('<i></i>');
                        //     $state.on('click', function() {
                        //         oLrp4.core.mapping.showErrors(errors);
                        //     });
                        //     $wrapper.append($state);
                        //     $input.on('change keyup', function() {
                        //         var mapping = oLrp4.core.mapping.getErrors($input.val(), value.mappingSystemes);
                        //         errors = mapping.mapping;
                        //         if ($input.val() != '' || mapping.state != "valid") {
                        //             $state.attr('class',"material-icons state").addClass(lrp4.appConfig.const.state[mapping.state].color).html(lrp4.appConfig.const.state[mapping.state].icon);
                        //         }
                        //     }).trigger('change');
                        // }
                    } else {
                        $wrapper.append($element);
                        if (value.prefix) {
                            $element.prepend('<i class="material-icons">'+ value.prefix +'</i>');
                        }
                    }

                    $form.append($wrapper);
                }
            });
            return $form;
        }
    });
})(jQuery,O2);;(function($, O2) {

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
})(jQuery);;(function($, O2) {
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
})(jQuery,O2);;(function($, O2) {
    O2.extendClass("flute.view.material.component.Collapsible", "flute.view.material.component.Button", {

        $header : null,
        $body : null,

        init : function(options) {
            this.$header = $('<div class="collapsible-header">').append('<i>&#xE315;</i>'+ (options.label || "???"));
            this.$body = $('<div class="collapsible-body">');
        }
    });
})(jQuery,O2);;(function($, O2) {
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
})(jQuery,O2);;(function($, O2) {
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
})(jQuery,O2);;(function($, O2) {
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
})(jQuery,O2);;(function($, O2) {
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
})(jQuery,O2);;(function($, O2) {
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
})(jQuery,O2);;(function($, O2) {
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