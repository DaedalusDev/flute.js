(function($, O2) {
    O2.createObject("flute.factory.formFactory", {
        applatirTableau : function applatirTableau(xTableau, oResult, sRoot) {
            if (oResult === undefined) {
                oResult = {};
            }
            if (xTableau === undefined) {
                return oResult;
            }
            if (sRoot === undefined) {
                sRoot = '';
            }
            var sType = typeof xTableau;
            if (xTableau == null) {
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
})(jQuery,O2);
