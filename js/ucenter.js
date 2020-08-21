/**
 * Ucenter & Market
/* AJAX sign */
;!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^([a-zA-Z0-9]+[_|/_|/.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|/_|/.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});jQuery(document).ready(function(a){var b=a("#sign");a("#register-active").on("click",function(){b.removeClass("um_sign").addClass("register")}),a("#login-active").on("click",function(){b.removeClass("register").addClass("um_sign")}),a(".user-login,.user-reg").on("click",function(c){a("div.overlay").length<=0?a("body").prepend('<div class="overlay"></div>'):a("div.overlay").show(),a("body").addClass("fadeIn"),1==a(this).attr("data-sign")?b.removeClass("um_sign").addClass("register"):b.removeClass("register").addClass("um_sign"),a("div.overlay, form a.close").on("click",function(){return a("body").removeClass("fadeIn"),b.removeAttr("class"),a("div.overlay").remove(),!1}),c.preventDefault()}),a("form#login, form#register").on("submit",function(b){return a(this).valid()?(a("p.status",this).show().text(um.loadingmessage),"login"==a(this).attr("id")?(action="ajax_login",username=a("form#login #username").val(),password=a("form#login #password").val(),email="",security=a("form#login #security").val(),remember="checked"==a("#rememberme").attr("checked")?a("form#login #rememberme").val():"",um_captcha="",a("form#login .submit").attr("disabled",!0).addClass("disabled").val("登录中...")):"register"==a(this).attr("id")&&(action="ajax_register",username=a("#user_name").val(),password=a("#user_pass").val(),email=a("#user_email").val(),security=a("#user_security").val(),remember="",um_captcha=a("#um_captcha").val(),a("form#register .submit").attr("disabled",!0).addClass("disabled").val("注册中...")),_this=a(this),a.ajax({type:"POST",dataType:"json",url:um.ajax_url,data:{action:action,username:username,password:password,email:email,remember:remember,security:security,um_captcha:um_captcha},success:function(b){a("p.status",_this).html(b.message),1==b.loggedin&&(document.location.href=um.redirecturl)},complete:function(){a("form#login .submit").removeAttr("disabled").removeClass("disabled").val("登录"),a("form#register .submit").removeAttr("disabled").removeClass("disabled").val("注册")}}),b.preventDefault(),void 0):!1}),jQuery.validator.addMethod("isEnglish",function(a,b){return this.optional(b)||/^[a-zA-Z][A-Za-z0-9_]+$/.test(a)},"只允许英文开头字符可加数字"),jQuery("#login").length&&jQuery("#login").validate({rules:{username:{required:!0,minlength:2},password:{required:!0,minlength:6}},messages:{username:{required:"请输入用户名",minlength:a.validator.format("用户名不能少于{0}个字符")},password:{required:"请输入密码",minlength:a.validator.format("密码不能小于{0}个字符")}}}),jQuery("#register").length&&jQuery("#register").validate({rules:{user_name:{required:!0,isEnglish:!0,minlength:3,maxlength:15},user_email:{required:!0,email:!0},user_pass:{required:!0,minlength:6},user_pass2:{required:!0,minlength:6,equalTo:"#user_pass"},um_captcha:{required:!0,minlength:4,maxlength:4}},messages:{user_name:{required:"请输入英文用户名",minlength:a.validator.format("用户名不能少于{0}个字符"),maxlength:a.validator.format("用户名不能多于{0}个字符")},um_captcha:{required:"请输入验证码",minlength:a.validator.format("验证码长度{0}个字符"),maxlength:a.validator.format("验证码长度{0}个字符")},user_email:{required:"请输入Email地址",email:"请输入正确的email地址"},user_pass:{required:"请输入密码",minlength:a.validator.format("密码不能小于{0}个字符")},user_pass2:{required:"请输入确认密码",minlength:a.validator.format("确认密码不能小于{0}个字符"),equalTo:"两次输入的密码不一致"}}})});
/* sweetalert */
!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o){var a,r,s,l,i=function(e){return e&&e.__esModule?e:{"default":e}},u=o("./modules/handle-dom"),c=o("./modules/utils"),d=o("./modules/handle-swal-dom"),f=o("./modules/handle-click"),p=o("./modules/handle-key"),m=i(p),v=o("./modules/default-params"),y=i(v),h=o("./modules/set-params"),g=i(h);s=l=function(){function o(e){var t=s;return t[e]===n?y["default"][e]:t[e]}var s=arguments[0];if(u.addClass(t.body,"stop-scrolling"),d.resetInput(),s===n)return c.logStr("SweetAlert expects at least 1 attribute!"),!1;var l=c.extend({},y["default"]);switch(typeof s){case"string":l.title=s,l.text=arguments[1]||"",l.type=arguments[2]||"";break;case"object":if(s.title===n)return c.logStr('Missing "title" argument!'),!1;l.title=s.title;for(var i in y["default"])l[i]=o(i);l.confirmButtonText=l.showCancelButton?"Confirm":y["default"].confirmButtonText,l.confirmButtonText=o("confirmButtonText"),l.doneFunction=arguments[1]||null;break;default:return c.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof s),!1}g["default"](l),d.fixVerticalPosition(),d.openModal(arguments[1]);for(var p=d.getModal(),v=p.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],b=function(e){return f.handleButton(e,l,p)},w=0;w<v.length;w++)for(var C=0;C<h.length;C++){var S=h[C];v[w][S]=b}d.getOverlay().onclick=b,a=e.onkeydown;var x=function(e){return m["default"](e,l,p)};e.onkeydown=x,e.onfocus=function(){setTimeout(function(){r!==n&&(r.focus(),r=n)},0)}},s.setDefaults=l.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");c.extend(y["default"],e)},s.close=l.close=function(){var o=d.getModal();u.fadeOut(d.getOverlay(),5),u.fadeOut(o,5),u.removeClass(o,"showSweetAlert"),u.addClass(o,"hideSweetAlert"),u.removeClass(o,"visible");var s=o.querySelector(".sa-icon.sa-success");u.removeClass(s,"animate"),u.removeClass(s.querySelector(".sa-tip"),"animateSuccessTip"),u.removeClass(s.querySelector(".sa-long"),"animateSuccessLong");var l=o.querySelector(".sa-icon.sa-error");u.removeClass(l,"animateErrorIcon"),u.removeClass(l.querySelector(".sa-x-mark"),"animateXMark");var i=o.querySelector(".sa-icon.sa-warning");return u.removeClass(i,"pulseWarning"),u.removeClass(i.querySelector(".sa-body"),"pulseWarningIns"),u.removeClass(i.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");u.removeClass(o,e)},300),u.removeClass(t.body,"stop-scrolling"),e.onkeydown=a,e.previousActiveElement&&e.previousActiveElement.focus(),r=n,clearTimeout(o.timeout),!0},s.showInputError=l.showInputError=function(e){var t=d.getModal(),n=t.querySelector(".sa-input-error");u.addClass(n,"show");var o=t.querySelector(".sa-error-container");u.addClass(o,"show"),o.querySelector("p").innerHTML=e,t.querySelector("input").focus()},s.resetInputError=l.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=d.getModal(),n=t.querySelector(".sa-input-error");u.removeClass(n,"show");var o=t.querySelector(".sa-error-container");u.removeClass(o,"show")},"undefined"!=typeof e?e.sweetAlert=e.swal=s:c.logStr("SweetAlert is a frontend module!")},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#AEDEF4",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:""};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var g=o.querySelector("button.confirm"),b=o.querySelector("button.cancel");m?b.style.boxShadow="none":g.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},g=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=g},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},g=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},b=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=g,a.openModal=b,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <button class="confirm" tabIndex="1">OK</button>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],g=y[1];h&&g?(m=h,v=g):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var b=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",b),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);


