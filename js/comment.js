tbfine(function (){

return {
	init: function (){

		(function($){

	　　$('.commentlist .url').attr('target','_blank')

		$('.comment-user-change').on('click', function(){
			$(this).hide()
			$('#comment-author-info').slideDown(300)
		})

		/* 
	     * comment
	     * ====================================================
	    */
	    var edit_mode = '0',
	        txt1 = '<div class="comt-tip comt-loading">评论提交中...</div>',
	        txt2 = '<div class="comt-tip comt-error">#</div>',
	        txt3 = '">',
	        cancel_edit = '取消编辑',
	        edit,
	        num = 1,
	        comm_array = [];
	    comm_array.push('');

	    $comments = $('#comments-title');
	    $cancel = $('#cancel-comment-reply-link');
	    cancel_text = $cancel.text();
	    $submit = $('#commentform #submit');
	    $submit.attr('disabled', false);
	    $('.comt-tips').append(txt1 + txt2);
	    $('.comt-loading').hide();
	    $('.comt-error').hide();
	    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
	    $('#commentform').submit(function() {
	        $('.comt-loading').slideDown(300);
	        $submit.attr('disabled', true).fadeTo('slow', 0.5);
	        if (edit) $('#comment').after('<input type="text" name="edit_id" id="edit_id" value="' + edit + '" style="display:none;" />');
	        $.ajax({
	            url: jsui.uri + '/action/comment.php',
	            data: $(this).serialize(),
	            type: $(this).attr('method'),
	            error: function(request) {
	                $('.comt-loading').slideUp(300);
	                $('.comt-error').slideDown(300).html(request.responseText);
	                setTimeout(function() {
	                        $submit.attr('disabled', false).fadeTo('slow', 1);
	                        $('.comt-error').slideUp(300)
	                    },
	                    3000)
	            },
	            success: function(data) {
	                $('.comt-loading').slideUp(300);
	                comm_array.push($('#comment').val());
	                $('textarea').each(function() {
	                    this.value = ''
	                });
	                var t = addComment,
	                    cancel = t.I('cancel-comment-reply-link'),
	                    temp = t.I('wp-temp-form-div'),
	                    respond = t.I(t.respondId),
	                    post = t.I('comment_post_ID').value,
	                    parent = t.I('comment_parent').value;
	                if (!edit && $comments.length) {
	                    n = parseInt($comments.text().match(/\d+/));
	                    $comments.text($comments.text().replace(n, n + 1))
	                }
	                new_htm = '" id="new_comm_' + num + '"></';
	                new_htm = (parent == '0') ? ('\n<ol style="clear:both;" class="commentlist commentnew' + new_htm + 'ol>') : ('\n<ul class="children' + new_htm + 'ul>');
	                ok_htm = '\n<span id="success_' + num + txt3;
	                ok_htm += '</span><span></span>\n';

	                if (parent == '0') {
	                    if ($('#postcomments .commentlist').length) {
	                        $('#postcomments .commentlist').before(new_htm);
	                    } else {
	                        $('#respond').after(new_htm);
	                    }
	                } else {
	                    $('#respond').after(new_htm);
	                }

	                $('.comment-user-change').show()
	                $('#comment-author-info').slideUp()

	                if( !$('.comment-user-avatar-name').length ){
	                	$('.comt-title img').after('<p class="comment-user-avatar-name"></p>')	
	                }
	                $('.comment-user-avatar-name').text( $('#commentform #author').val() )

	                // console.log( $('#new_comm_' + num) )
	                $('#new_comm_' + num).hide().append(data);
	                $('#new_comm_' + num + ' li').append(ok_htm);
	                $('#new_comm_' + num).fadeIn(1000);
	                /*$body.animate({
	                        scrollTop: $('#new_comm_' + num).offset().top - 200
	                    },
	                    500);*/
	                $('#new_comm_' + num).find('.comt-avatar .avatar').attr('src', $('.commentnew .avatar:last').attr('src'));
	                countdown();
	                num++;
	                edit = '';
	                $('*').remove('#edit_id');
	                cancel.style.display = 'none';
	                cancel.onclick = null;
	                t.I('comment_parent').value = '0';
	                if (temp && respond) {
	                    temp.parentNode.insertBefore(respond, temp);
	                    temp.parentNode.removeChild(temp)
	                }
	            }
	        });
	        return false
	    });
	    addComment = {
	        moveForm: function(commId, parentId, respondId, postId, num) {
	            var t = this,
	                div, comm = t.I(commId),
	                respond = t.I(respondId),
	                cancel = t.I('cancel-comment-reply-link'),
	                parent = t.I('comment_parent'),
	                post = t.I('comment_post_ID');
	            if (edit) exit_prev_edit();
	            num ? (t.I('comment').value = comm_array[num], edit = t.I('new_comm_' + num).innerHTML.match(/(comment-)(\d+)/)[2], $new_sucs = $('#success_' + num), $new_sucs.hide(), $new_comm = $('#new_comm_' + num), $new_comm.hide(), $cancel.text(cancel_edit)) : $cancel.text(cancel_text);
	            t.respondId = respondId;
	            postId = postId || false;
	            if (!t.I('wp-temp-form-div')) {
	                div = document.createElement('div');
	                div.id = 'wp-temp-form-div';
	                div.style.display = 'none';
	                respond.parentNode.insertBefore(div, respond)
	            }!comm ? (temp = t.I('wp-temp-form-div'), t.I('comment_parent').value = '0', temp.parentNode.insertBefore(respond, temp), temp.parentNode.removeChild(temp)) : comm.parentNode.insertBefore(respond, comm.nextSibling);
	            $body.animate({
	                    scrollTop: $('#respond').offset().top - 180
	                },
	                400);
	                // pcsheight()
	            if (post && postId) post.value = postId;
	            parent.value = parentId;
	            cancel.style.display = '';
	            cancel.onclick = function() {
	                if (edit) exit_prev_edit();
	                var t = addComment,
	                    temp = t.I('wp-temp-form-div'),
	                    respond = t.I(t.respondId);
	                t.I('comment_parent').value = '0';
	                if (temp && respond) {
	                    temp.parentNode.insertBefore(respond, temp);
	                    temp.parentNode.removeChild(temp)
	                }
	                this.style.display = 'none';
	                this.onclick = null;
	                return false
	            };
	            try {
	                t.I('comment').focus()
	            } catch (e) {}
	            return false
	        },
	        I: function(e) {
	            return document.getElementById(e)
	        }
	    };

	    $('.comment-reply-link').on('click', function(){
	        var that = $(this)
	        if( !that.attr('onclick') && that.data('belowelement') && that.data('commentid') && that.data('respondelement') && that.data('postid') ){
	            return addComment.moveForm( that.data('belowelement'), that.data('commentid'), that.data('respondelement'), that.data('postid') )
	        }
	    })

	    function exit_prev_edit() {
	        $new_comm.show();
	        $new_sucs.show();
	        $('textarea').each(function() {
	            this.value = ''
	        });
	        edit = ''
	    }
	    var wait = 15,
	        submit_val = $submit.val();

	    function countdown() {
	        if (wait > 0) {
	            $submit.val(wait);
	            wait--;
	            setTimeout(countdown, 1000)
	        } else {
	            $submit.val(submit_val).attr('disabled', false).fadeTo('slow', 1);
	            wait = 15
	        }
	    }

	    })(jQuery)
	}
}

})



