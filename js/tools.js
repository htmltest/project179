$(document).ready(function() {

    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false
    }).on('setPosition', function(event, slick) {
        $('.slider .slick-dots li button.active').removeClass('active');
        $('.slider .slick-dots li button').eq($('.slider').slick('slickCurrentSlide')).addClass('active');
    });

    $('.links a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length == 1) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - 50});
        }
        e.preventDefault();
    });

    $('.tech-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true
    });

    $('.video-list-inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: false
    }).on('setPosition', function(event, slick) {
        $('.video-ctrl a.active').removeClass('active');
        $('.video-ctrl a').eq($('.video-list-inner').slick('slickCurrentSlide')).addClass('active');
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.video-item-inner.start').removeClass('start');
		$('.video-item-player').html('');

        $('.video-ctrl a.active').removeClass('active');
        $('.video-ctrl a').eq(nextSlide).addClass('active');
    });

    $('.video-ctrl a').click(function(e) {
        if (!$(this).hasClass('active')) {
            var curIndex = $('.video-ctrl a').index($(this));
            $('.video-list-inner').slick('slickGoTo', curIndex);
        }
        e.preventDefault();
    });

	$('body').on('click', '.video-item-link', function(e) {
        $('.video-item-inner.start').removeClass('start');
		$('.video-item-player').html('');
		$(this).parent().addClass('start');
		$(this).parent().find('.video-item-player').html('<iframe width="560" height="315" src="' + $(this).attr('href') + '?rel=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
		e.preventDefault();
	});

    $('.gallery-list').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        dots: true
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('data-window'));
        e.preventDefault();
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

});

function windowOpen(windowID) {
    var curPadding = $('.wrapper').width();
    var curScroll = $(window).scrollTop();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    $('.wrapper').css({'top': -curScroll});
    $('.wrapper').data('curScroll', curScroll);

    $('.window[data-window="' + windowID + '"]').addClass('visible');
}

function windowClose() {
    $('.window').removeClass('visible');
    $('html').removeClass('window-open');
    $('body').css({'margin-right': 0});
    $('.wrapper').css({'top': 0});
    $(window).scrollTop($('.wrapper').data('curScroll'));
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.links a:not(.animated), .title:not(.animated), .buy:not(.animated), .tech:not(.animated), .find:not(.animated), .video-list:not(.animated), .video-ctrl:not(.animated), .gallery:not(.animated), .app:not(.animated)').each(function() {
        var curBlock = $(this);
        if ((windowScroll + (windowHeight * 5/6)) > curBlock.offset().top) {
            curBlock.addClass('animated');
        }
    });

    if ($(window).scrollTop() > $(window).height() / 2) {
        $('.up-link').addClass('visible');
    } else {
        $('.up-link').removeClass('visible');
    }
});