// qrcode
(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length){throw Error(a.length+"/"+c)}for(var d=0;d<a.length&&0==a[d];){d++}this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++){this.num[b]=a[b+d]}}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},write:function(a){for(var c=0;c<this.data.length;c++){a.put(this.data.charCodeAt(c),8)}}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c){throw Error(a+","+c)}return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++){b+=c[e].dataCount}for(e=0;e<this.dataList.length;e++){c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d)}if(d.getLengthInBits()<=8*b){break}}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++){this.modules[d][b]=null}}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++){if(!(-1>=a+d||this.moduleCount<=a+d)){for(var b=-1;7>=b;b++){-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)}}}},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b){a=b,c=d}}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++){for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}}return a},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++){null==this.modules[a][6]&&(this.modules[a][6]=0==a%2)}for(a=8;a<this.moduleCount-8;a++){null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)}},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++){for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e]){for(var f=-2;2>=f;f++){for(var i=-2;2>=i;i++){this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}}}}}},setupTypeNumber:function(a){for(var c=j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++){b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b}},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++){e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2){for(6==i&&i--;;){for(var g=0;2>g;g++){if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--;-1==e&&(f++,e=7)}}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++){a+=c[e].dataCount}if(b.getLengthInBits()>8*a){throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")")}for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;){b.putBit(!1)}for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a){break}b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++){f[g][k]=255&a.buffer[k+d]}d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);
i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++){h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}}for(k=g=0;k<c.length;k++){g+=c[k].totalCount}d=Array(g);for(k=n=0;k<b;k++){for(g=0;g<c.length;g++){k<f[g].length&&(d[n++]=f[g][k])}}for(k=0;k<e;k++){for(g=0;g<c.length;g++){k<i[g].length&&(d[n++]=i[g][k])}}return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);){c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15)}return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G18);){c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18)}return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;){c++,a>>>=1}return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++){c=c.multiply(new q([1,l.gexp(d)],0))}return c},getLengthInBits:function(a,c){if(1<=c&&10>c){switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a)}}else{if(27>c){switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a)}}else{if(41>c){switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+a)}}else{throw Error("type:"+c)}}}},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++){for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++){if(!(0>b+g||c<=b+g)){for(var h=-1;1>=h;h++){0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++}}}5<f&&(d+=3+f-5)}}for(b=0;b<c-1;b++){for(e=0;e<c-1;e++){if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f){d+=3}}}for(b=0;b<c;b++){for(e=0;e<c-6;e++){a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40)}}for(e=0;e<c;e++){for(b=0;b<c-6;b++){a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40)}}for(e=f=0;e<c;e++){for(b=0;b<c;b++){a.isDark(b,e)&&f++}}a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a){throw Error("glog("+a+")")}return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;){a+=255}for(;256<=a;){a-=255}return l.EXP_TABLE[a]},EXP_TABLE:Array(256),LOG_TABLE:Array(256)},m=0;8>m;m++){l.EXP_TABLE[m]=1<<m}for(m=8;256>m;m++){l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8]}for(m=0;255>m;m++){l.LOG_TABLE[l.EXP_TABLE[m]]=m}q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++){for(var b=0;b<a.getLength();b++){c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)))}}return new q(c,0)},mod:function(a){if(0>this.getLength()-a.getLength()){return this}for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++){d[b]=this.get(b)}for(b=0;b<a.getLength();b++){d[b]^=l.gexp(l.glog(a.get(b))+c)}return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];
p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d){throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c)}for(var b=d.length/3,e=[],f=0;f<b;f++){for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++){e.push(new p(g,j))}}return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++){this.putBit(1==(a>>>c-d-1&1))}},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++){for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++){r("<td></td>").css("width",d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}}a=c;jQuery(a).appendTo(this)})}})(jQuery);

// Login check
function um_check_login(){
	if(um.uid>0) return true;
	if($("div.overlay").length<=0) $("body").append('<div class="overlay"></div>');
	$("div.overlay").show(),$("body").addClass("fadeIn");
	$('#sign').removeClass("register").addClass("um_sign");
	$("div.overlay, form a.close").bind("click",function(){return $("body").removeClass("fadeIn"),$('#sign').removeAttr("class"),$("div.overlay").remove();});
	return false;
};


if( $('#issignshow').length ){
	$('.user-reg').click();
}

// Qrcode fade
$('.as-weixin,.as-donate').bind('mouseover',function(){
  $(this).children('.as-qr').css('display','block').stop().animate({
    bottom : 30,
    opacity : 1 
  },500);
}).bind('mouseleave',function(){
	$(this).children('.as-qr').hide().css('bottom',60);
});

$('.as-donate').bind('click',function(){
	if($(this).parent().children('form#alipay-gather').length>0)$(this).parent().children('form#alipay-gather').submit();
});

// Like action
$(".like-btn").click(function(){
      var _this = $(this);
      var pid = _this.attr('pid');
      var uid = _this.attr('uid');
      if(uid ==null || uid == '') return;
	  //var cookie_name = 'um_post_like_'+pid;
	  //var vote_cookie = umGetCookie(cookie_name);
      if(_this.hasClass('love-yes')/*||vote_cookie.length>0*/){ swal( "点赞是认真的，不可以取消- -！" , " ", "error"); return;}
	  $.ajax({
        type: 'POST', xhrFields: {withCredentials: true}, 
        dataType: 'json', 
        url: um.ajax_url, 
        data: 'action=like&pid=' + pid, 
        cache: false, 
        success: function(data){
          var num = _this.children("span").text();
          _this.children("span").text(Number(num)+1);
          _this.addClass("love-yes").attr("title","已喜欢");
          _this.children('i').attr('class','fa fa-heart');
          //umSetCookie(cookie_name,1,3600,um.wp_url);
          if(data.get===1)/* umAlert('参与文章互动获取'+data.credit+'积分');*/ 
            swal( "参与文章互动获取"+data.credit+"积分" , " ", "success"); 
        }
      });
});

// Collect action
$('.collect-btn').click(function(){
	if(!um_check_login())return;
	var _this = $(this);
	var pid = Number(_this.attr('pid'));
	var collect = Number(_this.children("span").text()); 
	if(_this.attr('uid')&&!_this.hasClass('collect-yes')){
		var uid = Number(_this.attr('uid'));
		$.ajax({type: 'POST', xhrFields: {withCredentials: true}, dataType: 'html', url: um.ajax_url, data: 'action=collect&uid=' + uid + '&pid=' + pid + '&act=add', cache: false,success: function(response){if(response!=0)_this.children("span").text(collect+1);_this.removeClass("collect-no").addClass("collect-yes").attr("title","已收藏");_this.children('i').attr('class','fa fa-star');}});		
		return false;
	}else if(_this.attr('uid')&&_this.hasClass('collect-yes')&&_this.hasClass('remove-collect')){
		var uid = Number(_this.attr('uid'));
		$.ajax({type: 'POST', xhrFields: {withCredentials: true}, dataType: 'html', url: um.ajax_url, data: 'action=collect&uid=' + uid + '&pid=' + pid + '&act=remove', cache: false,success: function(response){if(response!=0)_this.children("span").text(collect-1);_this.removeClass("collect-yes").addClass("collect-no").attr("title","点击收藏");_this.children('i').attr('class','fa fa-star-o');}});
		return false;
	}else{
		return;
	}   	
});

function popup_close(){
    $('.umAlert').fadeOut();
	$('.overlay-login').fadeOut();
}
// Close pop-up
$(".alert_close, .alert_cancel .btn,.overlay-login").click(function (){
    $('.umAlert').fadeOut();
	$('.overlay-login').fadeOut();
});

