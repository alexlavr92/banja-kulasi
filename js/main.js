
'use strict'

var docWidth = $(window).width(),
    windowHeight = $(window).height()

/* Function Block Scroll */
var blockScroll = function (state) {
    if (state == "open") {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                if ($('body').height() < $(window).height()) {
                    /*   console.log('меньше') */
                    document.body.style.bottom = '0';
                }
            }

        }, 10);
    }
    if (state == "close") {
        if (document.body.hasAttribute('data-body-scroll-fix')) {

            let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

            document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';

            window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение

        }
    }
}
//----------------------//

// Функция установки высоты блока без учета высоты header
let EditHeightDescrWrap = function () {
    if ($('.sb-description-wrapper').length) {
        $('.sb-description-wrapper').css({
            'padding-top': $('header').innerHeight() + 'px',
        })
    }
}
//----------------------//

// Функция загрузки изображений в активной секции где есть backgroun-image
let LoadBackgroundImage = function (bg_elem) {
    var bg_elems = bg_elem.find('[data-bg]:not(.img-load)');
    bg_elems.each(function (i, elem) {
        var newImg = new Image();
        newImg.onload = function () {
            $(elem).css({
                'background-image': 'url(' + $(elem).attr('data-bg') + ')',
            }).addClass('img-load');
            return false
        }
        newImg.src = $(elem).attr('data-bg')
        if (newImg.complete)
            newImg.onload()
    })
    return false
}
//----------------------//

// функция установки высоты блока с bg 
let EditSb_Bg_wrapperTop = function (bg_elem) {
    var Height
    if (docWidth < 1200) {
        Height = screen.height
    }
    else {
        Height = windowHeight
    }
    // console.log(Height)
    // console.log(screen.availHeight)
    bg_elem.css({
        'top': $('header').innerHeight() + 'px',
        'height': Height - $('header').innerHeight() + 'px',
    })
}
//----------------------//

// Функционал создания пагинации//
let InitPaginationDownBtn = function (docWidth) {

    if ($('.sb-section').length > 1) {
        if (docWidth >= 1200) {
            if (!$('.pagination-list.pagination-column').length) {
                var PaginationWrapper
                if ($('.sb-section:first-child').hasClass('sb-section-dark')) {
                    PaginationWrapper = '<ul class="pagination-list pagination-column light flex-block"></ul>'
                }
                else {
                    PaginationWrapper = '<ul class="pagination-list pagination-column dark flex-block"></ul>'
                }
                $(PaginationWrapper).insertAfter('header')

                var PaginationItem = '<li class="pagination-li"><span></span></li>'
                for (var k = 1; k <= $('.sb-section').length; k++) {
                    $(PaginationItem).appendTo('.pagination-column')
                    if (k <= 9)
                        var PaginationItemText = '0' + k
                    else var PaginationItemText = k
                    if (k == 1) {
                        $('.pagination-li:last-child').addClass('active')
                    }
                    $('.pagination-li:last-child').children('span').text(PaginationItemText)
                }
            }
            if (!$('.btn-section-wrapper').length) {
                var BtnDownwrapper = '<div class="btn-section-wrapper"><a href="javascript: void(0)" class="arrow-down-link"><span></span></a></div>'
                $(BtnDownwrapper).insertAfter('header').hide()
                if ($('.sb-section:first-child').hasClass('sb-section-dark')) {
                    $('.btn-section-wrapper').children('.arrow-down-link').addClass('dark')
                }
                $('.btn-section-wrapper').fadeIn()
            }
        }
        else {
            if ($('.pagination-list.pagination-column').length) {
                $('.pagination-list.pagination-column').remove()
            }
        }
    }

}

//----------------------//

