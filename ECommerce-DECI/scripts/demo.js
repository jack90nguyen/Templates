
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
  if (rows === 0)
    rows = 12;

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
      else if (source.indexOf('service') !== -1)
      {
        name = `Dịch vụ số ${id}`;
        content = desc;
      }
      else if (source.indexOf('slide') !== -1)
        image = `/Themes/s${img}.jpg`;
      else if (source.indexOf('feedback') !== -1)
      {
        name = `Khách hàng số ${id}`;
        content = desc;
      }
    }

    item = item.replace(/#Product.Image/g, pimg);
    item = item.replace(/#Product.Thumb/g, pimg);

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

  //console.log(`Repeat Data: ${source} | ${rows} item`);

  return strContent;
}

function bindDataElement(element) {
  const template = element.innerHTML;
  const type = element.dataset.type;
  const source = element.dataset.source;
  let rows = 1;
  if (element.dataset.rows !== undefined)
    rows = parseInt(element.dataset.rows);
  else if (type === 'images')
    rows = 6;
  else if (type === 'images-childs')
    rows = 24;
  else if (type === 'category')
      rows = 5;
  else if (type === 'tags')
    rows = 12;
  else if (type === 'nav')
    rows = 5;

  let strContent = '';

  if (source === 'header-nav') {
    strContent += `
      <a class="navbar-item" href="/index.html">Trang chủ</a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/category.html">Danh mục</a>
        <div class="navbar-dropdown">
          <a class="navbar-item" href="/product.html">Sản phẩm</a>
        </div>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/service-list.html">Dịch vụ</a>
        <div class="navbar-dropdown">
          <a class="navbar-item" href="/service-detail.html">Chi tiết dịch vụ</a>
        </div>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/blog-list.html">Tin tức</a>
          <div class="navbar-dropdown">
            <a class="navbar-item" href="/blog-detail.html">Bài viết</a>
            <a class="navbar-item" href="/blog-full.html">Giới thiệu</a>
          </div>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/project-list.html">Dự án</a>
          <div class="navbar-dropdown">
              <a class="navbar-item" href="/project-detail.html">Chi tiết dự án</a>
          </div>
      </div>
      <a class="navbar-item" href="/contact.html">Liên hệ</a>
      <a class="navbar-item" href="/search.html">Tìm kiếm</a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">Khác</a>
        <div class="navbar-dropdown">
          <a class="navbar-item" href="/gallery-images.html">Thư viên hình ảnh</a>
          <a class="navbar-item" href="/gallery-videos.html">Thư viên videos</a>
        </div>
      </div>
      `;
  }
  else {
    for (let id = 1; id <= rows; id++) {
      let item = template;
      let img = id % 6 === 0 ? 6 : id % 6;
      let image = `/Themes/b${img}.jpg`;
      let desc = `Đây là đoạn nội dung mẫu để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website.`;
      let content = `${desc}${desc}<br/>${desc}${desc}${desc}<br/>${desc}${desc}<br/>${desc}`;

      if (type !== undefined) {
        if (type === 'images' || type === 'images-childs') {
          item = item.replace(/#Image.Id/g, id);
          item = item.replace(/#Image.Name/g, `Image ${id}`);
          item = item.replace(/#Image.Link/g, image);
          item = item.replace(/#Image.Thumb/g, image);
        }
        else if (type === 'tags') {
          item = item.replace(/#Tag.Id/g, id);
          item = item.replace(/#Tag.Name/g, `Đây là tag ${id}`);
        }
        else if (type === 'category') {
          item = item.replace(/#Category.Id/g, id);
          item = item.replace(/#Category.Name/g, `Danh mục ${id}`);
        }
        else if (type === 'nav') {
          item = item.replace(/#Element.Id/g, id);
          item = item.replace(/#Element.Name/g, `Menu số ${id}`);
        }
        else {
          item = item.replace(/#Element.Id/g, id);
          item = item.replace(/#Element.Name/g, `Tiêu đề của ${source}`);
          item = item.replace(/#Element.Image/g, `/Themes/b${id}.jpg`);
          item = item.replace(/#Element.Desc/g, desc);
          item = item.replace(/#Element.Content/g, content);
        }
      }
      strContent += item;
    }
  }

  //console.log(`Bind Data: ${source} | ${rows} item`);

  return strContent;
}