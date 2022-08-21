function loadDataDemo() {
    loadDataServices();
    loadDataBlogs();
    loadDataTags();
    loadDataSponsors();
    //loadDataScrolling();
}

function loadDataServices() {
    var demo_data = $('#test_services');
    var item = demo_data.html();
    if (item !== undefined) {
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

function loadDataTags() {
    var demo_data = $('#test_tags');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var tags = 'This is just placeholder text for testing purpose';
        var res = tags.split(' ');
        for (i = 0; i <= res.length; i++) {
            var name = res[i];
            content += item.replace('#name', name);
        }
    }
    demo_data.html(content);
    $('#test_tags2').html(content);
}

function loadDataSponsors() {
    var demo_data = $('#test_sponsors');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        var img = 1;
        for (j = 1; j <= 3; j++) {
            for (i = 1; i <= 5; i++) {
                var image = '/Images/Demo/' + img + '.jpg';
                content += item.replace('#image', image).replace('#icon', j);
                img = img === 6 ? 1 : img + 1;
            }
        }
        demo_data.html(content);
    }
}

function loadDataScrolling() {
    var demo_data = $('#test_scrolling');
    var item = demo_data.html();
    if (item !== undefined) {
        var content = '';
        for (i = 1; i <= 20; i++) {
            var name = 'This is just placeholder text for testing purpose ' + i;
            content += item.replace('#name', name);
        }
        demo_data.html(content);
    }
}