// Alert template
function umAlert($msg){
	var $content = '<div class="umalert"><div class="alert_title"><h4>来自网页的提醒</h4></div><div class="alert_content"><p>'+$msg+'</p></div><div class="alert_cancel"><button class="cancel-to-back btn btn-danger">确定</button></div><span class="alert_close"><i class="fa fa-close"></i></span></div>';
	$('body').append($content);
	$(".alert_close, .alert_cancel .btn,.overlay-login").bind('click',function(){
		$('.umalert').fadeOut().remove();
		$('.overlay-login').fadeOut();
	})
	$('.umalert').fadeIn();
	$('.overlay-login').fadeIn();
};

//移除付款框
jQuery('body').on('click','.order-pay-content .close,.pay-mark',function(){
	$(".order-pay-content").remove();
	$(".pay-mark").remove();
	paymonitor_timer && clearInterval(paymonitor_timer);
});


function member_ajax(url, inputs, success_fn){
	$.ajax({  
	    type: 'POST',  
	    url:  url,  
	    data: inputs,  
	    dataType: 'json',
	    success: function(data){
	        if( success_fn ) success_fn(data)
	    },
	    error: function(data){
	    	swal( "服务器异常，请稍候再试", '' , "error");
	    }
	});  
}


var paymonitor_timer;
//支付宝支付
$('body').on('click','#pay_action',function(){
	var _this = $(this),
    pid = _this.attr('data-pid'),
    order = _this.attr('data-id');
    if(jsui.alipay_url.indexOf("alipay") != -1 || jsui.alipay_url.indexOf("mqpay") != -1){
    	$('body').after('<form id="order_form" method="post" action="'+jsui.alipay_url+'" class="hide"><input type="hidden" name="product_id" value="'+pid+'"><input type="hidden" name="order_id" value="'+order+'"></form>');
    	$('#order_form').submit();
    }else{
    	var inputs = {product_id: pid, order_id: order, payment: 'alipay'}
    	member_ajax(jsui.alipay_url, inputs, function(data){
    		if(data.success == 0){
    			if( data.payment == 'xhpay'){
    				location.href = data.pay_url;
    			}else{
    				$('.pay-content-warp').html('<div class="price">￥'+data.order_price+'</div><div class="payqrcode"><img src="'+data.code_url+'"></div><div class="pay-tips f2fpay">请使用支付宝扫一扫<br>扫描二维码支付</div>');
  	    			var time = 20;
  	    			paymonitor_timer && clearInterval(paymonitor_timer);
  	    			paymonitor_timer = setInterval(function() {
  	    				time--;
  	    				if(time == 0){
  	    					clearInterval(paymonitor_timer); 
  	    					$('.pay-content-warp').html('').append('<div class="scan-tips" style="color:red;"><i class="fa fa-exclamation-circle"></i>支付失败</div>');
  	    				}else{
  	    					var paymonitor = {action: 'check_order', order_id: inputs.order_id, uid: um.uid }
  	    					member_ajax(um.ajax_url, paymonitor, function(data2){
  	    						if( data2.success == 1 ){
  	    							$('.order-pay-content .close').click();
  	    							swal("支付成功！","","success",true,false);
  	    							setTimeout(function(){window.location.replace(data2.redirect);}, 2500);
  	    						}else{return;} 	
  	    					})
  	    				}
  	    			}, 2500)
    			}
    		}else{
    			swal( "操作失败", data.msg , "error"); 
    		}
    	});
    }
});

//微信支付
$('body').on('click','#wxpay_action',function(){
	var _this = $(this);
    var inputs = {product_id: _this.attr('data-pid'), order_id: _this.attr('data-id')}
    member_ajax(jsui.wxpay_url, inputs, function(data){
    	if(data.success === 0){
    		if(data.payment == 'xhpay'){
    			location.href = data.pay_url;
    		}else{
    			$('.pay-content-warp').html('<div class="price">￥'+data.order_price+'</div><div class="payqrcode"><img src="'+data.code_url+'"></div><div class="pay-tips">请使用微信扫一扫<br>扫描二维码支付</div>');
                var time = 20;
                paymonitor_timer && clearInterval(paymonitor_timer);
                paymonitor_timer = setInterval(function() {
                	time--;
                	if(time == 0){
                		clearInterval(paymonitor_timer); 
                		$('.pay-content-warp').html('').append('<div class="scan-tips" style="color:red;"><i class="fa fa-exclamation-circle"></i>支付失败</div>');
                	}else{
                		var paymonitor = {action: 'check_order', order_id: inputs.order_id, uid: um.uid }
  	    				member_ajax(um.ajax_url, paymonitor, function(data2){
  	    					if( data2.success == 1 ){
  	    						$('.order-pay-content .close').click();
  	    						swal("支付成功！","","success",true,false);
  	    						setTimeout(function(){window.location.replace(data2.redirect);}, 2500);
  	    					}else{return;} 	
  	    				})
                	}
                },2500)
    		}
    	}else{
    		swal( "操作失败", data.msg , "error");
    	}
    })
});


$(document).on('click', '.bds_cover', function (event) {
    event.preventDefault();
    var bigger_cover = $('#bigger-cover');
    $.ajax({
        url: um.ajax_url,
        type: 'POST',
        dataType: 'json',
        data: bigger_cover.data(),
        beforeSend: function(){$('body').append('<div class="poster-cover-bg"><div class="on-loading"><i class="fa fa-spinner fa-spin"></i> 封面生成中...</div></div>');},
        success: function(data) {
			if (data.s == 200 && data.head && data.qrcode && data.logo) {
			    $('body').append('<div class="poster-cover"></div>');
			    tbquire(['poster'], function() {
			        var bgsrc = poster.init({banner: data.head,selector: '.poster-cover',title: data.title,qrcode: data.qrcode,content: data.excerpt,logo: data.logo,description: data.desc})
			    })
			    $('.poster-cover').append('<div class="poster-cover-close">×</div>');
			} else {
			    $(".poster-cover-bg").remove();
			    swal('生成海报失败！', '', 'error');
			}
			$('.on-loading').remove();
		},
		error: function(){
		    $('.on-loading').remove();
		    $(".poster-cover-bg").remove();
		    swal('网络错误，请稍后再试！', '', 'error');
		}
		//$('.overlay-login').css('display','block');
		//$('.row-share').css({'opacity':'1','visibility':'inherit'});
	});
});

$('body').on("click",".poster-cover-bg,.poster-cover-close",function(){
    $(".poster-cover-bg").remove();
    $(".poster-cover").remove();
});



//上传二维码
jQuery('.cos_field').on('click','a.cos_upload_button',function(e){   
    var upload_frame,
	upload_btn = jQuery(this);       
	event.preventDefault();   
	if( upload_frame ){   
		upload_frame.open();   
		return;   
	}   
	upload_frame = wp.media({   
		title: '插入图片',   
		button: {   
			text: '插入',   
		},   
		multiple: false   
	});   
	upload_frame.on('select',function(){  //里面是选择图片后的动作，把图片地址赋值给input 
			attachment = upload_frame.state().get('selection').first().toJSON();
            upload_btn.parent(".cos_file_button").find(".cos_field_upload").val(attachment.url).trigger("change");			
			//jQuery('input[name='+value_id+']').val(attachment.url);   
	});	   
	upload_frame.open();   
}); 


jQuery(".cos_field").on("change focus blur onblur input", ".cos_field_upload",function() {
    if (preview_div = jQuery(this).parent().find(".cos_file_preview"), file_button = jQuery(this).parent(".cos_file_button"), upload_button_name = jQuery(this).parent().find(".cos_upload_button span"), file_uri = jQuery(this).val(), file_uri) {
        var t = '<img src ="' + file_uri + '" />';
        preview_div.html("").append(t),
        file_button.addClass("active"),
        upload_button_name.text("更换图片");
    } else {
		preview_div.html(""),
		file_button.removeClass("active"),
		upload_button_name.text("上传图片");
	}
}); 

