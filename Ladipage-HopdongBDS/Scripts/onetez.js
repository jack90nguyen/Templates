function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function MsgRed(msg) {
    $('#msg').html("<div class='msg-red'>" + msg + "</div>");
    setTimeout(function () {
        $('#msg').html("");
    }, 5000);
}

function MsgGreen(msg) {
    $('#msg').html("<div class='msg-green'>" + msg + "</div>");
    setTimeout(function () {
        $('#msg').html("");
    }, 5000);
}

function onetezSetting() {
    $("#toggleSetting").click(function () {
        if ($("#toggleSetting").attr('class') !== "active") {
            $("#toggleSetting").addClass('active');
            $(".admin_edit_btn").addClass('active');
            setCookie('toggleSetting', true);
        }
        else {
            $("#toggleSetting").removeClass('active');
            $(".admin_edit_btn").removeClass('active');
            setCookie('toggleSetting', false);
        }
    });
    if (getCookie('toggleSetting') === 'true') {
        $("#toggleSetting").addClass('active');
        $(".admin_edit_btn").addClass('active');
    }
    else {
        $("#toggleSetting").removeClass('active');
        $(".admin_edit_btn").removeClass('active');
    }
    var edit = $('.admin_edit_btn');
    edit.attr('title', 'Chỉnh sửa phần này');
    edit.live("click", function () {
        var url = '/admin/' + $(this).data('url');
        if (url.search('/page/config/') !== -1) {
            var popup = window.open(url, 'popup', 'width=720,height=680');
            popup.window.focus();
        }
        else {
            window.open(url);
        }
    });
}

function popupCallback(str) {
    location.reload();
}

function onetezSideBar() {
    $("#toggleSideBar").click(function () {
        var body = $("#page_body");
        if (body.attr('class').indexOf("show__sidebar") !== -1) {
            body.removeClass('show__sidebar');
        }
        else {
            body.addClass('show__sidebar');
        }
    });
    $('#sideBar').find('.sideBar-list').find('.icon-sub').live("click", function () {
        var item = $(this).parent();
        if (item.attr('class').indexOf("active") !== -1) {
            item.removeClass('active');
        }
        else {
            item.addClass('active');
        }
    });

    var thisUrl = location.pathname;
    var sblink = $(".head__nav li a");
    for (var i = 0; i < sblink.length; i++) {
        if (sblink[i].pathname !== '' && sblink[i].pathname === thisUrl) {
            sblink[i].className = "active";
        }
    }
}

function onetezSearch() {
    $(".toggleSearch").click(function () {
        var popup = $('#popup_search');
        if (popup.attr('class').indexOf("show") !== -1) {
            popup.removeClass('show');
        }
        else {
            popup.addClass('show');
            $('#keyword').focus();
        }
    });
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            $('#popup_search').removeClass('show');
        }
    });
}

function onetezToggle(id) {
    var box = $('#' + id);
    if (box.attr('class').indexOf("toggle__show") !== -1) {
        box.removeClass('toggle__show');
    }
    else {
        box.addClass('toggle__show');
    }
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

function onetezSelection() {
    $('.jselection').find('.selected').live("click", function () {
        var current = $(this).parent().find('ul');
        var style = current.attr("style");
        $('.jselection').find('ul').hide();
        current.toggle();
        if (style.search("none") === -1) {
            current.hide();
        }
    });
    $('.jselection').find('li').live("click", function () {
        var parent = $(this).parent();
        parent.parent().find('.selected').html($(this).html());
        parent.parent().find('.selectvalue').val($(this).data('id'));
        parent.fadeOut();
    });
    document.onclick = function (e) {
        var cname1 = e.target.className;
        var cname2 = e.target.parentNode.parentNode.className;
        if (cname1 !== 'selected' && cname2 !== 'jselection') {
            $('.jselection').find('ul').hide();
        }
    };
}

function onetezTabs(id) {
    $('#' + id).find('li').live("click", function () {
        $('#' + id).find('li').removeClass('active');
        $(this).addClass('active');
        $('#' + id + 'Content').find('li').removeClass('active');
        $('#' + $(this).attr('id') + 'Content').addClass('active');
    });
}

function closePopupZoomImg() {
    var popup = $('#popupZoomImg');
    popup.fadeOut();
    popup.remove();
}

function popupZoomImg(img) {
    var heightWd = window.innerHeight - 60;
    var str = '<div id="popupZoomImg" class=\"popup__bg\">';
    str += '<div class="popupimg_content">';
    str += '<a class="popup__close" onclick="closePopupZoomImg()">X</a>';
    str += '<img style="max-height: ' + heightWd + 'px;" src="' + img + '" alt="IMG" />';
    str += '</div>';
    str += '</div>';
    $('body').append(str);
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            closePopupZoomImg();
        }
    });
}