$(document).ready(function () { 
	
	//表情颜色弹窗
	$("#comment-smiley").on('click',function(){   
		$("#smiley").toggle(500);   
	});  
	$("#font-color").on('click',function(){   
		$("#fontcolor").toggle(500);   
	}); 
	
	
	//表情符号切换
	$("a.et_smilies").on('click',function() {
        $('#smilies-container').toggle(function() {
            $(document).click(function(event) {
                if (!($(event.target).is('#smilies-container') || $(event.target).parents('#smilies-container').length || $(event.target).is('a.et_smilies'))) {
                    $('#smilies-container').hide(200);
                }
            });
        });
    });
    

    // 获取cookie
	if(getCookie('user_avatar') && getCookie('user_qq') ){
		//$('.comt-title img').attr('src',getCookie('user_avatar')); 
		$('#comt-qq').val(getCookie('user_qq'));  //获取缓存QQ号
	}
	
	//获取QQ信息
	$('#comt-qq').on('blur',function(){
		var qq=$('#comt-qq').val(); // 获取访客填在qq表单上的qq数字，其中#comt-qq表示QQ input标签上的id！
		$('#email').val($.trim(qq)+'@qq.com'); // 将获取到的qq，改成qq邮箱填入邮箱表单，其中#email表示邮箱input标签上的id
		// ajax方法获取昵称
		$.ajax({
			type: 'get',
			url:jsui.uri+'/template/getqqinfo.php?type=getqqnickname&qq='+qq,  
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'portraitCallBack',
			success: function(data) {
				// console.log(data);
				$('#author').val(data[qq][6]);	// 将返回的qq昵称填入到昵称input表单上
				setCookie('user_qq',qq);	// 设置cookie
			},
			error: function() {
				$('#comt-qq,#author,#email').val(''); // 获取昵称失败清空表单			
			}
		});
		// 获取头像
		$.ajax({
			type: 'get',
			url:jsui.uri+'/template/getqqinfo.php?type=getqqavatar&qq='+qq, 
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'qqavatarCallBack',
			success: function(data) {		
				$('.comt-title img').attr('src',data[qq]);	// 将返回的qq头像设置到你评论表单区域显示头像的节点上
				setCookie('user_avatar',data[qq]);	 // 设置cookie
			},
			error: function() {
				$('#comt-qq,#author,#email').val(''); // 获取头像失败清空表单
			}
		});
	});
	
	
	// 评论编辑器
    function addEditor(a, b, c) {
        if (document.selection) {
            a.focus();
            sel = document.selection.createRange();
            c ? sel.text = b + sel.text + c: sel.text = b;
            a.focus()
        } else if (a.selectionStart || a.selectionStart == '0') {
            var d = a.selectionStart;
            var e = a.selectionEnd;
            var f = e;
            c ? a.value = a.value.substring(0, d) + b + a.value.substring(d, e) + c + a.value.substring(e, a.value.length) : a.value = a.value.substring(0, d) + b + a.value.substring(e, a.value.length);
            c ? f += b.length + c.length: f += b.length - e + d;
            if (d == e && c) f -= c.length;
            a.focus();
            a.selectionStart = f;
            a.selectionEnd = f
        } else {
            a.value += b + c;
            a.focus()
        }
    }
	
    var g = document.getElementById('comment') || 0;
    var h = {
        strong: function() {
            addEditor(g, '<strong>', '</strong>')
        },
        em: function() {
            addEditor(g, '<em>', '</em>')
        },
        del: function() {
            addEditor(g, '<del>', '</del>')
        },
        underline: function() {
            addEditor(g, '<u>', '</u>')
        },
        quote: function() {
            addEditor(g, '<blockquote>', '</blockquote>')
        },
        ahref: function() {
            var a = prompt('请输入链接地址', 'http://');
            var b = prompt('请输入链接描述', '');
            if (a) {
                addEditor(g, '<a target="_blank" href=”' + a + '" rel="external”>' + b + '</a>', '')
            }
        },
        img: function() {
        	var $el = jQuery('.comt-box').parent();
        	var timer = null;
        	var a = null;
        	var b = null;
        	
        	var input = document.createElement('input');
        	input.setAttribute('type', 'file');
        	input.setAttribute('accept', 'image/*');
        	
        	function notice(type, msg, time){
        		clearTimeout(timer);
        		jQuery('#notice').remove();
        		$el.append('<div id="notice"><div class="notice-bg"></div><div class="notice-wrap"><div class="notice-inner notice-'+type+'">'+msg+'</div></div></div>');
        		if(time) {
        			timer = setTimeout(function () {
        				jQuery('#notice').remove();
        			}, time);
        		}
        	}
        	
        	function img_post() {
        		var fd = new FormData();
        		fd.append( "upfile", input.files[0]);
        		fd.append( "action", 'forum_img_upload');      
        		jQuery.ajax({
        			type: 'POST',
        			url: um.ajax_url,
        			data: fd, 
        			processData: false,
        			contentType: false,
        			dataType: 'json',
        			success: function(data, textStatus, XMLHttpRequest) {
        				clearTimeout(timer);
        				jQuery('#notice').remove();
        				if(data.result=='0'){
        					a = data.image.url;
        					b = data.image.alt;
        					if(a){addEditor(g, '<img src="' + a + '" alt="' + b + '" />', '')}
        				}else{
        					notice(0, '图片上传出错，请稍后再试！', 1200);
        				}
        			},
        			error: function(MLHttpRequest, textStatus, errorThrown) {
        				clearTimeout(timer);
        				jQuery('#notice').remove();
        				alert(errorThrown);
        			}
        		});
        	}
        	
        	input.onchange = function() {
        		var file = this.files[0];
        		
        		if(file){
        			if(!/\.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(file.name)){
        				notice(0, '仅支持上传jpg、png、gif格式的图片文件', 2000);
        				return false;
        			}else if(file.size > 2 * 1024 * 1024){
        				notice(0, '图片大小不能超过2M', 1500);
        				return false;
        			}else{
        				img_post();
        				notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在上传...', 0);
        			}
        		}
        	};
        	input.click();
        },
        code: function() {
            addEditor(g, '<code>', '</code>')
        },
        empty: function() {
            g.value = "";
            g.focus()
        },
        red: function() {   
            addEditor(g, '<font color="red">', '</font>')   ;
        },   
        green: function() {   
            addEditor(g, '<font color="green">', '</font>')   ;
        },   
        blue: function() {   
           addEditor(g, '<font color="blue">', '</font>')   ;
        },   
        magenta: function() {   
            addEditor(g, '<font color="magenta">', '</font>')   ;
        },   
        yellow: function() {   
           addEditor(g, '<font color="yellow">', '</font>')   ;
        },   
        chocolate: function() {   
           addEditor(g, '<font color="chocolate">', '</font>')   ;
        },   
        black: function() {   
           addEditor(g, '<font color="black">', '</font>')   ;
        },   
        aquamarine: function() {   
           addEditor(g, '<font color="aquamarine">', '</font>')   ;
        },   
        lime: function() {   
           addEditor(g, '<font color="lime">', '</font>')   ;
        },   
        fuchsia: function() {   
          addEditor(g, '<font color="fuchsia">', '</font>')   ;
        },   
        orange: function() {   
           addEditor(g, '<font color="orange">', '</font>')   ;
        },   
        thistle: function() {   
            addEditor(g, '<font color="thistle">', '</font>')   ;
        },   
        brown: function() {   
            addEditor(g, '<font color="brown">', '</font>')   ;
        },   
        peru: function() {   
            addEditor(g, '<font color="peru">', '</font>')   ;
        },   
        deeppink: function() {   
            addEditor(g, '<font color="deeppink">', '</font>')   ;
        },   
        purple: function() {   
            addEditor(g, '<font color="purple">', '</font>')   ;
        },   
        slategray: function() {   
            addEditor(g, '<font color="slategray">', '</font>')   ;
        },   
        tomato: function() {   
            addEditor(g, '<font color="tomato">', '</font>')   ;
        }, 
		daka:function(){
			var NowTime = new Date().toLocaleString() ;
			addEditor(g, '签到成功！签到时间：' + NowTime ,'，每日打卡，生活更精彩哦~') 
		}
    };
    window['SIMPALED'] = {};
    window['SIMPALED']['Editor'] = h
}); 


// 设置cookie 
function setCookie(a,c){var b=30;var d=new Date();d.setTime(d.getTime()+b*24*60*60*1000);document.cookie=a+"="+escape(c)+";expires="+d.toGMTString()}
// 获取cookie
function getCookie(b){var a,c=new RegExp("(^| )"+b+"=([^;]*)(;|$)");if(a=document.cookie.match(c)){return unescape(a[2])}else{return null}}