// Ajax post basic
var umRefreshIcon = '<i class="fa fa-spinner fa-spin" style="margin-right:4px;"></i>';
function um_do_post(formid, posturl, postdata, contentid){
	$(formid).find('[type="submit"]').addClass('disabled').prepend(umRefreshIcon);
	$.ajax({
		type: 'POST', 
		url: posturl,
		data: postdata,
		success: function(response) {
			$(contentid).html($(response).find(contentid).html());
		},
		error: function(){
			//um_do_post(formid, posturl, postdata, contentid);
            swal( "操作失败 ", '请重新在试！',"error");
            setTimeout(function(){ parent.location.reload()}, 2500);
		}
	});
};

//Submit
$('#pmform').submit(function(){
	var formid = '#pmform';
	var p = $(formid);
	um_do_post(
		formid, 
		location.href, 
		{
		'pmNonce' : p.find('[name="pmNonce"]').val(),
		'pm' : p.find('[name="pm"]').val()
		},
		'.dashboard-main'
	);
	return false;
});
$('#creditform').submit(function(){
	var formid = '#creditform';
	var p = $(formid);
    var obj;
    var checked;       
    obj=document.getElementsByName('creditChange');   
    if(obj){
        for (var i = 0; i < obj.length; i++){
            if(obj[i].checked){
                checked = obj[i].getAttribute('value');
            }else{checked = 'add';}
        }      
    }else{checked = 'add';}
	um_do_post(
		formid, 
		location.href, 
		{
		'creditNonce' : p.find('[name="creditNonce"]').val(),
		'creditChange' : checked,
		'creditNum' : p.find('[name="creditNum"]').val(),
		'creditDesc' : p.find('[name="creditDesc"]').val()
		},
		'.dashboard-main'
	);
	return false;
});

// Add coupon code
$('#couponform').submit(function(){
	var formid = '#couponform';
	var p = $(formid);
    var obj;
    var checked;       
    obj=document.getElementsByName('coupon_type');   
    if(obj){
        for (var i = 0; i < obj.length; i++){
            if(obj[i].checked){
                checked = obj[i].getAttribute('value');
            }else{checked = 'once';}
        }      
    }else{checked = 'once';}
	um_do_post(
		formid, 
		location.href, 
		{
		'couponNonce' : p.find('[name="couponNonce"]').val(),
		'coupon_code' : p.find('[name="coupon_code"]').val(),
		'coupon_type' : checked,
		'discount_value' : p.find('[name="discount_value"]').val(),
		'expire_date' : p.find('[name="expire_date"]').val()
		},
		'.dashboard-main'
	);
	return false;
});

// Delete coupon code
$('.delete_couponcode').on('click',function(){
	var p = $(this).parent('tr').children('input[name=coupon_id]');
	var coupon_id = p.val();
	var dcouponNonce = $('.coupon-table input[name=dcouponNonce]').val();
    $.ajax({
		type: 'POST', 
		url: location.href,
		data: {
			'coupon_id': coupon_id,
			'dcouponNonce': dcouponNonce
		},
		success: function(response) {
			//$('.dashboard-main').html($(response).find('.dashboard-main').html());
			p.parent('tr').remove();
            swal("操作成功", "删除优惠码成功！ ", "success");
		},
		error: function(){
			//umAlert('删除失败,请重新再试！');
            swal( "操作失败 ", "删除失败,请重新再试！","error");
		}
	});
	return false;
});

// post act
$('.post-act').on('click',function(){
	var $this = $(this);
	var post_id = $this.attr('data-post-id');
	var act = $this.attr('data-act');
	var postNonce = $('.loop-wrap input[name=postNonce]').val();
    $.ajax({
		type: 'POST', 
        dataType: 'json',
		url: location.href,
		data: {
			'act': act,
			'post_id': post_id,
			'postNonce': postNonce
		},
        beforeSend:function(){$('body').append('<div class="sweet-overlay" tabindex="-1" style="opacity: 1.02; display: block;"><div class="on-loading"><i class="fa fa-spinner fa-spin"></i> 正在操作中...</div>');},
		success: function(response) {
			//$('.dashboard-main').html($(response).find('.dashboard-main').html());
			//p.parent('tr').remove();
            swal(response.msg , '',  response.ico);
            setTimeout(function(){ parent.location.reload()}, 2500);
            //$('.loop-wrap').html();//
		},
		error: function(){
			//umAlert('删除失败,请重新再试！');
            swal( "操作失败 ", '请重新在试！',"error");
            setTimeout(function(){ parent.location.reload()}, 2500);
		}
	});
	return false;
});

// product act
$('.product-act').on('click',function(){
	var $this = $(this);
	var post_id = $this.attr('data-product-id');
	var act = $this.attr('data-act');
	var productsNonce = $('.loop-wrap input[name=productsNonce]').val();
    $.ajax({
		type: 'POST', 
        dataType: 'json',
		url: location.href,
		data: {
			'act': act,
			'post_id': post_id,
			'productsNonce': productsNonce
		},
        beforeSend:function(){$('body').append('<div class="sweet-overlay" tabindex="-1" style="opacity: 1.02; display: block;"><div class="on-loading"><i class="fa fa-spinner fa-spin"></i> 正在操作中...</div>');},
		success: function(response) {
			//$('.dashboard-main').html($(response).find('.dashboard-main').html());
			//p.parent('tr').remove();
            swal("操作成功", response.msg , response.ico);
            setTimeout(function(){ parent.location.reload()}, 2500);
            //$('.loop-wrap').html();//
		},
		error: function(){
			//umAlert('删除失败,请重新再试！');
            swal( "操作失败 ", '请重新在试！',"error");
            setTimeout(function(){ parent.location.reload()}, 2500);
		}
	});
	return false;
});

// Cookie
// function set cookie
function umSetCookie(c_name,value,expire,path){
	var exdate=new Date();
	exdate.setTime(exdate.getTime()+expire*1000);
	document.cookie=c_name+ "=" +escape(value)+((expire==null) ? "" : ";expires="+exdate.toGMTString())+((path==null) ? "" : ";path="+path);
};
// function get cookie
function umGetCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return ""
};
// function set wp nonce cookie
function set_um_nonce(){
	$.ajax({
		type: 'POST', url: um.ajax_url, data: { 'action' : 'um_create_nonce' },
		success: function(response) {
			umSetCookie('um_check_nonce',$.trim(response),3600,um.home);
		},
		error: function(){
			set_um_nonce();
		}
	});
};
// var get wp nonce cookie
var wpnonce = umGetCookie('um_check_nonce');
// action set wp nonce cookie ( if wp nonce is null or empty )
if (wpnonce==null || wpnonce=="") set_um_nonce();

// Get aff name in url
function umGetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
};

//Upload avatar
/*$('#edit-umavatar').click(function(){
    $('#upload-input').slideToggle();
})
$('#upload-umavatar').click(function(){
    var file = $('#upload-input input[type=file]').val();
    if(file==''){
        $('#upload-avatar-msg').html('请选择一个图片').slideDown();
        setTimeout(function(){$('#upload-avatar-msg').html('').slideUp();},2000);
    }else{
       document.getElementById('info-form').enctype = "multipart/form-data";
        $('form#info-form').submit();
    } 
})*/

$('#qux-dark').on('click',function(){
	var _this = $(this)
	if($('body').hasClass('dark')){
		umSetCookie('um_qux_dark','nodark',3600,'/');
		$('body').removeClass('dark');
		_this.find('.fa').removeClass('fa-sun-o').addClass('fa-moon-o');
		_this.find('span').html('夜间模式');
		_this.find('h6').html('夜间模式<i></i>');
	}else{
		umSetCookie('um_qux_dark','dark',3600,'/');
		$('body').addClass('dark');
		_this.find('.fa').removeClass('fa-moon-o').addClass('fa-sun-o');
		_this.find('span').html('日间模式');
		_this.find('h6').html('日间模式<i></i>');
	}
	
})


