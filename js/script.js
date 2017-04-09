$(document).ready(function(){
  var previous_scroll = 0;
  var scrollTimeout = null;
  $('body').addClass('scrolling').scrollTop(0);
  setTimeout(function(){
    $('body').removeClass('scrolling');
  },100);
  $(document)
  .on('scroll',function(){
    if($(window).scrollTop() > 20) $('#navbar').addClass('navbar-scroll');
    else $('#navbar').removeClass('navbar-scroll');
    $('.content').each(function(){
      if($(window).scrollTop() >= ($(this).offset()['top']-($(window).height()/2))) $(this).addClass('active');
      else $(this).removeClass('active');
    });
    $('.navbar > .navbar_links > li.active').removeClass('active');
    $('.navbar > .navbar_links > li > a[data-fscroll="#'+$('.content.active:last').attr('id')+'"]').parent().addClass('active');
    if($('.content:not(.active)').is('*')) $('#scrolltip').removeClass('reverse');
    else $('#scrolltip').addClass('reverse');
    previous_scroll = $('body').scrollTop();
    if (scrollTimeout !== null) clearTimeout(scrollTimeout);
    if(!$('body').hasClass('scrolling')) scrollTimeout = setTimeout(function(){
      $('body').addClass('scrolling');
      $('body').animate({scrollTop:($('.content.active:last').offset()['top'])},1000,function(){
        $('body').removeClass('scrolling');
      });
    },750);
  })
  .trigger('scroll')
  $(window)
  .resize(function(){
    if(($('#deluxe_location>.content-info').innerHeight()+$('.b_l_map').height()-($('.b_l_map:visible').height()||0)) > ($(window).height()-75)) $('#deluxe_location>.content-info .b_l_map').hide();
    else $('#deluxe_location>.content-info .b_l_map').show();
  })
  .trigger('resize');
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
  $('body').append('<div id="modal-backdrop"></div>');
  $('[data-modal]').click(function(){
    if($(this).attr('data-modal')=='close') $('#modal-backdrop,.modal:visible').fadeOut();
    else{
      $('#modal-backdrop').fadeIn();
      $($(this).attr('data-modal')).fadeIn();
    }
  });
  $('#modal-backdrop').click(function(){
    $(this).fadeOut();
    $('.modal:visible').fadeOut();
  });
});
