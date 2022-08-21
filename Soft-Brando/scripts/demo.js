$(document).ready(function () {
  includeHTML();
  setTimeout(function () {
    loadDataDemo();

    $(".is_burger").click(function () {
      $("#sidebar").toggleClass("is-small");
    });

    const sidebar_item = $(".sidebar_item");
    for (var i = 0; i < sidebar_item.length; i++) {
      var item = $(sidebar_item[i]);
      if (location.pathname === item.attr("href")) {
        item.addClass("is-active");
      }
    }
  }, 500);
});

function toggleActive(id) {
  $(`#${id}`).toggleClass("is-active");
}

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
          if (this.status == 200) {
            elmnt.outerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Include not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("data-include");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

var loadDataDemo = () => {
  var listRepeat = $('[data-repeat="true"]');
  for (let i = 0; i < listRepeat.length; i++) {
    const element = listRepeat[i];
    const source = element.dataset.source;
    if (source !== undefined && source === "childs") continue;
    else element.innerHTML = repeatDataElement(element);
  }
};

function repeatDataElement(element) {
  const template = element.innerHTML;
  const type = element.dataset.type;
  const source = element.dataset.source;
  let rows = parseInt(element.dataset.rows);
  if (rows === 0) rows = 12;

  let strContent = "";
  for (let id = 1; id <= rows; id++) {
    let item = template;

    if (template.indexOf('data-source="childs"') !== -1) {
      const child = element.querySelectorAll('[data-source="childs"]')[0];
      let htmlChild = repeatDataElement(child);
      item = item.replace(child.innerHTML, htmlChild);
    }

    let image = `https://avatars.dicebear.com/api/micah/${id}.svg?background=pink`;
    let name = `Đây là tiêu đề ${id}`;
    let desc = `Đây là đoạn nội dung mẫu để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website. Đây là đoạn nội dung mẫu để kiểm tra giao diện, bạn có thể thay đổi trong phần quản trị của website.`;
    let content = `${desc}<br/>${desc}<br/>${desc}<br/>${desc}<br/>${desc}`;

    if (type !== undefined) {
      if (type.indexOf("nav") !== -1) name = `Menu số ${id}`;
      if (type.indexOf("icon") !== -1) image = `icon-feather`;
    }
    if (source !== undefined) {
      if (source.indexOf("category") !== -1) name = `Danh mục số ${id}`;
      if (source.indexOf("service") !== -1) name = `Dịch vụ số ${id}`;
      if (source.indexOf("slide") !== -1) image = `/Themes/s${img}.jpg`;
    }

    item = item.replace(/#Post.Id/g, id);
    item = item.replace(/#Post.Image/g, image);
    item = item.replace(/#Post.Thumb/g, image);
    item = item.replace(/#Post.Name/g, name);
    item = item.replace(/#Post.Desc/g, desc + desc);
    item = item.replace(/#Post.Content/g, content);
    item = item.replace(
      /#Post.Price/g,
      `<span>250.000 VND</span><del>300.000</del>`
    );
    item = item.replace(/#Post.Index/g, id);

    strContent += item;
  }

  //console.log(`Repeat Data: ${source} | ${rows} item`);

  return strContent;
}