jQuery(document).ready(function ($) {

    // функционал отслеживания появления и удаления класса//
    (function (func) {
        // console.log(func)
        $.fn.addClass = function () { // replace the existing function on $.fn
            func.apply(this, arguments); // invoke the original function
            if ($(this).hasClass('section active')) {
                // console.log('active')
                $(this).trigger('classChanged'); // trigger the custom event
            }
            return this; // retain jQuery chainability
        }
    })($.fn.addClass); // pass the original function as an argument

    (function (func) {
        $.fn.removeClass = function () {
            func.apply(this, arguments);
            if ($(this).hasClass('section')) {
                // console.log($(this), arguments)
                $(this).trigger('classChanged');
            }
            return this;
        }
    })($.fn.removeClass);
    //----------------------//




    // Установка параметров для анимируемых объектов
    if ($('.animate').length && docWidth >= 1200) {
        $('.animate').each(function (i, elem) {
            $(elem).css({
                '-webkit-transform': 'translate3d(0, ' + $(elem).attr('animate-offset') + 'px, 0)',
                'transform': 'translate3d(0, ' + $(elem).attr('animate-offset') + 'px, 0)',
                '-webkit-transition-delay': $(elem).attr('animate-delay') + 'ms',
                '-o-transition-delay': $(elem).attr('animate-delay') + 'ms',
                'transition-delay': $(elem).attr('animate-delay') + 'ms',
                '-webkit-transition-duration': $(elem).attr('animate-duration') + 'ms',
                '-o-transition-duration': $(elem).attr('animate-duration') + 'ms',
                'transition-duration': $(elem).attr('animate-duration') + 'ms',
            })
        })
    }
    //----------------------//

    'use strict'

    if (docWidth >= 1200)
        EditHeightDescrWrap()

    if ($('.sb-section-top .slider-wrapper').length) {
        EditSb_Bg_wrapperTop($('.sb-section-top .slider-wrapper'))
    }


    // Отслежнивание появления клааса active у секции
    var SliderIndex = 0
    $('body').on('classChanged', 'section', function () {
        if ($(this).hasClass('active')) {
            // console.log('есть active')
            if (docWidth >= 1200)
                LoadBackgroundImage($(this))
            if (abs_slider && SliderIndex < abs_slider.length) {
                //    console.log(abs_slider.length)
                abs_slider[SliderIndex].update()
                SliderIndex = SliderIndex + 1
            }
            if ($(this).index() == 0 && docWidth > 1200) {
                var AllSectionAnimateElem = $(this).find('.animate')
                AllSectionAnimateElem.each(function (i, elem) {
                    $(elem).css({
                        '-webkit-transform': 'translate3d(0, 0, 0)',
                        'transform': 'translate3d(0, 0, 0)'
                    })
                })
            }
            // if ($(this).find('.scrollbar-inner').length) {
            //     console.log('scrollbar-init')
            //     ScrollBarInit($(this).find('.scrollbar-inner'))
            // }
        }

        /*       else {
                 //console.log('нет active')
                //   console.log('remove class ' + $(this).index())
                      AllSectionAnimateElem.each(function (i, elem) {
                              $(elem).css({
                                  'transform': 'translateY(' + $(elem).attr('animate-offset') + 'px)',
                              })
                          })
              } */
    });


    // Инициализация бибилиотеки валидности номера телефона //
    function InitMaskPhone() {
        if ($('.input-phone').length > 0) {
            $(".input-phone").inputmask({
                mask: "+7 (999) 999-99-99"
            });
        }
    }
    //----------------------//
    InitMaskPhone()

    // Инициализация бибилиотеки маски ввода email //
    function InitMaskEmail() {
        if ($('.input-email').length > 0) {
            $('.input-email').inputmask({
                mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
                greedy: false,
                onBeforePaste: function (pastedValue, opts) {
                    pastedValue = pastedValue.toLowerCase();
                    return pastedValue.replace("mailto:", "");
                },
                definitions: {
                    '*': {
                        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                        casing: "lower"
                    }
                }
            })
        }
    }
    InitMaskEmail()
    //----------------------//

    // Инициализация маски ввода текста //
    function initPrivateTextMask() {
        if ($('html:not(.android) .input-text').length > 0) {
            $("html:not(.android) .input-text").inputmask({
                regex: "[a-zA-Zа-яА-Я]*",
                showMaskOnHover: false
            });
        }
    }
    initPrivateTextMask()
    //----------------------//




    var SpaceNumber = function (NumberElem) {
        NumberElem.each(function (index, element) {
            var valIn = $(this).text()
            var valInNew = valIn.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
            $(this).text(valInNew)
        });
    }
    // добавляем пробелы в числа во всех тегах с классом this-number
    var ThisNumber = $('.this-number')
    SpaceNumber(ThisNumber)
    //----------------------//


    //* Инициализация плагина select2 для стилизации дефолтных селектов *//
    function select_style(w) {
        if ($('.select-custom').length > 0) {
            $('.select-custom').select2({
                minimumResultsForSearch: Infinity,
                theme: 'custom-select',
                language: "ru"
            });
            if (w < 1200) {
                $('.select-custom').select2('destroy');
            }
            return false
        }
    }
    select_style(docWidth)
    //----------------------//

    // Добавление класса в раскрытый select в главном фильтрк на главной странице //
    $('.select-custom').on('select2:open', function (event) {
        $('.select2-container.select2-container--custom-select:not(.select2)')
            .removeClass('select2-dark select2-light')
        if ($(this).hasClass('select-dark')) {
            $('.select2-container.select2-container--custom-select:not(.select2)').addClass('select2-dark')
        }
        if ($(this).hasClass('select-light')) {
            $('.select2-container.select2-container--custom-select:not(.select2)').addClass('select2-light')
        }
    })
    //----------------------//

    if ($('.h-100').length) {
        $('.h-100').css({
            'height': $(window).height() + 'px',
        })
    }


    // Функционал создания пагинации//
    InitPaginationDownBtn(docWidth)
    //----------------------//



    // Инициализация постраничного скролла
    if ($('main.onepage').length) {
        $("main.onepage").onepage_scroll({
            sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
            easing: "ease",            // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
            // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
            animationTime: 1500,     // AnimationTime let you define how long each section takes to animate
            pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
            updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
            beforeMove: function (next, current) {
                // console.log('следующий' + next, 'текущий' + current)
                var ActionSection = $('.section:nth-child(' + next + ')')
                // console.log(ActionSection)
                // Проверка направления слайдинга и функционал смены фона секции
                if (next > current) {
                    // console.log('переключение на следующий')
                    if (ActionSection.prev().hasClass('sb-section-dark') && ActionSection.hasClass('sb-section-dark')) {
                        if (ActionSection.prev().hasClass('sb-section-chok')) {
                            ActionSection.prev().addClass('chok')
                            //   $('body').addClass('chok')
                        }
                        else {
                            ActionSection.prev().addClass('dark')
                            //  $('body').addClass('dark')
                        }
                    }
                    if (ActionSection.prev().hasClass('sb-section-light') && ActionSection.hasClass('sb-section-light')) {
                        ActionSection.prev().addClass('white')
                        // $('body').addClass('white')
                    }
                    var AllSectionPrev = ActionSection.prevUntil()
                    var AllSectionAnimateElem = ActionSection.find('.animate')
                    AllSectionAnimateElem.each(function (i, elem) {
                        $(elem).css({
                            '-webkit-transform': 'translate3d(0, 0, 0)',
                            'transform': 'translate3d(0, 0, 0)',
                        })
                    })
                    AllSectionPrev.each(function () {
                        $(this).find('.animate').each(function (i, elem) {
                            $(elem).css({
                                '-webkit-transform': 'translate3d(0, ' + (-$(elem).attr('animate-offset')) + 'px, 0)',
                                'transform': 'translate3d(0, ' + (-$(elem).attr('animate-offset')) + 'px, 0)',
                            })
                        })
                    })
                }
                else {
                    // console.log('переключение на предыдущий')
                    if (ActionSection.next().hasClass('sb-section-dark') && ActionSection.hasClass('sb-section-dark')) {
                        if (ActionSection.next().hasClass('sb-section-chok')) {
                            ActionSection.addClass('chok')
                            // $('body').addClass('chok')
                        }
                        else {
                            ActionSection.addClass('dark')
                            // $('body').addClass('dark')
                        }
                    }
                    if (ActionSection.next().hasClass('sb-section-light') && ActionSection.hasClass('sb-section-light')) {
                        ActionSection.addClass('white')
                        // $('body').addClass('white')
                    }
                    var AllSectionNext = ActionSection.nextAll()
                    //  console.log(AllSectionNext) 
                    var AllSectionAnimateElem = ActionSection.find('.animate')
                    AllSectionAnimateElem.each(function (i, elem) {
                        $(elem).css({
                            '-webkit-transform': 'translate3d(0, 0, 0)',
                            'transform': 'translate3d(0, 0, 0)',
                        })
                    })
                    var SectionPrev = $('.section:nth-child(' + current + ')')
                    SectionPrev.addClass('scroll-top')
                    AllSectionNext.each(function () {
                        $(this).find('.animate').each(function (i, elem) {
                            $(elem).css({
                                '-webkit-transform': 'translate3d(0, ' + $(elem).attr('animate-offset') + 'px, 0)',
                                'transform': 'translate3d(0, ' + $(elem).attr('animate-offset') + 'px, 0)',
                            })
                        })
                    })
                }
                // -------------------------

                if (ActionSection.hasClass('sb-section-light')) {
                    $('.pagination-column.light').removeClass('light').addClass('dark')
                    $('.btn-section-wrapper > .arrow-down-link.dark').removeClass('dark')
                }
                else if (ActionSection.hasClass('sb-section-dark')) {
                    $('.pagination-column.dark').removeClass('dark').addClass('light')
                    $('.btn-section-wrapper > .arrow-down-link').addClass('dark')
                }
                // $('header').fadeOut(200)
                $('.pagination-li.active').removeClass('active')
                $('.pagination-li').eq(next - 1).addClass('active')
                if (ActionSection.is(':last-child')) {
                    $('.btn-section-wrapper').fadeOut({
                        duration: 800,
                        complete: function () {
                            $(this).addClass('hide')
                        },
                    })
                }
                else {
                    $('.btn-section-wrapper').fadeIn({
                        duration: 300,
                        start: function () {
                            $(this).removeClass('hide')
                        },
                    })
                }
                if ($('.select2-container--open:not(.select2)').length) {
                    $('.select-custom').select2('close')
                }
                if (ActionSection.hasClass('sb-section-light')) {
                    EditHeader($('header'), 'light')
                }
                else if (ActionSection.hasClass('sb-section-dark')) {
                    EditHeader($('header'), 'dark')
                    if (ActionSection.hasClass('sb-section-chok')) {
                        $('header').find('.btn-transparent').addClass('btn-dark')
                    }
                }
                if (docWidth >= 1200)
                    SetCookie(next);
            },  // This option accepts a callback function. The function will be called before the page moves.
            afterMove: function (next, current) {
                var ActionSection = $('.section:nth-child(' + next + ')')
                setTimeout(function () {
                    // $('body').removeClass('dark white chok') 
                    ActionSection.prev().removeClass('dark white chok')
                    ActionSection.removeClass('dark white chok')
                    $('.section.scroll-top').removeClass('scroll-top')
                }, 1200);
                //console.log(next)
            },   // This option accepts a callback function. The function will be called after the page moves.
            loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
            keyboard: true,                  // You can activate the keyboard controls
            responsiveFallback: 1200,        // You can fallback to normal page scroll by defining the width of the browser in which
            // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
            // the browser's width is less than 600, the fallback will kick in.
            direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
        });
    }
    //----------------------//

    // Установка куки для перелистывания
    function SetCookie(index) {
        $.cookie('SectionView', '' + index + '');
        $.cookie('DocumentHref', '' + document.location.href + '');
        // console.log($.cookie(''))
    }

    if ($.cookie('SectionView') != '1' && docWidth >= 1200 && $.cookie('DocumentHref') == document.location.href) {
        // console.log($.cookie('SectionView'));
        $.fn.moveTo($.cookie('SectionView'))
        /*  $.removeCookie('SectionView'); */
    }
    if ($.cookie('DocumentHref') != document.location.href) {
        $.removeCookie('SectionView');
        $.removeCookie('DocumentHref');
    }
    //----------------------//

    // Обработчик клика на пагинацию //
    $('body').on('click', '.pagination-column .pagination-li:not(.active)', function (e) {
        /*  e.preventDefault() */
        $(this).siblings('.pagination-li.active').removeClass('active')
        $(this).addClass('active')
        var page_index = $('.pagination-li.active').index()
        $.fn.moveTo(page_index + 1)
    })
    //----------------------//

    // Обработчик клика на кнопку вниз //
    $('body').on('click', '.btn-section-wrapper > .arrow-down-link', function (e) {
        var page_index
        if (docWidth >= 1200) {
            var page_index = $('section.active').next().index()
            $.fn.moveTo(page_index + 1)
        }
        else {
            var scrollTo = $('.section.active').next().offset().top
            $('html,body').stop().animate({ scrollTop: scrollTo }, 1000);
            e.preventDefault();
        }
    })
    //----------------------//


    // Инициализация слайдера стандартого блока 2 //
    let InitSbSlider = function (index, slider) {
        sb_slider[index] = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 0,
            grabCursor: true,
            speed: 1000,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            lazy: true,
            pagination: {
                el: slider.next('.pagination-list'),
                lockClass: 'lock',
                clickable: true,
                bulletClass: 'pagination-li',
                bulletActiveClass: 'current',
                type: 'bullets',
            },
            effect: 'coverflow',
            coverflowEffect: {
                depth: 50,
                rotate: 30,
                slideShadows: false,
                stretch: 10,
            },
            /*  autoplay: {
                 delay: 5000,
                 stopOnLastSlide: true,
             }, */
            /*     breakpoints: {
                    1024: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 8,
                    },
                }, */
        })
    }

    if ($('.sb-section .slider-wrapper:not(.full-width) .swiper-container').length) {
        var sb_slider = []
        $('.sb-section .slider-wrapper:not(.full-width) .swiper-container').each(function (i, elem) {
            InitSbSlider(i, $(elem))
        })

    }

    if ($('.sb3-bg-block.style2').length) {
        EditSb_Bg_wrapper($('.sb3-bg-block.style2'))
        // .sb3-bg-wrapper.style2
    }
    if ($('.sb3-slider-wrapper').length) {
        EditSb_Bg_slider($('.sb3-slider-wrapper'))
    }
    if ($('.sb4-bg-block').length) {
        EditSb_Bg_wrapper($('.sb4-bg-block'))
    }

    // Инициализации плагина кастомного скрола
    if ($('.scrollbar-inner').length) {
        $('.scrollbar-inner').scrollbar({
            ignoreMobile: true,
            autoUpdate: true,
            onUpdate: function (elem) {
                // console.log('init')
                if (elem.hasClass('scroll-scrolly_visible')) {
                    elem.parent('.scroll-wrapper').addClass('scroll-y')
                }
            },
            onScroll: function (y, x) {
                var ScrollElem = $(this.container)
                if (y.scroll == 0) {
                    ScrollElem.parent('.scroll-wrapper').addClass('scroll-y')
                }
                else if (y.scroll != 0 && ScrollElem.parent('.scroll-wrapper.scroll-y').length) {
                    ScrollElem.parent('.scroll-wrapper').removeClass('scroll-y')
                }
            },
        });

    }
    //----------------------//

    // Инициализация блока со скролом при разрешении по высоте меньше 900px
    ScrollBarOn()
    //----------------------//

    // Инициализация видеоплеера //
    var InitVideoJS = function (video_item) {
        video_item.each(function (index, elem) {
            var VideoItemId = $(elem).attr('id')
            // console.log(VideoItemId)
            videojs(VideoItemId, {
                controls: true,
                autoplay: false,
            });
        })

    }

    // Инициализация плагина видео JS
    if ($('.video-js').length && $('.video-js').find('source').attr('src')) {
        /*  console.log($('.video-js')) */
        InitVideoJS($('.video-js'))
    }
    //----------------------//

    // Инициализация модальных окон //
    $('body').on('click', '[data-modal]', function (e) {
        var ThisHash = '#' + $(this).attr('data-modal')
        if ($(this).attr('data-video-src') != undefined) {
            var VideoSrc = $(this).attr('data-video-src')
            // console.log(VideoSrc)
        }
        if ($(this).attr('data-poster') != undefined) {
            var PosterSrc = $(this).attr('data-poster')
        }
        if ($(ThisHash).find('[data-bg]').length) {
            LoadBackgroundImage($(ThisHash))
            /*   $(ThisHash).find('[data-bg]').each(function () {
                  $(this).css({
                      'background-image': 'url(' + $(this).attr('data-bg') + ')',
                  }).removeAttr('data-bg')
              }) */
        }
        /*     console.log(ThisHash) */
        var ModalBlocker = '<div class="modal-blocker scroll-disabled"><div class="modal-overlay"></div></div>'
        $(ModalBlocker).insertAfter($(ThisHash))
        $(ThisHash).appendTo($(ThisHash).next('.modal-blocker'))
        $(ThisHash).parents('.modal-blocker').fadeIn({
            duration: 200,
            easing: "linear",
            start: function () {
                if (docWidth < 1200)
                    blockScroll('open')
                if ($(ThisHash).find('.video-js').length && !$(ThisHash).find('.video-js  source').attr('src')) {
                    /* console.log($(ThisHash).find('.video-js > source').attr('src')) */
                    var ThisHashModalVideo = $(ThisHash).find('.video-js')
                    ThisHashModalVideo.attr('poster', PosterSrc)
                    ThisHashModalVideo.children('source').attr('src', VideoSrc)
                    InitVideoJS(ThisHashModalVideo)
                }
            },
            complete: function () {
                $(ThisHash).fadeIn({
                    duration: 5,
                    complete: function () {
                        /*    console.log($(this)) */
                        $(this).addClass('modal-open')
                    }
                })
            }
        })
    })
    $('body').on('click', '.modal-overlay, .modal-close', function (e) {
        var ThisModalParent = $(this).parents('.modal-blocker')
        var ThisModal = ThisModalParent.find('.modal.modal-open')
        ThisModal.fadeOut({
            start: function () {
                if ($(this).find('video').length) {
                    var ModalVideo = $(this).find('video')[0]
                    if (ModalVideo.paused == false) {
                        /* console.log(ModalVideo.paused)
                        console.log(ModalVideo.volume) */
                        ModalVideo.pause()
                    }
                }
                $(this).removeClass('modal-open')
                if ($('.modal-blocker').length == 1 && docWidth < 1200) {
                    blockScroll('close')
                }
            },
            complete: function () {
                ThisModalParent.fadeOut({
                    complete: function () {
                        if (ThisModal.hasClass('modal-form-success')) {
                            ThisModal.find('.modal-success-wrapper').hide()
                            ThisModal.find('.modal-form').attr('style', '')
                            ThisModal.find('.input-default').val('')
                            ThisModal.find('.checkbox-default').prop('checked', false)
                            ThisModal.removeClass('modal-form-success')
                        }
                        ThisModal.insertBefore(ThisModalParent)
                        $(this).remove()
                    }
                })
            },

        })
    })
    //----------------------//

    // Установка ширины для слайдеров с горизональным скроллом
    let InitSbAbsSlider = function (index, slider) {
        abs_slider[index] = new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            grabCursor: true,
            speed: 1500,
            touchReleaseOnEdges: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            freeMode: true,
            lazy: true,
            scrollbar: {
                el: slider.next('.swiper-scrollbar'),
                draggable: true,
                dragSize: '330',
                hide: true,
            },
            breakpoints: {
                // 1024: {
                //     slidesPerView: 4,
                // },
                1200: {
                    scrollbar: {
                        dragSize: '70',
                    }
                },
            },
        })
    }
    if ($('.slider-wrapper.full-width').length) {
        /*  console.log($('section .new-container').innerWidth()) */
        EditAbsSliderWidth($('.slider-wrapper.full-width'), docWidth)
        var abs_slider = []
        $('.slider-wrapper.full-width .swiper-container').each(function (index, elem) {
            InitSbAbsSlider(index, $(elem))
        })
        $(abs_slider).each(function () {
            if (!$(this.$el).hasClass('slider-container-gallery')) {
                CheckSlideWidth($(this.$el))
                /*  console.log(this) */
                this.on('slideNextTransitionStart scrollbarDragStart', function (e) {
                    $(this.$el).parents('.sb-section').find('.slider-before').fadeOut(400)
                })
                this.on('reachBeginning', function () {
                    $(this.$el).parents('.sb-section').find('.slider-before').fadeIn(400)
                })
            }
            if ($(this.$el).parents('.pools-page').length && docWidth < 768) {
                this.changeDirection('vertical', true)
                $(this.$el).find('.swiper-lazy').each(function () {
                    // console.log($(this))
                    $(this).css({
                        'background-image': 'url(' + $(this).attr('data-background') + ')',
                    })
                        .addClass('swiper-lazy-loaded')
                        .removeAttr('data-background')
                        .children('.swiper-lazy-preloader').remove()
                })
            }
            this.update()
        })
        /*   console.log(abs_slider) */
    }
    //----------------------//

    // Функционал изменения input 
    $('body').on('change input', '.input-default', function (e) {
        var RemoveInputVal = $(this).next('a')
        if ($(this).val() != '') {
            RemoveInputVal.fadeIn()
        }
        else {
            RemoveInputVal.fadeOut(100)
        }
        if ($(this).closest('.modal-call-form').length) {
            var CallForm = $(this).closest('.modal-call-form')
            var CallFromDisabled = false
            CallForm.find('.input-default').each(function () {
                if ($(this).val() == '') {
                    CallFromDisabled = true
                    $(this).closest('.input-wrapper.invalid').removeClass('invalid')
                    $(this).siblings('.invalid-text').remove()
                }
                if ($(this).hasClass('input-phone')/*  && e.type == "change" */)
                    CallFromDisabled = ValidatePhone($(this))
                if ($(this).hasClass('input-mail') /* && e.type == "change" */)
                    CallFromDisabled = ValidateEmail($(this))
            })
            if (CallFromDisabled == false) {
                if (!CallForm.find('.invalid').length) {
                    CallForm.find('.btn').removeAttr('disabled')
                }
            }
            else {
                CallForm.find('.btn').attr('disabled', true)
            }
        }
    })
    $('body').on('click touchend', '.input-wrapper > a', function (e) {
        var PrevInput = $(this).prev('.input-default')
        PrevInput.val('').trigger('change')
        $(this).fadeOut(100)
    })
    //----------------------//

    // Обработчик отправки формы обратной связи //
    $('body').on('submit', '.modal-call-form', function (e) {
        alert('Форма отправлена!')
    })
    //----------------------//

    // Обработчик клика на якорную ссылку

    $('body').on('click touchend', '[data-click]', function (e) {
        e.preventDefault()
        var ThisHashIndex
        if (docWidth >= 1200) {
            ThisHashIndex = $('#' + $(this).attr('data-click')).index()
            $.fn.moveTo(ThisHashIndex + 1)
        }
        else {
            ThisHashIndex = $('#' + $(this).attr('data-click'))
            $('html,body').stop().animate({ scrollTop: ThisHashIndex.offset().top - $('header').innerHeight() }, 1000);
        }
    })

    //----------------------//

    // Функционал табов // 
    $('body').on('click', '.tabs-wrapper .tab-switcher:not(.active) > a', function (e) {
        e.preventDefault()
        var ThisSwitcher = $(this).closest('.tab-switcher'),
            ThisIndex = ThisSwitcher.index(),
            ThisContents = $(this).closest('.tabs-wrapper').find('.tabs-contents')
        //  console.log(ThisIndex)
        ThisContents.children('.active').fadeOut({
            start: function () {
                ThisSwitcher.siblings('.active').removeClass('active')
            },
            complete: function () {
                $(this).removeClass('active').css('display', '');
                ThisSwitcher.addClass('active')
                // console.log(ThisContents.find('.tab-content:nth-child(' + (ThisIndex + 1) + ')')) 
                ThisContents.find('.tab-content:nth-child(' + (ThisIndex + 1) + ')').fadeIn({
                    start: function () {
                        $(this).css('display', 'flex')
                    },
                    complete: function () {
                        $(this).addClass('active')
                    }
                })
            }
        })
    })
    $('body').on('click touchend', '.tabs-wrapper .tab-content.active .link-with-arrow', function (e) {
        e.preventDefault()
        $(this).closest('.tabs-wrapper').find('.tab-switcher.active').next('.tab-switcher').children('a').trigger('click')
    })
    //----------------------//

    // Пересчет высоты bg
    if ($('.sb1-bg-block.style2').length) {
        EditSb_Bg_wrapper($('.sb1-bg-block.style2'))
    }
    //----------------------//

    // Инициализация галерей на странице
    if ($('.lightgallery').length > 0) {
        let InitLightGallery = function (lightGalleryItem) {
            lightGalleryItem.lightGallery({
                share: false,
                videojs: false,
                autoplayFirstVideo: false,
                download: false,
                thumbnail: false,
            });
        }
        $('.lightgallery').each(function () {
            InitLightGallery($(this))
            $(this).on('onAfterOpen.lg', function (e) {
                // console.log(e.type)
                $('.lg-outer').addClass('scroll-disabled')
                if (docWidth < 1200) {
                    blockScroll('open')
                }
            })
            $(this).on('onBeforeClose.lg', function (e) {
                // console.log(e.type)
                if (docWidth < 1200) {
                    blockScroll('close')
                }
            })
        })
    }
    //----------------------//



    if ($('.sb-section-top .slider-wrapper').length) {
        InitTopSlider($('.sb-section-top .slider-wrapper'))
    }

    // Изменение прозрачности на пунктах меню    
    if (docWidth >= 1200) {
        $(".menu-block .menu-list-li")
            .mouseover(function () {
                $(this).siblings().css('opacity', '.5')
            })
            .mouseout(function () {
                $(this).siblings().css('opacity', '')
            });
    }


    // Функционал открытия меню 
    $('body').on('click touchend', '.header-menu-btn', function (e) {
        e.preventDefault()
        var MenuWrapper
        if (docWidth < 1200 && $(this).parent('.menu-wrapper.open').length) {
            MenuWrapper = $(this).parent('.menu-wrapper.open')
        }
        else {
            MenuWrapper = $(this).prev('.menu-wrapper')
        }
        var AllMenuLink = MenuWrapper.find('.menu-block > .menu-list > .menu-list-li'),
            delayMenuLink = 0, menuIndex
        if (!MenuWrapper.hasClass('open')) {
            MenuWrapper.addClass('open scroll-disabled')
            if (docWidth < 1200)
                blockScroll('open')
            MenuWrapper.find('.menu-overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                menuIndex = 0
                MenuWrapper.addClass('open-end')
                let TimerMenuLink = setTimeout(function fadeMenuLink() {
                    if (MenuWrapper.hasClass('open')) {
                        if (menuIndex <= AllMenuLink.length - 1) {
                            $(AllMenuLink[menuIndex]).addClass('visible')
                            menuIndex = menuIndex + 1
                            // console.log(menuIndex)
                            delayMenuLink = 50
                            TimerMenuLink = setTimeout(fadeMenuLink, delayMenuLink)
                        }
                        else {
                            $('.menu-wrapper .menu-bottom').fadeIn({
                                duration: 400,
                                start: function () {
                                    $(this).addClass('visible').css('display', 'flex')
                                }
                            })
                            clearTimeout(TimerMenuLink)
                            TimerMenuLink = null
                            return false
                        }
                    }
                    else {
                        if (TimerMenuLink) {
                            clearTimeout(TimerMenuLink)
                            TimerMenuLink = null
                        }
                        MenuWrapper.removeClass('open-end')
                        AllMenuLink.each(function () {
                            $(this).removeClass('visible')
                        })
                        return false
                    }
                }, delayMenuLink)
            })
        }
        else {
            if (docWidth < 1200) {
                MenuWrapper = $(this).parent('.menu-wrapper')
            }
            menuIndex = AllMenuLink.length - 1
            // console.log(menuIndex)
            let TimerMenuLink = setTimeout(function fadeMenuLink() {
                if ($('.menu-wrapper .menu-bottom.visible').length) {
                    $('.menu-wrapper .menu-bottom.visible').fadeOut({
                        duration: 100,
                        complete: function () {
                            $(this).removeClass('visible')
                        }
                    })
                    delayMenuLink = 20
                    // console.log(menuIndex)
                    TimerMenuLink = setTimeout(fadeMenuLink, delayMenuLink)
                }
                else {
                    if (menuIndex >= 0) {
                        $(AllMenuLink[menuIndex]).removeClass('visible')
                        menuIndex = menuIndex - 1
                        // console.log(menuIndex)
                        TimerMenuLink = setTimeout(fadeMenuLink, delayMenuLink)
                    }
                    else {
                        // MenuWrapper.addClass('open-end') 
                        if (docWidth < 1200) {
                            MenuWrapper.find('.with-dropdown.open').removeClass('open')
                            blockScroll('close')
                        }
                        MenuWrapper.removeClass('open open-end scroll-disabled')
                        clearTimeout(TimerMenuLink)
                        TimerMenuLink = null
                        return false
                    }
                }
            }, delayMenuLink)
        }
        return false
    })
    //----------------------//

    $('body').on('click', '.menu-list-li.with-dropdown > .menu-link', function (e) {
        if (docWidth < 1200) {
            e.preventDefault()
            $(this).parent('.with-dropdown').toggleClass('open')
            return false;
        }
    })

    if (docWidth < 1200)
        ScrollSectionAdaptive()
    //----------------------//


}) // окончание ready


