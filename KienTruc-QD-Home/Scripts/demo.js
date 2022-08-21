
var loadDataDemo = () => {
    var listRepeat = $('[data-repeat="true"]');
    for (let i = 0; i < listRepeat.length; i++) {
        const element = listRepeat[i];
        const source = element.dataset.source;
        if (source !== undefined && source === 'childs')
            continue;
        else
            element.innerHTML = repeatDataElement(element);
    }

    var listBind = $('[data-bind="true"]');
    for (let i = 0; i < listBind.length; i++) {
        const element = listBind[i];
        element.innerHTML = bindDataElement(element);
    }

    loadAfterDataDemo();
}

function repeatDataElement(element) {
    const template = element.innerHTML;
    const type = element.dataset.type;
    const source = element.dataset.source;
    let rows = parseInt(element.dataset.rows);
    if (rows === 0) rows = 12;

    let strContent = '';
    for (let id = 1; id <= rows; id++) {
        let item = template;

        if (template.indexOf('data-source="childs"') !== -1) {
            const child = element.querySelectorAll('[data-source="childs"]')[0];
            let htmlChild = repeatDataElement(child);
            item = item.replace(child.innerHTML, htmlChild);
        }

        let img = id % 6 === 0 ? 6 : id % 6;
        let image = `/Themes/b${img}.jpg`;
        let pimg = `/Themes/p${img}.jpg`;
        // let name = `This is title ${id} demo for testing`;
        // let desc = `This is just placeholder text for testing purpose.  This is just placeholder text for testing purpose. `;
        let name = `Đây là tiêu đề ${id} mẫu để kiểm tra giao diện`;
        let desc = `Đây là đoạn nội dung mẫu để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website. Đây là đoạn nội dung mẫu để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website.`;
        let content = `${desc}<br/>${desc}<br/>${desc}<br/>${desc}<br/>${desc}`;

        if (type !== undefined) {
            if (type.indexOf('nav') !== -1)
                name = `Menu số ${id}`;
            if (type.indexOf('icon') !== -1)
                image = `icon-feather`;
        }
        if (source !== undefined) {
            if (source.indexOf('category') !== -1)
                name = `Danh mục số ${id}`;
            if (source.indexOf('slide') !== -1)
                image = `/Themes/s${img}.jpg`;
        }

        item = item.replace(/#Product.Image/g, pimg);

        item = item.replace(/#Element/g, '#Post').replace(/#Blog/g, '#Post').replace(/#Product/g, '#Post');
        item = item.replace(/#Post.Id/g, id);
        item = item.replace(/#Post.Image/g, image);
        item = item.replace(/#Post.Thumb/g, image);
        item = item.replace(/#Post.Name/g, name);
        item = item.replace(/#Post.Desc/g, desc);
        item = item.replace(/#Post.Content/g, content);
        item = item.replace(/#Post.Price/g, `<span>250.000 VND</span><del>300.000</del>`);
        item = item.replace(/#Post.Index/g, id);

        strContent += item;
    }

    console.log(`Repeat Data: ${source} | ${rows} item`);

    return strContent;
}

function bindDataElement(element) {
    const template = element.innerHTML;
    const type = element.dataset.type;
    const source = element.dataset.source;
    let rows = 1;
    if (type === 'images')
        rows = 12;
    else if (type === 'images-childs')
        rows = 24;
    else if (type === 'tags')
        rows = 6;
    else if (type === 'nav')
        rows = 5;

    let strContent = '';

    if (source === 'header-nav') {
        strContent += `<a class="navbar-item" href="/">Trang chủ</a>
            <a class="navbar-item" href="/about.html">Giới thiệu</a>
            <a class="navbar-item" href="/blog-list.html">Tin tức</a>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="/blog-list.html">Tin tức</a>
                <div class="navbar-dropdown">
                    <a class="navbar-item" href="/blog-detail.html">Bài viết</a>
                </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="/project-list.html">Dự án</a>
                <div class="navbar-dropdown">
                    <a class="navbar-item" href="/project-detail.html">Dự án chi tiết</a>
                </div>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Thư viện</a>
                <div class="navbar-dropdown">
                    <a class="navbar-item" href="/gallery-images.html">Thư viên hình ảnh</a>
                    <a class="navbar-item" href="/gallery-videos.html">Thư viên videos</a>
                </div>
            </div>
            <a class="navbar-item" href="/contact.html">Liên hệ</a>`;
    }
    else {
        for (let id = 1; id <= rows; id++) {
            let item = template;
            let img = id % 6 === 0 ? 6 : id % 6;
            let image = `/Themes/b${img}.jpg`;

            if (type !== undefined) {
                if (type === 'images' || type === 'images-childs') {
                    item = item.replace(/#Image.Id/g, id);
                    item = item.replace(/#Image.Name/g, `Image ${id}`);
                    item = item.replace(/#Image.Link/g, image);
                }
                else if (type === 'tags') {
                    item = item.replace(/#Tag.Id/g, id);
                    item = item.replace(/#Tag.Name/g, `Tag ${id}`);
                }
                else if (type === 'nav') {
                    if (id !== 4)
                        item = `<a class="navbar-item" href="#Element.Link">Menu số ${id}</a>`;
                    else {
                        item = `<div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">Menu số ${id}</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item">Sub Menu 1</a>
                            <a class="navbar-item">Sub Menu 2</a>
                            <a class="navbar-item">Sub Menu 3</a>
                        </div>
                    </div>`;
                    }
                }
            }
            strContent += item;
        }
    }

    console.log(`Bind Data: ${source} | ${rows} item`);

    return strContent;
}