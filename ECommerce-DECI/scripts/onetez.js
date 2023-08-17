
const isMobile = window.innerWidth < 768 ? true : false;

function setCookie(key, value) {
  var expires = new Date();
  expires.setYear(expires.getYear() + 1);
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

function hideNotify() {
  $('#notify').remove();
}

function showNotify(content, isSuccess) {
  $('#notify').remove();
  let status = isSuccess === true ? 'is-success' : 'is-danger';
  $('body').prepend(`
    <div id="notify">
      <div class="notification is-light ${status}">
        <a class="delete" onclick="hideNotify()"></a>
        <span>${content}</span>
      </div>
    </div>`);

  setTimeout(function () {
    hideNotify();
  }, 10000);
}

function formatToMoney(number) {
  if (number !== null)
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  else
    return '';
}

function formatToNumber(str) {
  str = str.toString().replace(/,/g, '').replace('VND', '').replace('₫', '');
  let num = parseFloat(str);
  if (isNaN(num))
    return 0;
  else
    return num;
}

function disableEnterForm(formid) {
  $('#' + formid).on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });
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

function closeModal(id) {
  $('#' + id).removeClass('is-active');
}

function popupYoutube(video) {
  const strItem = `<div id="popup_youtube" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <iframe width="100%" height="500" src="${video}"
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen=""></iframe>
        </div>
        <button class="modal-close is-large" onclick="closePopup('popup_youtube', true)"></button>
    </div>`;
  $('body').append(strItem);

  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
      closePopup('popup_youtube', true);
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
  var content = '<div id="gallery__bg">';
  content += '<a class="gallery__close" onclick="closeGallery()">X</a>';
  content += '<div class="gallery__popup">';
  content += '<img class="gallery__img" src="' + img + '" alt="IMG" />';
  content += '<span class="gallery__index"></span>';
  content += '</div>';
  if (group !== '' && group !== undefined) {
    content += '<a onclick="galleryNavi(false, \'' + group + '\')" class="gallery__prev"></a>';
    content += '<a onclick="galleryNavi(true, \'' + group + '\')" class="gallery__next"></a>';
  }
  content += '</div>';

  $('body').append(content);

  galleryIndex(img, group);

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
    });
    document.getElementById('gallery__bg').addEventListener('swiped-down', function (e) {
      closeGallery();
    });
  }
}

function galleryNavi(next, group) {
  var view_img = $('.gallery__img');
  var view_src = view_img.attr("src");
  var list = $('[data-group="' + group + '"]');

  let index = galleryIndex(view_src, group);
  if (next)
    index = index < list.length - 1 ? index + 1 : 0;
  else
    index = index > 0 ? index - 1 : list.length - 1;
  view_img.attr("src", list[index].href);
}

function galleryIndex(img, group) {
  var list = $('[data-group="' + group + '"]');
  let index = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i].href.indexOf(img) !== -1) {
      index = i;
      console.log(index, list.length);
      break;
    }
  }
  $('.gallery__index').html(`${index + 1}/${list.length}`);
  return index;
}

function stickyHeader() {
  var header = $('header').innerHeight();
  var stickyNav = function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > header - 50) {
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
  var listRequired = $('#' + formId + ' [data-required]');
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

$(function () {
  $.fn.scrollToTop = function () {
    $(this).hide().removeAttr("href");
    if ($(window).scrollTop() != "0") {
      $(this).fadeIn("slow")
    }
    var scrollDiv = $(this);
    $(window).scroll(function () {
      if ($(window).scrollTop() == "0") {
        $(scrollDiv).fadeOut("slow")
      } else {
        $(scrollDiv).fadeIn("slow")
      }
    });
    $(this).click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, "slow")
    })
  }
});

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