function onetezPopupZoomImg() {
    $(".jzoon__img").click(function (e) {
        e.preventDefault();
        var img = $(this).attr("href");
        popupZoomImg(img);
    });
}

function popupYoutube(video) {
    var heightWd = window.innerHeight - 60;
    var str = '<div id="popupZoomImg" class=\"popup__bg\">';
    str += '<div class="popupimg_content">';
    str += '<a class="popup__close" onclick="closePopupZoomImg()">X</a>';
    str += '<iframe style="max-height:' + heightWd + 'px;" width="700" height="500" src="' + video + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    str += '</div>';
    str += '</div>';
    $('body').append(str);
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            closePopupZoomImg();
        }
    });
}
function onetezPopupYoutube() {
    $(".jplay__video").click(function (e) {
        e.preventDefault();
        var video = $(this).attr("href").replace('/watch?v=', '/embed/');
        popupYoutube(video);
    });
}

function loadStickyHeader() {
    var header = $('header').innerHeight();
    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > header) {
            $('header').addClass('header--sticky');
        }
        else {
            $('header').removeClass('header--sticky');
        }
    };
    stickyNav();
    $(window).scroll(function () { stickyNav(); });
}

function resizeOject() {
    var proImage = $('.product__image--big');
    var wproImage = proImage.innerWidth();
    proImage.css('height', wproImage + 'px');
}

function submitContact(type_id) {
    var form = '#form_contact_' + type_id;
    var btn = $(form + ' .contact_btn');
    btn.addClass('processing');

    var contact_name = $(form + ' .contact_name');
    var contact_phone = $(form + ' .contact_phone');
    var contact_email = $(form + ' .contact_email');
    var contact_content = $(form + ' .contact_content');

    var name = contact_name.val() !== undefined ? contact_name.val() : '';
    var phone = contact_phone.val() !== undefined ? contact_phone.val() : '';
    var email = contact_email.val() !== undefined ? contact_email.val() : '';
    var content = contact_content.val() !== undefined ? contact_content.val() : '';

    if (type_id === 3) {
        content = $(form + ' .contact_day').val() + ' ' + $(form + ' .contact_time').val();
    }

    $.ajax({
        type: "POST",
        url: "/API/Contact",
        data: { typeId: type_id, name: name, phone: phone, email: email, content: content },
        dataType: "json",
        success: function (res) {
            btn.removeClass('processing');
            if (res.status === true)
                alert(res.msg);
            else
                alert(res.msg);
        }
    });
}

function getTextData() {
    $.ajax({
        type: "GET",
        url: "/API/GetText",
        data: {},
        dataType: "json",
        success: function (res) {
            $.each(res, function (i, item) {
                $('[data-text="' + item.code + '"]').html(item.text);
                $('[data-tooltip="' + item.code + '"]').attr('placeholder', item.text);
            });
        }
    });
}

$(document).ready(function () {
    //getTextData();
    onetezSetting();
    onetezSideBar();
    onetezSearch();
    onetezPopupZoomImg();
    onetezPopupYoutube();
    scrollAnimate();
    resizeOject();
    loadStickyHeader();
    var options = {
        animateThreshold: 100,
        scrollPollInterval: 20
    };
    $('.aniview').AniView(options);
});
window.onresize = function () {
    resizeOject();
};