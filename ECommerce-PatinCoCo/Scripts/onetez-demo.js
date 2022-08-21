
var loadDataDemo = () => {
    var listRepeat = $('[data-repeat="true"]');
    for (let i = 0; i < listRepeat.length; i++) {
        const element = listRepeat[i];
        const source = element.dataset.source;
        if (source !== undefined && source === 'childs')
            continue;
        else
            element.innerHTML = bindDataElement(element);
    }


    loadAfterDataDemo();
}

function bindDataElement(element) {
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
            let htmlChild = bindDataElement(child);
            item = item.replace(child.innerHTML, htmlChild);
        }

        let img = `${Math.floor((Math.random() * 6) + 1)}`;
        let image = `/Themes/p${img}.jpg`;
        let name = `Đây là tiêu đề ${id} mẫu để kiểm tra giao diện`;
        let desc = `Đây là đoạn nội dung mẫu để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website.`;

        if (type !== undefined) {
            if (type.indexOf('nav') !== -1)
                name = `Menu số ${id}`;
            if (type.indexOf('icon') !== -1)
                image = `icon-feather`;
        }
        if (source !== undefined) {
            if (source.indexOf('category') !== -1)
                name = `Danh mục số ${id}`;
        }

        item = item.replace(/#Element/g, '#Post').replace(/#Blog/g, '#Post').replace(/#Product/g, '#Post');
        item = item.replace(/#Post.Id/g, id);
        item = item.replace(/#Post.Image/g, image);
        item = item.replace(/#Post.Name/g, name);
        item = item.replace(/#Post.Desc/g, desc);
        item = item.replace(/#Post.Price/g, `<span>250.000 VND</span><del>300.000</del>`);

        strContent += item;
    }

    console.log(`Bind Data: ${source} | ${rows} item`);

    return strContent;
}