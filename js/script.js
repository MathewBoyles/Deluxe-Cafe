$(document).ready(function(){
  $(document).on('scroll',function(){
    if($(window).scrollTop() > 20) $('#navbar').addClass('navbar-scroll');
    else $('#navbar').removeClass('navbar-scroll');
    $('.content').each(function(){
      if($(window).scrollTop() >= ($(this).offset()['top']-($(window).height()/3))) $(this).addClass('active');
      else $(this).removeClass('active');
    });
    $('.navbar > .navbar_social > li.active').removeClass('active');
    $('.navbar > .navbar_social > li > a[data-fscroll="#'+$('.content.active:last').attr('id')+'"]').parent().addClass('active');
    if($('.content:not(.active)').is('*')) $('#scrolltip').removeClass('reverse');
    else $('#scrolltip').addClass('reverse');
  }).trigger('scroll');
  $('[data-fscroll]').click(function(){
    if($($(this).attr('data-fscroll')).is('*')) $('body').animate({scrollTop:($($(this).attr('data-fscroll')).offset()['top'])},1000);
    return false;
  });
  $('#scrolltip').click(function(){
    $('body').animate({scrollTop: $(this).hasClass('reverse')?0:($('.content:not(.active):first').offset()['top']) },1000);
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
