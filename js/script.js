$(document).ready(function(){
  var previous_scroll = 0;
  $('body').addClass('scrolling').scrollTop(0);
  setTimeout(function(){
    $('body').removeClass('scrolling');
  },100);
  $(document).on('scroll',function(){
    if($(window).scrollTop() > 20) $('#navbar').addClass('navbar-scroll');
    else $('#navbar').removeClass('navbar-scroll');
    $('.content').each(function(){
      if($(window).scrollTop() >= ($(this).offset()['top']-($(window).height()/3))) $(this).addClass('active');
      else $(this).removeClass('active');
    });
    $('.navbar > .navbar_links > li.active').removeClass('active');
    $('.navbar > .navbar_links > li > a[data-fscroll="#'+$('.content.active:last').attr('id')+'"]').parent().addClass('active');
    if($('.content:not(.active)').is('*')) $('#scrolltip').removeClass('reverse');
    else $('#scrolltip').addClass('reverse');
    if(!$('body').hasClass('scrolling')){
      var do_scrolltop = ($('body').scrollTop()>previous_scroll) ? $('.content:not(.active):first') : $('.content.active:eq('+($('.content.active').length-2)+')');
      if(do_scrolltop.is('*')){
        $('body').addClass('scrolling').animate({scrollTop:do_scrolltop.offset()['top']},1000,function(){
          setTimeout(function(){
            $('body').removeClass('scrolling');
          },100);
        });
      }
      return false;
    }
    previous_scroll = $('body').scrollTop();
  }).trigger('scroll');
  $('[data-fscroll]').click(function(){
    if($($(this).attr('data-fscroll')).is('*')){
      $('body').addClass('scrolling').animate({scrollTop:($($(this).attr('data-fscroll')).offset()['top'])},1000,function(){
        setTimeout(function(){
          $('body').removeClass('scrolling');
        },100);
      });
    }
    return false;
  });
  $('#scrolltip').click(function(){
    $('body').addClass('scrolling').animate({scrollTop: $(this).hasClass('reverse')?0:($('.content:not(.active):first').offset()['top']) },1000,function(){
      setTimeout(function(){
        $('body').removeClass('scrolling');
      },100);
    });
  });
  $('[data-modal]').click(function(){
    $('#modal-backdrop').fadeIn();
    $($(this).attr('data-modal')).fadeIn();
  });
  $('#modal-backdrop').click(function(){
    $(this).fadeOut();
    $('.modal:visible').fadeOut();
  });
});
