/************************************************************************
*************************************************************************
@Name :       	QapTcha - jQuery Plugin
@Revison :    	4.2
@Date : 		2014-04-03
@Author:     	 Clove - (30c.org) 
@License :		 Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
 
**************************************************************************
*************************************************************************/
jQuery.QapTcha = {
	build : function(options)
	{
        var defaults = {
			txtLock : '提示：滑动解锁才能登录！',
			txtUnlock : '提示：已解锁可以登录！',
			disabledSubmit : true,
			autoRevert : true,
			PHPfile : myQaptchaJqueryPage,
			autoSubmit : false
        };   
		
		if(this.length>0)
		return jQuery(this).each(function(i) {
			/** Vars **/
			var 
				opts = jQuery.extend(defaults, options),      				jQuerythis = jQuery(this),				form = jQuery('form').has(jQuerythis),				Clr = jQuery('<div>',{'class':'clr'}),				bgSlider = jQuery('<div>',{'class':'bgSlider'}),				Slider = jQuery('<div>',{'class':'Slider'}),				Icons = jQuery('<div>',{'class':'Icons'}),				dis = jQuery(''),TxtStatus = jQuery('<div>',{'class':' TxtStatus dropError',text:opts.txtLock}),				inputQapTcha = jQuery('<input>',{name:generatePass(32),value:generatePass(7),type:'hidden'});
			
			/** Disabled submit button **/
			if(opts.disabledSubmit) form.find('input[type=\'submit\']').attr('disabled','disabled');
			
			/** Construct DOM **/
			bgSlider.appendTo(jQuerythis);			Icons.insertAfter(bgSlider);			TxtStatus.insertAfter(Icons);			Clr.insertAfter(TxtStatus);			dis.insertAfter(Clr);			inputQapTcha.appendTo(jQuerythis);			Slider.appendTo(bgSlider);
			jQuerythis.show();
			Slider.draggable({ 
				revert: function(){
					if(opts.autoRevert)
					{
						if(parseInt(Slider.css("left")) > 150) return false;
						else return true;
					}
				},
				containment: bgSlider,
				axis:'x',
				stop: function(event,ui){
					if(ui.position.left > 150)
					{
						jQuery.post(opts.PHPfile,{
							action : '30corg',
							myQaptcha : inputQapTcha.attr('name')
						},
						function(data) {
							if(!data.error)
							{
								Slider.draggable('disable').css('cursor','default');
								inputQapTcha.val('');
								TxtStatus.text(opts.txtUnlock).addClass('dropSuccess').removeClass('dropError');
								Icons.css('background-position', '-16px 0');
								form.find('input[type=\'submit\']').removeAttr('disabled');
							}
						},'json');
					}
				}
			});
			
			function generatePass(nb) {
		        var chars = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN_-#@';
		        var pass = '';
		        for(i=0;i<nb;i++){
		            var wpos = Math.round(Math.random()*chars.length);
		            pass += chars.substring(wpos,wpos+1);
		        }
		        return pass;
		    }
			
		});
	}
}; jQuery.fn.QapTcha = jQuery.QapTcha.build;