// Функция изменения темы header
let EditHeader = function (header, theme) {
    var settingsHeader
    if (theme == 'light') {
        settingsHeader = {
            headerRemoveClass: 'dark',
            headerAddClass: 'light',
            headerRemoveBtnClass: 'btn-dark',
            headerAddBtnClass: 'btn-white',
            // durationFadeIn: 200, 
        }
    }
    if (theme == 'dark') {
        settingsHeader = {
            headerRemoveClass: 'light',
            headerAddClass: 'dark',
            headerRemoveBtnClass: 'btn-white',
            headerAddBtnClass: 'btn-dark',
            //durationFadeIn: 200,
        }
    }
    if (!header.hasClass(theme)) {
        header.removeClass(settingsHeader.headerRemoveClass).addClass(theme)
        header.find('.btn.' + settingsHeader.headerRemoveBtnClass).removeClass(settingsHeader.headerRemoveBtnClass).
            addClass(settingsHeader.headerAddBtnClass)
        var ThisLogo = header.find('.header-logo > img').attr('src')
        header.find('.header-logo > img').attr('src', header.find('.header-logo > img').attr('src-new'))
        header.find('.header-logo > img').attr('src-new', ThisLogo)
        var AllSocialLogo = header.find('.header-social-link > img')
        AllSocialLogo.each(function (i, elem) {
            var ThisImg = $(elem).attr('src')
            $(elem).attr('src', $(elem).attr('src-new'))
            $(elem).attr('src-new', ThisImg)
        })
    }
}
//----------------------//