$(document).ready(function () {

  includeHTML();

  setTimeout(function () {

    // Bind data demo
    loadDataDemo();

    stickyHeader();

    scrollAnimate();

    $("#gotop").scrollToTop();

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

    $('.js_play_video').click(function (e) {
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

    $('.quick_search').keyup(function (event) {
      const key = $(this).val();
      if (key.length > 0) {
        if (event.keyCode === 13) {
          key = key.replace(/ /g, '-');
          if (window.runParams.lang.length > 0)
            location.href = `/${window.runParams.lang}/search.html?key=${key}`;
          else
            location.href = `/search.html?key=${key}`;
        }
        else if ($(this).data('suggest') === true) {
          const results = $(this).siblings('.suggest');
          results.fadeIn();
          results.html('');
          for (let index = 1; index < 5; index++) {
            results.append(`
              <li>
                <a href="#">
                  <img src="/Themes/b${index}.jpg" alt="img">
                  <span>Đây là đoạn nội dung mẫu ${index} để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website.</span>
                </a>
              </li>`);
          }

          // $.get(`http://demo.onetez.work/APIv1/Post/Search?key=${key}`, function (res) {
          //   console.log(res);
          // });
          //http://demo.onetez.work/APIv1/Post/Search?key=a
          // {
          //   "id": "637719334057636768",
          //   "name": "Xu hướng thiết kế mẫu để kiểm tra giao diện 9",
          //   "link": "/admin/blog/edit/637719334057636768",
          //   "image": "/Themes/b5.jpg",
          //   "category": "",
          //   "keyword": "xu hướng thiết kế mẫu để kiểm tra giao diện 9post 1588",
          //   "type": 2
          // }
        }
      }
      else {
        $(this).siblings('.suggest').fadeOut();
        $(this).siblings('.suggest').html('');
      }
    });

    const sortBy = getParameterByName('sort');
    if (sortBy !== null) {
      $('#sortby').val(sortBy);
      $(`#sortby li[data-id="${sortBy}"]`).addClass('is-active');
    }

    const headerNav = $('.navbar-item');
    for (var i = 0; i < headerNav.length; i++) {
      var item = $(headerNav[i]);
      if (location.pathname === item.attr('href')) {
        item.addClass('is-active');
        item.parents('.navbar-item').addClass('is-active');
      }
    }

    const mobileNav = $('#mobile_navbar a');
    for (var i = 0; i < mobileNav.length; i++) {
      var item = $(mobileNav[i]);
      if (location.pathname === item.attr('href')) {
        item.addClass('is-active');
      }
    }

    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27) {
        // Press Esc
        $('.modal').removeClass('is-active');
        $('#popup_youtube').remove();
      }
    });

  }, 1000);

});

function toggleMore(id) {
  $(`#${id}`).toggleClass('is-active');
}

function toggleSearch() {
  $('#quick_search').toggleClass('is-active');
  $('#header_search').focus();
}

function changeSort(id) {
  const old = getParameterByName('sort');
  const sort = id !== undefined ? id : $('#sortby').val();
  let url = location.href;

  if (url.indexOf('?') === -1)
    url = url + `?sort=${sort}`;
  else if (url.indexOf(`sort=${old}`) !== -1)
    url = url.replace(`sort=${old}`, `sort=${sort}`);
  else
    url = url + `&sort=${sort}`;

  location.href = url;
}

function changeQuantity(qty) {
  const old = parseInt($('#buy_quantity').val());
  const quantity = old + qty;
  if (quantity > 0)
    $('#buy_quantity').val(quantity);
}

