let dgpt = 0;
let dght = 0;
let dgtm = 270000000;
let tmdd = 12000000;
let hbpt = 1050000;
let hbht = 1450000;
let dongia;
let thongso;
$.get('/data/don-gia.json', function (data) {
    dongia = data;
    let strItem = '';
    dongia.forEach(item => {
        strItem += `<option value="${item.stt}">${item.tinh_thanh}</option>`;
    });
    $('#diadiem').html(strItem);
    $('#diadiem').val('15');
});

function reset() {
    $('#app .input').val('');
    $('#step1').removeClass('is-hidden');
    $('#step2').addClass('is-hidden');
    $('#step3').addClass('is-hidden');
    $(`table tbody`).html('');
}

function submitRender() {
    const dientichxaydung = $('#dientichxaydung').val() !== '' ? parseFloat($('#dientichxaydung').val()) : 0;
    const sotang = $('#sotang').val() !== '' ? parseFloat($('#sotang').val()) : 0;
    const tummai_dientich = $('#tummai_dientich').val() !== '' ? parseFloat($('#tummai_dientich').val()) : 0;
    const tangham_loai = document.getElementById("tangham_loai").selectedIndex;;
    const tangham_dientich = $('#tangham_dientich').val() !== '' ? parseFloat($('#tangham_dientich').val()) : 0;

    renderHouse(dientichxaydung, sotang, tummai_dientich, tangham_loai, tangham_dientich);
}

function submitStep1() {
    const diadiem = $('#diadiem').val();
    const congtrinh = $('#congtrinh').val();
    const dongia_item = dongia[diadiem - 1];

    if (dongia_item !== undefined) {
        $('.is_private').addClass('is-hidden');
        $(`.for_${congtrinh}`).removeClass('is-hidden');

        if (congtrinh === 'nhapho') {
            dgpt = dongia_item.dgpt_nhapho;
            dght = dongia_item.dght_nhapho;
            thongSoNhaPho(congtrinh);
        }
        else if (congtrinh === 'bietthu') {
            dgpt = dongia_item.dgpt_bietthu;
            dght = dongia_item.dght_bietthu;
            thongSoBietThu(congtrinh);
        }
        else if (congtrinh === 'cap4') {
            dgpt = dongia_item.dgpt_cap4;
            dght = dongia_item.dght_cap4;
            thongSoCap4(congtrinh);
        }
        else {
            alert('Chưa chọn loại công trình');
        }
    }
    else {
        alert('Chưa chọn địa điểm xây dựng');
    }

    console.log(diadiem, congtrinh, dgpt, dght);
}

function submitStep2() {
    const dientichdat = $('#dientichdat').val() !== '' ? parseFloat($('#dientichdat').val()) : 0;
    const dientichxaydung = $('#dientichxaydung').val() !== '' ? parseFloat($('#dientichxaydung').val()) : 0;
    const congtrinh = $('#congtrinh').val();
    if (dientichdat > 0 && dientichxaydung > 0) {
        if (congtrinh === 'nhapho') {
            duToanNhaPho(0, 0, 'tietkiem');
            duToanNhaPho(200000, 600000, 'phothong');
            duToanNhaPho(600000, 1800000, 'caocap');
        }
        else if (congtrinh === 'bietthu') {
            duToanBietThu(0, 0, 'tietkiem');
            duToanBietThu(200000, 1000000, 'phothong');
            duToanBietThu(600000, 4000000, 'caocap');
        }
        else if (congtrinh === 'cap4') {
            duToanCap4(0, 0, 'tietkiem');
            duToanCap4(400000, 300000, 'phothong');
            duToanCap4(1000000, 800000, 'caocap');
        }
        else {
            alert('Chưa chọn loại công trình');
        }
        $('#step1').addClass('is-hidden');
        $('#step2').addClass('is-hidden');
        $('#step3').removeClass('is-hidden');
    }
    else {
        alert('Chưa nhập thông tin công trình');
    }
}