let ScrollSectionAdaptive = function () {
    if (docWidth < 1200) {
        var lastScrollTop = 0,
            NextSection,
            ActiveSection,
            ElemAnimateIndex = 0,
            AllElemAnimate = $('.sb-section .sb-description-wrapper')
        if ($('.ios.mobile').length || $('.ios.tablet').length) {
            let AnimateToScroll = setTimeout(function () {
                if ($(window).scrollTop() || window.pageYOffset != 0) {
                    var ScrollNow = window.pageYOffset
                    if ($('.section.active').is(':last-child') || $('.section.active').is(':nth-last-child(2)')) {
                        ScrollNow = ScrollNow + 50
                    }
                    $('html,body').scrollTop(0)
                    $('body, html').css('opacity', '0')
                    $('html,body').stop().animate(
                        { scrollTop: ScrollNow }, {
                        duration: 400,
                        complete: function () {
                            $('body, html').css('opacity', '1')
                        }
                    }
                    );
                }
                clearInterval(AnimateToScroll)
                AnimateToScroll = null
            }, 300)

        }
        if ($(window).scrollTop() <= 0) {
            ActiveSection = $('.section.active')
            AllElemAnimate.eq(ElemAnimateIndex).addClass('animate-init')
            if (AllElemAnimate.eq(ElemAnimateIndex).closest('.sb-section').find('.link-with-arrow:not(.animate-init)').length) {
                AllElemAnimate.eq(ElemAnimateIndex).closest('.sb-section').find('.link-with-arrow:not(.animate-init)').addClass('animate-init')
            }
            ElemAnimateIndex = ElemAnimateIndex + 1
        }
        else {
            // console.log($(window).scrollTop())
            var AllSection = $('.section')
            AllSection.each(function () {
                // console.log($(this).offset().top)
                if ($(window).scrollTop() >= $(this).offset().top - $('header').innerHeight()) {
                    // console.log('следующий')
                    ActiveSection = $(this)
                    $('.section.active').removeClass('active')
                    ActiveSection.addClass('active')
                    ElemAnimateIndex = $(this).index()
                }
            })
            if ((ElemAnimateIndex < AllElemAnimate.length)
                && $(window).scrollTop() >= (AllElemAnimate.eq(ElemAnimateIndex).offset().top - $(window).height())) {
                // console.log(AllElemAnimate.eq(ElemAnimateIndex).offset().top)
                // console.log(AllElemAnimate.eq(ElemAnimateIndex).offset().top - $(window).height())
                AllElemAnimate.eq(ElemAnimateIndex).addClass('animate-init')
                if (AllElemAnimate.eq(ElemAnimateIndex).closest('.sb-section').find('.link-with-arrow:not(.animate-init)').length) {
                    AllElemAnimate.eq(ElemAnimateIndex).closest('.sb-section').find('.link-with-arrow:not(.animate-init)').addClass('animate-init')
                }
                ElemAnimateIndex = ElemAnimateIndex + 1
                AllElemAnimate.slice(0, ElemAnimateIndex - 1).addClass('animate-init')
            }
        }
        AnimationSection(ActiveSection)
        $(window).on('scroll', function (e) {
            var ScrollTop = $(window).scrollTop()
            // console.log(ScrollTop)
            if (ScrollTop >= lastScrollTop) {
                if (ScrollTop >= ((ActiveSection.offset().top + ActiveSection.innerHeight()) - $(window).height())) {
                    var AnimateNextSection = ActiveSection.next()
                    AnimationSection(AnimateNextSection)
                }
                if ((ElemAnimateIndex < AllElemAnimate.length)
                    && ScrollTop >= (AllElemAnimate.eq(ElemAnimateIndex).offset().top - $(window).height() - 50)) {
                    // console.log(AllElemAnimate.eq(ElemAnimateIndex).offset().top)
                    // console.log(AllElemAnimate.eq(ElemAnimateIndex).offset().top - $(window).height())
                    AllElemAnimate.eq(ElemAnimateIndex).addClass('animate-init')
                    if (AllElemAnimate.eq(ElemAnimateIndex).closest('.sb-section').find('.link-with-arrow:not(.animate-init)').length) {
                        AllElemAnimate.eq(ElemAnimateIndex).closest('.sb-section').find('.link-with-arrow:not(.animate-init)').addClass('animate-init')
                    }
                    ElemAnimateIndex = ElemAnimateIndex + 1
                    // console.log(ElemAnimateIndex)
                }
                if (ScrollTop > ((ActiveSection.offset().top + ActiveSection.innerHeight()) - $('header').innerHeight())) {
                    NextSection = ActiveSection.next()
                    NextSection.addClass('active')
                    ActiveSection.removeClass('active')
                    ActiveSection = NextSection
                    // console.log(ActiveSection)
                }
            }
            else {
                if (ScrollTop <= ActiveSection.offset().top && ScrollTop > 0) {
                    NextSection = ActiveSection.prev()
                    NextSection.addClass('active')
                    ActiveSection.removeClass('active')
                    ActiveSection = NextSection
                    AnimationSection(ActiveSection)
                }
                // console.log('наверх')
            }
            MobileEditHeader(ActiveSection)
            lastScrollTop = ScrollTop;
        })
    }
    else return false
}