function changeAttribute() {
  const id = $('#product_id').val();
  const size = $('#product_size').val() !== undefined ? $('#product_size').val() : '';
  const color = $('#product_color').val() !== undefined ? $('#product_color').val() : '';
  $.ajax({
    type: "GET",
    url: "/APIv1/Cart/GetVariation",
    data: { id, size, color },
    dataType: "json",
    success: function (variation) {
      if (variation !== null) {
        $('#product_image').attr('href', variation.image);
        $('#product_image img').attr('src', variation.image);
        $('#product_price').html(`<span>${variation.price} ₫</span>`);
        if (variation.quantity > 0) {
          $('#button_cart').html('Thêm vào giỏ hàng');
          $('#button_cart').attr('class', 'button is-danger');
          $('#button_cart').attr('onclick', `addToCart(${id},${variation.id})`);
        }
        else {
          $('#button_cart').html('Sản phẩm hết hàng');
          $('#button_cart').attr('class', 'button is-dark');
          $('#button_cart').removeAttr('onclick');
        }
        console.log(variation);
      }
      else {
        $('#product_price').html(``);
        $('#button_cart').html('Sản phẩm hết hàng');
        $('#button_cart').attr('class', 'button is-dark');
        $('#button_cart').removeAttr('onclick');
      }
    }
  });
}

function updateCart() {
  $.ajax({
    type: "GET",
    url: "/APIv1/Cart/GetNow",
    data: {},
    dataType: "json",
    success: function (res) {
      if (res !== null) {
        $('.header_cart_count').html(res.count);
        $('.header_cart_money').html(formatToMoney(res.money) + ' ₫');
      }
    }
  });
}

function addToCart(product, variation) {
  const quantity = $('#buy_quantity').val() !== undefined ? $('#buy_quantity').val() : 1;
  $.ajax({
    type: "POST",
    url: "/APIv1/Cart/AddItem",
    data: { id: '', product, variation, quantity },
    dataType: "json",
    success: function (res) {
      if (res.data !== null) {
        updateCart();
        showNotify('Đã thêm sản phẩm vào giỏ hàng !', true);
        console.log(res.data);
      }
      else {
        showNotify(res.msg, false);
      }
    }
  });
}

function changeLanguage(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  let language = 1;
  if (e.id.indexOf('_select') !== -1) {
    language = $(`#${e.id}`).val();
  }
  else {
    language = e.id.replace('language_', '');
  }
  $.ajax({
    type: "POST",
    url: "/APIv1/Post/ChangeLanguage",
    data: { id: window.runParams.id, language, link: window.runParams.link },
    dataType: "json",
    success: function (res) {
      console.log(language, res);
      location.href = res;
    }
  });
}

function formSend(data, msg) {
  //const data = {
  //  code: 'contact',
  //  name: $('[data-name').val(),
  //  phone: $('[data-phone]').val(),
  //  email: $('[data-email]').val(),
  //  address: $('[data-address]').val(),
  //  content: $('[data-content]').val()
  //}

  console.log('Form', data);

  if (checkRequired(`form_${data.code}`)) {
    const btn = $(`#form_${data.code} [data-btn]`);
    btn.addClass('is-loading');
    setTimeout(function () {
      btn.removeClass('is-loading');
      showNotify(msg, true);
    }, 1000);
  }
  else {
    showNotify('Vui lòng nhập đầy đủ thông tin !', false);
  }

}

function formDemo() {
  var code = 'contact';
  var name = $('#contact_name').val();
  var phone = $('#contact_phone').val();
  var email = $('#contact_email').val();
  var address = $('#contact_address').val();
  var content = $('#contact_content').val();

  if (checkRequired('contact_form')) {
    $('#contact_btn').addClass('is-loading');
    setTimeout(function () {
      $('#contact_btn').removeClass('is-loading');
      $('#contact_msg').html(`Đã gửi thông tin liên hệ !`);
    }, 1000);

    $.ajax({
      type: "POST",
      url: "/APIv1/Form/Send",
      data: { code, name, phone, email, address, content },
      dataType: "json",
      success: function (res) {
        $('#contact_btn').removeClass('is-loading');
        if (res.status === true) {
          $('#contact_msg').html(`Đã gửi thông tin liên hệ !`);
        } else {
          $('#contact_msg').html(res.msg);
        }
      }
    });
  }
  else {
    $('#contact_msg').html('Vui lòng nhập đầy đủ thông tin');
  }
}