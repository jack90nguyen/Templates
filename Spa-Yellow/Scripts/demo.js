function loadDataDemo() {
    loadDataServices();
    loadDataBlogs();
}

function loadDataServices() {
    var demo_data = $('#test_services');
    var item = demo_data.html();
    if(item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 9; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            content += item.replace('#image', image);
            img = img === 6 ? 1 : img + 1;
        }
        demo_data.html(content);
    }

}
function loadDataBlogs() {
    var demo_data = $('#test_blogs');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (i = 1; i <= 6; i++) {
            var image = '/Images/Demo/' + img + '.jpg';
            content += item.replace('#image', image);
            img = img === 6 ? 1 : img + 1;
        }
    }
    demo_data.html(content);
}