//general popup
$("[data-pop]").on("click", function() {
    var b = $(this).attr("data-pop");
    $("div.overlay").length<=0?$("body").append('<div class="overlay"></div>'):$("div.overlay").show();
    $(".popupbox").hide(), $("#" + b).fadeIn();
});

$("[data-top]").on("click", function() {
    var b = $(this).attr("data-top");
    "true" == b && $("body,html").animate({
        scrollTop: 0
    }, 0)
});

function popup_close(){
    $("div.popupbox, div.overlay").fadeOut();
}

$('body').on("click","div.overlay,a.popup-close",function(){
	popup_close();
});

// amount plus or minus
function calculate() {
    $("#total-price").find("strong").text("￥" + Number($("#order_quantity").val() * $("#order_price").val()).toFixed(2))
};
$("div.amount-number a").on("click", function(b) {
    b.preventDefault(), fieldName = $(this).attr("field"), fieldstyle = $(this).attr("id");
    var c = parseInt($("input[name=" + fieldName + "]").val());
	var d = parseInt($('li.summary-amount span.dt-num').text());
    "plus" == fieldstyle ? Number(c) >= d ? $("input[name=" + fieldName + "]").val(d) : isNaN(c) ? $("input[name=" + fieldName + "]").val(0) : $("input[name=" + fieldName + "]").val(c + 1) : "minus" == fieldstyle && (!isNaN(c) && c > 1 ? $("input[name=" + fieldName + "]").val(c - 1) : $("input[name=" + fieldName + "]").val(1))
}), 
$("input[name=amountquantity]").keyup(function() {
    var c = $(this).val();
	var d = parseInt($('li.summary-amount span.dt-num').text());
    if(!/^(\+|-)?\d+$/.test(c) || 0 >= c) $(this).val(1);
	if(d<c) $(this).val(d)
}), 
$("a.buy-btn").on("click", function(b) {
    b.preventDefault(), $("input[name=order_quantity]").val($("input[name=amountquantity]").val()), calculate()
}),
$("a.inner-buy-btn").on("click", function(b) {
    b.preventDefault();
    if(um_check_login()){
    	calculate();
    	$("div.overlay").length<=0?$("body").append('<div class="overlay"></div>'):$("div.overlay").show();
      	$(window).scrollTop(0); 
    	$(".popupbox").hide(), $("#order").fadeIn();
	}
}),
$("#order_quantity").keyup(function() {
    var c = $(this).val();
    "" == c ? $(this).val(1) : ($("#pay-submit").removeAttr("disabled"), (!/^(\+|-)?\d+$/.test(c) || 0 >= c) && $(this).val(1)),calculate()
});

// create a order
$('#pay-submit').on('click',function create_order(){
	var $this=$(this);
	if($this.hasClass('disabled')) return;
	$this.addClass('disabled').prepend(umRefreshIcon);
	var product_id = $('input#product_id').val(),
        coupon_code = $('input#coupon_code').val(),
        order_name = $('input#order_name').val(),
		order_quantity = $('input#order_quantity').val(),
		receive_name = $('input#receive_name').val(),
		receive_address = $('input#receive_address').val(),
		receive_zip = $('input#receive_zip').val(),
        receive_email = $('input#receive_email').val(),
		receive_phone = $('input#receive_phone').val(),
		receive_mobile = $('input#receive_mobile').val(),
		order_msg = $('input[name=order_body]').val(),
		aff_user_id = umGetCookie('um_aff'),
		wp_nonce = $('input[name=order_nonce]').val();
	if(receive_name==''||receive_email==''){
	    swal( "操作失败 ", "收货人姓名或邮箱不能为空","error");
	    $this.removeClass('disabled').text('立即付款');
	    return false;
	}else if(!receive_email.match('^([a-zA-Z0-9_-])+((\.)?([a-zA-Z0-9_-])+)+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$')){
	    swal( "操作失败 ", "收货人邮箱格式不正确","error");
	    $this.removeClass('disabled').text('立即付款');
	    return false;
	}else if(order_quantity < 1){
	    swal( "操作失败 ", "请输入正确的购买数量","error");
	    $this.removeClass('disabled').text('立即付款');
	    return false;
	}
	$.ajax({
		type: 'POST',
		dataType: 'json',
		async: true,
		url: um.ajax_url, 
		data: {
			'action' : 'create_order',
			'product_id' : product_id,
            'coupon_code': coupon_code,
            'order_name' : order_name,
			'order_quantity' : order_quantity,
			'receive_name' : receive_name,
			'receive_address' : receive_address,
			'receive_zip' : receive_zip,
            'receive_email' : receive_email,
			'receive_phone' : receive_phone,
			'receive_mobile' : receive_mobile,
			'order_msg' : order_msg,
			'aff_user_id'	: aff_user_id,
			'wp_nonce' : wp_nonce
		},
		success: function(response) {
			//~ @action reset wp nonce ( if response invalid ) and try again
			$this.removeClass('disabled').text('立即付款');
			if($.trim(response.msg)=='NonceIsInvalid'){
				//umAlert('安全验证未通过,订单未被提交,请刷新页面再试');
                swal("安全验证未通过,订单未被提交,请刷新页面再试", "", "error");
			}else if(response.success==0){
                swal({title: "操作失败", type: "error", text: response.msg, html:true });
				//umAlert(response.msg);
			}else if(response.redirect==0){
				swal( "操作成功", "购买商品成功，请前往订单查看！","success");
				setTimeout(function(){location.replace(location.href)},2000);
			}else if(response.redirect==1){
                popup_close();
                $('body').append(response.content); 
				//$('input#order_id').val(response.order_id);
				//$('form#alipayment').submit();
			}else{
                swal("网络连接错误，请重试！", "", "error");
            }
		},
	});
	return false;
});

// Close order
$('.close-order').bind('click',function(){
	var $this =$(this);
	var id = $this.attr('data');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		async: true,
		url: um.ajax_url, 
		data: {
			'action' : 'closeorder',
			'id' : id,
		},
        beforeSend:function(){$this.addClass('disabled').prepend(umRefreshIcon);},
		success: function(response) {
			//~ @action reset wp nonce ( if response invalid ) and try again
			if(response.success==0){
				//umAlert(response.msg);
                swal(  "操作失败",response.msg , "error"); 
			}else{
                swal( "操作成功", "更新订单成功！","success");
                 //umAlert('更新订单成功！');
				$this.parent('td').prev().text('交易关闭');
				$this.parent('td').html('完成');
                $this.parent('div').html('');
            }
		}
	});
});
// completed order
$('.completed-order').bind('click',function(){
	var $this =$(this);
	var id = $this.attr('data');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		async: true,
		url: um.ajax_url, 
		data: {
			'action' : 'completedorder',
			'id' : id,
		},
        beforeSend:function(){$this.addClass('disabled').prepend(umRefreshIcon);},
		success: function(response) {
			//~ @action reset wp nonce ( if response invalid ) and try again
			if(response.success==0){
				//umAlert(response.msg);
                swal( "操作失败", response.msg , "error"); 
			}else{
                 swal( "操作成功", "更新订单成功！","success");
				 //umAlert('更新订单成功！');
				$this.parent('td').prev().text('完成订单');
				$this.parent('td').html('完成');
                $this.parent('div').html('');
            }
		}
	});
});