function thongSoNhaPho(congtrinh) {
    $.get(`/data/thongso-${congtrinh}.json`, function (data) {
        thongso = data;

        $('#step1').addClass('is-hidden');
        $('#step2').removeClass('is-hidden');

        $('#tummai_ketcau').html('');
        thongso.ket_cau_mai.forEach(item => {
            $('#tummai_ketcau').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#tangham_loai').html('');
        thongso.tang_ham.forEach(item => {
            $('#tangham_loai').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#khudat').html('');
        thongso.khu_dat.forEach(item => {
            $('#khudat').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#nhalancan').html('');
        thongso.nha_lan_can.forEach(item => {
            $('#nhalancan').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#mattien').html('');
        thongso.mat_tien.forEach(item => {
            $('#mattien').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#ketcaumong').html('');
        thongso.ket_cau_mong.forEach(item => {
            $('#ketcaumong').append(`<option value="${item.value}">${item.name}</option>`);
        });

        testing(congtrinh);
    });
}

function duToanNhaPho(phantho, hoanthien, element) {
    const dongia_phantho = parseFloat(dgpt) + phantho;
    const dongia_hoanthien = parseFloat(dght) + hoanthien;

    const dientichdat = $('#dientichdat').val() !== '' ? parseFloat($('#dientichdat').val()) : 0;
    const dientichxaydung = $('#dientichxaydung').val() !== '' ? parseFloat($('#dientichxaydung').val()) : 0;
    const sotang = $('#sotang').val() !== '' ? parseFloat($('#sotang').val()) : 0;
    const tummai_ketcau = $('#tummai_ketcau').val() !== '' ? parseFloat($('#tummai_ketcau').val()) : 0;
    const tummai_dientich = $('#tummai_dientich').val() !== '' ? parseFloat($('#tummai_dientich').val()) : 0;
    const thangmay_loai = $('#thangmay_loai').val() !== '' ? parseFloat($('#thangmay_loai').val()) : 0;
    const thangmay_diemdung = $('#thangmay_diemdung').val() !== '' ? parseFloat($('#thangmay_diemdung').val()) : 0;
    const tangham_loai = $('#tangham_loai').val() !== '' ? parseFloat($('#tangham_loai').val()) : 0;
    const tangham_dientich = $('#tangham_dientich').val() !== '' ? parseFloat($('#tangham_dientich').val()) : 0;
    const hoboi_loai = $('#hoboi_loai').val() !== '' ? parseFloat($('#hoboi_loai').val()) : 0;
    const hoboi_dientich = $('#hoboi_dientich').val() !== '' ? parseFloat($('#hoboi_dientich').val()) : 0;
    const khudat = $('#khudat').val() !== '' ? parseFloat($('#khudat').val()) : 0;
    const nhalancan = $('#nhalancan').val() !== '' ? parseFloat($('#nhalancan').val()) : 0;
    const mattien = $('#mattien').val() !== '' ? parseFloat($('#mattien').val()) : 0;
    const ketcaumong = $('#ketcaumong').val() !== '' ? parseFloat($('#ketcaumong').val()) : 0;

    const tdtxd = (dientichxaydung * sotang) + tummai_dientich;
    const dtst = dientichxaydung - tummai_dientich;
    const dtsv = dientichdat - dientichxaydung;

    const cppmong = dientichxaydung * ketcaumong * dongia_phantho;
    const cptham = tangham_loai * tangham_dientich;
    const cppthan = dientichxaydung * sotang * (dongia_phantho + (mattien * 0.3));
    const cppmai = (tummai_dientich * dongia_phantho) + (tummai_dientich * tummai_ketcau * dongia_phantho) + (dtst * dongia_phantho * 0.15);
    const cpccdo = nhalancan;
    const cptcptho = cppmong + cptham + cppthan + cppmai + cpccdo;
    const cptchthien = (tdtxd * (mattien + dongia_hoanthien * 0.7)) + (tdtxd * (mattien + dongia_hoanthien * 0.7)) * khudat;
    const cptcsvuon = dtsv * dongia_phantho * 0.3;
    const cptchboi = (hoboi_dientich * (hbpt + hbht)) * 2 * hoboi_loai;
    const cptmay = (dgtm + (thangmay_diemdung * tmdd)) * thangmay_loai;
    const tongcong = cptcptho + cptchthien + cptcsvuon + cptchboi + cptmay;

    let strKetqua = `
        <tr>
            <td>1</td>
            <td>Chi phí phần móng</td>
            <td align="right">${formatToMoney(cppmong)}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Chi phí XD tầng hầm/bán hầm</td>
            <td align="right">${formatToMoney(cptham)}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Chi phí phần thân</td>
            <td align="right">${formatToMoney(cppthan)}</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Chi phí phần mái</td>
            <td align="right">${formatToMoney(cppmai)}</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Chi phí cừ chống đổ nhà hàng xóm</td>
            <td align="right">${formatToMoney(cpccdo)}</td>
        </tr>
        <tr>
            <td>6</td>
            <td>CHI PHÍ TC PHẦN THÔ</td>
            <td align="right">${formatToMoney(cptcptho)}</td>
        </tr>
        <tr>
            <td>7</td>
            <td>CHI PHÍ TC HOÀN THIỆN</td>
            <td align="right">${formatToMoney(cptchthien)}</td>
        </tr>
        <tr class="has-background-danger-light">
            <td>8</td>
            <td>TỔNG CHI PHÍ NGÔI NHÀ</td>
            <td class="has-text-weight-semibold" align="right">${formatToMoney(cptcptho + cptchthien)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thi công sân vườn</td>
            <td align="right">${formatToMoney(cptcsvuon)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thi công hồ bơi</td>
            <td align="right">${formatToMoney(cptchboi)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thang máy</td>
            <td align="right">${formatToMoney(cptmay)}</td>
        </tr>
        <tr class="has-background-danger-light">
            <td>@</td>
            <td>TỔNG CỘNG</td>
            <td class="has-text-weight-semibold" align="right">${formatToMoney(tongcong)}</td>
        </tr>`;

    $(`#${element} tbody`).html(strKetqua);
}

function thongSoBietThu(congtrinh) {
    $.get(`/data/thongso-${congtrinh}.json`, function (data) {
        thongso = data;

        $('#step1').addClass('is-hidden');
        $('#step2').removeClass('is-hidden');

        $('#tummai_ketcau').html('');
        thongso.ket_cau_mai.forEach(item => {
            $('#tummai_ketcau').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#tangham_loai').html('');
        thongso.tang_ham.forEach(item => {
            $('#tangham_loai').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#khudat').html('');
        thongso.khu_dat.forEach(item => {
            $('#khudat').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#vitrinha').html('');
        thongso.vi_tri_nha.forEach(item => {
            $('#vitrinha').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#ketcaumong').html('');
        thongso.ket_cau_mong.forEach(item => {
            $('#ketcaumong').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#sanvuon').html('');
        thongso.san_vuon.forEach(item => {
            $('#sanvuon').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#phongcach').html('');
        thongso.phong_cach.forEach(item => {
            $('#phongcach').append(`<option value="${item.value}">${item.name}</option>`);
        });

        testing(congtrinh);
    });
}

function duToanBietThu(phantho, hoanthien, element) {
    const dongia_phantho = parseFloat(dgpt) + phantho;
    const dongia_hoanthien = parseFloat(dght) + hoanthien;

    const dientichdat = $('#dientichdat').val() !== '' ? parseFloat($('#dientichdat').val()) : 0;
    const dientichxaydung = $('#dientichxaydung').val() !== '' ? parseFloat($('#dientichxaydung').val()) : 0;
    const sotang = $('#sotang').val() !== '' ? parseFloat($('#sotang').val()) : 0;
    const tanglung = $('#tanglung').val() !== '' ? parseFloat($('#tanglung').val()) : 0;
    const tummai_ketcau = $('#tummai_ketcau').val() !== '' ? parseFloat($('#tummai_ketcau').val()) : 0;
    const tummai_dientich = $('#tummai_dientich').val() !== '' ? parseFloat($('#tummai_dientich').val()) : 0;
    const thangmay_loai = $('#thangmay_loai').val() !== '' ? parseFloat($('#thangmay_loai').val()) : 0;
    const thangmay_diemdung = $('#thangmay_diemdung').val() !== '' ? parseFloat($('#thangmay_diemdung').val()) : 0;
    const tangham_loai = $('#tangham_loai').val() !== '' ? parseFloat($('#tangham_loai').val()) : 0;
    const tangham_dientich = $('#tangham_dientich').val() !== '' ? parseFloat($('#tangham_dientich').val()) : 0;
    const hoboi_loai = $('#hoboi_loai').val() !== '' ? parseFloat($('#hoboi_loai').val()) : 0;
    const hoboi_dientich = $('#hoboi_dientich').val() !== '' ? parseFloat($('#hoboi_dientich').val()) : 0;
    const khudat = $('#khudat').val() !== '' ? parseFloat($('#khudat').val()) : 0;
    const vitrinha = $('#vitrinha').val() !== '' ? parseFloat($('#vitrinha').val()) : 0;
    const ketcaumong = $('#ketcaumong').val() !== '' ? parseFloat($('#ketcaumong').val()) : 0;
    const sanvuon = $('#sanvuon').val() !== '' ? parseFloat($('#sanvuon').val()) : 0;
    const phongcach = $('#phongcach').val() !== '' ? parseFloat($('#phongcach').val()) : 0;

    const tdtxd = (dientichxaydung * sotang) + tanglung + tummai_dientich;
    const dtst = dientichxaydung - tummai_dientich;
    const dtsv = dientichdat - dientichxaydung;

    const cppmong = dientichxaydung * ketcaumong * dongia_phantho;
    const cptham = tangham_loai * tangham_dientich;
    const cppthan = dientichxaydung * sotang * dongia_phantho;
    const cppmai = (tummai_dientich * dongia_phantho * tummai_ketcau) + (tummai_dientich * dongia_phantho) + (dtst * dongia_phantho * 0.2);

    const ttptho = cppmong + cptham + cppthan + cppmai;
    const cptcptho = ttptho + (ttptho * vitrinha * 0.4);
    const cptchthien = (tdtxd * (dongia_hoanthien + phongcach)) + (tdtxd * (dongia_hoanthien + phongcach) * (vitrinha * 0.6));

    const cptcsvuon = dtsv * sanvuon;
    const cptchboi = (hoboi_dientich * (hbpt + hbht)) * 2 * hoboi_loai;
    const cptmay = (dgtm + (thangmay_diemdung * tmdd)) * thangmay_loai;
    const tongcong = cptcptho + cptchthien + cptcsvuon + cptchboi + cptmay;

    let strKetqua = `
        <tr>
            <td>1</td>
            <td>Chi phí phần móng</td>
            <td align="right">${formatToMoney(cppmong)}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Chi phí XD tầng hầm/bán hầm</td>
            <td align="right">${formatToMoney(cptham)}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Chi phí phần thân</td>
            <td align="right">${formatToMoney(cppthan)}</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Chi phí phần mái</td>
            <td align="right">${formatToMoney(cppmai)}</td>
        </tr>
        <tr>
            <td>5</td>
            <td>CHI PHÍ TC PHẦN THÔ</td>
            <td align="right">${formatToMoney(cptcptho)}</td>
        </tr>
        <tr>
            <td>6</td>
            <td>CHI PHÍ TC HOÀN THIỆN</td>
            <td align="right">${formatToMoney(cptchthien)}</td>
        </tr>
        <tr class="has-background-danger-light">
            <td>7</td>
            <td>TỔNG CHI PHÍ NGÔI NHÀ</td>
            <td class="has-text-weight-semibold" align="right">${formatToMoney(cptcptho + cptchthien)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thi công sân vườn</td>
            <td align="right">${formatToMoney(cptcsvuon)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thi công hồ bơi</td>
            <td align="right">${formatToMoney(cptchboi)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thang máy</td>
            <td align="right">${formatToMoney(cptmay)}</td>
        </tr>
        <tr class="has-background-danger-light">
            <td>@</td>
            <td>TỔNG CỘNG</td>
            <td class="has-text-weight-semibold" align="right">${formatToMoney(tongcong)}</td>
        </tr>`;

    $(`#${element} tbody`).html(strKetqua);
}

function thongSoCap4(congtrinh) {
    $.get(`/data/thongso-${congtrinh}.json`, function (data) {
        thongso = data;

        $('#step1').addClass('is-hidden');
        $('#step2').removeClass('is-hidden');

        $('#khudat').html('');
        thongso.khu_dat.forEach(item => {
            $('#khudat').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#vitrinha').html('');
        thongso.vi_tri_nha.forEach(item => {
            $('#vitrinha').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#ketcaumong').html('');
        thongso.ket_cau_mong.forEach(item => {
            $('#ketcaumong').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#ketcaumai').html('');
        thongso.ket_cau_mai.forEach(item => {
            $('#ketcaumai').append(`<option value="${item.value}">${item.name}</option>`);
        });

        $('#sanvuon').html('');
        thongso.san_vuon.forEach(item => {
            $('#sanvuon').append(`<option value="${item.value}">${item.name}</option>`);
        });

        testing(congtrinh);
    });
}

function duToanCap4(phantho, hoanthien, element) {
    const dongia_phantho = parseFloat(dgpt) + phantho;
    const dongia_hoanthien = parseFloat(dght) + hoanthien;

    const dientichdat = $('#dientichdat').val() !== '' ? parseFloat($('#dientichdat').val()) : 0;
    const dientichxaydung = $('#dientichxaydung').val() !== '' ? parseFloat($('#dientichxaydung').val()) : 0;
    const tanglung = $('#tanglung').val() !== '' ? parseFloat($('#tanglung').val()) : 0;
    const khudat = $('#khudat').val() !== '' ? parseFloat($('#khudat').val()) : 0;
    const vitrinha = $('#vitrinha').val() !== '' ? parseFloat($('#vitrinha').val()) : 0;
    const ketcaumong = $('#ketcaumong').val() !== '' ? parseFloat($('#ketcaumong').val()) : 0;
    const ketcaumai = $('#ketcaumai').val() !== '' ? parseFloat($('#ketcaumai').val()) : 0;
    const sanvuon = $('#sanvuon').val() !== '' ? parseFloat($('#sanvuon').val()) : 0;

    const tdtxd = dientichxaydung + tanglung;
    const dtmai = dientichxaydung * 1.5;
    const dtsv = dientichdat - dientichxaydung;

    const cppmong = dientichxaydung * ketcaumong * dongia_phantho;
    const cppthan = tdtxd * dongia_phantho;
    const cppmai = dtmai * ketcaumai;
    const ttptho = cppmong + cppthan + cppmai;
    const cptcptho = ttptho + (ttptho * khudat) + (ttptho * vitrinha);
    const cptchthien = (tdtxd * dongia_hoanthien * vitrinha) + (tdtxd * dongia_hoanthien);
    const cptcsvuon = dtsv * sanvuon;
    const tongcong = cptcptho + cptchthien + cptcsvuon;

    let strKetqua = `
        <tr>
            <td>1</td>
            <td>Chi phí phần móng</td>
            <td align="right">${formatToMoney(cppmong)}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Chi phí phần thân</td>
            <td align="right">${formatToMoney(cppthan)}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Chi phí phần mái</td>
            <td align="right">${formatToMoney(cppmai)}</td>
        </tr>
        <tr>
            <td>4</td>
            <td>CHI PHÍ TC PHẦN THÔ</td>
            <td align="right">${formatToMoney(cptcptho)}</td>
        </tr>
        <tr>
            <td>5</td>
            <td>CHI PHÍ TC HOÀN THIỆN</td>
            <td align="right">${formatToMoney(cptchthien)}</td>
        </tr>
        <tr class="has-background-danger-light">
            <td>6</td>
            <td>TỔNG CHI PHÍ NGÔI NHÀ</td>
            <td class="has-text-weight-semibold" align="right">${formatToMoney(cptcptho + cptchthien)}</td>
        </tr>
        <tr>
            <td>#</td>
            <td>Chi phí thi công sân vườn</td>
            <td align="right">${formatToMoney(cptcsvuon)}</td>
        </tr>
        <tr class="has-background-danger-light">
            <td>@</td>
            <td>TỔNG CỘNG</td>
            <td class="has-text-weight-semibold" align="right">${formatToMoney(tongcong)}</td>
        </tr>`;

    $(`#${element} tbody`).html(strKetqua);
}

function testing(congtrinh) {
    if (congtrinh === 'nhapho') {
        $('#dientichdat').val('100');
        $('#dientichxaydung').val('90');
        $('#sotang').val('3');
        $('#tummai_ketcau').val('0.15');
        $('#tummai_dientich').val('10');
        $('#thangmay_loai').val('0');
        $('#thangmay_diemdung').val('0');
        $('#tangham_loai').val('5500000');
        $('#tangham_dientich').val('0');
        $('#hoboi_loai').val('1');
        $('#hoboi_dientich').val('5');
        $('#khudat').val('0');
        $('#nhalancan').val('20000000');
        $('#mattien').val('0');
        $('#ketcaumong').val('0.6');
    }
    else if (congtrinh === 'bietthu') {
        $('#dientichdat').val('300');
        $('#dientichxaydung').val('100');
        $('#sotang').val('2');
        $('#tanglung').val('0');
        $('#tummai_ketcau').val('0.15');
        $('#tummai_dientich').val('10');
        $('#thangmay_loai').val('1');
        $('#thangmay_diemdung').val('4');
        $('#tangham_loai').val('5000000');
        $('#tangham_dientich').val('150');
        $('#hoboi_loai').val('1');
        $('#hoboi_dientich').val('100');
        $('#khudat').val('0');
        $('#nhalancan').val('0.2');
        $('#sanvuon').val('650000');
        $('#phongcach').val('0');
        $('#ketcaumong').val('1.2');
    }
    else if (congtrinh === 'cap4') {
        $('#dientichdat').val('100');
        $('#dientichxaydung').val('80');
        $('#tanglung').val('0');
        $('#khudat').val('0');
        $('#nhalancan').val('0.2');
        $('#ketcaumong').val('0.45');
        $('#ketcaumai').val('950000');
        $('#sanvuon').val('350000');
    }
}

function renderHouse(dientichxaydung, sotang, tummai, tangham_loai, tangham_dientich) {
    let strDemo = '';
    if (tummai > 0) {
        let width = tummai * 100 / dientichxaydung;
        strDemo += `<li style="width: ${width}%;">
            <b>TUM MÁI</b>
        </li>`;
    }
    for (let tang = sotang; tang > 0; tang--) {
        strDemo += `<li style="width: 100%;">
            <b>TẦNG ${tang}</b>
            <i>${dientichxaydung}m2</i>
        </li>`;
    }
    if (tangham_loai > 0 && tangham_dientich > 0) {
        let width = tangham_dientich * 100 / dientichxaydung;
        strDemo += `<li style="width: ${width}%;">
            <b>TẦNG ${tangham_loai === 1 ? 'BÁN HẦM' : 'HẦM'}</b>
            <i>${tangham_dientich}m2</i>
        </li>`;

        if (tangham_loai === 1)
            $(`#house_demo`).attr('class', 'is_ham is_banham');
        else
            $(`#house_demo`).attr('class', 'is_ham');
    } else
        $(`#house_demo`).attr('class', '');

    $(`#house_demo`).html(strDemo);
}