//Функция анимация елементов в секции //
let AnimationSection = function (AnimSection) {
    LoadBackgroundImage(AnimSection)
    AnimSection.addClass('animate-init')
}

let MobileEditHeader = function ($this) {
    if ($this.hasClass('sb-section-light')) {
        // console.log('светлая')
        EditHeader($('header'), 'light')
    }
    else if ($this.hasClass('sb-section-dark')) {
        // console.log('темная')
        EditHeader($('header'), 'dark')
        if ($this.hasClass('sb-section-chok')) {
            $('header').find('.btn-transparent').addClass('btn-dark')
        }
    }
}


// Функция инициализации слайдера в верхнем блоке главной страницы //
let InitTopSlider = function (slider) {
    var AllSlide = $(slider).find('.slider-slide')
    if (AllSlide.length > 1) {
        var SlideActive = AllSlide.filter('.active'),
            SlideNext = AllSlide.filter('.next')
        //  console.log(AllSlide)
        //   console.log(SlideActive)
        //   console.log(SlideNext)
        var delay = 6000
        let TimerSlider = setTimeout(function fadeSlide() {
            SlideActive.fadeOut({
                duration: 1500,
                step: function (now, tween) {
                    //    console.log(now)
                    if (now <= 0.5) {
                        SlideNext.fadeIn(1500).removeClass('next').addClass('active')
                    }
                },
                complete: function () {
                    SlideActive.removeClass('active')
                    SlideActive = SlideNext
                    if (SlideActive.is(':last-child')) {
                        SlideNext = AllSlide.first()
                    }
                    else
                        SlideNext = SlideNext.next()
                    SlideNext.addClass('next')

                }
            })
            TimerSlider = setTimeout(fadeSlide, delay)
        }, delay)
    }
}
//----------------------//