// Continue pay
$('.continue-pay').bind('click',function(){
	var $this = $(this);
	var id = $this.attr('data-id');
		/*form = $('#continue-pay'),
		pid_obj = form.children('input#product_id'),
		oid_obj = form.children('input#order_id'),
		oname_obj = form.children('input#order_name');*/
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url:um.ajax_url,
		data:{
			'action' : 'continue_order',
			'id' : id
		},
        beforeSend:function(){$this.html(umRefreshIcon);},
		success:function(response){
			if(response.success==1&&response.order_currency=='credit'){
				$this.parent('td').html('交易成功');
				return false;
			}else if(response.success==1&&response.order_currency=='cash'){
                $('body').append(response.content);
                $this.html('付款');
				/*pid_obj.val(response.order.product_id);
				oid_obj.val(response.order.order_id);
				oname_obj.val(response.order.product_name);
				form.submit();*/
                
			}else{
              //umAlert(response.msg);
              swal(  "操作失败", response.msg , "error");
              $this.html('付款');
              return false;
            }
		}
	});
});

$('#orders,.site-orders').on('click','.delete-order',function(){
	var $this = $(this);
	var id = $this.attr('data-id');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		url:um.ajax_url,
		data:{
			'action' : 'delete_order',
			'order_id' : id
		},
        beforeSend:function(){$this.html(umRefreshIcon);},
        success:function(response){
        	if(response.success==1){
        		$this.parent().parent().html('');
        		swal(response.msg,'', "success");
        		setTimeout(function(){ parent.location.reload()}, 1500);
        	}else{
        		swal(  "操作失败", response.msg , "error");
        		$this.html('删除');
        		return false;
        	}
        }
	});
});

// Delete Member
$('.delete-member').bind('click',function(){
	var $this =$(this);
	var id = $this.attr('data-member-id');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		async: true,
		url: um.ajax_url, 
		data: {
			'action' : 'deletemember',
			'id' : id,
		},
        beforeSend:function(){$this.addClass('disabled').prepend(umRefreshIcon);},
		success: function(response) {
			//~ @action reset wp nonce ( if response invalid ) and try again
			if(response.success==1){
				//umAlert(response.msg);
                swal(  "操作失败",response.msg , "error"); 
			}else{
				
                swal( "操作成功", "删除会员成功！","success");
                $this.parent('div').html('完成');
                 //umAlert('更新订单成功！');
            }
		}
	});
});

//use coupon code
$('#coupon_code_apply').click(function(){
	var code = $('input#coupon_code').val();
	var total = Number($("#order_quantity").val() * $("#order_price").val()).toFixed(2);
	if(code==''){return;}else{
		$.ajax({
			type: 'POST',
			dataType: 'json',
			async: true,
			url: um.ajax_url, 
			data:{
				'action' : 'use_coupon_code',
				'coupon_code': code,
				'order_total_price': total
			},
			success:function(response){
				if(response.success==1){
					$('#coupon_code,#coupon_code_apply').css('display','none');
					$('#coupon').append('应用优惠码成功,请直接提交支付');
					$("#total-price").find("strong").text("￥"+response.total_price);
				}else{
                  //umAlert(response.msg);
                  swal(  "操作失败", response.msg ,"error"); 
                }
			},
		
		});
	}
});

//join vip
$('#joinvip-submit').click(function create_vip_order(){
	$('#joinvip-submit').addClass('disabled').prepend(umRefreshIcon);
	var obj;
    var product_id = -1;
    var aff_user_id = umGetCookie('um_aff'),       
    obj=document.getElementsByName('product_id');   
    if(obj){
        for (var i = 0; i < obj.length; i++){
            if(obj[i].checked){
                product_id = obj[i].getAttribute('value');
            }
        }      
    }
	$.ajax({
			type: 'POST',
			dataType: 'json',
			async: true,
			url: um.ajax_url, 
			data:{
				'action' : 'create_vip_order',
				'product_id': product_id,
				'aff_user_id': aff_user_id
			},
			success:function(response){
				$('#joinvip-submit').removeClass('disabled');
				$('#joinvip-submit i').remove();
				if(response.success==1){
                    $('body').append(response.content); 
					//$('input#order_id').val(response.order_id);
					//$("form#joinvip").attr('onsubmit','').submit();
				}else{
                  swal(  "操作失败", response.msg , "error"); 
                  //umAlert(response.msg);
                }
			},	
		});
	return false;
});

//credit recharge order
$('#creditrechargesubmit').click(function(){
    if($(this).hasClass('disabled'))return;
    var obj = $('#creditrechargeform');
    var product_id = -5,
		creditrechargeNum = obj.find('input[name=creditrechargeNum]').val();       
	$.ajax({
			type: 'POST',
			dataType: 'json',
			async: true,
			url: um.ajax_url, 
			data:{
				'action' : 'create_credit_recharge_order',
				'product_id': product_id,
				'creditrechargeNum': Number(creditrechargeNum)
			},
            beforeSend:function(){$('#creditrechargesubmit').addClass('disabled').prepend(umRefreshIcon);},
			success:function(response){
                $('#creditrechargesubmit').removeClass('disabled');
				$('#creditrechargesubmit i').remove();
				if(response.success==1){
                    $('body').append(response.content); 
					//obj.find('input#order_id').val(response.order_id);
					//obj.attr('onsubmit','').submit();
				}else{
                  //umAlert(response.msg);
                  swal(  "操作失败", response.msg , "error");
                }
			},	
		});
	return false;
})

//credit recharge order
/* $('#creditrechargesubmit').on('click',function(){
	if($(this).hasClass('disabled'))return;
	var obj = $('#creditrechargeform');
	obj.find('[type="submit"]').addClass('disabled').prepend(umRefreshIcon);
    var product_id = -5,
		creditrechargeNum = obj.find('input[name=creditrechargeNum]').val(),
		aff_user_id = umGetCookie('um_aff');       
	$.ajax({
			type: 'POST',
			dataType: 'json',
			async: true,
			url: um.ajax_url, 
			data:{
				'action' : 'create_credit_recharge_order',
				'product_id': product_id,
				'creditrechargeNum': Number(creditrechargeNum),
				'aff_user_id': aff_user_id
			},
			success:function(response){
				if(response.success==1){
					obj.find('input#order_id').val(response.order_id);
					obj.attr('onsubmit','').submit();
				}else{umAlert(response.msg);}
			},	
		});
	return false;
}); */

// Daily sign
$('a#daily_sign').bind('click',function(){
	var $this = $(this);
	$.ajax({
		type: 'POST',
		dataType: 'json',
		async: true,
		url: um.ajax_url,
		data: {'action':'daily_sign'},
		success: function(response) {
			if(response.success==1){
				$this.attr({'id':'daily_signed','title':'今日已签到'}).text('已签到');
				//umAlert(response.msg);
                swal( "操作成功", response.msg , "success");
			}else{
				//umAlert(response.msg);
                swal( "操作失败", response.msg , "error");
			}
		},
	});
});

// Ajax update traffic
function update_um_traffic(p){
	$.ajax({
		type: 'POST', 
		url: um.ajax_url, 
		data: {
			'action' : 'um_tracker_ajax',
			'pid' : p,
			'wp_nonce' : umGetCookie('um_check_nonce')
		},
		success: function(response) {
			//~ @action reset wp nonce ( if response invalid ) and try again
			if($.trim(response)==='NonceIsInvalid'){
				set_um_nonce();
				update_um_traffic(p);
			}
		},
		error: function(){
			//~ @action try again ( if error )
			//update_um_traffic(p);
		}
	});
};

