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

function showLoading(time) {
    if (!time) time = 3;
    var timeout = time * 1000;
    $('#loading').show();
    setTimeout(function () {
        $('#loading').hide();
    }, timeout);
}

function hideNotify(id) {
    if (!id) {
        $('#notify').html('');
    }
    else {
        $('#notify #' + id).remove();
    }
}

function showNotify(content, danger) {
    let status = danger === true ? 'is--danger' : 'is--success';
    var id = new Date().valueOf();
    var strNotify = '<div id="' + id + '" class="notification ' + status + '">';
    strNotify += '<a class="btn__close" onclick="hideNotify(' + id + ')"></a>';
    strNotify += content + '</div>';
    $('#notify').prepend(strNotify);
    setTimeout(function () {
        hideNotify(id);
    }, 15000);
}

function loadSelection() {
    $('.selection').find('.selected').live("click", function () {
        var current = $(this).parent().find('ul');
        var style = current.attr("style");
        $('.selection').find('ul').hide();
        current.toggle();
        if (style.search("none") === -1) {
            current.hide();
        }
    });
    $('.selection').find('li').live("click", function () {
        var parent = $(this).parent();
        parent.parent().find('.selected').html($(this).html());
        parent.parent().find('.selectvalue').val($(this).data('id'));
        parent.fadeOut();
    });
    document.onclick = function (e) {
        var cname1 = e.target.className;
        if (e.target.parentNode !== null && e.target.parentNode.parentNode !== null) {
            var cname2 = e.target.parentNode.parentNode.className;
            if (cname1 !== 'selected' && cname2 !== 'selection') {
                $('.selection').find('ul').hide();
            }
        }
    };
}

function setDataWidth() {
    var list_width = $('[data-width]');
    for (var i = 0; i < list_width.length; i++) {
        var item = list_width[i];
        item.style.width = item.dataset.width;
    }
}

function toggleSidebar() {
    var body = $("#page_body");
    if (body.attr('class').indexOf("hide__sidebar") !== -1) {
        body.removeClass('hide__sidebar');
    }
    else {
        body.addClass('hide__sidebar');
    }
}

function toggleSidebarItem(btn) {
    var item = btn.parentElement;
    if (item.className.indexOf("is--show") !== -1) {
        item.className = '';
    }
    else {
        item.className = 'is--show';
    }
}

function toggleSearch() {
    let current = $('#header__search');
    if (current.attr('class').indexOf("is--show") !== -1) {
        current.removeClass('is--show');
    }
    else {
        current.addClass('is--show');
        $('#search__txt').focus();
    }
}

function toggleElement(id) {
    let current = $('#' + id);
    if (current.attr('class').indexOf("is--hide") !== -1) {
        current.removeClass('is--hide');
    }
    else {
        current.addClass('is--hide');
    }
}

function toggleTaskGroup(item) {
    var parent = item.parentElement;
    if (parent.className.indexOf("is--show") !== -1) {
        parent.className = 'group';
    }
    else {
        parent.className = 'group is--show';
    }
}

function toggleActionMenu(item) {
    if (item.className.indexOf("is--show") !== -1) {
        item.className = 'item';
    }
    else {
        $('.action__menu .item').removeClass('is--show');
        item.className = 'item is--show';
    }
}

function toggleContentWrap() {
    let current = $('#content_wrap');
    if (current.attr('class').indexOf("hide--right") !== -1) {
        current.removeClass('hide--right');
    }
    else {
        current.addClass('hide--right');
    }
}

function toggleSideBarSorted() {
    $('#sidebar').attr('class', '');
}

function toggleSideBarSort() {
    let current = $('#sidebar');
    if (current.attr('class').indexOf("show--moving") !== -1) {
        current.attr('class', '');
    }
    else {
        current.attr('class', 'show--moving');
    }
}

function toggleCategoryDelete() {
    let current = $('#sidebar');
    if (current.attr('class').indexOf("show--delete") !== -1) {
        current.attr('class', '');
    }
    else {
        current.attr('class', 'show--delete');
    }
}

function cancelTaskEdit(id) {
    $('#' + id).addClass('is--min');
}