// Вычисление высоты без header
let EditSb_Bg_wrapper = function (elem) {
    if (docWidth >= 1200) {
        elem.css({
            'height': ($(window).height() - $('header').innerHeight()) + 'px',
        })
    }
}
//----------------------//

// Вычисление отступа снизу у слайдера
let EditSb_Bg_slider = function (elem) {
    var BottomHeight = parseInt(elem.css('bottom'))
    /*     console.log(BottomHeight) */
    elem.css({
        'height': ($(window).height() - $('header').innerHeight() - BottomHeight) + 'px',
    })
}
//----------------------//

// Функция валидации поля ввода телефона
let ValidatePhone = function (phone) {
    if (phone.val() != ''
        && !phone.inputmask('isComplete')) {
        if (!phone.closest('.input-wrapper.invalid').length) {
            phone.closest('.input-wrapper').addClass('invalid')
            var InvalidText = '<span class="invalid-text">Указан неверный формат номера телефона</span>'
            $(InvalidText).appendTo(phone.closest('.input-wrapper.invalid'))
            return true
        }
    }
    else if (phone.val() != '') {
        /*  console.log('else') */
        phone.closest('.input-wrapper.invalid').removeClass('invalid')
        phone.siblings('.invalid-text').remove()
        return false
    }
}
//----------------------//


