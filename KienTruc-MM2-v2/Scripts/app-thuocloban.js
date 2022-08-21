let dataLoban;
let myScroll;
const lobanMax = 506;

(function () {
  $.get('/data/loban.json', function (data) {
    dataLoban = data;
    $('.loban-scroller').css('width', lobanMax + '01px');
    renderLoban(652.5, 130.5, 'lb52');
    renderLoban(536.25, 134.0625, 'lb42');
    renderLoban(388, 97, 'lb38');

    myScroll = new IScroll('#thuocloban', {
      scrollX: true,
      scrollY: false,
      mouseWheel: true,
      scrollbars: true,
      probeType: 2
    });
    myScroll.on('scroll', function () {
      getMeasure(parseInt(this.x));
    });
    myScroll.on('scrollEnd', function () {
      getMeasure(parseInt(this.x));
    });
  });

  document.getElementById("measure")
    .addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        const x = parseInt(this.value) * -10 + 600;
        myScroll.scrollTo(x, 0);
      }
    });
})();

function getMeasure(x) {
  const measure = parseInt(((x * -1) + 600) / 10);
  $('#measure').val(measure);
}

function renderLoban(khoan, cung, type) {
  let data;
  if (type === 'lb52')
    data = dataLoban.lb52;
  else if (type === 'lb42')
    data = dataLoban.lb42;
  else if (type === 'lb38')
    data = dataLoban.lb38;

  const strRuler = $(`#${type} .loban_ruler`);
  for (let cm = 0; cm <= lobanMax; cm++) {
    strRuler.append(`<li class="is_cm" data-title="${cm} cm"></li>`);
    if (cm < lobanMax) {
      for (let mm = 1; mm < 10; mm++) {
        if (mm === 5)
          strRuler.append(`<li class="is_mm is_5"></li>`);
        else
          strRuler.append(`<li class="is_mm"></li>`);
      }
    }
  }

  let khoanWidth = 0;
  const strKhoan = $(`#${type} .loban_khoan`);
  const strCung = $(`#${type} .loban_cung`);
  for (let k = 0; k <= data.length; k++) {
    if (k === data.length) {
      k = 0;
    }
    const item = data[k];
    strKhoan.append(`<li style="width: ${khoan}px;" data-good="${item.tot}">${item.khoan}</li>`);
    item.cung.forEach(child => {
      strCung.append(`<li style="width: ${cung}px;" data-good="${item.tot}">${child}</li>`);
    });

    khoanWidth += khoan;
    if (khoanWidth >= lobanMax * 100)
      break;
  }
  //console.log(khoanWidth);
}