// Ajax follow
$('.follow-btn').click(function(){
	if(um_check_login()){
	var $this = $(this);
	var followed = $this.data('uid'),
		act = $this.data('act'),
		wp_nonce =  umGetCookie('um_check_nonce');
	$.ajax({
		type: 'POST',
		url: um.ajax_url,
		dataType: 'json',
		data: {
			'action' : 'follow',
			'followed' : followed,
			'act' : act,
			'wp_nonce' : wp_nonce
		},
		success : function(response){
			if($.trim(response)==='NonceIsInvalid'){
				set_um_nonce();
                swal( "操作失败" , "操作失败,请重试！", "error");
				//umAlert('操作失败,请重试');
			}else if(response.success===1){
				switch(response.type){
					case 1:
						$this.data('act','disfollow');
						$this.removeClass('unfollowed').removeClass('current').addClass('followed');
						$this.parent().children('.pm-btn').addClass('current');
						$this.html('<i class="fa fa-check"></i>已关注');
						break;
					case 2:
						$this.data('act','disfollow');
						$this.removeClass('unfollowed').removeClass('current').addClass('followed');
						$this.parent().children('.pm-btn').addClass('current');
						$this.html('<i class="fa fa-exchange"></i>互相关注');
						break;
					default:
						$this.data('act','follow');
						$this.removeClass('followed').addClass('current unfollowed');
						$this.parent().children('.pm-btn').removeClass('current');
						$this.html('<i class="fa fa-plus"></i>关 注');
				}
                swal( "操作成功", response.msg, "success");
				//umAlert(response.msg);
			}else{
                swal( "操作失败", response.msg, "error");
				//umAlert(response.msg);
			}
		},

	});
	}
});

// Avatar rotate
$("#main-wrap img.avatar").mouseover(function(){
	$(this).addClass("avatar-rotate");
});

$("#main-wrap img.avatar").mouseout(function(){
	$(this).removeClass("avatar-rotate");
});

// Withdraw
$('button#withdrawSubmit').click(function(){
	var $this = $(this);
	if($this.hasClass('disabled'))return;
	var sum = $('input#balance').val();
	var money = $('input#withdrawNum').val();
	if(Number(money)>Number(sum)){alert('提现金额不能大于余额');return false;}
	$.ajax({
		type:"POST",
		dataType:'json',
		url:um.ajax_url,
		data:{"action":"withdraw","money":money},
		beforeSend:function(){$this.addClass('disabled').prepend(umRefreshIcon);},
		success:function(response){
			if(response.success===1){
				$('#withdraw').html('<p>提现申请提交成功，请等待管理员处理，同时请完善个人信息中支付宝账号等信息以便收款</p>');
				setTimeout(function(){location.replace(location.href)},1000);
			}else{
				$this.removeClass('disabled').html('申请提现');
				//umAlert(response.msg);
                swal(  "操作成功", response.msg , "success");
			}
		}
	});
	return false;
});

// Admin confirm payed the withdraw
$('a.confirm_payed_withdraw').click(function(){
	var $this = $(this),
	id = $this.attr('data-id');
	if($this.hasClass('disabled'))return;
	if(!confirm('你确认已支付了该提现请求吗？'))return;
	$.ajax({
		type:"POST",
		dataType:'json',
		url:um.ajax_url,
		data:{"action":"confirm_payed_withdraw","id":id},
		beforeSend:function(){$this.addClass('disabled');},
		success:function(response){
			if(response.success===1){
				$this.parent('td').html('');
			}else{
				$this.removeClass('disabled');
				//umAlert(response.msg);
                swal(  "操作失败", response.msg , "error");
			}
		}
	});
	return false;

});

$('.ban-btn').on('click',function(){
    var $this = $('.ban-btn');
    $.ajax({
		type: 'POST', 
        dataType: 'json',
		url: um.ajax_url,//location.href,
		data: $this.data(),
        beforeSend:function(){$this.addClass('disabled').prepend(umRefreshIcon);},
		success:function(response){
            swal(response.msg,'', response.ico);
            $this.removeClass('disabled');
            $this.find('i').remove();
            setTimeout(function(){ parent.location.reload()}, 2500);
		},
		error: function(xhr,errorText,errorType){
            swal( '操作失败','请重试', 'error');
            $this.removeClass('disabled');
            $this.find('i').remove();
		}
	});
	return false;
});
//oauth last
$('#bind-account').on('click',function(){
  	var $this = $(this);
    if($this.hasClass('disabled'))return;
	var username = $('#inputUsername').val();
	var userpass = $('#inputPassword').val();
    var type = $('#oauthType').val();
    if(username == ''|| userpass == ''){swal( "操作失败 ", "邮箱或者密码不能为空","error");return false;}else if(!username.match('^([a-zA-Z0-9_-])+((\.)?([a-zA-Z0-9_-])+)+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9_-])+)+$')){swal( "操作失败 ", "邮箱格式不正确","error");return false;}else if(userpass.length < 6){swal( "操作失败 ", "密码不能少于6位数","error");return false;}
    $.ajax({
		type: 'POST', 
        dataType: 'json',
		url: location.href,//um.ajax_url,//location.href,
		data: {
            //'action': 'oauth_last',
			'username': username,
			'userpass': userpass,
            'type':type
		},
        beforeSend:function(){$this.addClass('disabled').prepend(umRefreshIcon);},
		success:function(response){
            if(response.success===1){
               swal(response.msg,"", response.ico);
               setTimeout(function(){ $(window).attr('location',response.redirect);}, 2500);
            }else{
               swal(response.msg,"", response.ico);
               $this.removeClass('disabled');
               $this.find('i').remove();
            }
		},
		error: function(){
            swal( "操作失败 ",'请重试', 'error');
            $this.removeClass('disabled');
            $this.find('i').remove();
		}
	});
	return false;
});

// Refresh captcha
  $('img.captcha_img').bind('click',function(){
  	//var captcha = um.um_url+'/template/captcha.php?'+Math.random();
  	var captcha = um.wp_url+"/site/captcha?t=" + Math.random();
  	$(this).attr('src',captcha);

  });