// Функция валидации поля email
let ValidateEmail = function (email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email.val() != '' && reg.test(email.val()) == false) {
        if (!email.closest('.input-wrapper.invalid').length) {
            email.closest('.input-wrapper').addClass('invalid')
            var InvalidText = '<span class="invalid-text">Указан неверный формат e-mail</span>'
            $(InvalidText).appendTo(email.closest('.input-wrapper.invalid'))
            return true;
        }
    }
    else if (email.val() != '') {
        email.closest('.input-wrapper.invalid').removeClass('invalid')
        email.siblings('.invalid-text').remove()
        return false
    }
}
//----------------------//

let CheckSlideWidth = function (slider) {
    if (docWidth >= 768) {
        var AllSlidesElems = slider.find('.swiper-slide'),
            AllSlidesWidth = 0
        AllSlidesElems.each(function () {
            AllSlidesWidth = AllSlidesWidth + $(this).innerWidth()
        })
        if (AllSlidesWidth > slider.innerWidth()) {
            var slider_before = '<div class="slider-before"></div>'
            if (!slider.parents('.sb-section').find('.slider-before').length)
                $(slider_before).prependTo(slider.closest('.sb-description-wrapper'))
            slider.parents('.sb-section').find('.slider-before').css({
                'height': $(window).height() - $('header').innerHeight() + 'px',
            })
        }
        return false
    }
    else return false
};

