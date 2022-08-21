let namsinh = 0;
let dulieu;
$.get('/data/xemmau.json', function (data) {
  dulieu = data;
});

function reset() {
  $('#step1').removeClass('is-hidden');
  $('#step2').addClass('is-hidden');
}

function submitStep1() {
  namsinh = $('#input_namsinh').val() !== '' ? parseInt($('#input_namsinh').val()) : 0;
  if (namsinh > 0) {
    submitApp();
  }
  else {
    alert('Bạn chưa nhập thông tin');
  }
}

function submitApp() {
  const item = dulieu.find(item => item.namsinh === namsinh);
  if (item != null) {
    $('#step1').addClass('is-hidden');
    $('#step2').removeClass('is-hidden');
    $('#namsinh').html(item.namsinh);
    $('#tuoiam').html(item.tuoiam);
    $('#menh').html(item.menh);
    $('#banmenh').html(item.banmenh);
    $('#tuongsinh').html(item.tuongsinh);
    $('#tuongkhac').html(item.tuongkhac);
  }
  else {
    alert('Không có dữ liệu');
  }
}