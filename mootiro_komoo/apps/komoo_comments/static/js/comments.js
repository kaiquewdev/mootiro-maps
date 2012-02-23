(function($){
    comments = (function(){
        var $btnShowForm = $('.btnShowForm');
        var $link_subcomments = $('.link_subcomments');
        var $btnFormCommentSubmit = $('.btnFormCommentSubmit');
        var $btnShowMore = $('.btnShowMore');
        var page = 0;
        var csrftoken = $('#formComment').find('input[name=csrfmiddlewaretoken]').val();

        var init = function(){

            // comment form toggle
            $btnShowForm.live('click', function(evt){
                var comment_form;
                evt.preventDefault();

                comment_form = $(evt.target).siblings('.comment-form');
                // if (!comment_form.parent().siblings('.comments-list').length || comment_form.parent().siblings('.comments-list').is(':hidden') ){
                //     // commentsListToggle($(evt.target).siblings('.link_subcomments'))
                //     $(evt.target).siblings('.link_subcomments').slideUp();
                // }
                comment_form.slideToggle('fast');
                return false;
            });

            // add subcomments list
            $link_subcomments.live('click', function(evt){
                evt.preventDefault();
                var link = $(evt.target);

                commentsListToggle(link);
            });

            $btnFormCommentSubmit.live('click', function(evt){
                var form, tmp;
                evt.preventDefault();

                for(tmp = $(evt.target); !tmp.is('form'); tmp = tmp.parent());
                form = tmp;

                $.post(form.attr('action'), form.serialize(), function(data){
                    var div_comments_container, div_comments_list;
                    if (data.success){
                        for(; !tmp.is('.comment-container'); tmp=tmp.parent());
                        div_comments_container = tmp;
                        div_comments_list = div_comments_container.find('.comments-list');
                        div_comments_list.prepend(data.comment);

                        form.parent().slideToggle('fast');
                        form.clearForm();
                    }
                }, 'json');
            });

            $btnShowMore.live('click', function(evt){
                evt.preventDefault();
                var args = {page:++page, wrap:0},
                    urlVars = getUrlVars();

                if (urlVars['height']){
                    args['height'] = urlVars['height'];
                }
                if (urlVars['width']){
                    args['width'] = urlVars['width'];
                }

                $.get('/comments/load', args, function(data){
                    $('.comments-list:first').append(data.comments);
                });
            });

        };

        var commentsListToggle = function(link){
            var tmp, div_comment_container, div_comment_list;

            for(tmp = link; !tmp.is('.comment-container'); tmp=tmp.parent());
            div_comment_container = tmp;

            if (div_comment_container.find('.comments-list').length){
                div_comment_list = div_comment_container.find('.comments-list:first');
                if(!div_comment_list.is(':hidden')){
                    div_comment_list.slideToggle();
                    return false;
                } else {
                   div_comment_list.remove();
                }
            }
            $.get('/comments/load', {parent_id:link.attr('comment-id')}, function(data){
                div_comment_container.append(data.comments);
                if (!div_comment_container.hasClass('odd')){
                    div_comment_container.find('.comment-container').addClass('odd');
                }
                div_comment_container.find('.comments-list').addClass('inner-list').slideToggle('fast');
            });
        };

        return { init : init };
    })();

    $(function(){
        comments.init();
    });

})(jQuery);
