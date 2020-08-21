var timer = null;
function notice(type, msg, time, el){
    var $el = el ? el : jQuery('.mce-tinymce');
    clearTimeout(timer);
    jQuery('#notice').remove();
    $el.append('<div id="notice"><div class="notice-bg"></div><div class="notice-wrap"><div class="notice-inner notice-'+type+'">'+msg+'</div></div></div>');
    if(time) {
        timer = setTimeout(function () {
            jQuery('#notice').remove();
        }, time);
    }
}

function comments_list(list, del){
    var $html = '';
    if(list && list.length){
        for(var i = 0; i<list.length; i++){
            $html += '<li class="as-comments-item" data-id="'+list[i].ID+'">\
            <div class="as-comment-name">'+list[i].user+' <span>'+list[i].date+'</span>'+(del=='1'?'<span><a class="j-del-comment" href="javascript:;">删除</a></span>':'')+'</div>\
            <div class="as-comment-content">'+list[i].content+'</div>\
            </li>';
        }
    }else{
        $html += '<li class="as-comments-none">暂无评论</li>';
    }
    return $html;
}

jQuery(document).ready(function($) {
    var submited = 0;

    var $single = $('.q-single');
    if($single.length){
        $.ajax({
            url: um.ajax_url,
            data: {action: 'forum_views', id: $single.data('id')},
            type: 'POST',
            success: function(res){}
        });
    }

    $('#answer').on('click', '.j-reply', function(){
        var $el = $(this).closest('.as-item');
        if($el.find('.as-comments-box').length){
            $('.as-comments-box').remove();
            $('.as-comments').remove();
        }else{
            var $comments = '<div class="as-comments-box">\
        <form method="post" class="as-comments-form clearfix">\
        <input type="hidden" name="id" value="'+$el.data('aid')+'" >\
    <input class="as-comments-input form-control" name="comment" type="text" placeholder="我来评论" autocomplete="off">\
    <input class="as-comments-submit" type="submit" value="提 交">\
    </form></div>';

            $('.as-comments-box').remove();
            $('.as-comments').remove();
            $el.find('.as-main').append($comments);
            $el.find('.as-comments-input').focus();
        }
    });

    $('#answer').on('click', '.j-reply-list', function(){
        var $el = $(this).closest('.as-item');
        if($el.find('.as-comments').length){
            $('.as-comments-box').remove();
            $('.as-comments').remove();
        }else{
            $('.as-comments-box').remove();
            $('.as-comments').remove();

            $el.find('.as-main').append('<div class="as-comments"><ul class="as-comments-list"><li class="as-comments-none"><img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在加载...</li></ul></div>');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_comments', aid: $el.data('aid')},
                type: 'POST',
                dataType: 'json',
                success: function (res) {
                    if(res.result==0){
                        var $html = comments_list(res.comments, res.delete);
                        $el.find('.as-main .as-comments-list').html($html);
                    }else{
                        $el.find('.as-main .as-comments-list').html('<li class="as-comments-none">参数错误，请重试</li>');
                        notice(0, "参数错误，请重试", 1200, $el);
                    }
                },
                error: function(){
                    $el.find('.as-main .as-comments-list').html('<li class="as-comments-none">请求失败，请重试</li>');
                    notice(0, "请求失败，请重试", 1200, $el);
                }
            });
        }
    }).on('click', '.j-answer-del', function(){
        if(confirm('删除操作无法恢复，并将同时删除当前回复的评论信息，您确定要删除吗？')){
            $el = $(this).closest('.as-item');
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在删除...', 0, $el);

            var answer = $el.data('aid');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_delete_answer', id: answer, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, "操作成功！", 1500, $el);
                        setTimeout(function(){
                            $el.fadeOut('fast', function(){
                                var $parent = $el.closest('.as-list');
                                $el.remove();
                                if($parent.find('.as-item').length==0){
                                    $parent.append('<li class="as-item-none" style="text-align: center;color: #999;padding-top: 10px;">暂无回复</li>');
                                }
                            });
                        }, 1400);
                    }else if(res.result==2){
                        notice(0, "无操作权限！", 1200, $el);
                    }else{
                        notice(0, "操作异常，请重试！", 1200, $el);
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, "操作异常，请稍后再试！", 1200, $el);
                }
            });
        }
    }).on('click', '.j-del-comment', function(){
        if(confirm('删除操作无法恢复，您确定要删除吗？')){
            $el = $(this).closest('.as-comments-item');
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在删除...', 0, $el);

            var comment = $el.data('id');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_delete_comment', id: comment, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, "操作成功！", 1500, $el);
                        setTimeout(function(){
                            $el.fadeOut('fast', function(){
                                var $parent = $el.closest('.as-comments-list');
                                $el.remove();
                                if($parent.find('.as-comments-item').length==0){
                                    $parent.append('<li class="as-comments-none">暂无评论</li>');
                                }
                            });
                        }, 1400);
                    }else if(res.result==2){
                        notice(0, "无操作权限！", 1200, $el);
                    }else{
                        notice(0, "操作异常，请重试！", 1200, $el);
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, "操作异常，请稍后再试！", 1200, $el);
                }
            });
        }
    }).on('click', '.j-answer-top', function(){
    	if(confirm('确定将当前回答设为最佳答案？')){
            $el = $(this).closest('.as-item');
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在设置...', 0, $el);

            var answer = $el.data('aid');
            var question = $('.q-single').data('id');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_set_comment_top', id: answer, qid: question},
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, "操作成功！", 1500, $el);
                        setTimeout(function(){window.location.reload()}, 1400);
                    }else if(res.result==2){
                        notice(0, "无操作权限！", 1200, $el);
                    }else{
                        notice(0, "操作异常，请重试！", 1200, $el);
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, "操作异常，请稍后再试！", 1200, $el);
                }
            });
    		
    	}
    }).on('click', '.j-answer-utop', function(){
    	if(confirm('确定取消当前回答为最佳答案？')){
            $el = $(this).closest('.as-item');
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在设置...', 0, $el);

            var answer = $el.data('aid');
            var question = $('.q-single').data('id');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_set_comment_top', id: answer, qid: question, func: 'un'},
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, "操作成功！", 1500, $el);
                        setTimeout(function(){window.location.reload()}, 1400);
                    }else if(res.result==2){
                        notice(0, "无操作权限！", 1200, $el);
                    }else{
                        notice(0, "操作异常，请重试！", 1200, $el);
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, "操作异常，请稍后再试！", 1200, $el);
                }
            });
    		
    	}
    });

    $('#as-form').submit(function(){
        if(submited) return false;
        submited = 1;
        tinyMCE.triggerSave();
        var content = $('#editor-answer').val();
        if(!$.trim(content)){
            notice(0, "内容不能为空", 1000);
            submited = 0;
            return false;
        }else{
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在提交...', 0);
            $.ajax({
                url: um.ajax_url,
                data: $(this).serialize()+'&action=forum_add_answer',
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    submited = 0;
                    if(res.result==0){
                        notice(1, "提交成功！", 1200);
                        var $item = '<li id="as-'+res.answer.ID+'" class="as-item" data-aid="'+res.answer.ID+'" style="display: none;">\
                            <div class="as-avatar">'+res.user.avatar+'</div>\
                        <div class="as-main">\
                        <div class="as-user">'+res.user.nickname+'</div>\
                        <div class="as-content entry-content">'+res.answer.content+'</div>\
                        <div class="as-action">\
                        <span class="as-time">'+res.answer.date+'</span>\
                        <span class="as-reply-count"><a class="j-reply-list" href="javascript:;">0条评论</a></span>\
                        <span class="as-reply"><a class="j-reply" href="javascript:;">我来评论</a></span>\
                        </div>\
                        </div>\
                        </li>';
                        $('.as-list').append($item);
                        $('#as-'+res.answer.ID).fadeIn();
                        $('.as-item-none').remove();
                        tinyMCE.activeEditor.setContent('');
                    }else if(res.result==101){
                        notice(0, "内容不能为空", 1200);
                    }else if(res.result==2){
                        notice(0, "抱歉，您需要登录才能进行回复", 2000);
                    }else{
                        notice(0, "提交失败，请重试！", 1200);
                    }
                },
                error: function(err){
                    submited = 0;
                    notice(0, "提交失败，请稍后再试！", 1200);
                }
            })
        }
        return false;
    });

    $('#answer').on('submit', '.as-comments-form', function(){
        if(submited) return false;
        submited = 1;
        var content = $(this).find('.as-comments-input').val();
        var $item = $(this).closest('.as-item');
        if(!$.trim(content)){
            notice(0, "内容不能为空", 1200, $item);
            submited = 0;
            return false;
        }else{
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在提交...', 0, $item);
            $.ajax({
                url: um.ajax_url,
                data: $(this).serialize()+'&action=forum_add_comment',
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    submited = 0;
                    if(res.result==0){
                        notice(1, '提交成功', 2000, $item);
                        $item.find('.as-comments-input').val('');
                    }else if(res.result==101){
                        notice(0, "内容不能为空", 1200, $item);
                    }else if(res.result==2){
                        notice(0, "抱歉，您需要登录才能进行回复", 2000, $item);
                    }else{
                        notice(0, "提交失败，请重试！", 1200, $item);
                    }
                },
                error: function(err){
                    submited = 0;
                    notice(0, "提交失败，请稍后再试！", 1200, $item);
                }
            })
        }
        return false;
    });


    $('#question-form').submit(function(){
        if(submited) return false;
        submited = 1;
        tinyMCE.triggerSave();
        var title = $('input[name=title]').val();
        var category = $('select[name=category]').val();
        var content = $('#editor-question').val();
        if(!title){
            notice(0, "请输入标题", 1200);
            submited = 0;
            return false;
        }else if(!category){
            notice(0, "请选择分类", 1200);
            submited = 0;
            return false;
        }else if(!$.trim(content)){
            notice(0, "请输入内容", 1200);
            submited = 0;
            return false;
        }else{
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在提交...', 0);
            $.ajax({
                url: um.ajax_url,
                data: $(this).serialize()+'&action=forum_add_question',
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    submited = 0;
                    if(res.result==0){
                        console.log(res);
                        if($('input[name=id]').val()){
                            notice(1, typeof res.msg === 'undefined'?'更新成功！':res.msg, 1500);
                        }else{
                            submited = 1;
                            notice(1, typeof res.msg === 'undefined'?'发布成功！':res.msg, 1200);
                        }
                        if( typeof res.location !== 'undefined' ){
                            setTimeout(function(){
                                window.location.href = res.location;
                                submited = 0;
                            }, 1200);
                        }
                    }else if(res.result==101){
                        notice(0, "标题、分类和内容不能为空", 1200);
                    }else if(res.result==102){
                        notice(0, "内容长度不能少于10个字符", 1200);
                    }else{
                        notice(0, "提交失败，请重试！", 1200);
                    }
                },
                error: function(err){
                    submited = 0;
                    notice(0, "提交失败，请稍后再试！", 1200);
                }
            })
        }
        return false;
    });

    $('#answer').on('click', '.q-load-more', function(){
        var $el = $(this);
        if($el.hasClass('disabled')) return;
        $el.addClass('disabled').text('正在加载中...');
        var question = $('.q-single').data('id');
        var page = $el.data('page');
        page = page ? page : 2;
        $.ajax({
            url: um.ajax_url,
            data: {action: 'forum_answers_pagination', question: question, page: page},
            type: 'POST',
            dataType: 'json',
            success: function(res){
                if(res.result==0){
                    var $html = '';
                    if(res.answers.length){
                        for(var i=0;i<res.answers.length;i++){
                            $html += '<li id="as-'+res.answers[i].ID+'" class="as-item" data-aid="'+res.answers[i].ID+'">\
                    <div class="as-avatar">'+res.answers[i].avatar+'</div>\
                    <div class="as-main">\
                        <div class="as-user">'+res.answers[i].name+'</div>\
                        <div class="as-content entry-content">'+res.answers[i].content+'</div>\
                        <div class="as-action">\
                            <span class="as-time">'+res.answers[i].time+'</span>\
                            <span class="as-reply-count"><a class="j-reply-list" href="javascript:;">'+res.answers[i].comments+'条评论</a></span>\
                            <span class="as-reply"><a class="j-reply" href="javascript:;">我来评论</a></span>\
                        '+(res.delete=='1'?'<span class="as-del"><a class="j-answer-del" href="javascript:;">删除</a></span>':'')+'</div>\
                    </div>\
                </li>';
                        }
                        $('.as-list').append($html);

                    }else{
                        $('.q-load-more').css('visibility', 'hidden');
                        notice(1, "回复已经全部加载", 1200, $('.as-list'));
                    }
                }else{
                    notice(0, "加载失败，请重试！", 1200, $('.as-list'));
                }
                $el.removeClass('disabled').text('加载更多评论');
                $el.data('page', page+1);
            },
            error: function(err){
                $el.removeClass('disabled').text('加载更多评论');
                notice(0, "加载失败，请稍后再试！", 1200, $('.as-list'));
            }
        });
    });


    $('.topic-header').on('click', '.j-del', function(){
        if(confirm('删除操作无法恢复，并将同时删除当前问题的回复评论信息，您确定要删除吗？')){

            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在删除...', 0, $('.q-entry'));

            var question = $('.q-single').data('id');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_delete_question', id: question, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, "操作成功！", 1500, $('.q-entry'));
                    }else if(res.result==2){
                        notice(0, "无操作权限！", 1200, $('.q-entry'));
                    }else{
                        notice(0, "操作异常，请重试！", 1200, $('.q-entry'));
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, "操作异常，请稍后再试！", 1200, $('.q-entry'));
                }
            });
        }
    }).on('click', '.j-approve', function(){
        if(confirm('确定要将当前问题设置为审核通过吗？')){
            notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在处理...', 0, $('.q-entry'));
            var question = $('.q-single').data('id');
            $.ajax({
                url: um.ajax_url,
                data: {action: 'forum_approve_question', id: question, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, "操作成功！", 1500, $('.q-entry'));
                        $('.j-approve').remove();
                    }else if(res.result==2){
                        notice(0, "无操作权限！", 1200, $('.q-entry'));
                    }else{
                        notice(0, "操作异常，请重试！", 1200, $('.q-entry'));
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, "操作异常，请稍后再试！", 1200, $('.q-entry'));
                }
            });
        }
    }).on('click', '.j-set-top', function(){
        notice(1, '<img class="notice-loading" src="'+jsui.ajaxloading+'"> 正在处理...', 0, $('.q-entry'));
        var question = $('.q-single').data('id');
        $.ajax({
            url: um.ajax_url,
            data: {action: 'forum_set_top', id: question, },
            type: 'POST',
            dataType: 'json',
            success: function(res){
                clearTimeout(timer);
                $('#notice').remove();
                if(res.result==0){
                    notice(1, "操作成功！", 1500, $('.q-entry'));
                    window.location.reload();
                }else if(res.result==2){
                    notice(0, "无操作权限！", 1200, $('.q-entry'));
                }else{
                    notice(0, "操作异常，请重试！", 1200, $('.q-entry'));
                }
            },
            error: function(err){
                clearTimeout(timer);
                $('#notice').remove();
                notice(0, "操作异常，请稍后再试！", 1200, $('.q-entry'));
            }
        });
    });
	
});