let CheckAbsSliders = function (sliders) {
    sliders.each(function () {
        CheckSlideWidth($(this))
    })
}

let EditAbsSliderWidth = function (sliders, DocWidth) {
    var SliderWidth
    if (DocWidth >= 1200) {
        SliderWidth = DocWidth - ((DocWidth - $('section .new-container').width()) / 2)

        /*    else {
               SliderWidth = DocWidth - (DocWidth - $('section .new-container').width()) + parseInt($('section .new-container').css('padding-right'))
           } */
        /*    console.log(SliderWidth) */
        sliders.css({
            'width': SliderWidth + 'px',
        })
        sliders.find('.swiper-scrollbar').css({
            'width': $('section .new-container').width() + 'px'
        })
    }
    return false
}

// Функция активации плагина скрола блока при высоте экрана меньше 900px
let ScrollBarOn = function () {
    if ($(window).height() < 900 && $(window).width() >= 1441) {
        $('.scrollbar-inner:not(.init):not(.scroll-wrapper)').addClass('init')
    }
}
//----------------------//

$(window).on('resize', function (e) {
    var NewwindowHeight = $(window).height()
    var NewDocWidth = $(window).width()
    if (NewwindowHeight != windowHeight) {
        $('section').css({
            'height': NewwindowHeight + 'px',
        })
        windowHeight = NewwindowHeight
        if (NewDocWidth >= 1200) {
            EditHeightDescrWrap()
            if ($('.sb-section-top .slider-wrapper').length) {
                EditSb_Bg_wrapperTop($('.sb-section-top .slider-wrapper'))
            }
        }
        if ($('.slider-wrapper .slider-container-abs').length) {
            CheckAbsSliders($('.slider-wrapper .slider-container-abs'))
        }
    }
    /*  console.log(NewDocWidth) */
    if ((NewDocWidth != docWidth || NewDocWidth == docWidth) && NewDocWidth >= 1200) {
        if ($('.slider-wrapper.full-width .swiper-container:not(.slider-container-gallery)').length) {
            CheckAbsSliders($('.slider-wrapper.full-width .swiper-container:not(.slider-container-gallery)'))
        }
        if ($('.sb3-slider-wrapper').length) {
            EditSb_Bg_slider($('.sb3-slider-wrapper'))
        }
        if ($('.sb3-bg-block.style2').length) {
            EditSb_Bg_wrapper($('.sb3-bg-block.style2'))
        }
        if ($('.sb4-bg-block').length) {
            EditSb_Bg_wrapper($('.sb4-bg-block'))
        }
        if ($('.sb-section-top .slider-wrapper').length) {
            EditSb_Bg_wrapperTop($('.sb-section-top .slider-wrapper'))
        }
        if ($('.sb1-bg-block.style2').length) {
            EditSb_Bg_wrapper($('.sb1-bg-block.style2'))
        }
    }
    if (NewDocWidth != docWidth) {
        if (NewDocWidth > 1200) {
            if ($('.slider-wrapper.full-width').length)
                EditAbsSliderWidth($('.slider-wrapper.full-width'), NewDocWidth)
        }
        InitPaginationDownBtn(NewDocWidth)
        docWidth = NewDocWidth
        ScrollSectionAdaptive()
    }
})