// Document ready
// -------------------- //
$(document).ready(function(){
	// follow and pm btn add class
	if($('.fp-btns .follow-btn').hasClass('unfollowed')){$('.fp-btns .follow-btn').addClass('current');$('.fp-btns .pm-btn').removeClass('current');}else{$('.fp-btns .follow-btn').removeClass('current');$('.fp-btns .pm-btn').addClass('current');};
	
  	//Upload avatar
    $(function(){
    	var $file = $('#upload-avatar input[type=file]');
    	$file.change(function(){
    		if($(this).val() != ""){
    			document.getElementById('info-form').enctype = "multipart/form-data";
    			$('form#info-form').submit();
    		}
    	})
    });
    
    // SHARE
	var share = {
        url: document.URL,
        pic: $('.product-thumb img').attr('src'),
        title: document.title || '',
        desc: $('meta[name="description"]').length ? $('meta[name="description"]').attr('content') : ''    
    }

    $('.wx_share').each(function(){
	    if( !$(this).find('.share-popover').length ){
			$(this).append('<span class="share-popover"><span class="share-popover-inner" id="weixin-qrcode"></span></span>')
			$('#weixin-qrcode').qrcode({
				width: 80,
				height: 80,
				text: $(this).data('url')
			})
		}
	})

	$('[etap="share"]').on('click', function(){
		var dom = $(this)
		var to = dom.data('share')
		var url = ''
		switch(to){
	        case 'qq':
	            url = 'http://connect.qq.com/widget/shareqq/index.html?url='+share.url+'&desc='+share.desc+'&summary='+share.title+'&site=zeshlife&pics='+share.pic
	            break;
	        case 'weibo':
	            url = 'http://service.weibo.com/share/share.php?title='+share.title+'&url='+share.url+'&source=bookmark&pic='+share.pic
	            break;
	        case 'douban':
	            url = 'http://www.douban.com/share/service?image='+share.pic+'&href='+share.url+'&name='+share.title+'&text='+share.desc
	            break;
	        case 'qzone':
	            url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+share.url+'&title='+share.title+'&desc='+share.desc
	            break;
	        case 'tqq':
	            url = 'http://share.v.t.qq.com/index.php?c=share&a=index&url='+share.url+'&title='+share.title
	            break;
	        case 'renren':
	            url = 'http://widget.renren.com/dialog/share?srcUrl='+share.pic+'&resourceUrl='+share.url+'&title='+share.title+'&description='+share.desc
	            break;
	        case 'line':
	            url = 'http://line.naver.jp/R/msg/text/?'+share.title+'%0D%0A'+share.url
	            break;
	        case 'twitter':
	            url = 'https://twitter.com/intent/tweet?text='+share.title+'&url='+share.url
	            break;
	        case 'facebook':
	            url = 'https://www.facebook.com/sharer/sharer.php?u='+share.url+'&title='+share.title+'&description='+share.desc
	            break;
	    }
	    if( !dom.attr('href') && !dom.attr('target') ){
	    	dom.attr('href', url).attr('target', '_blank')
	    }
	})

  
	// action um affiliate url and trackback url
	$('.um_aff_url').click(function(){
		$(this).select();
	});

	// action set affiliate cookie ( credit )
	if(umGetQueryString('aff')) umSetCookie('um_aff',umGetQueryString('aff'),86400,um.home);

	// action update traffic
	if(!(typeof(um.pid) == "undefined")) update_um_traffic(um.pid);
	
	// Store info area switch
	$(function() {
        var $wrapNav       = $('#wrapnav ul.nav'),
            $wrapNavLis    = $wrapNav.children('li');
        if($wrapNav.length>0)$wrapNav.each(function() {
            var $this = $(this);
            $this.children('li').first().addClass('active');
            $($this.find('a').attr('href')).show();
        });

        $wrapNavLis.on('click', function(e) {
            var $this = $(this);
            if($this.hasClass('active')) return;
            $this.siblings().removeClass('active').end().addClass('active');
            $this.parent().parent().next().children('.wrapbox').stop(true,true).hide().siblings( $this.find('a').attr('href') ).fadeIn();
            e.preventDefault();
        })//.children( window.location.hash ? 'a[href=' + window.location.hash + ']' : 'a:first' ).trigger('click');

	});

	// Change cover
	var F;
	$("#custom-cover").click(function(A){
		A.preventDefault();
		A.returnValue=false;
		$("#cover-change").fadeIn();return false
	});
	$("#cover-list ul li a.basic").click(function(A){
		A.preventDefault();
		A.returnValue=false;
		if($(this).hasClass("selected")){return}
			F=$(this).children('img').attr('src');
		var C=$("#cover img"),B=F.replace('-small','-full');
		C.attr("src",B);
		$("#cover-list ul li a.selected").removeClass("selected");
		$(this).addClass("selected");
		return false;
	});
	$("#cover-close,#cover-cancle").click(function(A){
		A.preventDefault();
		A.returnValue=false;
		$("#cover-change").fadeOut();
		return false;
	});
	$("#cover-sure").bind('click',function(A){
		A.preventDefault();
		A.returnValue=false;
		var B = $(this).attr("curuserid"),
		    default_cover = $("a#uploaded-cover").children("img").attr("src");
		F = (F!=null) ? F.replace('-small','-full') : default_cover.replace('-small','-full');
		$.ajax({
			type:"POST",
			dataType:'json',
			url:um.ajax_url,
			data:{"action":"author_cover","user":B,"cover":F},
			beforeSend:function(){$(this).addClass("loading")},
			success:function(C){
				$(this).removeClass("loading");
				if(C.success===1){$("#cover-close").click()}
			}
		});
		return false;
	});
	
	
	// Upload cover
	/*$("a#upload-cover").click(function(G){
		G.preventDefault();
		var I=$(this),B=$("a#uploaded-cover").children("img"),C=$("#cover img");
		formfield=B.attr("src");
		tb_show("",um.admin_url+"media-upload.php?type=image&amp;TB_iframe=true");
		window.send_to_editor=function(D){
			imgurl=$("img",D).attr("src");
			B.attr('src',um.timthumb+imgurl+"&w=240&h=64&zc=1&q=100");C.attr('src',um.timthumb+imgurl+"&w=1200&h=300&zc=1&q=100");
			var F = imgurl;//um.timthumb+imgurl+"&w=1200&h=300&zc=1&q=100";
			var E = $("#cover-sure").attr("curuserid");
			$.ajax({
				type:"POST",
				dataType:'json',
				url:um.ajax_url,
				data:{"action":"author_cover","user":E,"cover":F},
				success:function(C){
					if(C.success===1){$("#cover-close").click()}
				}
			});
			tb_remove();
		};return false
	});*/
    
	jQuery('a#upload-cover').on('click',function(e){  
      	var upload_frame;
        var I = $(this),
            B = $("a#uploaded-cover").children("img"),
            C = $("#cover img");
	    //var value_id; 
		//value_id =jQuery( this ).attr('id');       
		event.preventDefault();   
		if( upload_frame ){   
			upload_frame.open();   
			return;   
		}   
		upload_frame = wp.media({   
			title: '插入图片',   
			button: {   
				text: '插入',   
			},   
			multiple: false   
		});   
		upload_frame.on('select',function(){   
			attachment = upload_frame.state().get('selection').first().toJSON();   
			//jQuery('input[name='+value_id+']').val(attachment.url); 
            B.attr('src',um.timthumb+attachment.url+"&w=240&h=64&zc=1&q=100");
            C.attr('src',um.timthumb+attachment.url+"&w=1200&h=300&zc=1&q=100");;
			var E = $("#cover-sure").attr("curuserid");
			F = attachment.url;//imgurl;//um.timthumb+imgurl+"&w=1200&h=300&zc=1&q=100"
			$.ajax({
				type:"POST",
				dataType:'json',
				url:um.ajax_url,
				data:{"action":"author_cover","user":E,"cover":F},
				success:function(C){
					if(C.success===1){$("#cover-close").click()}
				}
			});
		});	   
		upload_frame.open();   
	});   
 
  
    $(function () { 
	  $("[data-toggle='popover']").popover({
       html:true,
      });
    });
    
    
    $('.forum-tab').on('click', '.forum-tab-item', function(){
        var index = $(this).index();
        $('.forum-tab-item').removeClass('active');
        $('.forum-content').removeClass('active');
        $('.forum-tab-item').eq(index).addClass('active');
        $('.forum-content').eq(index).addClass('active');
    });

    var submited = 0;
    // 用户中心
    $('.forum-profile').on('click', '.j-user-questions,.j-user-answers', function(){
        if(submited) return;
        submited = 1;
        var $this = $(this);
        if($this.hasClass('disabled')) {
            submited = 0;
            return;
        }

        var data = null;
        var page = $this.data('page');
        page = page ? page + 1 : 2;

        var id = $('.forum-tab').data('user');
        if( $this.hasClass('j-user-questions') ){
            data = {action: 'forum_user_questions', user: id?id:0, page:page};
        }else if( $this.hasClass('j-user-answers') ){
            data = {action: 'forum_user_answers', user: id?id:0, page:page};
        }

        $this.parent().addClass('loading');
        $.ajax({
            type: 'POST',
            url: um.ajax_url,
            data: data,
            dataType: 'html',
            success: function(data) {
                if(data=='0'){
                    $this.addClass('disabled').text('已经到底了');
                }else{
                    //var $data1 = $(data);
                    $this.parent().before(data);
                    //$data.find('.j-lazy').lazyload({
                    //    threshold : -50, //距离50像素触发
                    //    effect : "fadeIn" //显示特效
                    //});
                    $this.data('page', page);
                    $(window).trigger('scroll');
                }
                $this.parent().removeClass('loading');
                submited = 0;
            },
            error: function(){
                $this.parent().removeClass('loading');
                submited = 0;
            }
        });
    });

});