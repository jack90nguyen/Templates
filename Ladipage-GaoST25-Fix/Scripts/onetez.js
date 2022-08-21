
const isMobile = window.innerWidth < 768 ? true : false;

function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function scrollAnimate() {
    $(".scrollto").click(function () {
        var id = $(this).attr("href");
        $('html, body').animate({
            'scrollTop': parseInt($(id).offset().top - 20)
        }, 600);
        return false;
    });
}

function closePopup(id, remove) {
    var popup = $('#' + id);
    popup.fadeOut();
    if (remove === true) {
        popup.remove();
    }
}

function popupYoutube(video) {
    var pid = 'popupZoomImg';
    var heightWd = window.innerHeight - 60;

    var str = '<div id="' + pid + '" class=\"popup__bg\">';
    str += '<div class="popupimg_content">';
    str += '<a class="popup__close" onclick="closePopup(' + pid + ', true)">X</a>';
    str += '<iframe style="max-height:' + heightWd + 'px;" width="700" height="500" src="' + video + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    str += '</div>';
    str += '</div>';
    $('body').append(str);

    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            closePopup(pid, true);
        }
    });
}

function closeGallery() {
    var popup = $('#gallery__bg');
    popup.fadeOut();
    setTimeout(function () {
        popup.remove();
    }, 500);
}

function galleryPopup(img, group) {
    var mh = window.innerHeight - 40;
    var mw = window.innerWidth - 40;
    var content = '<div id="gallery__bg">';
    content += '<div class="gallery__popup">';
    content += '<a class="gallery__close" onclick="closeGallery()">X</a>';
    content += '<img class="gallery__img" style="max-height: ' + mh + 'px; max-width: ' + mw + 'px;" src="' + img + '" alt="IMG" />';
    if (group !== '' && group !== undefined) {
        content += '<a onclick="galleryNavi(false, \'' + group + '\')" class="gallery__prev"></a>';
        content += '<a onclick="galleryNavi(true, \'' + group + '\')" class="gallery__next"></a>';
    }
    content += '</div>';
    content += '</div>';

    $('body').append(content);

    if (group !== '' && group !== undefined) {
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === 39) {
                galleryNavi(true, group);
            }
            else if (e.keyCode === 37) {
                galleryNavi(false, group);
            }
            else if (e.keyCode === 27) {
                closeGallery();
            }
        });

        document.getElementById('gallery__bg').addEventListener('swiped-left', function (e) {
            galleryNavi(true, group);
        });
        document.getElementById('gallery__bg').addEventListener('swiped-right', function (e) {
            galleryNavi(false, group);
        });
        document.getElementById('gallery__bg').addEventListener('swiped-down', function (e) {
            closeGallery();
        });
    }
    else {
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === 27) {
                closeGallery();
            }
            else if (e.keyCode === 39) {
                galleryNavi(true, group);
            }
            else if (e.keyCode === 37) {
                galleryNavi(false, group);
            }
        });
        document.getElementById('gallery__bg').addEventListener('swiped-down', function (e) {
            closeGallery();
        });
    }
}

function galleryNavi(next, group) {
    var list = $('.js_gallery[data-group="' + group + '"]');
    var view_img = $('.gallery__img');
    var view_src = view_img.attr("src");
    for (var i = 0; i < list.length; i++) {
        if (list[i].href.indexOf(view_src) !== -1) {
            var j = 0;
            if (next)
                j = i < list.length - 1 ? i + 1 : 0;
            else
                j = i > 0 ? i - 1 : list.length - 1;
            view_img.attr("src", list[j].href);
        }
    }
}

function stickyHeader() {
    var header = $('header').innerHeight();
    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > header + 10) {
            $('header').addClass('is_sticky');
        }
        else {
            $('header').removeClass('is_sticky');
        }
    };
    stickyNav();
    $(window).scroll(function () { stickyNav(); });
}

function checkRequired(formId) {
    var status = true;
    var listRequired = $('#' + formId + ' [data-required="true"]');
    for (var i = 0; i < listRequired.length; i++) {
        var item = listRequired[i];
        if (!!item.value === false) {
            status = false;
            item.className = item.className + ' is-danger';
        }
        else {
            item.className = item.className.replace('is-danger', '');
        }
    }

    if (status)
        listRequired.removeClass('is-danger');

    return status;
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("data-include");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.outerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Include not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("data-include");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

function resizeOject() {

}

$(document).ready(function () {

    includeHTML();

    setTimeout(function () {

        stickyHeader();

        scrollAnimate();

        loadDataDemo();

        $(".navbar-burger").click(function () {
            $("#header").toggleClass("is-active");
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
        });

        $('.js_gallery').click(function (e) {
            e.preventDefault();
            var img = $(this).attr('href');
            var group = $(this).data('group');
            galleryPopup(img, group);
        });

        $('.jplay__video').click(function (e) {
            e.preventDefault();
            var video = $(this).attr("href").replace('/watch?v=', '/embed/');
            popupYoutube(video);
        });

        $('.js_tab_head').click(function (e) {
            e.preventDefault();
            var id = $(this).attr('href');
            var tab = $(this).data('tab');
            $(`.js_tab_head[data-tab="${tab}"]`).parent().removeClass('is-active');
            $(this).parent().addClass('is-active');
            $(`.js_tab[data-tab="${tab}"]`).addClass('is-hidden');
            $(`${id}[data-tab="${tab}"]`).removeClass('is-hidden');
        });

        var options = {
            animateThreshold: 50,
            scrollPollInterval: 0
        };
        $('.aniview').AniView(options);

    }, 500);

});

window.onresize = function () {
    resizeOject();
};

function sendContact() {
    var name = $('#contact_name').val();
    var phone = $('#contact_phone').val();
    var email = $('#contact_email').val();
    var content = $('#contact_content').val();

    if (checkRequired('contact_form')) {
        $('#contact_msg').html('');
        alert(`Đã gửi thông tin liên hệ !`);
    }
    else {
        $('#contact_msg').html('Vui lòng nhập đầy đủ thông tin');
    }
}