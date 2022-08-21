
function demoCategoryIntro() {
    var demo_data = $('.category__intro');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 12; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Danh Mục ' + i);

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoProductListS1() {
    var demo_data = $('.product__list__s1');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 8; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Ống Kính Canno EF ' + i + 'mm F1.8 (Hàng nhập khẩu)');
            item_demo = item_demo.replace('#price_main', i + '.450.000');
            item_demo = item_demo.replace('#price_sale', i + '.850.000');

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoProductListS2() {
    var demo_data = $('.product__list__s2');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 9; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Ống Kính Canno EF ' + i + 'mm F1.8 (Hàng nhập khẩu)');
            item_demo = item_demo.replace('#price_main', i + '.450.000');
            item_demo = item_demo.replace('#price_sale', i + '.850.000');

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoProductListS3() {
    var demo_data = $('.product__list__s3');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 10; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Ống Kính Canno EF ' + i + 'mm F1.8 (Hàng nhập khẩu)');

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoProductListS4() {
    var demo_data = $('.product__list__s4');
    var item = demo_data.html();
    if (item !== undefined) {
        var rows = demo_data.data('rows');
        var length = rows !== undefined ? rows : 20;
        var content = '';
        var img = 1;
        for (i = 1; i <= length; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Ống Kính Canno EF ' + i + 'mm F1.8 (Hàng nhập khẩu)');
            item_demo = item_demo.replace('#price_main', i + '.450.000');
            item_demo = item_demo.replace('#price_sale', i + '.850.000');
            if (i === 5 || i === 8) {
                item_demo = item_demo.replace('#note', 'Nhập mã BM500 giảm ngay 500k');
            }
            else {
                item_demo = item_demo.replace('#note', '');
            }


            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}
function demoProductListS5() {
    var demo_data = $('.product__list__s5');
    var item = demo_data.html();
    if (item !== undefined) {
        var rows = demo_data.data('rows');
        var length = rows !== undefined ? rows : 20;
        var content = '';
        var img = 1;
        for (i = 1; i <= length; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Ống Kính Canno EF ' + i + 'mm F1.8 (Hàng nhập khẩu)');
            item_demo = item_demo.replace('#price_main', i + '.450.000');
            item_demo = item_demo.replace('#price_sale', i + '.850.000');

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoCategoryListS2() {
    var demo_data = $('.category__list__s2');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 9; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Danh Mục ' + i);

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoCategoryListS3() {
    var demo_data = $('.category__list__s3');
    var item = demo_data.html();
    if (item !== undefined) {
        var rows = demo_data.data('rows');
        var length = rows !== undefined ? rows : 9;
        var content = '';
        var img = 1;
        for (i = 1; i <= length; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);
            item_demo = item_demo.replace('#name', 'Danh Mục Con ' + i);

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}

function demoBrandLogo() {
    var demo_data = $('.brand__logo');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 18; i++) {
            var image = '/Images/Demo/brand.png';
            var item_demo = item;
            item_demo = item_demo.replace('#image', image);

            content += item_demo;

            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}