function setPoupHeight() {
    var maxheight = window.innerHeight - 84;
    $('.popup__form').css('max-height', maxheight + 'px');
}

function hidePopup() {
    $('.popup').addClass('is--hide');
}

function showPopupCategory(id) {
    $('.popup').addClass('is--hide');
    $('#popup_category').removeClass('is--hide');
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });

    if (!id) id = '';
    console.log('CategoryId: ' + id);
}

function showPopupNote(id) {
    $('.popup').addClass('is--hide');
    $('#popup_note').removeClass('is--hide');
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });
}

function showPopupNoteEdit(id) {
    $('.popup').addClass('is--hide');
    $('#popup_note_edit').removeClass('is--hide');
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });
}

function showPopupCustomerEdit(id) {
    $('.popup').addClass('is--hide');
    $('#popup_customer_edit').removeClass('is--hide');
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });
}

function showPopupFinanceEdit(id) {
    $('.popup').addClass('is--hide');
    $('#popup_finance_edit').removeClass('is--hide');
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });
}

function showPopupWebsiteEdit(id) {
    $('.popup').addClass('is--hide');
    $('#popup_website_edit').removeClass('is--hide');
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            hidePopup();
        }
    });
}

$(".currency").keyup(function () {
    var money = $(this).val().replace(/\,/g, '').replace(/\ /g, '');
    $(this).val(money.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
});

$('.btn').live("click", function () {
    let btn = $(this);
    btn.addClass('is--loading');
    setTimeout(function () {
        btn.removeClass('is--loading');
    }, 5000);
});

$('.task__item.is--edit.is--min').find('.txt').live("click", function () {
    $('#task_new').removeClass('is--min');
    $(this).focus();
});

$('.emojipicker ul').find('a').live("click", function () {
    let icon = $(this).html().toString();
    if (icon.length === 2) {
        $('#list_edit_icon').val(icon);
        $('.emojipicker').hide();
    }
});

$(document).ready(function () {
    includeHTML();
    loadSelection();
    setDataWidth();


    setTimeout(function () {
        new MeteorEmoji();

        sortableSidebar();

        setPoupHeight();

        var thisUrl = location.pathname;
        var sbItem = $(".sidebar li > a");
        for (var i = 0; i < sbItem.length; i++) {
            var sblink = sbItem[i].pathname;
            if (sblink !== '' && sblink === thisUrl) {
                sbItem[i].parentNode.className = "active";
                let parent = sbItem[i].parentNode.parentNode.parentNode;
                if (parent.localName === 'li') {
                    parent.className = "is--show";
                }
            }
        }
    }, 1000);
});


//Code Demo
$('#task_list').find('.item__info').live("click", function () {
    location.href = '/task.html';
});
$('#customer__list').find('.data__item').live("click", function () {
    toggleContentWrap()
});

function sortableSidebar() {

    var catalogList = document.getElementById('catalog_list')
    new Sortable(catalogList, {
        handle: '.sort__icon',
        swapThreshold: 0.65,
        animation: 150,
        onEnd: function (evt) {
            getSidebarIndex();
        }
    });

    var childList = document.getElementsByClassName("child__list");
    for (var i = 0; i < childList.length; i++) {
        new Sortable(childList[i], {
            group: 'child_list',
            handle: '.sort__icon',
            swapThreshold: 0.65,
            animation: 150,
            onEnd: function (evt) {
                getSidebarIndex();

                var id = evt.item.id;
                var id_to = evt.to.offsetParent.id;
                var id_fr = evt.from.offsetParent.id;

                if (id_to !== id_fr) {
                    console.log('Move ' + id + ' to ' + id_to + ' from ' + id_fr);
                }

            }
        });
    }
}

function getSidebarIndex() {
    var strIndex = '';
    var listIndex = $('#catalog_list li');
    for (var i = 0; i < listIndex.length; i++) {
        var id = listIndex[i].id.replace('list_', '');
        if (i == 0) {
            strIndex += '{ "id": "' + id + '", "index":"' + i + '"}';
        }
        else {
            strIndex += ', { "id": "' + id + '", "index":"' + i + '"}';
        }
    }
    var aryIndex = JSON.parse('[' + strIndex + ']');
    console.log(aryIndex);
}